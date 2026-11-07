import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, CalendarDays, Home, Shirt, Building2, CircleHelp, Phone, Search } from 'lucide-react';

const links = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Services', path: '/services', icon: Shirt },
  { name: 'Commercial', path: '/commercial', icon: Building2 },
  { name: 'FAQ', path: '/faq', icon: CircleHelp },
  { name: 'Contact', path: '/contact', icon: Phone },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll state & progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 20);
      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll on mobile when drawer is open & handle Esc key
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  // Close drawer on navigation
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <Link to="/" className="wordmark" aria-label="Siddhi Vinayak Laundry home">
          <img src="/assets/logo-small.png" alt="" className="wordmark-logo" />
          <span className="wordmark-text">Siddhi Vinayak<em>Laundry</em></span>
        </Link>

        {/* Center Navigation */}
        <nav className="site-nav" aria-label="Main navigation">
          {links.map(({ name, path }) => (
            <Link
              key={path}
              className={location.pathname === path ? 'is-active' : ''}
              to={path}
            >
              {name}
            </Link>
          ))}
        </nav>

        {/* Right Portion: Book pickup CTA */}
        <div className="header-actions">
          <Link to="/contact" className="header-cta">
            <CalendarDays size={15} />
            <span className="cta-full-label">Book pickup</span>
            <span className="cta-short-label">Book</span>
          </Link>
        </div>
      </header>

      {/* Mobile Floating Bottom Dock */}
      <nav className="bottom-dock" aria-label="Bottom mobile dock">
        {links.map(({ name, path, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={location.pathname === path ? 'is-active' : ''}
          >
            <Icon size={18} />
            <span>{name}</span>
          </Link>
        ))}
      </nav>
    </>
  );
};

export default Navbar;


