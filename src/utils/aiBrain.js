// Local intelligent knowledge-base fallback if edge API is offline (e.g. running Vite locally)
function getOfflineFallbackAnswer(query) {
  const q = query.toLowerCase();

  if (q.includes('rate') || q.includes('price') || q.includes('cost') || q.includes('charge') || q.includes('how much')) {
    return "At **Siddhi Vinayak Laundry**, garment care is charged on a transparent **piece-by-piece inspection model** depending on fiber composition, delicate hand embroidery, and specific cleaning protocols.\n\nTo get an immediate, personalized rate estimate for your garments, please [connect directly with our team on WhatsApp](https://wa.me/916351674100).";
  }

  if (q.includes('pickup') || q.includes('delivery') || q.includes('doorstep') || q.includes('timing') || q.includes('hour') || q.includes('area')) {
    return "We provide **100% FREE doorstep pickup & delivery** across all major Jamnagar localities (Patel Colony, Digjam Circle, Ranjit Nagar, etc.).\n\n- **Standard Turnaround**: 24–48 hours\n- **Express Same-Day**: 12–24 hours available\n- **Hours**: Mon–Fri (8 AM – 8 PM), Sat (9 AM – 6 PM)\n\n[Schedule your pickup on WhatsApp](https://wa.me/916351674100)!";
  }

  if (q.includes('stain') || q.includes('ink') || q.includes('wine') || q.includes('blood') || q.includes('coffee') || q.includes('oil') || q.includes('grease')) {
    return "**Stain First-Aid Protocol**:\n\n1. **Do not rub** or scrub aggressively — this forces pigments deeper into fibers.\n2. **Avoid hot water or domestic iron heat**, which sets protein/tannin stains permanently.\n3. **Blot gently** with a dry paper towel and hand it over to SVL for bio-enzyme treatment.\n\n[Ask SVL Stain Specialist on WhatsApp](https://wa.me/916351674100).";
  }

  if (q.includes('eco') || q.includes('chemical') || q.includes('solvent') || q.includes('delicate') || q.includes('silk') || q.includes('wool') || q.includes('saree')) {
    return "**Eco-Solvent Science**:\n\nUnlike traditional cleaners that use harsh perchloroethylene (perc), SVL uses **neutral pH 7.0 biodegradable solvents**. This protects fine embroidery, Zari work, silk sheen, and delicate wool fibers without chemical odor.";
  }

  return "Hello! I'm your **SVL Virtual Concierge** in Jamnagar. I can assist you with:\n\n- **Personalized rate quotes via WhatsApp**\n- **Free doorstep pickup & delivery logistics**\n- **Stain emergency first-aid advice**\n- **Eco-solvent fabric preservation**\n\nHow can I help you today? Or [connect directly on WhatsApp](https://wa.me/916351674100).";
}

export async function processNaturalAIQuery(userQuery, history = []) {
  const trimmed = userQuery.trim();
  if (!trimmed) return "Please type a question or select one of the quick options!";

  // History limiting
  const MAX_HISTORY_MESSAGES = 6;
  let limitedHistory = [...history];
  
  if (limitedHistory.length > MAX_HISTORY_MESSAGES) {
      limitedHistory = limitedHistory.slice(limitedHistory.length - MAX_HISTORY_MESSAGES);
  }

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

    if (response.ok) {
      const data = await response.json();
      if (data && data.reply) {
        return data.reply;
      }
    }

    // If backend returns an error or non-200 (e.g. running Vite local server without edge function)
    return getOfflineFallbackAnswer(trimmed);

  } catch (error) {
    console.warn("AI backend offline, using smart local concierge:", error);
    return getOfflineFallbackAnswer(trimmed);
  }
}
