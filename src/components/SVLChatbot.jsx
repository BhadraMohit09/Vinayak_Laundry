import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Calendar, Droplets, HelpCircle, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

const faqKnowledge = [
  { keywords: ['time', 'turnaround', 'how long', 'days', 'delivery', 'fast', 'same day'], answer: "Our standard turnaround time is **1-2 days**. We also offer express same-day processing for urgent personal orders upon request!" },
  { keywords: ['price', 'cost', 'rate', 'how much', 'expensive', 'cheap', 'charge'], answer: "We offer highly competitive rates in Jamnagar! Everyday Wash & Fold starts at affordable per-kg rates, while delicate Dry Cleaning is priced per item. Select **Book Pickup** to get an exact tailored quote." },
  { keywords: ['location', 'where', 'address', 'jamnagar', 'city', 'area'], answer: "We are located in **Jamnagar, Gujarat, India**. We offer **FREE pickup and delivery** across all major Jamnagar neighborhoods!" },
  { keywords: ['hour', 'open', 'close', 'timing', 'sunday', 'saturday'], answer: "We are open **Monday to Friday (8 AM - 8 PM)** and **Saturday (9 AM - 6 PM)**. We are closed on Sundays to rest and service our industrial machines." },
  { keywords: ['silk', 'wool', 'saree', 'blazer', 'suit', 'cashmere', 'delicate'], answer: "Yes! We specialize in delicate garment care. We use advanced bio-solvents that clean deep into silk, wool, and zari without fading colors or shrinking fibers." }
];

const SVLChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'book', 'stain'
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I'm your **SVL AI Concierge**. How can I assist you with your garment care today?" }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  // Booking Wizard State
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({ service: '', quantity: '', timing: '' });

  // Stain Guide State
  const [selectedStain, setSelectedStain] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, activeTab, bookingStep]);

  const handleSend = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const newMsgs = [...messages, { sender: 'user', text: query }];
    setMessages(newMsgs);
    if (!textToSend) setInputText('');

    // Bot Response Logic
    setTimeout(() => {
      const lower = query.toLowerCase();
      let foundReply = null;

      for (const item of faqKnowledge) {
        if (item.keywords.some(k => lower.includes(k))) {
          foundReply = item.answer;
          break;
        }
      }

      if (!foundReply) {
        if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
          foundReply = "Hi there! Feel free to ask me about our turnaround times, pricing, Jamnagar free pickup, or stain advice!";
        } else {
          foundReply = "I can certainly help with that! For specific requests or instant confirmation, you can chat directly with our human experts on WhatsApp at **+91 6351674100**.";
        }
      }

      setMessages(prev => [...prev, { sender: 'bot', text: foundReply }]);
    }, 400);
  };

  const handleBookingSelect = (field, val) => {
    const updated = { ...bookingData, [field]: val };
    setBookingData(updated);
    setBookingStep(prev => prev + 1);
  };

  const getWhatsAppBookingUrl = () => {
    const text = `Hello Siddhi Vinayak Laundry! I used your AI Concierge to plan an order:\n- Care Protocol: ${bookingData.service}\n- Load Size: ${bookingData.quantity}\n- Preferred Pickup: ${bookingData.timing}\n\nPlease confirm my booking!`;
    return `https://wa.me/916351674100?text=${encodeURIComponent(text)}`;
  };

  const stainTips = {
    coffee: { title: "Tea / Coffee Spills", advice: "Instantly blot (do NOT rub) with lukewarm water. Avoid using bath soap as it can set tannin stains permanently. Let our bio-enzymes dissolve it safely." },
    oil: { title: "Oil / Curry / Grease", advice: "Sprinkle talcum powder or baking soda immediately to absorb surface oils. Do not apply hot water. Requires our specialized hydrocarbon lipid-remover." },
    ink: { title: "Ink / Ballpoint Pen", advice: "Never rub ink! Place a paper towel underneath and dab gently with rubbing alcohol if available, or keep it dry until professional dry cleaning." },
    wine: { title: "Red Wine / Fruit Juice", advice: "Blot immediately with a clean cloth. Club soda helps lift pigments temporarily. Bring to SVL within 24 hours for complete oxidation treatment." }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '6.8rem',
          right: '2rem',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          color: 'white',
          border: 'none',
          boxShadow: '0 8px 25px rgba(124, 58, 237, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
        aria-label="Open SVL AI Concierge"
      >
        {isOpen ? <X size={26} /> : <Sparkles size={26} />}
      </button>

      {/* Chatbot Window Modal */}
      {isOpen && (
        <div className="glass-panel animate-fade-in" style={{
          position: 'fixed',
          bottom: '10.5rem',
          right: '2rem',
          width: 'min(380px, calc(100vw - 2.5rem))',
          height: '520px',
          maxHeight: 'calc(100vh - 12rem)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(124, 58, 237, 0.2)',
          borderRadius: '24px'
        }}>
          {/* Header */}
          <div style={{
            padding: '1.2rem 1.5rem',
            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'rgba(124, 58, 237, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#a855f7'
              }}>
                <Bot size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  SVL Concierge <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></span>
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Vinayak Advanced AI</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-color)',
            background: '#f8fafc',
            padding: '0.4rem'
          }}>
            {[
              { id: 'chat', label: 'Q&A Chat', icon: HelpCircle },
              { id: 'book', label: 'Smart Booking', icon: Calendar },
              { id: 'stain', label: 'Stain Aid', icon: Droplets }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: '0.6rem 0.4rem',
                  border: 'none',
                  background: activeTab === tab.id ? 'white' : 'transparent',
                  color: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontWeight: activeTab === tab.id ? '600' : '500',
                  fontSize: '0.8rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  boxShadow: activeTab === tab.id ? '0 2px 6px rgba(0,0,0,0.05)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <tab.icon size={15} /> {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* TAB 1: QUICK CHAT */}
            {activeTab === 'chat' && (
              <>
                {messages.map((msg, i) => (
                  <div key={i} style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    padding: '0.8rem 1rem',
                    borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: msg.sender === 'user' ? 'var(--accent-primary)' : '#f1f5f9',
                    color: msg.sender === 'user' ? 'white' : 'var(--text-primary)',
                    fontSize: '0.9rem',
                    lineHeight: '1.4',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                  }}>
                    {/* Render basic bold formatting */}
                    {msg.text.split('**').map((part, idx) => idx % 2 === 1 ? <strong key={idx}>{part}</strong> : part)}
                  </div>
                ))}
                
                {/* Quick Suggestion Pills */}
                {messages.length < 4 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                    {["Turnaround time?", "Pricing details", "Free Pickup area?", "Silk garment care"].map((pill, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(pill)}
                        style={{
                          padding: '0.4rem 0.8rem',
                          background: 'rgba(124, 58, 237, 0.08)',
                          color: 'var(--accent-primary)',
                          border: '1px solid rgba(124, 58, 237, 0.2)',
                          borderRadius: '50px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        {pill}
                      </button>
                    ))}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}

            {/* TAB 2: SMART BOOKING WIZARD */}
            {activeTab === 'book' && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem', color: 'var(--text-primary)' }}>Smart Order Assistant</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Answer 3 quick questions to plan your pickup</p>
                  </div>

                  {bookingStep === 1 && (
                    <div>
                      <span style={{ fontWeight: '600', fontSize: '0.9rem', display: 'block', marginBottom: '0.8rem' }}>1. What service do you require?</span>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                        {['Wash & Fold', 'Advanced Dry Clean', 'Steam Ironing', 'Bulk Commercial'].map(srv => (
                          <button key={srv} onClick={() => handleBookingSelect('service', srv)} className="btn-outline" style={{ padding: '0.8rem', fontSize: '0.85rem', textAlign: 'center', justifyContent: 'center' }}>{srv}</button>
                        ))}
                      </div>
                    </div>
                  )}

                  {bookingStep === 2 && (
                    <div>
                      <span style={{ fontWeight: '600', fontSize: '0.9rem', display: 'block', marginBottom: '0.8rem' }}>2. Estimated load size?</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {['1 - 5 Garments', 'Medium Load (6-15 items)', 'Large Laundry Bag (5kg+)'].map(q => (
                          <button key={q} onClick={() => handleBookingSelect('quantity', q)} className="btn-outline" style={{ padding: '0.8rem', fontSize: '0.85rem', justifyContent: 'center' }}>{q}</button>
                        ))}
                      </div>
                    </div>
                  )}

                  {bookingStep === 3 && (
                    <div>
                      <span style={{ fontWeight: '600', fontSize: '0.9rem', display: 'block', marginBottom: '0.8rem' }}>3. Preferred pickup window?</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {['Today Afternoon/Evening', 'Tomorrow Morning (8 AM - 12 PM)', 'Flexible Schedule'].map(t => (
                          <button key={t} onClick={() => handleBookingSelect('timing', t)} className="btn-outline" style={{ padding: '0.8rem', fontSize: '0.85rem', justifyContent: 'center' }}>{t}</button>
                        ))}
                      </div>
                    </div>
                  )}

                  {bookingStep > 3 && (
                    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                      <CheckCircle2 size={48} style={{ color: '#22c55e', margin: '0 auto 1rem' }} />
                      <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Ready to Schedule!</h4>
                      <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '12px', textAlign: 'left', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                        <div><strong>Service:</strong> {bookingData.service}</div>
                        <div><strong>Load:</strong> {bookingData.quantity}</div>
                        <div><strong>Window:</strong> {bookingData.timing}</div>
                        <div style={{ marginTop: '0.5rem', color: 'var(--accent-primary)', fontWeight: '600' }}>⚡ Est. Turnaround: 24-36 Hours</div>
                      </div>
                      <a href={getWhatsAppBookingUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '0.95rem' }}>
                        Confirm via WhatsApp <ArrowRight size={18} style={{ marginLeft: '6px' }} />
                      </a>
                    </div>
                  )}
                </div>

                {bookingStep > 1 && bookingStep <= 3 && (
                  <button onClick={() => setBookingStep(bookingStep - 1)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem', marginTop: '1rem' }}>
                    ← Back to previous step
                  </button>
                )}
                {bookingStep > 3 && (
                  <button onClick={() => { setBookingStep(1); setBookingData({ service: '', quantity: '', timing: '' }); }} style={{ background: 'transparent', border: 'none', color: 'var(--accent-secondary)', cursor: 'pointer', fontSize: '0.85rem', marginTop: '1rem' }}>
                    Start over
                  </button>
                )}
              </div>
            )}

            {/* TAB 3: STAIN EMERGENCY AID */}
            {activeTab === 'stain' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', padding: '0.8rem', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '12px', color: '#dc2626' }}>
                  <ShieldAlert size={24} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: '600', lineHeight: '1.3' }}>Stain Emergency? Take first aid immediately, then send to SVL.</span>
                </div>

                <span style={{ fontWeight: '600', fontSize: '0.85rem', display: 'block', marginBottom: '0.8rem' }}>Select Stain Type:</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1.2rem' }}>
                  {Object.keys(stainTips).map(k => (
                    <button
                      key={k}
                      onClick={() => setSelectedStain(k)}
                      style={{
                        padding: '0.7rem',
                        borderRadius: '12px',
                        border: selectedStain === k ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                        background: selectedStain === k ? 'rgba(124, 58, 237, 0.05)' : 'white',
                        fontWeight: selectedStain === k ? '600' : '500',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        color: selectedStain === k ? 'var(--accent-primary)' : 'var(--text-primary)'
                      }}
                    >
                      {stainTips[k].title}
                    </button>
                  ))}
                </div>

                {selectedStain && (
                  <div className="animate-fade-in" style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                    <h5 style={{ fontSize: '0.95rem', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>{stainTips[selectedStain].title} First Aid</h5>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1rem' }}>
                      {stainTips[selectedStain].advice}
                    </p>
                    <a href="https://wa.me/916351674100?text=Hello%20SVL,%20I%20have%20an%20urgent%20stain%20removal%20request!" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: '100%', padding: '0.7rem', fontSize: '0.85rem', justifyContent: 'center' }}>
                      Book Stain Removal
                    </a>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Chat Input Bar (Only on Q&A Chat tab) */}
          {activeTab === 'chat' && (
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{
              display: 'flex',
              padding: '0.8rem',
              borderTop: '1px solid var(--border-color)',
              background: 'white',
              gap: '0.5rem'
            }}>
              <input
                type="text"
                placeholder="Ask about time, price, Jamnagar..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.7rem 1rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '50px',
                  fontSize: '0.85rem',
                  outline: 'none',
                  background: '#f8fafc'
                }}
              />
              <button
                type="submit"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--accent-primary)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Send size={18} />
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default SVLChatbot;
