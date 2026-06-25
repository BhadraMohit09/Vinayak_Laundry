// Vinayak Advanced AI Neural Brain (Client-Side Natural Conversational Engine)

const priceList = {
  shirt: 60,
  tshirt: 50,
  pant: 70,
  trouser: 70,
  jeans: 80,
  suit: 350,
  blazer: 250,
  saree: 200,
  lehenga: 500,
  bedsheet: 120,
  blanket: 300,
  razai: 350,
  curtain: 150,
  kg: 80 // Wash & fold per kg
};

const intentDatabase = [
  {
    category: 'identity',
    triggers: ['who are you', 'what is your name', 'are you ai', 'are you a robot', 'are you human', 'who made you', 'bot'],
    responses: [
      "I am **Vinayak AI**, an advanced conversational garment concierge developed specifically for Siddhi Vinayak Laundry. I'm equipped with deep textile biochemistry knowledge and real-time scheduling capabilities!",
      "Hi! I'm **Vinayak AI Concierge**. Think of me as your personal fabric care expert available 24/7. Whether you need stain advice, bill estimation, or instant Jamnagar pickup, I'm here to help!"
    ]
  },
  {
    category: 'greetings',
    triggers: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'good afternoon', 'namaste', 'kem cho'],
    responses: [
      "Namaste & Welcome to **Siddhi Vinayak Laundry**! How can I make your laundry effortless today? Feel free to ask for a price estimate or stain advice.",
      "Hello there! Great to chat with you. Do you have any garments that need pristine dry cleaning or everyday wash & fold today?"
    ]
  },
  {
    category: 'how_are_you',
    triggers: ['how are you', 'how is it going', 'whatsup', 'whats up'],
    responses: [
      "I'm operating at 100% molecular efficiency and ready to tackle tough stains! How are you doing today?",
      "Doing fantastic! Just finished analyzing our latest eco-friendly silicone solvent protocols. How can I assist with your wardrobe today?"
    ]
  },
  {
    category: 'competitor_advantage',
    triggers: ['why svl', 'why choose', 'better than', 'local dhobi', 'home wash', 'washing machine', 'difference'],
    responses: [
      "Unlike traditional home washing or local dhobis that use harsh high-pH detergents and rough scrubbing, SVL utilizes **pH-neutral bio-solvents** and computer-controlled tension pressing. This prevents fiber fraying, stops dye bleeding, and extends garment lifespan by up to **40%**!"
    ]
  },
  {
    category: 'turnaround_express',
    triggers: ['how long', 'turnaround', 'days', 'hours', 'delivery time', 'fast', 'same day', 'urgent', 'quick', 'emergency'],
    responses: [
      "Our standard turnaround is **24 to 48 hours**. However, if you have an urgent event or emergency stain, we offer **Express 12-Hour Same-Day Processing**! Just mention 'Express' when booking your pickup."
    ]
  },
  {
    category: 'jamnagar_logistics',
    triggers: ['jamnagar', 'patel colony', 'digjam', 'ranjit nagar', 'summair', 'valsure', 'area', 'where', 'location', 'pickup', 'drop', 'free delivery'],
    responses: [
      "We operate out of our high-tech facility in **Jamnagar, Gujarat** and offer **100% FREE doorstep pickup & delivery** across all major Jamnagar areas including Patel Colony, Ranjit Nagar, Digjam Circle, and Defense Colony!"
    ]
  },
  {
    category: 'stain_haldi_oil',
    triggers: ['haldi', 'turmeric', 'curry', 'oil', 'grease', 'ghee', 'pickle', 'achar', 'stain', 'dirty', 'spot', 'ink', 'blood', 'wine', 'coffee'],
    responses: [
      "**Stain Emergency Protocol**: First rule—*do NOT apply heat or hot water*, and *never rub harsh bath soap* as it locks pigments into the weave! Blot gently with a dry paper towel. Our bio-enzymatic targeted spotting table uses specialized hydrocarbon lipids to dissolve tough Indian curry, haldi, oil, and ink stains safely."
    ]
  },
  {
    category: 'delicate_fabrics',
    triggers: ['silk', 'zari', 'banarasi', 'pattu', 'saree', 'lehenga', 'wedding', 'designer', 'embroidered', 'cashmere', 'wool', 'blazer', 'suit', 'pashmina'],
    responses: [
      "Delicate heirlooms are our specialty! For pure silk sarees, zari work, and woolen blazers, we use **neutral pH 7.0 silicone dry cleaning immersion**. It cleans deep into the keratin and silk protein fibers without tarnishing metallic zari or shrinking wool."
    ]
  },
  {
    category: 'household_heavy',
    triggers: ['carpet', 'rug', 'curtain', 'drape', 'blanket', 'razai', 'duvet', 'comforter', 'quilt', 'pillow', 'sofa cover', 'shoe', 'sneaker'],
    responses: [
      "Yes, we thoroughly clean heavy household items! Blankets, razais, and curtains undergo high-capacity industrial sanitization that eliminates dust mites, allergens, and pet dander while restoring plush softness."
    ]
  },
  {
    category: 'pricing_discounts',
    triggers: ['discount', 'offer', 'coupon', 'cheap', 'rate', 'menu', 'price', 'cost', 'charge', 'package'],
    responses: [
      "We pride ourselves on luxury quality at everyday Jamnagar prices! Regular Wash & Fold is very economical per kg, while specialized dry cleaning is priced per item. Plus, first-time online customers get priority scheduling!"
    ]
  },
  {
    category: 'hours_timing',
    triggers: ['open', 'close', 'timing', 'business hours', 'sunday', 'saturday', 'night', 'morning'],
    responses: [
      "Our concierge desk and facility operate **Mon - Fri (8:00 AM - 8:00 PM)** and **Saturday (9:00 AM - 6:00 PM)**. We rest our industrial equipment on Sundays."
    ]
  },
  {
    category: 'humor_thanks',
    triggers: ['joke', 'funny', 'laugh', 'thank', 'awesome', 'great', 'wow', 'cool', 'love you', 'bye', 'goodnight'],
    responses: [
      "Why did the shirt go to Siddhi Vinayak Laundry? Because it wanted to make a **flawless first impression**! 😄 You're very welcome—have a wonderful day!",
      "It is an absolute pleasure assisting you! Whenever your wardrobe needs renewal, you know where to find me. Have a fantastic day ahead!"
    ]
  }
];

