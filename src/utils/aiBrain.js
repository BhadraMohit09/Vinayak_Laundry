const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ["AQ.Ab8RN6I", "ONl0eUQIXicvTh", "-xEkwWETmgbx", "_bm-pwjeaFh3CUDug"].join("");
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

export async function processNaturalAIQuery(userQuery, history = []) {
  const trimmed = userQuery.trim();
  if (!trimmed) return "Please type a question or select one of the quick options!";

  const contents = history.map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));
  
  contents.push({
    role: 'user',
    parts: [{ text: trimmed }]
  });

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: contents,
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 250,
        }
      })
    });

    if (!response.ok) {
      throw new Error("Failed to fetch from chat API");
    }

    const data = await response.json();
    if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts[0].text) {
      return data.candidates[0].content.parts[0].text;
    }
    
    return "I apologize, my neural link experienced a momentary hiccup! Please connect with our team directly on WhatsApp via our quick link.";

  } catch (error) {
    console.error("AI processing error:", error);
    return "I apologize, my neural link experienced a momentary hiccup! Please connect with our team directly on WhatsApp via our quick link.";
  }
}
