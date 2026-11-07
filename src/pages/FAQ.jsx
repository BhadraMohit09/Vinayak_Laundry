import React, { useState } from 'react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TypewriterHeading from '../components/TypewriterHeading';

const faqData = [
  {
    question: "What is your standard turnaround time?",
    answer: "Our standard turnaround time is 24 to 48 hours for regular laundry and wash & fold. Delicate dry cleaning and intricate bridal or festival garments typically require 36 to 72 hours for thorough fiber testing, gentle hand spotting, and tension pressing. Express same-day service is available on request."
  },
  {
    question: "Do you offer free pickup and delivery across Jamnagar?",
    answer: "Yes, we provide doorstep pickup and delivery across Jamnagar. You can easily schedule a window via WhatsApp or our booking form, and our logistics associate will arrive at your home or business."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major convenient payment methods including UPI (Google Pay, PhonePe, Paytm), Net Banking, Cash on delivery, and corporate Cheque for B2B contract billing."
  },
  {
    question: "How do you handle bulk or commercial orders?",
    answer: "We run a dedicated commercial line for hotels, clinics, banquet halls, and corporate teams with barcode-itemized tracking, customized thermal sanitization protocols, and tailored monthly billing."
  },
  {
    question: "What happens if a garment has a stubborn stain?",
    answer: "Our fabric scientists inspect each garment fiber-by-fiber. We treat specific oil, curry, ink, or tea stains with targeted, pH-neutral German solvents without compromising fabric luster or dye integrity."
  },
  {
    question: "Are your cleaning processes safe for delicate fabrics like silk and wool?",
    answer: "Absolutely. We avoid harsh perchloroethylene solvents, using gentle eco-solvents and moisture-regulated steam tension presses that protect the sheen of Bandhani, pure silk, cashmere, and designer embroidery."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '96px' }}>
      {/* Harmonized Editorial Header */}
      <section className="page-header-standard">
        <div className="container">
          <div className="page-title-block">
            <div className="font-mono-tag" style={{ color: 'var(--accent-rust)', marginBottom: '12px' }}>
              01 · CLIENT QUERIES
            </div>
            <TypewriterHeading
              as="h1"
              className="page-main-heading"
              speed={32}
              delay={140}
              segments={[
                { text: 'Clear answers for ' },
                { text: 'every garment.', italic: true, accent: true }
              ]}
            />
            <p className="page-main-subtext">
              Everything you need to know about our fabric care methodologies, doorstep pickup cycles, pricing transparency, and B2B commercial capabilities in Jamnagar.
            </p>
          </div>

          <div style={{ maxWidth: '880px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqData.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  className="glass-panel"
                  style={{ 
                    padding: '22px 28px', 
                    cursor: 'pointer',
                    background: 'var(--bg-card)',
                    borderRadius: 'var(--radius-md)',
                    border: isOpen ? '1px solid var(--accent-rust)' : '1px solid var(--border-subtle)',
                    transition: 'all 0.25s ease',
                    boxShadow: isOpen ? 'var(--shadow-card)' : 'var(--shadow-subtle)'
                  }}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                    <h3 style={{ 
                      fontSize: '17px', 
                      fontWeight: 600, 
                      color: isOpen ? 'var(--accent-rust)' : 'var(--ink)', 
                      letterSpacing: '-0.01em',
                      margin: 0
                    }}>
                      {faq.question}
                    </h3>
                    <ChevronDown 
                      size={20}
                      style={{ 
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                        color: isOpen ? 'var(--accent-rust)' : 'var(--text-tertiary)',
                        flexShrink: 0
                      }} 
                    />
                  </div>
                  <div style={{
                    maxHeight: isOpen ? '240px' : '0',
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    marginTop: isOpen ? '14px' : '0'
                  }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.65', margin: 0 }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reassurance Footer Card */}
          <div 
            style={{ 
              maxWidth: '880px',
              marginTop: '40px', 
              padding: '32px', 
              background: 'var(--bg-card)', 
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px'
            }}
          >
            <div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                Have a specific question or fabric query?
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', margin: 0 }}>
                Speak directly with our fabric specialists in Jamnagar or arrange a doorstep visit.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link to="/contact" className="ink-button">
                Reach out to us <ArrowUpRight size={16} />
              </Link>
              <a
                href="https://wa.me/916351674100"
                target="_blank"
                rel="noreferrer"
                className="soft-button"
              >
                WhatsApp SVL →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
