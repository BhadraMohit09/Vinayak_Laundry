import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Sparkles, ArrowUpRight, Zap, ShieldCheck, Clock, Award } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

const Footer = () => {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, rgba(250, 249, 246, 0.4) 0%, rgba(240, 238, 233, 0.9) 100%)',
      borderTop: '1px solid rgba(28, 25, 23, 0.08)',
      paddingTop: '4rem',
      marginTop: 'auto',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Subtle Gradient Glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(67, 56, 202, 0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Out-of-the-Box AI Pre-Footer Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #1c1917 0%, #312e2b 100%)',
          borderRadius: '28px',
          padding: '2.5rem',
          color: '#ffffff',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
          boxShadow: '0 20px 40px -15px rgba(28, 25, 23, 0.25)',
          marginBottom: '4rem',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ maxWidth: '600px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(67, 56, 202, 0.4)', border: '1px solid rgba(129, 140, 248, 0.3)', padding: '0.4rem 0.9rem', borderRadius: '30px', fontSize: '0.8rem', fontWeight: '700', color: '#e0e7ff', marginBottom: '1rem' }}>
              <Sparkles size={14} />
              <span>Jamnagar's #1 AI-Tuned Garment Care</span>
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', lineHeight: '1.25', marginBottom: '0.8rem', fontFamily: "'Inter', sans-serif" }}>
              Ready to give your wardrobe the royal treatment it deserves?
            </h3>
            <p style={{ color: '#a8a29e', fontSize: '0.95rem', margin: 0 }}>
              Join hundreds of VIP families and commercial businesses across Jamnagar experiencing spotless luxury and 24-hour express turnaround.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <Link to="/contact" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'linear-gradient(135deg, #4338ca, #0284c7)', color: 'white', padding: '0.9rem 1.8rem', borderRadius: '50px', fontWeight: '700', textDecoration: 'none', boxShadow: '0 8px 20px rgba(67, 56, 202, 0.4)', transition: 'all 0.3s' }} className="hover-scale">
              <Zap size={18} />
              <span>Book AI Pickup</span>
            </Link>
            <a href="https://wa.me/916351674100?text=Hello%20Siddhi%20Vinayak%20Laundry,%20I%20would%20like%20to%20inquire%20about%20your%20services." target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '0.9rem 1.6rem', borderRadius: '50px', fontWeight: '600', textDecoration: 'none', transition: 'all 0.3s' }}>
              <WhatsAppIcon size={18} color="#25D366" />
              <span>WhatsApp VIP</span>
            </a>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: '3.5rem',
          marginBottom: '3.5rem'
        }}>
          {/* Brand & Mission */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none', marginBottom: '1.2rem' }}>
              <img src="/assets/logo-small.png" alt="Siddhi Vinayak Laundry Logo" style={{ height: '46px', width: '46px', borderRadius: '12px', objectFit: 'contain', boxShadow: '0 4px 10px rgba(0,0,0,0.06)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
                <span style={{ fontWeight: '800', fontSize: '1.4rem', color: '#1c1917', fontFamily: "'Inter', sans-serif" }}>
                  Siddhi <span style={{ color: '#4338ca' }}>Vinayak</span>
                </span>
                <span style={{ fontSize: '0.7rem', color: '#0284c7', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '0.2rem' }}>
                  AI Garment Lab
                </span>
              </div>
            </Link>
            <p style={{ color: '#57534e', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Next-generation fabric care powered by eco-solvent science and automated precision. We protect delicate weaves while restoring vibrant freshness.
            </p>
            
            {/* Live Plant Telemetry Badge */}
            <div style={{ padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(28,25,23,0.08)', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '700', color: '#1c1917' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '6px', height: '6px', background: '#059669', borderRadius: '50%' }} />
                  Plant Status: Optimal
                </span>
                <span style={{ color: '#0284c7' }}>99.8% Quality Score</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.72rem', color: '#78716c' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={12} /> Express 24h</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><ShieldCheck size={12} /> 100% Insured</span>
              </div>
            </div>
          </div>

          {/* Quick Links with Arrow Hover */}
          <div>
            <h4 style={{ color: '#1c1917', marginBottom: '1.4rem', fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.3px' }}>Explore Hub</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', padding: 0, margin: 0 }}>
              {[
                { name: 'About Our Lab', path: '/about' },
                { name: 'AI Services & Menu', path: '/services' },
                { name: 'Commercial VIP Plans', path: '/commercial' },
                { name: 'Frequently Asked Questions', path: '/faq' },
                { name: 'Fabric Care Intelligence', path: '/blog' },
                { name: 'Schedule Pickup', path: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#57534e', textDecoration: 'none', fontSize: '0.92rem', fontWeight: '500', transition: 'all 0.2s', padding: '0.3rem 0' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#4338ca'; e.currentTarget.style.transform = 'translateX(4px)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#57534e'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                    <span>{item.name}</span>
                    <ArrowUpRight size={14} style={{ opacity: 0.5 }} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact & Location */}
          <div>
            <h4 style={{ color: '#1c1917', marginBottom: '1.4rem', fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.3px' }}>VIP Contact</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.1rem', padding: 0, margin: 0 }}>
              <li style={{ display: 'flex', gap: '0.8rem', color: '#57534e', fontSize: '0.92rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.5rem', background: 'rgba(67, 56, 202, 0.08)', borderRadius: '10px', color: '#4338ca' }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <strong style={{ color: '#1c1917', display: 'block', fontSize: '0.85rem' }}>Facility Address</strong>
                  <span>Jamnagar, Gujarat, India</span>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '0.8rem', color: '#57534e', fontSize: '0.92rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.5rem', background: 'rgba(2, 132, 199, 0.08)', borderRadius: '10px', color: '#0284c7' }}>
                  <Phone size={18} />
                </div>
                <div>
                  <strong style={{ color: '#1c1917', display: 'block', fontSize: '0.85rem' }}>Direct Line & SMS</strong>
                  <a href="tel:+916351674100" style={{ color: '#57534e', textDecoration: 'none', fontWeight: '600' }}>+91 6351674100</a>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '0.8rem', color: '#57534e', fontSize: '0.92rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.5rem', background: 'rgba(37, 211, 102, 0.1)', borderRadius: '10px' }}>
                  <WhatsAppIcon size={18} color="#25D366" />
                </div>
                <div>
                  <strong style={{ color: '#1c1917', display: 'block', fontSize: '0.85rem' }}>WhatsApp Care</strong>
                  <a href="https://wa.me/916351674100?text=Hello%20Siddhi%20Vinayak%20Laundry,%20I%20would%20like%20to%20inquire%20about%20your%20services." target="_blank" rel="noopener noreferrer" style={{ color: '#15803d', textDecoration: 'none', fontWeight: '600' }}>Instant Chat Support</a>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '0.8rem', color: '#57534e', fontSize: '0.92rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.5rem', background: 'rgba(67, 56, 202, 0.08)', borderRadius: '10px', color: '#4338ca' }}>
                  <Mail size={18} />
                </div>
                <div>
                  <strong style={{ color: '#1c1917', display: 'block', fontSize: '0.85rem' }}>Electronic Mail</strong>
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
          <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Siddhi Vinayak Laundry. Built with AI-Tuned Precision.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Award size={14} color="#4338ca" /> Jamnagar Excellence</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
