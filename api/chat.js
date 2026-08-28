export const config = {
  runtime: 'edge', // Using Edge runtime is fast and standard for Vercel
};

const MODEL = "gemini-3.6-flash";
const systemPrompt = `You are Vinayak AI, an advanced conversational garment care concierge developed for Siddhi Vinayak Laundry (SVL) located in Jamnagar, Gujarat, India. 
Your tone should be professional, polite, and deeply knowledgeable about fabric care chemistry and laundry logistics. 

Key Information you should know:
- Contact: WhatsApp Support, Email: svinayaklaundry@gmail.com
- Pricing: All services (laundry, steam pressing, dry cleaning) are charged per piece. For exact rates, users should contact via WhatsApp.
- Location/Logistics: Based in Jamnagar. 100% FREE doorstep pickup & delivery across all major Jamnagar neighborhoods (Patel Colony, Digjam Circle, Ranjit Nagar, etc.).
- Turnaround: Standard is 24-48 hours. Express 12-Hour Same-Day Processing is available.
- Stain First-Aid: Advise NOT to apply heat/hot water or harsh bath soap. Blot gently with a dry paper towel and bring to SVL.
- Delicate Fabrics: SVL uses neutral pH 7.0 silicone dry cleaning immersion.
- Business Hours: Mon-Fri (8:00 AM - 8:00 PM), Saturday (9:00 AM - 6:00 PM), Sunday Closed.

Format your responses using Markdown for emphasis (e.g., **bold**) and create WhatsApp links when users want to book or ask for pricing like this: [Chat with SVL Experts on WhatsApp](https://wa.me/916351674100).
Keep responses concise, friendly, and helpful. Do not output very long paragraphs.`;

// In-memory rate limiting (Very basic for Edge runtime - resets on cold start/across regions but provides some protection)
const ipRequestCounts = new Map();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;

function checkRateLimit(ip) {
  if (!ip) return true; // Can't track
  const now = Date.now();
  if (!ipRequestCounts.has(ip)) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  
  const info = ipRequestCounts.get(ip);
  if (now > info.resetTime) {
    // Reset window
    info.count = 1;
    info.resetTime = now + RATE_LIMIT_WINDOW_MS;
    return true;
  }
  
  info.count += 1;
  return info.count <= MAX_REQUESTS_PER_WINDOW;
}

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  // Rate limiting
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip');
  if (!checkRateLimit(ip)) {
    return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), { status: 429, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const body = await req.json();
    const { message, history } = body;

    // Input validation
    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Please enter a valid message.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) {
      return new Response(JSON.stringify({ error: 'Please enter a valid message.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    if (trimmedMessage.length > 1500) {
      return new Response(JSON.stringify({ error: 'Message is too long. Please keep it under 1500 characters.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    if (history && !Array.isArray(history)) {
      return new Response(JSON.stringify({ error: 'Invalid history format.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      console.error('Missing GEMINI_API_KEY environment variable');
      return new Response(JSON.stringify({ error: 'The AI service is temporarily misconfigured. Please contact support.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    // Prepare history (already limited to MAX_HISTORY_MESSAGES by the client, but we will ensure valid roles)
    // Client sends properly formatted roles: { role: 'user'|'model', parts: [{ text: '...' }] }
    // We append the new message to it.
    let contents = Array.isArray(history) ? history : [];
    
    // Validate roles in contents to avoid invalid alternating errors.
    let sanitizedContents = [];
    let lastRole = null;
    
    for (const msg of contents) {
        if (msg && msg.role && msg.parts && Array.isArray(msg.parts) && msg.parts[0] && msg.parts[0].text) {
            // Prevent consecutive same roles or starting with model
            if (msg.role !== lastRole) {
                // If it's the first message, it MUST be 'user'
                if (sanitizedContents.length === 0 && msg.role !== 'user') {
                    continue; // Skip
                }
                sanitizedContents.push({ role: msg.role, parts: [{ text: msg.parts[0].text.substring(0, 1500) }] });
                lastRole = msg.role;
            }
        }
    }
    
    // Ensure final message is user
    if (lastRole === 'user') {
        // If history ended with user, we replace it or something? Actually client should pass history WITHOUT the current message.
        // Wait, what if client history ended with user? That shouldn't happen unless a previous response failed.
        // Let's just pop it so we can append the new user message.
        sanitizedContents.pop();
    }
    
    sanitizedContents.push({
      role: 'user',
      parts: [{ text: trimmedMessage }]
    });

    // API Request with retry logic
    const MAX_RETRIES = 2;
    let attempt = 0;
    let response;
    
    while (attempt <= MAX_RETRIES) {
        response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                system_instruction: {
                    parts: [{ text: systemPrompt }]
                },
                contents: sanitizedContents,
                generationConfig: {
                    temperature: 0.4,
                    maxOutputTokens: 800,
                }
            })
        });

        if (response.ok) break;

        const status = response.status;
        if (status === 400 || status === 401 || status === 403) {
            // Do not retry these
            break;
        }

        // It's a 429, 500, 502, 503... retry
        attempt++;
        if (attempt <= MAX_RETRIES) {
            // Exponential backoff: 500ms, then 1000ms
            const delay = attempt === 1 ? 500 : 1000;
            await new Promise(res => setTimeout(res, delay));
        }
    }

    if (!response.ok) {
        const status = response.status;
        if (status === 400) {
            return new Response(JSON.stringify({ error: 'The request could not be processed.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        if (status === 401 || status === 403) {
            console.error('Gemini API authentication failed. Check API Key.');
            return new Response(JSON.stringify({ error: 'The AI assistant is temporarily unavailable. Please try again shortly.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }
        if (status === 429) {
            return new Response(JSON.stringify({ error: 'The AI assistant is temporarily busy. Please try again in a moment.' }), { status: 429, headers: { 'Content-Type': 'application/json' } });
        }
        
        return new Response(JSON.stringify({ error: 'The AI assistant is temporarily unavailable. Please try again shortly.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    const data = await response.json();
    if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts[0].text) {
        return new Response(JSON.stringify({ reply: data.candidates[0].content.parts[0].text }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
    
    // Fallback if structure is weird
    return new Response(JSON.stringify({ error: 'The AI assistant is temporarily unavailable. Please try again shortly.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error('Server error processing chat:', error);
    return new Response(JSON.stringify({ error: 'The AI assistant is temporarily unavailable. Please try again shortly.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