// Helper to calculate estimated price from text like "3 shirts and 2 pant" or "5 kg laundry"
function attemptPriceCalculation(query) {
  const lower = query.toLowerCase();
  let totalEstimated = 0;
  let itemsFound = [];

  // Match pattern: number followed by garment name
  const itemRegex = /(\d+)\s*(shirt|tshirt|pant|trouser|jeans|suit|blazer|saree|lehenga|bedsheet|blanket|razai|curtain|kg|kilo)/gi;
  let match;

  while ((match = itemRegex.exec(lower)) !== null) {
    const count = parseInt(match[1], 10);
    let type = match[2].toLowerCase();
    if (type === 'kilo') type = 'kg';

    if (priceList[type]) {
      const subtotal = count * priceList[type];
      totalEstimated += subtotal;
      itemsFound.push(`${count}x ${type.toUpperCase()} (₹${subtotal})`);
    }
  }

  if (itemsFound.length > 0) {
    const breakdown = itemsFound.join(', ');
    const whatsappText = `Hello SVL! I calculated an estimate with Vinayak AI:\nItems: ${breakdown}\nEstimated Total: ~₹${totalEstimated}\n\nPlease schedule my free Jamnagar pickup!`;
    const waLink = `https://wa.me/916351674100?text=${encodeURIComponent(whatsappText)}`;

    return `💡 **Instant AI Price Estimator**:\nI detected specific garments in your message! Based on our Jamnagar tariff:\n\n• **Breakdown**: ${breakdown}\n• **Approx. Total**: **₹${totalEstimated}** *(includes free pickup & steam press)*\n\nWould you like to dispatch this exact order to our facility?\n\n[🟢 Confirm Order via WhatsApp (${totalEstimated} INR)](${waLink})`;
  }

  return null;
}

// Tokenized semantic overlap scorer
function scoreIntentMatch(userQuery) {
  const cleanQuery = userQuery.toLowerCase().replace(/[^\w\s]/gi, '');
  const tokens = cleanQuery.split(/\s+/).filter(Boolean);

  let bestMatch = null;
  let highestScore = 0;

  for (const intent of intentDatabase) {
    let currentScore = 0;
    for (const trigger of intent.triggers) {
      const triggerTokens = trigger.split(/\s+/);
      // Check exact substring match
      if (cleanQuery.includes(trigger)) {
        currentScore += 10 + triggerTokens.length * 3;
      } else {
        // Token match overlap
        const overlap = triggerTokens.filter(t => tokens.includes(t));
        if (overlap.length > 0) {
          currentScore += overlap.length * 2;
        }
      }
    }

    if (currentScore > highestScore) {
      highestScore = currentScore;
      bestMatch = intent;
    }
  }

  // Minimum threshold score to trigger a matched intent
  if (highestScore >= 3 && bestMatch) {
    const respList = bestMatch.responses;
    return respList[Math.floor(Math.random() * respList.length)];
  }

  return null;
}

export async function processNaturalAIQuery(userQuery, _history = []) {
  // Simulate network neural latency for natural realism
  const thinkingTime = Math.floor(Math.random() * 500) + 550; // 550ms - 1050ms
  await new Promise(resolve => setTimeout(resolve, thinkingTime));

  const trimmed = userQuery.trim();
  if (!trimmed) return "Please type a question or select one of the quick options!";

  // 1. Check if user is asking for price calculation with numbers
  const calculatedBill = attemptPriceCalculation(trimmed);
  if (calculatedBill) return calculatedBill;

  // 2. Semantic scoring matching
  const matchedResponse = scoreIntentMatch(trimmed);
  if (matchedResponse) return matchedResponse;

  // 3. Intelligent conversational fallback
  return `That is a great question! While my neural brain is specialized deeply in **fabric care chemistry** and **Jamnagar logistics**, I want to ensure you get the exact precise detail for "${trimmed}".\n\nOur human garment care masters are online right now on WhatsApp at **+91 6351674100** to assist you instantly. Would you like to connect with them or schedule a free home pickup?`;
}
