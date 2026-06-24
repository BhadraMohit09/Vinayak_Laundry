import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(12px)',
      borderTop: '1px solid var(--border-color)',
      padding: '4rem 0 2rem 0',
      marginTop: 'auto'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
        gap: '3rem',
        marginBottom: '3rem'
      }}>
        {/* Brand */}
        <div>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <img src="/assets/logo.png" alt="Siddhi Vinayak Laundry Logo" style={{ height: '50px', borderRadius: '8px' }} />
            <div style={{
              background: 'linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '700',
              fontSize: '1.5rem',
              letterSpacing: '0.5px'
            }}>
              Siddhi Vinayak
            </div>
          </Link>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Next-generation garment care. We combine advanced fabric science with premium service to deliver unparalleled results.
          </p>
          <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <span>Follow us on social media for updates.</span>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: '600' }}>Quick Links</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <li><Link to="/about" style={{ color: 'var(--text-secondary)' }}>About Us</Link></li>
            <li><Link to="/services" style={{ color: 'var(--text-secondary)' }}>Our Services</Link></li>
            <li><Link to="/commercial" style={{ color: 'var(--text-secondary)' }}>Commercial Solutions</Link></li>
            <li><Link to="/faq" style={{ color: 'var(--text-secondary)' }}>FAQ</Link></li>
            <li><Link to="/blog" style={{ color: 'var(--text-secondary)' }}>Fabric Care Blog</Link></li>
            <li><Link to="/contact" style={{ color: 'var(--text-secondary)' }}>Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: '600' }}>Contact Us</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', gap: '0.8rem', color: 'var(--text-secondary)' }}>
              <MapPin size={20} style={{ color: 'var(--accent-secondary)', flexShrink: 0 }} />
              <span>Jamnagar, Gujarat, India</span>
            </li>
            <li style={{ display: 'flex', gap: '0.8rem' }}>
              <Phone size={20} style={{ color: 'var(--accent-secondary)', flexShrink: 0 }} />
              <a href="tel:+919924787882" style={{ color: 'var(--text-secondary)' }}>+91 9924787882</a>
            </li>
            <li style={{ display: 'flex', gap: '0.8rem' }}>
              <MessageCircle size={20} style={{ color: '#25D366', flexShrink: 0 }} />
              <a href="https://wa.me/918780570242?text=Hello%20Siddhi%20Vinayak%20Laundry,%20I%20would%20like%20to%20inquire%20about%20your%20services." target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}>WhatsApp Us</a>
            </li>
            <li style={{ display: 'flex', gap: '0.8rem' }}>
              <Mail size={20} style={{ color: 'var(--accent-secondary)', flexShrink: 0 }} />
              <a href="mailto:svinayaklaundry@gmail.com" style={{ color: 'var(--text-secondary)', wordBreak: 'break-all' }}>svinayaklaundry@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container" style={{
        borderTop: '1px solid var(--border-color)',
        paddingTop: '2rem',
        textAlign: 'center',
        color: 'var(--text-secondary)',
        fontSize: '0.9rem'
      }}>
        <p>&copy; {new Date().getFullYear()} Siddhi Vinayak Laundry. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
