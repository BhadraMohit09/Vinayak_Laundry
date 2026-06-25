import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, MessageCircleMore, Calendar, Droplets, HelpCircle, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { processNaturalAIQuery } from '../utils/aiBrain';

const SVLChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'book', 'stain'
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I'm your **SVL AI Concierge**. Feel free to ask me anything about our specialized piece-wise garment care, Jamnagar pickup logistics, or stain removal advice!" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
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
  }, [messages, isOpen, activeTab, bookingStep, isThinking]);

  // Lock body scroll on mobile when full modal drawer is open
  useEffect(() => {
    if (isOpen && window.innerWidth <= 640) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const handleSend = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim() || isThinking) return;

    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    setIsThinking(true);

    try {
      const botReply = await processNaturalAIQuery(query, messages);
      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    } catch {
      setMessages(prev => [...prev, { sender: 'bot', text: "I apologize, my neural link experienced a momentary hiccup! Please connect with our team directly on WhatsApp via our quick link." }]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleBookingSelect = (field, val) => {
    const updated = { ...bookingData, [field]: val };
    setBookingData(updated);
    setBookingStep(prev => prev + 1);
  };

  const getWhatsAppBookingUrl = () => {
    const text = `Hello Siddhi Vinayak Laundry! I used your AI Concierge to plan a piece-wise order:\n- Care Protocol: ${bookingData.service}\n- Load Volume: ${bookingData.quantity}\n- Preferred Pickup: ${bookingData.timing}\n\nPlease confirm my booking and share piece-wise rates!`;
    return `https://wa.me/916351674100?text=${encodeURIComponent(text)}`;
  };

  const stainTips = {
    coffee: { title: "Tea / Coffee Spills", advice: "Instantly blot (do NOT rub) with lukewarm water. Avoid using bath soap as it can set tannin stains permanently. Let our bio-enzymes dissolve it safely." },
    oil: { title: "Oil / Curry / Grease", advice: "Sprinkle talcum powder or baking soda immediately to absorb surface oils. Do not apply hot water. Requires our specialized hydrocarbon lipid-remover." },
    ink: { title: "Ink / Ballpoint Pen", advice: "Never rub ink! Place a paper towel underneath and dab gently with rubbing alcohol if available, or keep it dry until professional dry cleaning." },
    wine: { title: "Red Wine / Fruit Juice", advice: "Blot immediately with a clean cloth. Club soda helps lift pigments temporarily. Bring to SVL within 24 hours for complete oxidation treatment." }
  };

  // Helper to render basic markdown bold (**bold**) and italic (*italic*) and links nicely inside chat bubbles
  const renderFormattedText = (text) => {
    const lines = text.split('\n');
    return lines.map((line, lIdx) => {
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const parts = [];
      let lastIdx = 0;
      let match;

      while ((match = linkRegex.exec(line)) !== null) {
        if (match.index > lastIdx) {
          parts.push(line.substring(lastIdx, match.index));
        }
        parts.push(
          <a
            key={`link-${lastIdx}`}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#2563eb', fontWeight: '700', textDecoration: 'underline', display: 'inline-block', margin: '4px 0' }}
          >
            {match[1]}
          </a>
        );
        lastIdx = linkRegex.lastIndex;
      }
      if (lastIdx < line.length) {
        parts.push(line.substring(lastIdx));
      }

      const contentToFormat = parts.length > 0 ? parts : [line];

      return (
        <React.Fragment key={lIdx}>
          {contentToFormat.map((chunk, _cIdx) => {
            if (typeof chunk !== 'string') return chunk;
            return chunk.split('**').map((subChunk, sIdx) => {
              if (sIdx % 2 === 1) return <strong key={sIdx}>{subChunk}</strong>;
              return subChunk.split('*').map((italicChunk, iIdx) => iIdx % 2 === 1 ? <em key={`${sIdx}-${iIdx}`}>{italicChunk}</em> : italicChunk);
            });
          })}
          {lIdx < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <style>{`
        .svl-chat-launcher {
          position: fixed;
          bottom: 6.75rem;
          right: 2rem;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          color: white;
          border: none;
          box-shadow: 0 8px 25px rgba(124, 58, 237, 0.4);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-sizing: border-box;
        }

        .svl-chat-launcher:hover {
          transform: scale(1.1) rotate(5deg);
        }

        .svl-chat-backdrop {
          display: none;
        }

        .svl-chat-modal {
          position: fixed;
          bottom: 11rem;
          right: 2rem;
          width: 380px;
          height: 540px;
          max-height: calc(100vh - 12.5rem);
          display: flex;
          flex-direction: column;
          z-index: 1000;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(124, 58, 237, 0.2);
          border-radius: 24px;
        }

        .svl-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.6rem;
        }

        .svl-chat-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: 50px;
          font-size: 0.9rem;
          outline: none;
          background: #f8fafc;
          font-family: inherit;
        }

        @keyframes svlBounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }

        .svl-typing-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          background-color: #94a3b8;
          border-radius: 50%;
          animation: svlBounce 1.4s infinite ease-in-out both;
        }

        @media (max-width: 640px) {
          .svl-chat-launcher {
            bottom: 5.5rem;
            right: 1.5rem;
            width: 52px;
            height: 52px;
          }

          .svl-chat-backdrop {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.45);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            z-index: 99998;
            animation: fadeIn 0.2s ease forwards;
          }

          .svl-chat-modal {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            top: auto;
            width: 100%;
            height: 88dvh;
            max-height: 88dvh;
            border-radius: 24px 24px 0 0;
            border: none;
            border-top: 1px solid rgba(124, 58, 237, 0.25);
            z-index: 99999;
            box-shadow: 0 -10px 40px rgba(0,0,0,0.2);
          }

          .svl-grid-2 {
            grid-template-columns: 1fr;
          }

          .svl-chat-input {
            font-size: 16px !important;
          }
        }

        @media (max-width: 360px) {
          .svl-chat-modal {
            height: 94dvh;
            max-height: 94dvh;
          }
        }
      `}</style>

      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="svl-chat-launcher"
        aria-label="Open SVL AI Concierge"
      >
        {isOpen ? <X size={26} /> : <MessageCircleMore size={28} />}
      </button>

      {/* Mobile Dark Backdrop Overlay */}
      {isOpen && (
        <div 
          className="svl-chat-backdrop" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Chatbot Window Modal */}
      {isOpen && (
        <div className="svl-chat-modal animate-fade-in">
          
          {/* Header */}
          <div style={{
            padding: '1rem 1.4rem',
            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(124, 58, 237, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#c084fc',
                flexShrink: 0
              }}>
                <Bot size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: '700', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem', letterSpacing: '0.3px' }}>
                  SVL Concierge <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', flexShrink: 0 }}></span>
                </h3>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block' }}>Vinayak Advanced AI</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#e2e8f0', borderRadius: '50%', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              aria-label="Close Assistant"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-color)',
            background: '#f8fafc',
            padding: '0.4rem',
            gap: '0.3rem',
            flexShrink: 0
          }}>
            {[
              { id: 'chat', label: 'General', icon: HelpCircle },
              { id: 'book', label: 'Smart Booking', icon: Calendar },
              { id: 'stain', label: 'Stain Aid', icon: Droplets }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: '0.6rem 0.3rem',
                  border: 'none',
                  background: activeTab === tab.id ? 'white' : 'transparent',
                  color: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontWeight: activeTab === tab.id ? '600' : '500',
                  fontSize: 'clamp(0.75rem, 2vw, 0.82rem)',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem',
                  boxShadow: activeTab === tab.id ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <tab.icon size={15} style={{ flexShrink: 0 }} /> <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content Area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* TAB 1: GENERAL Q&A CHAT */}
            {activeTab === 'chat' && (
              <>
                {messages.map((msg, i) => (
                  <div key={i} style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '88%',
                    padding: '0.8rem 1.05rem',
                    borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: msg.sender === 'user' ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' : '#f1f5f9',
                    color: msg.sender === 'user' ? 'white' : 'var(--text-primary)',
                    fontSize: 'clamp(0.85rem, 2.5vw, 0.92rem)',
                    lineHeight: '1.5',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word'
                  }}>
                    {msg.sender === 'user' ? msg.text : renderFormattedText(msg.text)}
                  </div>
                ))}
                
                {/* Natural Typing Indicator */}
                {isThinking && (
                  <div style={{
                    alignSelf: 'flex-start',
                    padding: '0.7rem 1rem',
                    borderRadius: '18px 18px 18px 4px',
                    background: '#f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span className="svl-typing-dot" style={{ animationDelay: '0s' }}></span>
                    <span className="svl-typing-dot" style={{ animationDelay: '0.2s' }}></span>
                    <span className="svl-typing-dot" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                )}

                {/* Quick Suggestion Pills */}
                {!isThinking && messages.length < 4 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                    {["Piece-wise pricing & rates", "Contact details (email & phone)", "Turmeric & haldi stain removal", "Express urgent turnaround"].map((pill, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(pill)}
                        style={{
                          padding: '0.45rem 0.85rem',
                          background: 'rgba(124, 58, 237, 0.08)',
                          color: 'var(--accent-primary)',
                          border: '1px solid rgba(124, 58, 237, 0.22)',
                          borderRadius: '50px',
                          fontSize: 'clamp(0.72rem, 2vw, 0.78rem)',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                          whiteSpace: 'normal',
                          textAlign: 'left'
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
                  <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                    <h4 style={{ fontSize: '1.05rem', marginBottom: '0.2rem', color: 'var(--text-primary)' }}>Smart Order Assistant</h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Answer 3 quick questions to plan your pickup</p>
                  </div>

                  {bookingStep === 1 && (
                    <div>
                      <span style={{ fontWeight: '600', fontSize: '0.88rem', display: 'block', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>1. What service do you require?</span>
                      <div className="svl-grid-2">
                        {['Everyday Garment Care', 'Advanced Dry Clean', 'Steam Pressing', 'Bulk Commercial'].map(srv => (
                          <button key={srv} onClick={() => handleBookingSelect('service', srv)} className="btn-outline" style={{ padding: '0.85rem 0.5rem', fontSize: '0.85rem', textAlign: 'center', justifyContent: 'center', width: '100%', wordBreak: 'break-word' }}>{srv}</button>
                        ))}
                      </div>
                    </div>
                  )}

                  {bookingStep === 2 && (
                    <div>
                      <span style={{ fontWeight: '600', fontSize: '0.88rem', display: 'block', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>2. Estimated load size?</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {['1 - 5 Pieces', '6 - 15 Pieces', '16+ Pieces (Bulk Load)'].map(q => (
                          <button key={q} onClick={() => handleBookingSelect('quantity', q)} className="btn-outline" style={{ padding: '0.85rem', fontSize: '0.85rem', justifyContent: 'center', width: '100%' }}>{q}</button>
                        ))}
                      </div>
                    </div>
                  )}

                  {bookingStep === 3 && (
                    <div>
                      <span style={{ fontWeight: '600', fontSize: '0.88rem', display: 'block', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>3. Preferred pickup window?</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {['Today Afternoon/Evening', 'Tomorrow Morning (8 AM - 12 PM)', 'Flexible Schedule'].map(t => (
                          <button key={t} onClick={() => handleBookingSelect('timing', t)} className="btn-outline" style={{ padding: '0.85rem', fontSize: '0.85rem', justifyContent: 'center', width: '100%' }}>{t}</button>
                        ))}
                      </div>
                    </div>
                  )}

                  {bookingStep > 3 && (
                    <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
                      <CheckCircle2 size={44} style={{ color: '#22c55e', margin: '0 auto 0.8rem' }} />
                      <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Ready to Schedule!</h4>
                      <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '14px', textAlign: 'left', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: '1.6', color: 'var(--text-primary)', wordBreak: 'break-word' }}>
                        <div><strong>Service:</strong> {bookingData.service}</div>
                        <div><strong>Load Volume:</strong> {bookingData.quantity}</div>
                        <div><strong>Window:</strong> {bookingData.timing}</div>
                        <div style={{ marginTop: '0.6rem', color: 'var(--accent-primary)', fontWeight: '600', fontSize: '0.88rem' }}>⚡ Est. Turnaround: 24-36 Hours</div>
                      </div>
                      <a href={getWhatsAppBookingUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '0.95rem', boxSizing: 'border-box', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        Confirm via WhatsApp <ArrowRight size={18} style={{ marginLeft: '6px', flexShrink: 0 }} />
                      </a>
                    </div>
                  )}
                </div>

                {bookingStep > 1 && bookingStep <= 3 && (
                  <button onClick={() => setBookingStep(bookingStep - 1)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem', marginTop: '1rem', padding: '0.5rem' }}>
                    ← Back to previous step
                  </button>
                )}
                {bookingStep > 3 && (
                  <button onClick={() => { setBookingStep(1); setBookingData({ service: '', quantity: '', timing: '' }); }} style={{ background: 'transparent', border: 'none', color: 'var(--accent-secondary)', cursor: 'pointer', fontSize: '0.85rem', marginTop: '1rem', padding: '0.5rem' }}>
                    Start over
                  </button>
                )}
              </div>
            )}

            {/* TAB 3: STAIN EMERGENCY AID */}
            {activeTab === 'stain' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', padding: '0.8rem', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '12px', color: '#dc2626' }}>
                  <ShieldAlert size={22} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: '600', lineHeight: '1.3' }}>Stain Emergency? Take first aid immediately, then send to SVL.</span>
                </div>

                <span style={{ fontWeight: '600', fontSize: '0.85rem', display: 'block', marginBottom: '0.8rem', color: 'var(--text-primary)' }}>Select Stain Type:</span>
                <div className="svl-grid-2" style={{ marginBottom: '1.2rem' }}>
                  {Object.keys(stainTips).map(k => (
                    <button
                      key={k}
                      onClick={() => setSelectedStain(k)}
                      style={{
                        padding: '0.75rem 0.5rem',
                        borderRadius: '12px',
                        border: selectedStain === k ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                        background: selectedStain === k ? 'rgba(124, 58, 237, 0.06)' : 'white',
                        fontWeight: selectedStain === k ? '600' : '500',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        color: selectedStain === k ? 'var(--accent-primary)' : 'var(--text-primary)',
                        width: '100%',
                        wordBreak: 'break-word',
                        transition: 'all 0.2s'
                      }}
                    >
                      {stainTips[k].title}
                    </button>
                  ))}
                </div>

                {selectedStain && (
                  <div className="animate-fade-in" style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                    <h5 style={{ fontSize: '0.95rem', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>{stainTips[selectedStain].title} First Aid</h5>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.55', marginBottom: '1.2rem', wordBreak: 'break-word' }}>
                      {stainTips[selectedStain].advice}
                    </p>
                    <a href="https://wa.me/916351674100?text=Hello%20SVL,%20I%20have%20an%20urgent%20stain%20removal%20request!" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: '100%', padding: '0.8rem', fontSize: '0.88rem', justifyContent: 'center', boxSizing: 'border-box', display: 'flex' }}>
                      Book Stain Removal
                    </a>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Chat Input Bar (Only on General tab) */}
          {activeTab === 'chat' && (
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{
              display: 'flex',
              padding: '0.8rem 1rem',
              borderTop: '1px solid var(--border-color)',
              background: 'white',
              gap: '0.6rem',
              flexShrink: 0,
              alignItems: 'center'
            }}>
              <input
                type="text"
                placeholder="Ask anything (e.g. 'Turnaround time')..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="svl-chat-input"
                disabled={isThinking}
              />
              <button
                type="submit"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: isThinking ? '#cbd5e1' : 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                  color: 'white',
                  border: 'none',
                  cursor: isThinking ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: isThinking ? 'none' : '0 4px 12px rgba(124, 58, 237, 0.3)'
                }}
                disabled={isThinking}
                aria-label="Send Message"
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
