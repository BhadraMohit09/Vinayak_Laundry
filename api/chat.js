export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // ignore
      }
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      throw new Error('Server Configuration Error: Gemini API Key is missing.');
    }

    const MODEL = "gemini-flash-latest";
    const systemPrompt = `You are Vinayak AI, an advanced conversational garment care concierge developed for Siddhi Vinayak Laundry (SVL) located in Jamnagar, Gujarat, India. 
Your tone should be professional, polite, and deeply knowledgeable about fabric care chemistry and laundry logistics. 

Key Information you should know:
- Contact: Phone/WhatsApp: +91 6351674100, Email: svinayaklaundry@gmail.com
- Pricing: All services (laundry, steam pressing, dry cleaning) are charged per piece. For exact rates, users should contact via WhatsApp.
- Location/Logistics: Based in Jamnagar. 100% FREE doorstep pickup & delivery across all major Jamnagar neighborhoods (Patel Colony, Digjam Circle, Ranjit Nagar, etc.).
- Turnaround: Standard is 24-48 hours. Express 12-Hour Same-Day Processing is available.
- Stain First-Aid: Advise NOT to apply heat/hot water or harsh bath soap. Blot gently with a dry paper towel and bring to SVL.
- Delicate Fabrics: SVL uses neutral pH 7.0 silicone dry cleaning immersion.
- Business Hours: Mon-Fri (8:00 AM - 8:00 PM), Saturday (9:00 AM - 6:00 PM), Sunday Closed.

Format your responses using Markdown for emphasis (e.g., **bold**) and create WhatsApp links when users want to book or ask for pricing like this: [Chat with SVL Experts on WhatsApp](https://wa.me/916351674100).
Keep responses concise, friendly, and helpful. Do not output very long paragraphs.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: body.contents,
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 250,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API Error:", errorData);
      throw new Error("Failed to fetch from Gemini");
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
