import React, { useState } from 'react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqData = [
  {
    question: "What is your standard turnaround time?",
    answer: "Our general turnaround time is 1-2 days for normal orders. In some cases, we can accommodate same-day processing. However, in exceptional cases requiring specialized care or bulk volumes, it may exceed 3 days."
  },
  {
    question: "Do you offer free pickup and delivery?",
    answer: "Yes, we offer free pickup and delivery across Jamnagar! However, please note that for 'quick delivery' or expedited requests, free delivery is generally not applicable except in certain unforeseen circumstances."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major convenient payment methods including UPI (Google Pay, PhonePe, Paytm), Cash, and Cheque."
  },
  {
    question: "How do you handle bulk or commercial orders?",
    answer: "We take extra, specialized care for bulk orders. Commercial clients receive dedicated processing, customized packing, and tailored logistics to ensure massive volumes don't compromise our premium quality."
  },
  {
    question: "What happens if a garment has a very stubborn stain?",
    answer: "Our experts analyze the fabric and the stain type before treatment. We use advanced, eco-friendly solvents to treat the stain multiple times if necessary. While we cannot guarantee 100% removal of permanent dyes, our success rate is industry-leading."
  },
  {
    question: "Are your cleaning processes safe for delicate fabrics?",
    answer: "Absolutely. We utilize state-of-the-art methodology designed specifically to protect and preserve delicate fabrics like silk, cashmere, and wool, significantly extending their lifespan compared to traditional washing."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="animate-fade-in">
      <section className="section" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', background: 'rgba(124, 58, 237, 0.1)', color: 'var(--accent-primary)', borderRadius: '50%', marginBottom: '1.5rem' }}>
              <MessageCircleQuestion size={30} />
            </div>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', letterSpacing: '-1px' }}>
              Frequently Asked <span className="text-gradient">Questions</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              Everything you need to know about our services, pricing, and processes.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className="glass-panel"
                style={{ 
                  padding: '1.5rem 2rem', 
                  cursor: 'pointer',
                  border: openIndex === index ? '1px solid rgba(124, 58, 237, 0.3)' : '1px solid var(--border-color)',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: openIndex === index ? '700' : '600', color: openIndex === index ? 'var(--accent-primary)' : 'var(--text-primary)', paddingRight: '2rem' }}>
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    style={{ 
                      transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      color: openIndex === index ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      flexShrink: 0
                    }} 
                  />
                </div>
                <div style={{
                  maxHeight: openIndex === index ? '200px' : '0',
                  opacity: openIndex === index ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease-in-out',
                  marginTop: openIndex === index ? '1rem' : '0'
                }}>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem', padding: '2rem', background: 'rgba(37, 99, 235, 0.05)', borderRadius: '16px' }}>
            <h3 style={{ marginBottom: '1rem' }}>Still have questions?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>We're here to help. Send us a message or contact us on WhatsApp.</p>
            <Link to="/contact" className="btn-primary">Contact Support</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
