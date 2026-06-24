import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, GripHorizontal } from 'lucide-react';

const taglines = [
  "Premium Garment Care",
  "The Future of Laundry",
  "Affordable Excellence",
  "Flawless Clean Every Time",
  "Advanced Fabric Science",
  "Your Clothes, Renewed"
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTagline, setCurrentTagline] = useState(taglines[0]);
  const location = useLocation();

  // Handle Random Tagline on Route Change
  useEffect(() => {
    const randomTagline = taglines[Math.floor(Math.random() * taglines.length)];
    setCurrentTagline(randomTagline);
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Commercial', path: '/commercial' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div style={{ position: 'fixed', width: '100%', display: 'flex', justifyContent: 'center', zIndex: 1000, top: 0 }}>
      <nav style={{
        marginTop: '2rem',
        width: '90%',
        maxWidth: '1200px',
        padding: '0.8rem 1.5rem',
        borderRadius: '50px',
        border: '1px solid rgba(0,0,0,0.05)',
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.08)',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none' }}>
            <img src="/assets/logo-small.png" alt="Siddhi Vinayak Laundry Logo" width="40" height="40" fetchpriority="high" style={{ height: '40px', width: '40px', borderRadius: '8px', objectFit: 'contain' }} />
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              lineHeight: '1.2'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '800',
                fontSize: '1.2rem',
                letterSpacing: '0.5px',
              }}>
                Siddhi Vinayak
              </span>
              <span style={{ 
                fontSize: '0.65rem', 
                color: 'var(--text-secondary)', 
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {currentTagline}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="desktop-nav">
            <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="nav-link"
                    style={{
                      color: location.pathname === link.path ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      fontWeight: location.pathname === link.path ? '600' : '500',
                      transition: 'color 0.2s',
                      fontSize: '0.95rem'
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="desktop-nav">
             <Link to="/contact" className="btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
                Book Now
             </Link>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="mobile-toggle" style={{ cursor: 'pointer' }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <div style={{
              background: 'rgba(0,0,0,0.05)',
              padding: '0.5rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isMobileMenuOpen ? 'var(--accent-primary)' : 'var(--text-primary)',
              transition: 'all 0.3s'
            }}>
              {isMobileMenuOpen ? <X size={24} /> : <GripHorizontal size={24} />}
            </div>
          </div>
        </div>

        {/* Inline Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div style={{
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
            animation: 'fadeIn 0.2s ease-out'
          }} className="mobile-toggle">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  color: location.pathname === link.path ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontWeight: location.pathname === link.path ? '700' : '500',
                  fontSize: '1rem',
                  display: 'block',
                  padding: '0.5rem 0.5rem',
                  textDecoration: 'none'
                }}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/contact" 
              className="btn-primary" 
              style={{ textAlign: 'center', marginTop: '0.5rem', marginBottom: '0.5rem' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Now
            </Link>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        @media (min-width: 769px) {
          .desktop-nav { display: block !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Navbar;
