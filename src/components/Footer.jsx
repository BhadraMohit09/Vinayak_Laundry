import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ArrowUpRight, ShieldCheck, Clock, Award, X } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null); // null | 'privacy' | 'terms'

  return (
    <footer className="footer-wrapper" style={{
      background: 'transparent',
      paddingTop: '3rem',
      paddingBottom: '0',
      marginTop: 'auto',
      position: 'relative'
    }}>
      {/* 
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
          gap: '3.5rem',
          marginBottom: '3.5rem'
        }}>
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none', marginBottom: '1.2rem' }}>
              <img src="/assets/logo-small.png" alt="Siddhi Vinayak Laundry Logo" style={{ height: '42px', width: '42px', borderRadius: '10px', objectFit: 'contain', background: '#ffffff', padding: '3px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-subtle)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
                <span style={{
                  color: 'var(--ink)',
                  fontWeight: '600',
                  fontSize: '1.35rem',
                  letterSpacing: '-0.02em',
                  fontFamily: "'Playfair Display', serif"
                }}>
                  Siddhi Vinayak <i style={{ fontWeight: 400, color: 'var(--accent-rust)' }}>Laundry</i>
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase', marginTop: '0.1rem', fontFamily: "'DM Mono', monospace" }}>
                  Garment Care Studio · Jamnagar
                </span>
              </div>
            </Link>
            <p style={{ color: '#57534e', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Next-generation garment care powered by eco-solvent science and automated precision. We protect delicate weaves while restoring vibrant freshness.
            </p>
            
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
                  <Link to={item.path} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#57534e', textDecoration: 'none', fontSize: '0.92rem', fontWeight: '500', transition: 'all 0.2s', padding: '0.3rem 0' }}>
                    <span>{item.name}</span>
                    <ArrowUpRight size={14} style={{ opacity: 0.5 }} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

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
      */}

      {/* Giant Editorial Watermark Brand Display — Pebble-style */}
      <div
        className="footer-watermark-wrap"
        style={{
          userSelect: 'none',
          pointerEvents: 'none',
          width: '100%',
          textAlign: 'center',
          paddingTop: '36px',
          paddingBottom: '0',
        }}
      >
        {/* 7-block icon: 3 dark + 4 lighter, 2-row staggered arrangement */}
        <div style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '4px',
          marginBottom: '16px',
        }}>
          {/* Row 1: lighter · dark · dark · lighter  (4 blocks) */}
          <div style={{ display: 'flex', gap: '4px' }}>
            <span style={{ width: '11px', height: '11px', background: 'rgba(26,24,21,0.22)', borderRadius: '3px' }} />
            <span style={{ width: '11px', height: '11px', background: 'rgba(26,24,21,0.55)', borderRadius: '3px' }} />
            <span style={{ width: '11px', height: '11px', background: 'rgba(26,24,21,0.55)', borderRadius: '3px' }} />
            <span style={{ width: '11px', height: '11px', background: 'rgba(26,24,21,0.22)', borderRadius: '3px' }} />
          </div>
          {/* Row 2: dark · lighter · lighter  (3 blocks, offset left) */}
          <div style={{ display: 'flex', gap: '4px' }}>
            <span style={{ width: '11px', height: '11px', background: 'rgba(26,24,21,0.55)', borderRadius: '3px' }} />
            <span style={{ width: '11px', height: '11px', background: 'rgba(26,24,21,0.22)', borderRadius: '3px' }} />
            <span style={{ width: '11px', height: '11px', background: 'rgba(26,24,21,0.22)', borderRadius: '3px' }} />
          </div>
        </div>

        {/*
          Text clip container: position:relative + overflow:hidden.
          The text uses position:absolute + left:50% + translateX(-50%)
          which GUARANTEES symmetric centering.
          Font size is calibrated to ~68% width on desktop and ~75% on mobile
          leaving generous, elegant margins on both sides.
        */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          height: 'clamp(55px, 8vw, 110px)',
          width: '100%',
        }}>
          <span style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            transform: 'translateX(-50%)',
            display: 'block',
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(60px, 9.5vw, 138px)',
            fontWeight: 700,
            color: 'rgba(26, 24, 21, 0.09)',
            letterSpacing: '0.04em',
            textTransform: 'lowercase',
            whiteSpace: 'nowrap',
            lineHeight: 1,
          }}>
            siddhi vinayak
          </span>
        </div>
      </div>

      {/* 
      <div style={{
        background: 'rgba(28, 25, 23, 0.04)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '1.5rem 0'
      }}>
        <div className="container footer-bottom" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', fontSize: '0.85rem', color: '#78716c' }}>
          <div className="footer-copyright" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <p style={{ margin: 0, textAlign: 'center' }}>&copy; {new Date().getFullYear()} Siddhi Vinayak Laundry. All rights reserved.</p>
          </div>
          <div className="footer-bottom-links" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Award size={14} color="var(--accent-primary)" /> Premium Care</span>
            <button type="button" onClick={() => setActiveModal('privacy')} style={{ background: 'transparent', border: 'none', color: '#78716c', cursor: 'pointer', fontSize: '0.85rem', padding: 0, textDecoration: 'underline' }}>Privacy Policy</button>
            <button type="button" onClick={() => setActiveModal('terms')} style={{ background: 'transparent', border: 'none', color: '#78716c', cursor: 'pointer', fontSize: '0.85rem', padding: 0, textDecoration: 'underline' }}>Terms of Service</button>
          </div>
        </div>
      </div>
      */}

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
          <div className="legal-modal-content" style={{
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
                  <p>If you have any questions regarding our privacy practices or wish to update your information, please contact us at <strong>svinayaklaundry@gmail.com</strong> or via WhatsApp.</p>
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
    </footer>
  );
};

export default Footer;
