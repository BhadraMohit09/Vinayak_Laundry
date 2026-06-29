import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, GripHorizontal, Sparkles, Home as HomeIcon, Info, Briefcase, BookOpen, HelpCircle, PhoneCall, Zap, ArrowRight } from 'lucide-react';

const taglines = [
  "Premium Garment Care",
  "AI-Powered Clean",
  "Jamnagar's VIP Laundry",
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
    { name: 'Services', path: '/services', icon: Sparkles, badge: 'AI Care' },
    { name: 'Commercial', path: '/commercial', icon: Briefcase, badge: 'VIP' },
    { name: 'Blog', path: '/blog', icon: BookOpen },
    { name: 'FAQ', path: '/faq', icon: HelpCircle },
    { name: 'Contact', path: '/contact', icon: PhoneCall },
  ];

  return (
    <div style={{ position: 'fixed', width: '100%', display: 'flex', justifyContent: 'center', zIndex: 1000, top: 0 }}>
      <nav style={{
        marginTop: '1.2rem',
        width: '94%',
        maxWidth: '1280px',
        padding: '0.7rem 1.4rem',
        borderRadius: '24px',
        border: '1px solid rgba(67, 56, 202, 0.15)',
        background: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 12px 35px -10px rgba(28, 25, 23, 0.08), 0 4px 12px -2px rgba(67, 56, 202, 0.05)',
        position: 'relative',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Brand Logo & AI Hub Tagline */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none' }}>
            <div style={{ position: 'relative' }}>
              <img src="/assets/logo-small.png" alt="Siddhi Vinayak Laundry Logo" width="42" height="42" fetchpriority="high" style={{ height: '42px', width: '42px', borderRadius: '10px', objectFit: 'contain' }} />
              <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '10px', height: '10px', background: '#059669', borderRadius: '50%', border: '2px solid white' }} title="Online & Ready" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.15' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{
                  color: '#1c1917',
                  fontWeight: '800',
                  fontSize: '1.15rem',
                  letterSpacing: '0.3px',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  Siddhi <span style={{ color: '#4338ca' }}>Vinayak</span>
                </span>
                <span style={{
                  background: 'rgba(67, 56, 202, 0.1)',
                  color: '#4338ca',
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '20px',
                  letterSpacing: '0.5px'
                }}>
                  HUB
                </span>
              </div>
              <span style={{ 
                fontSize: '0.7rem', 
                color: '#57534e', 
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.8px'
              }}>
                {currentTagline}
              </span>
            </div>
          </Link>

          {/* Modern AI Tech Hub Desktop Nav Links */}
          <div className="desktop-nav">
            <ul style={{ display: 'flex', gap: '0.4rem', listStyle: 'none', margin: 0, padding: '0.2rem', background: 'rgba(28, 25, 23, 0.03)', borderRadius: '50px', border: '1px solid rgba(28, 25, 23, 0.05)' }}>
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.45rem 0.9rem',
                        borderRadius: '40px',
                        color: isActive ? '#ffffff' : '#57534e',
                        background: isActive ? 'linear-gradient(135deg, #4338ca, #0284c7)' : 'transparent',
                        fontWeight: isActive ? '700' : '600',
                        fontSize: '0.88rem',
                        textDecoration: 'none',
                        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: isActive ? '0 4px 12px rgba(67, 56, 202, 0.25)' : 'none'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = '#1c1917';
                          e.currentTarget.style.background = 'rgba(28, 25, 23, 0.06)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = '#57534e';
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      <Icon size={15} style={{ opacity: isActive ? 1 : 0.7 }} />
                      <span>{link.name}</span>
                      {link.badge && (
                        <span style={{
                          fontSize: '0.62rem',
                          background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(2, 132, 199, 0.15)',
                          color: isActive ? '#ffffff' : '#0284c7',
                          padding: '0.1rem 0.4rem',
                          borderRadius: '12px',
                          fontWeight: '800'
                        }}>
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          
          <div className="desktop-nav">
             <Link to="/contact" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 1.25rem', fontSize: '0.88rem', borderRadius: '30px' }}>
                <Zap size={15} />
                <span>Quick Book</span>
             </Link>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="mobile-toggle" style={{ cursor: 'pointer' }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <div style={{
              background: isMobileMenuOpen ? 'rgba(67, 56, 202, 0.1)' : 'rgba(28, 25, 23, 0.05)',
              padding: '0.6rem',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isMobileMenuOpen ? '#4338ca' : '#1c1917',
              transition: 'all 0.3s'
            }}>
              {isMobileMenuOpen ? <X size={22} /> : <GripHorizontal size={22} />}
            </div>
          </div>
        </div>

        {/* Futuristic Glass Command Tray for Mobile */}
        {isMobileMenuOpen && (
          <div style={{
            marginTop: '1.2rem',
            paddingTop: '1.2rem',
            borderTop: '1px solid rgba(28, 25, 23, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            animation: 'fadeIn 0.25s ease-out'
          }} className="mobile-toggle">
            {/* Live Facility Status Banner */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.6rem 1rem',
              background: 'rgba(5, 150, 105, 0.08)',
              border: '1px solid rgba(5, 150, 105, 0.2)',
              borderRadius: '12px',
              fontSize: '0.78rem',
              color: '#065f46',
              fontWeight: '600'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', background: '#059669', borderRadius: '50%', animation: 'splashPulse 1.5s infinite' }} />
                Jamnagar AI Plant Live & Active
              </span>
              <span style={{ fontWeight: '800' }}>⚡ Fast Wash</span>
            </div>

            {/* Grid of Command Links */}
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
                      padding: '0.8rem 1rem',
                      borderRadius: '16px',
                      background: isActive ? 'linear-gradient(135deg, #4338ca, #0284c7)' : 'rgba(28, 25, 23, 0.03)',
                      border: isActive ? 'none' : '1px solid rgba(28, 25, 23, 0.06)',
                      color: isActive ? '#ffffff' : '#1c1917',
                      fontWeight: isActive ? '700' : '600',
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <Icon size={18} style={{ color: isActive ? '#ffffff' : '#4338ca' }} />
                      <span>{link.name}</span>
                    </div>
                    <ArrowRight size={14} style={{ opacity: isActive ? 1 : 0.4 }} />
                  </Link>
                );
              })}
            </div>

            {/* Mobile Action CTA */}
            <Link 
              to="/contact" 
              className="btn-primary" 
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', padding: '0.8rem', borderRadius: '16px', fontWeight: '700', fontSize: '1rem' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Zap size={18} />
              <span>Instant AI Booking & Pickup</span>
            </Link>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        @media (min-width: 901px) {
          .desktop-nav { display: block !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Navbar;
