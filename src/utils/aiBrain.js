// Vinayak Advanced AI Neural Brain (Client-Side Natural Conversational Engine)

const pricingWhatsAppUrl = "https://wa.me/916351674100?text=Hello%20Siddhi%20Vinayak%20Laundry,%20I%20would%20like%20to%20inquire%20about%20your%20piece-wise%20pricing%20and%20rates.";
const generalWhatsAppUrl = "https://wa.me/916351674100?text=Hello%20Siddhi%20Vinayak%20Laundry,%20I%20have%20a%20question%20regarding%20your%20garment%20care%20services.";

const intentDatabase = [
  {
    category: 'contact_details',
    triggers: ['contact', 'details', 'phone', 'number', 'email', 'call', 'reach', 'address', 'gmail', 'mobile', 'connect', 'customer care', 'helpdesk', 'whatsapp number', 'where are you', 'locate', 'location', 'mail'],
    responses: [
      `You can reach our Siddhi Vinayak Laundry team directly through any of these official channels:\n\n• **Phone / WhatsApp**: +91 6351674100\n• **Email**: svinayaklaundry@gmail.com\n• **Address**: Jamnagar, Gujarat, India\n\nFor instant inquiries or scheduling, message us directly:\n\n[Connect on WhatsApp](${generalWhatsAppUrl})`
    ]
  },
  {
    category: 'pricing_rates',
    triggers: ['price', 'pricing', 'cost', 'rate', 'rates', 'how much', 'expensive', 'cheap', 'charge', 'menu', 'tariff', 'package', 'bill', 'estimate', 'shirt', 'suit', 'saree', 'blazer', 'piece', 'amount', 'rupee', 'inr', 'discount'],
    responses: [
      `All our laundry, steam pressing, and dry cleaning services are strictly charged **per piece** (piece-wise rates) ensuring individual inspection and care for every garment.\n\nFor exact piece-wise pricing details for your wardrobe, please connect with our team directly on WhatsApp:\n\n[Inquire Piece-Wise Rates on WhatsApp](${pricingWhatsAppUrl})`
    ]
  },
  {
    category: 'jamnagar_logistics',
    triggers: ['free', 'jamnagar', 'pickup', 'area', 'areas', 'patel colony', 'digjam', 'ranjit nagar', 'summair', 'valsure', 'drop', 'free delivery', 'doorstep', 'home delivery'],
    responses: [
      "We operate out of our high-tech facility in **Jamnagar, Gujarat** and provide **100% FREE doorstep pickup & delivery** across all major Jamnagar neighborhoods including Patel Colony, Digjam Circle, Ranjit Nagar, Defense Colony, and Valsure!"
    ]
  },
  {
    category: 'turnaround_express',
    triggers: ['express', 'urgent', 'how long', 'turnaround', 'days', 'hours', 'delivery time', 'fast', 'same day', 'quick', 'emergency', 'when will i get', 'time taken', 'speed'],
    responses: [
      "Our standard pristine processing turnaround is **24 to 48 hours**. For urgent events or emergency spills, we also offer **Express 12-Hour Same-Day Processing** upon request!"
    ]
  },
  {
    category: 'stain_haldi_oil',
    triggers: ['haldi', 'turmeric', 'curry', 'oil', 'grease', 'ghee', 'pickle', 'achar', 'stain', 'dirty', 'spot', 'ink', 'blood', 'wine', 'coffee', 'tea', 'spill', 'mark', 'removal', 'remove'],
    responses: [
      "**Stain Emergency First-Aid**: First rule—**do NOT apply heat or hot water**, and **never rub harsh bath soap** as it permanently locks Indian spices and tannins into the fabric weave! Blot gently with a clean dry paper towel. Our bio-enzymatic spotting table dissolves tough haldi, oil, ink, tea, and red wine stains safely."
    ]
  },
  {
    category: 'delicate_fabrics',
    triggers: ['delicate', 'silk', 'zari', 'care', 'banarasi', 'pattu', 'lehenga', 'wedding', 'designer', 'embroidered', 'cashmere', 'wool', 'pashmina', 'coat', 'jacket', 'sherwani'],
    responses: [
      "Delicate heirlooms are our specialty! For pure silk sarees, bridal zari lehengas, and woolen suits, we use **neutral pH 7.0 silicone dry cleaning immersion** that cleans deeply without tarnishing metallic zari embroidery or shrinking wool."
    ]
  },
  {
    category: 'hours_timing',
    triggers: ['business', 'store', 'timing', 'timings', 'open', 'close', 'business hours', 'sunday', 'saturday', 'night', 'morning', 'working hours', 'schedule'],
    responses: [
      "Our facility and concierge desk operate **Mon - Fri (8:00 AM - 8:00 PM)** and **Saturday (9:00 AM - 6:00 PM)**. We rest our industrial equipment on Sundays."
    ]
  },
  {
    category: 'household_heavy',
    triggers: ['heavy', 'blanket', 'blankets', 'curtain', 'wash', 'carpet', 'rug', 'drape', 'razai', 'duvet', 'comforter', 'quilt', 'pillow', 'sofa cover', 'shoe', 'sneaker', 'bedsheet'],
    responses: [
      "Yes, we thoroughly clean heavy household textiles! Blankets, razais, curtains, and bedsheets undergo high-capacity industrial sanitization that eliminates dust mites and allergens while restoring plush softness."
    ]
  },
  {
    category: 'identity',
    triggers: ['who are you', 'what is your name', 'are you ai', 'are you a robot', 'are you human', 'who made you', 'bot', 'assistant', 'concierge', 'vinayak'],
    responses: [
      "I am **Vinayak AI**, an advanced conversational garment care concierge developed for Siddhi Vinayak Laundry! I'm equipped with deep textile biochemistry knowledge and instant booking assistance.",
      "Hi! I'm **Vinayak AI Concierge**. Think of me as your personal fabric care expert available 24/7. Whether you need stain first-aid advice or contact details, I'm right here to help!"
    ]
  },
  {
    category: 'greetings',
    triggers: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'good afternoon', 'namaste', 'kem cho', 'greetings', 'sup', 'yo'],
    responses: [
      "Namaste & Welcome to **Siddhi Vinayak Laundry**! How can I make your garment care effortless today? Feel free to ask about our contact details, stain advice, or schedule a free pickup.",
      "Hello there! Great to chat with you. Do you have any favorite wardrobe pieces that need pristine piece-wise dry cleaning or washing today?"
    ]
  },
  {
    category: 'how_are_you',
    triggers: ['how are you', 'how is it going', 'whatsup', 'whats up'],
    responses: [
      "I'm operating at 100% molecular efficiency and ready to tackle tough stains! How are you doing today?",
      "Doing fantastic! Just finished reviewing our latest eco-friendly silicone dry cleaning protocols. How can I assist with your garments today?"
    ]
  },
  {
    category: 'competitor_advantage',
    triggers: ['why svl', 'why choose', 'better than', 'local dhobi', 'home wash', 'washing machine', 'difference', 'advantage'],
    responses: [
      "Unlike traditional home washing or local dhobis that use harsh high-pH bath detergents and rough scrubbing, SVL utilizes **pH-neutral bio-solvents** and tension steam pressing. This stops fiber fraying, prevents dye bleeding, and extends garment lifespan by up to **40%**!"
    ]
  },
  {
    category: 'humor_thanks',
    triggers: ['joke', 'funny', 'laugh', 'thank', 'thanks', 'awesome', 'great', 'wow', 'cool', 'love you', 'bye', 'goodnight', 'cheers', 'ok', 'okay', 'done'],
    responses: [
      "Why did the shirt go to Siddhi Vinayak Laundry? Because it wanted to make a **flawless first impression**! You're very welcome—have a wonderful day!",
      "It is an absolute pleasure assisting you! Whenever your wardrobe pieces need renewal, you know where to find us. Have a fantastic day ahead!"
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
        currentScore += 15 + triggerTokens.length * 3;
      } else {
        const overlap = triggerTokens.filter(t => tokens.includes(t));
        if (overlap.length > 0) {
          currentScore += overlap.length * 4;
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
  const thinkingTime = Math.floor(Math.random() * 400) + 450;
  await new Promise(resolve => setTimeout(resolve, thinkingTime));

  const trimmed = userQuery.trim();
  if (!trimmed) return "Please type a question or select one of the quick options!";

  // Check semantic scoring matching
  const matchedResponse = scoreIntentMatch(trimmed);
  if (matchedResponse) return matchedResponse;

  // Conversational fallback directing to general WhatsApp link
  return `That is a wonderful question! While my neural brain is specialized deeply in **fabric care chemistry** and **Jamnagar pickup logistics**, I want to ensure you get exact precision for "${trimmed}".\n\nOur human garment care masters are online right now on WhatsApp to assist you directly:\n\n[Chat with SVL Experts on WhatsApp](${generalWhatsAppUrl})`;
}
