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
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contents })
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
