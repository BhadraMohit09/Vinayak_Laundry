import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ArrowUpRight, ShieldCheck, Clock, Award, X } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null); // null | 'privacy' | 'terms'
  const [istTime, setIstTime] = useState('');
  const [isClockMinimized, setIsClockMinimized] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setIstTime(now.toLocaleString('en-IN', options) + ' IST');
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer style={{
      background: 'linear-gradient(180deg, rgba(250, 249, 246, 0.4) 0%, rgba(240, 238, 233, 0.9) 100%)',
      borderTop: '1px solid rgba(28, 25, 23, 0.08)',
      paddingTop: '4rem',
      marginTop: 'auto',
      position: 'relative'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Main Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
          gap: '3.5rem',
          marginBottom: '3.5rem'
        }}>
          {/* Brand & Mission */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none', marginBottom: '1.2rem' }}>
              <img src="/assets/logo-small.png" alt="Siddhi Vinayak Laundry Logo" style={{ height: '46px', width: '46px', borderRadius: '12px', objectFit: 'contain', boxShadow: '0 4px 10px rgba(0,0,0,0.06)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
                <span style={{ fontWeight: '800', fontSize: '1.4rem', color: '#1c1917', fontFamily: "'Inter', sans-serif" }}>
                  Siddhi <span style={{ color: 'var(--accent-primary)' }}>Vinayak</span>
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent-secondary)', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '0.2rem' }}>
                  Premium Laundry
                </span>
              </div>
            </Link>
            <p style={{ color: '#57534e', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Next-generation garment care powered by eco-solvent science and automated precision. We protect delicate weaves while restoring vibrant freshness.
            </p>
            
            {/* Live Plant Status Badge */}
            <div style={{ padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(28,25,23,0.08)', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '700', color: '#1c1917' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '6px', height: '6px', background: '#059669', borderRadius: '50%' }} />
                  Jamnagar Plant: Active
                </span>
                <span style={{ color: 'var(--accent-secondary)' }}>Express Service</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.72rem', color: '#78716c' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={12} /> 24h Turnaround</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><ShieldCheck size={12} /> 100% Care Guarantee</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#1c1917', marginBottom: '1.4rem', fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.3px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', padding: 0, margin: 0 }}>
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Our Services', path: '/services' },
                { name: 'Commercial Solutions', path: '/commercial' },
                { name: 'Frequently Asked Questions', path: '/faq' },
                { name: 'Fabric Care Blog', path: '/blog' },
                { name: 'Contact Us', path: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#57534e', textDecoration: 'none', fontSize: '0.92rem', fontWeight: '500', transition: 'all 0.2s', padding: '0.3rem 0' }} onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-primary)'; e.currentTarget.style.transform = 'translateX(4px)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#57534e'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                    <span>{item.name}</span>
                    <ArrowUpRight size={14} style={{ opacity: 0.5 }} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h4 style={{ color: '#1c1917', marginBottom: '1.4rem', fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.3px' }}>Contact Us</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.1rem', padding: 0, margin: 0 }}>
              <li style={{ display: 'flex', gap: '0.8rem', color: '#57534e', fontSize: '0.92rem', alignItems: 'flex-start' }}>
                <div style={{ width: '36px', height: '36px', minWidth: '36px', minHeight: '36px', background: 'rgba(67, 56, 202, 0.08)', borderRadius: '10px', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={18} style={{ flexShrink: 0 }} />
                </div>
                <div>
                  <strong style={{ color: '#1c1917', display: 'block', fontSize: '0.85rem' }}>Facility Address</strong>
                  <span>Jamnagar, Gujarat, India</span>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '0.8rem', color: '#57534e', fontSize: '0.92rem', alignItems: 'flex-start' }}>
                <div style={{ width: '36px', height: '36px', minWidth: '36px', minHeight: '36px', background: 'rgba(2, 132, 199, 0.08)', borderRadius: '10px', color: 'var(--accent-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={18} style={{ flexShrink: 0 }} />
                </div>
                <div>
                  <strong style={{ color: '#1c1917', display: 'block', fontSize: '0.85rem' }}>Direct Line & SMS</strong>
                  <a href="tel:+916351674100" style={{ color: '#57534e', textDecoration: 'none', fontWeight: '600' }}>+91 6351674100</a>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '0.8rem', color: '#57534e', fontSize: '0.92rem', alignItems: 'flex-start' }}>
                <div style={{ width: '36px', height: '36px', minWidth: '36px', minHeight: '36px', background: 'rgba(37, 211, 102, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <WhatsAppIcon size={18} color="#25D366" style={{ flexShrink: 0 }} />
                </div>
                <div>
                  <strong style={{ color: '#1c1917', display: 'block', fontSize: '0.85rem' }}>WhatsApp Care</strong>
                  <a href="https://wa.me/916351674100?text=Hello%20Siddhi%20Vinayak%20Laundry,%20I%20would%20like%20to%20inquire%20about%20your%20services." target="_blank" rel="noopener noreferrer" style={{ color: '#15803d', textDecoration: 'none', fontWeight: '600' }}>Instant Chat Support</a>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '0.8rem', color: '#57534e', fontSize: '0.92rem', alignItems: 'flex-start' }}>
                <div style={{ width: '36px', height: '36px', minWidth: '36px', minHeight: '36px', background: 'rgba(67, 56, 202, 0.08)', borderRadius: '10px', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={18} style={{ flexShrink: 0 }} />
                </div>
                <div>
                  <strong style={{ color: '#1c1917', display: 'block', fontSize: '0.85rem' }}>Email Us</strong>
                  <a href="mailto:svinayaklaundry@gmail.com" style={{ color: '#57534e', textDecoration: 'none', wordBreak: 'break-all' }}>svinayaklaundry@gmail.com</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        background: 'rgba(28, 25, 23, 0.04)',
        borderTop: '1px solid rgba(28, 25, 23, 0.08)',
        padding: '1.5rem 0'
      }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', fontSize: '0.85rem', color: '#78716c' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
            <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Siddhi Vinayak Laundry. All rights reserved.</p>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Award size={14} color="var(--accent-primary)" /> Premium Care</span>
            <button type="button" onClick={() => setActiveModal('privacy')} style={{ background: 'transparent', border: 'none', color: '#78716c', cursor: 'pointer', fontSize: '0.85rem', padding: 0, textDecoration: 'underline' }}>Privacy Policy</button>
            <button type="button" onClick={() => setActiveModal('terms')} style={{ background: 'transparent', border: 'none', color: '#78716c', cursor: 'pointer', fontSize: '0.85rem', padding: 0, textDecoration: 'underline' }}>Terms of Service</button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes radarPing {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
        @media (max-width: 600px) {
          .floating-live-clock, .floating-live-clock-minimized {
            bottom: 16px !important;
            left: 16px !important;
          }
          .floating-live-clock {
            padding: 0.4rem 0.5rem 0.4rem 0.85rem !important;
          }
        }
      `}</style>

      {/* Legal Modals */}
      {activeModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.55)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }} onClick={() => setActiveModal(null)}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            maxWidth: '650px',
            width: '100%',
            maxHeight: '85vh',
            overflowY: 'auto',
            padding: '2.5rem',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(0,0,0,0.08)'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1c1917', margin: 0 }}>
                {activeModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h3>
              <button type="button" onClick={() => setActiveModal(null)} style={{ background: 'rgba(0,0,0,0.05)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#57534e' }} aria-label="Close modal">
                <X size={18} />
              </button>
            </div>

            <div style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.7' }}>
              {activeModal === 'privacy' ? (
                <>
                  <p><strong>Last Updated:</strong> June 2026</p>
                  <p>At <strong>Siddhi Vinayak Laundry (SVL)</strong>, we value your trust and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our website or services in Jamnagar.</p>
                  
                  <h4 style={{ color: '#1c1917', marginTop: '1.2rem', marginBottom: '0.4rem' }}>1. Information We Collect</h4>
                  <p>We collect essential contact information necessary to provide garment care and pickup/delivery services. This includes your name, phone number, residential or commercial address in Jamnagar, and specific garment care preferences.</p>

                  <h4 style={{ color: '#1c1917', marginTop: '1.2rem', marginBottom: '0.4rem' }}>2. Use of Information</h4>
                  <p>Your personal data is strictly used for processing laundry orders, scheduling doorstep pickup and delivery, sending automated order status updates via SMS or WhatsApp, and handling customer support inquiries.</p>

                  <h4 style={{ color: '#1c1917', marginTop: '1.2rem', marginBottom: '0.4rem' }}>3. Data Protection & Sharing</h4>
                  <p>We implement strict security measures to keep your data confidential. We do not sell, rent, or trade your customer information to any third-party marketing agencies. Data is only shared with authorized delivery personnel solely for completing your order.</p>

                  <h4 style={{ color: '#1c1917', marginTop: '1.2rem', marginBottom: '0.4rem' }}>4. Contact Us</h4>
                  <p>If you have any questions regarding our privacy practices or wish to update your information, please contact us at <strong>svinayaklaundry@gmail.com</strong> or call our direct line at <strong>+91 6351674100</strong>.</p>
                </>
              ) : (
                <>
                  <p><strong>Last Updated:</strong> June 2026</p>
                  <p>Welcome to <strong>Siddhi Vinayak Laundry (SVL)</strong>. By scheduling a pickup or using our garment care services in Jamnagar, you agree to the following Terms of Service.</p>

                  <h4 style={{ color: '#1c1917', marginTop: '1.2rem', marginBottom: '0.4rem' }}>1. Garment Inspection & Care</h4>
                  <p>All garments are thoroughly inspected prior to processing. While we use advanced eco-friendly solvents and professional bio-enzyme fabric care protocols, SVL is not responsible for inherent garment defects, pre-existing wear and tear, weak fabrics, or color bleeding caused by poor manufacturer dyes.</p>

                  <h4 style={{ color: '#1c1917', marginTop: '1.2rem', marginBottom: '0.4rem' }}>2. Stain Removal Limitations</h4>
                  <p>We treat all stains with industry-leading stain extraction technology. However, certain old, set-in, or chemical stains (such as permanent inks, old rust, or harsh dyes) may not be 100% removable without damaging the underlying fabric. Our technicians will exercise professional judgment to prioritize garment integrity.</p>

                  <h4 style={{ color: '#1c1917', marginTop: '1.2rem', marginBottom: '0.4rem' }}>3. Unclaimed Garments</h4>
                  <p>Completed laundry orders should be collected or accepted for delivery within 30 days of notification. SVL is not responsible for any items left unclaimed beyond 45 days from the order date.</p>

                  <h4 style={{ color: '#1c1917', marginTop: '1.2rem', marginBottom: '0.4rem' }}>4. Payments & Billing</h4>
                  <p>Payments are due upon delivery unless prior commercial account arrangements have been established. We accept UPI, cash, and major digital payment methods.</p>
                </>
              )}
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'right' }}>
              <button type="button" onClick={() => setActiveModal(null)} className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Live Command Capsule (Fixed Bottom-Left with Minimize Toggle) */}
      {istTime && (
        isClockMinimized ? (
          <button
            type="button"
            onClick={() => setIsClockMinimized(false)}
            className="floating-live-clock-minimized"
            title="Show Jamnagar Live Time"
            aria-label="Show Jamnagar Live Time"
            style={{
              position: 'fixed',
              bottom: '24px',
              left: '24px',
              zIndex: 980,
              background: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '50%',
              width: '46px',
              height: '46px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(56, 189, 248, 0.2)',
              cursor: 'pointer',
              color: '#38bdf8',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              padding: 0
            }}
          >
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={20} style={{ animation: 'pulse 2s infinite' }} />
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
            </div>
          </button>
        ) : (
          <div className="floating-live-clock" style={{
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            zIndex: 980,
            background: 'rgba(15, 23, 42, 0.88)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '30px',
            padding: '0.45rem 0.5rem 0.45rem 1.1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.7rem',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25), 0 0 15px rgba(34, 197, 94, 0.15)',
            color: '#ffffff',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            cursor: 'default'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '10px', height: '10px', flexShrink: 0 }}>
              <span style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: '#22c55e', animation: 'radarPing 1.5s cubic-bezier(0, 0, 0.2, 1) infinite', opacity: 0.75 }}></span>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }}></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', fontFamily: "'JetBrains Mono', 'Inter', monospace" }}>
              <span style={{ fontSize: '0.84rem', fontWeight: '700', color: '#38bdf8', letterSpacing: '0.3px' }}>
                {istTime}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsClockMinimized(true)}
              title="Minimize clock"
              aria-label="Minimize clock"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94a3b8',
                cursor: 'pointer',
                marginLeft: '0.2rem',
                transition: 'all 0.2s ease',
                flexShrink: 0,
                padding: 0
              }}
            >
              <X size={14} />
            </button>
          </div>
        )
      )}
    </footer>
  );
};

export default Footer;
