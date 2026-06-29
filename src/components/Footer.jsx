import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ArrowUpRight, ShieldCheck, Clock, Award } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

const Footer = () => {
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
          <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Siddhi Vinayak Laundry. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Award size={14} color="var(--accent-primary)" /> Premium Care</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
