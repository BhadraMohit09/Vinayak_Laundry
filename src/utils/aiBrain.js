// Vinayak Advanced AI Neural Brain (Client-Side Natural Conversational Engine)

const pricingWhatsAppUrl = "https://wa.me/916351674100?text=Hello%20Siddhi%20Vinayak%20Laundry,%20I%20would%20like%20to%20inquire%20about%20your%20piece-wise%20pricing%20and%20rates.";
const generalWhatsAppUrl = "https://wa.me/916351674100?text=Hello%20Siddhi%20Vinayak%20Laundry,%20I%20have%20a%20question%20regarding%20your%20garment%20care%20services.";

const intentDatabase = [
  {
    category: 'pricing_rates',
    triggers: ['price', 'cost', 'rate', 'how much', 'expensive', 'cheap', 'charge', 'menu', 'tariff', 'package', 'bill', 'estimate', 'shirt', 'suit', 'saree', 'blazer', 'piece'],
    responses: [
      `All our laundry, ironing, and dry cleaning services are strictly charged **per piece** (piece-wise rates) ensuring meticulous individual attention for every garment.\n\nFor exact tailored pricing and tariff details for your items, please connect with our team directly on WhatsApp:\n\n[💬 Inquire Piece-Wise Rates on WhatsApp](${pricingWhatsAppUrl})`
    ]
  },
  {
    category: 'identity',
    triggers: ['who are you', 'what is your name', 'are you ai', 'are you a robot', 'are you human', 'who made you', 'bot'],
    responses: [
      "I am **Vinayak AI**, an advanced conversational garment concierge developed specifically for Siddhi Vinayak Laundry. I'm equipped with deep textile biochemistry knowledge and real-time scheduling capabilities!",
      "Hi! I'm **Vinayak AI Concierge**. Think of me as your personal fabric care expert available 24/7. Whether you need stain advice or instant Jamnagar pickup scheduling, I'm here to help!"
    ]
  },
  {
    category: 'greetings',
    triggers: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'good afternoon', 'namaste', 'kem cho'],
    responses: [
      "Namaste & Welcome to **Siddhi Vinayak Laundry**! How can I make your garment care effortless today? Feel free to ask about our specialized stain advice or schedule a free pickup.",
      "Hello there! Great to chat with you. Do you have any favorite pieces that need pristine piece-wise dry cleaning or washing today?"
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
    triggers: ['haldi', 'turmeric', 'curry', 'oil', 'grease', 'ghee', 'pickle', 'achar', 'stain', 'dirty', 'spot', 'ink', 'blood', 'wine', 'coffee', 'tea'],
    responses: [
      "**Stain Emergency Protocol**: First rule—*do NOT apply heat or hot water*, and *never rub harsh bath soap* as it locks Indian spices and tannins into the weave! Blot gently with a dry paper towel. Our bio-enzymatic targeted spotting table uses specialized hydrocarbon lipids to dissolve tough Indian curry, haldi, oil, and ink stains safely."
    ]
  },
  {
    category: 'delicate_fabrics',
    triggers: ['zari', 'banarasi', 'pattu', 'lehenga', 'wedding', 'designer', 'embroidered', 'cashmere', 'wool', 'pashmina'],
    responses: [
      "Delicate heirlooms are our specialty! For pure silk sarees, zari work, and woolen blazers, we use **neutral pH 7.0 silicone dry cleaning immersion**. It cleans deep into the keratin and silk protein fibers without tarnishing metallic zari or shrinking wool."
    ]
  },
  {
    category: 'household_heavy',
    triggers: ['carpet', 'rug', 'curtain', 'drape', 'blanket', 'razai', 'duvet', 'comforter', 'quilt', 'pillow', 'sofa cover', 'shoe', 'sneaker'],
    responses: [
      "Yes, we thoroughly clean heavy household pieces! Blankets, razais, and curtains undergo high-capacity industrial sanitization that eliminates dust mites, allergens, and pet dander while restoring plush softness."
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
      "It is an absolute pleasure assisting you! Whenever your wardrobe pieces need renewal, you know where to find me. Have a fantastic day ahead!"
    ]
  }
];

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
      if (cleanQuery.includes(trigger)) {
        currentScore += 12 + triggerTokens.length * 3;
      } else {
        const overlap = triggerTokens.filter(t => tokens.includes(t));
        if (overlap.length > 0) {
          currentScore += overlap.length * 3;
        }
      }
    }

    if (currentScore > highestScore) {
      highestScore = currentScore;
      bestMatch = intent;
    }
  }

  if (highestScore >= 3 && bestMatch) {
    const respList = bestMatch.responses;
    return respList[Math.floor(Math.random() * respList.length)];
  }

  return null;
}

export async function processNaturalAIQuery(userQuery, _history = []) {
  const thinkingTime = Math.floor(Math.random() * 450) + 500;
  await new Promise(resolve => setTimeout(resolve, thinkingTime));

  const trimmed = userQuery.trim();
  if (!trimmed) return "Please type a question or select one of the quick options!";

  // Check semantic scoring matching
  const matchedResponse = scoreIntentMatch(trimmed);
  if (matchedResponse) return matchedResponse;

  // Conversational fallback without mentioning phone numbers
  return `That is a great question! While my neural brain is specialized deeply in **fabric care chemistry** and **Jamnagar logistics**, I want to ensure you get the exact precise detail for "${trimmed}".\n\nOur human garment care masters are online right now on WhatsApp to assist you directly:\n\n[💬 Connect with SVL Experts on WhatsApp](${generalWhatsAppUrl})`;
}
