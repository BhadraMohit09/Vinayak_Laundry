import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const taglines = [
  "Premium Garment Care",
  "The Future of Laundry",
  "Affordable Excellence",
  "Flawless Clean Every Time",
  "Advanced Fabric Science",
  "Your Clothes, Renewed"
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTagline, setCurrentTagline] = useState(taglines[0]);
  const location = useLocation();

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: isScrolled ? '1rem' : '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '1200px',
        zIndex: 1000,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: '0.8rem 1.5rem',
        borderRadius: '50px', // Persistent border radius fixes the "rectangle" glitch
        border: isScrolled ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent',
        background: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
        boxShadow: isScrolled ? '0 10px 30px -10px rgba(0,0,0,0.08)' : 'none'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <img src="/assets/logo.png" alt="Siddhi Vinayak Laundry Logo" style={{ height: '40px', borderRadius: '8px' }} />
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
            <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
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
          <div className="mobile-toggle" style={{ cursor: 'pointer', color: 'var(--text-primary)', display: 'flex', alignItems: 'center' }} onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={28} />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Modernized */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '3rem' }}>
            <div onClick={() => setIsMobileMenuOpen(false)} style={{ cursor: 'pointer', padding: '0.5rem', background: 'rgba(0,0,0,0.05)', borderRadius: '50%' }}>
              <X size={28} color="var(--text-primary)" />
            </div>
          </div>

          <ul style={{ display: 'flex', flexDirection: 'column', gap: '2rem', listStyle: 'none', padding: 0 }}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  style={{
                    color: location.pathname === link.path ? 'var(--accent-primary)' : 'var(--text-primary)',
                    fontWeight: '700',
                    fontSize: '2rem',
                    display: 'block'
                  }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li style={{ marginTop: '2rem' }}>
                <Link to="/contact" className="btn-primary" style={{ width: '100%', fontSize: '1.2rem', padding: '1rem' }}>
                    Book Now
                </Link>
            </li>
          </ul>
          
          <div style={{ marginTop: 'auto', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <p>Jamnagar, Gujarat</p>
            <p>+91 9924787882</p>
          </div>
        </div>
      )}

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
    </>
  );
};

export default Navbar;
