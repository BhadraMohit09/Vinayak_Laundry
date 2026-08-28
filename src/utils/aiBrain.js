export async function processNaturalAIQuery(userQuery, history = []) {
  const trimmed = userQuery.trim();
  if (!trimmed) return "Please type a question or select one of the quick options!";

  // History limiting
  const MAX_HISTORY_MESSAGES = 6;
  let limitedHistory = [...history];
  
  // We only keep the last N messages to prevent context explosion
  if (limitedHistory.length > MAX_HISTORY_MESSAGES) {
      limitedHistory = limitedHistory.slice(limitedHistory.length - MAX_HISTORY_MESSAGES);
  }

  // Sanitize the history array format for the backend API
  // Filter out any introductory bot messages that don't fit the flow if they are at the very start
  if (limitedHistory.length > 0 && limitedHistory[0].sender !== 'user') {
    limitedHistory = limitedHistory.slice(1);
  }

  const formattedHistory = limitedHistory.map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: trimmed,
        history: formattedHistory
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch from chat API");
    }

    return data.reply;

  } catch (error) {
    console.error("AI processing error:", error);
    // Return the friendly error message thrown or a default one
    return error.message || "I'm temporarily unable to connect to the AI assistant. Please try again in a moment, or contact our SVL team directly on [WhatsApp](https://wa.me/916351674100).";
  }
}
