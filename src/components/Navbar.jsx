import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, GripHorizontal, Sparkles, Home as HomeIcon, Info, Briefcase, BookOpen, HelpCircle, PhoneCall, ArrowRight } from 'lucide-react';

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

  useEffect(() => {
    const randomTagline = taglines[Math.floor(Math.random() * taglines.length)];
    setCurrentTagline(randomTagline);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Services', path: '/services', icon: Sparkles },
    { name: 'Commercial', path: '/commercial', icon: Briefcase },
    { name: 'Blog', path: '/blog', icon: BookOpen },
    { name: 'FAQ', path: '/faq', icon: HelpCircle },
    { name: 'Contact', path: '/contact', icon: PhoneCall },
  ];

  return (
    <div style={{ position: 'fixed', width: '100%', display: 'flex', justifyContent: 'center', zIndex: 1000, top: 0 }}>
      <nav className="navbar-container" style={{
        marginTop: '1.2rem',
        width: '92%',
        maxWidth: '1200px',
        borderRadius: '50px',
        border: '1px solid rgba(0,0,0,0.06)',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.08)',
        position: 'relative',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'nowrap' }}>
          {/* Brand Logo & Clean Tagline */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', textDecoration: 'none', minWidth: 0 }}>
            <img src="/assets/logo-small.png" alt="Siddhi Vinayak Laundry Logo" width="40" height="40" fetchpriority="high" style={{ height: '40px', width: '40px', borderRadius: '8px', objectFit: 'contain', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2', minWidth: 0 }}>
              <span className="brand-title" style={{
                background: 'linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '800',
                letterSpacing: '0.3px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                Siddhi Vinayak
              </span>
              <span className="brand-tagline" style={{ 
                fontSize: '0.65rem', 
                color: 'var(--text-secondary)', 
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap'
              }}>
                {currentTagline}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (Restored exactly to original laptop view preference) */}
          <div className="desktop-nav">
            <ul style={{ display: 'flex', gap: '1.8rem', listStyle: 'none', margin: 0, padding: 0 }}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="nav-link"
                    style={{
                      color: location.pathname === link.path ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      fontWeight: location.pathname === link.path ? '600' : '500',
                      transition: 'color 0.2s',
                      fontSize: '0.95rem',
                      textDecoration: 'none'
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="desktop-nav">
             <Link to="/contact" className="btn-primary" style={{ padding: '0.5rem 1.3rem', fontSize: '0.9rem', borderRadius: '30px' }}>
                Book Now
             </Link>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="mobile-toggle" style={{ cursor: 'pointer', flexShrink: 0, marginLeft: '0.5rem' }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <div style={{
              background: isMobileMenuOpen ? 'rgba(67, 56, 202, 0.1)' : 'rgba(0,0,0,0.05)',
              padding: '0.55rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isMobileMenuOpen ? 'var(--accent-primary)' : 'var(--text-primary)',
              transition: 'all 0.3s'
            }}>
              {isMobileMenuOpen ? <X size={22} /> : <GripHorizontal size={22} />}
            </div>
          </div>
        </div>

        {/* Unique Responsive Collapsed Menu for Mobile (No AI buzzwords) */}
        {isMobileMenuOpen && (
          <div style={{
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.7rem',
            animation: 'fadeIn 0.2s ease-out'
          }} className="mobile-toggle">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 0.9rem',
                      borderRadius: '14px',
                      background: isActive ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' : 'rgba(0,0,0,0.03)',
                      color: isActive ? '#ffffff' : 'var(--text-primary)',
                      fontWeight: isActive ? '700' : '600',
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Icon size={16} style={{ color: isActive ? '#ffffff' : 'var(--accent-primary)' }} />
                      <span>{link.name}</span>
                    </div>
                    <ArrowRight size={14} style={{ opacity: isActive ? 1 : 0.4 }} />
                  </Link>
                );
              })}
            </div>

            <Link 
              to="/contact" 
              className="btn-primary" 
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', borderRadius: '14px', fontWeight: '700', fontSize: '0.95rem', marginTop: '0.3rem' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Book Pickup Now</span>
            </Link>
          </div>
        )}
      </nav>

      <style>{`
        .navbar-container {
          padding: 0.8rem 1.8rem;
        }
        .brand-title {
          font-size: 1.25rem;
        }
        @media (max-width: 850px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
          .navbar-container {
            padding: 0.6rem 1rem;
            border-radius: 26px;
          }
          .brand-title {
            font-size: 1.05rem;
          }
          .brand-tagline {
            font-size: 0.58rem !important;
          }
        }
        @media (min-width: 851px) {
          .desktop-nav { display: block !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Navbar;
