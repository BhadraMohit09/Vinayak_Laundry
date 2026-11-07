import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CalendarDays, Home, Shirt, Building2, CircleHelp, Phone } from 'lucide-react';
import BookPickupModal from './BookPickupModal';
import ToastNotification from './ToastNotification';

const links = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Services', path: '/services', icon: Shirt },
  { name: 'Commercial', path: '/commercial', icon: Building2 },
  { name: 'FAQ', path: '/faq', icon: CircleHelp },
  { name: 'Contact', path: '/contact', icon: Phone },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeToast, setActiveToast] = useState(null);
  const location = useLocation();

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

        {/* Right Portion: Book pickup CTA button opening modal */}
        <div className="header-actions">
          <button
            type="button"
            onClick={() => setIsBookingOpen(true)}
            className="header-cta"
            aria-label="Book instant pickup"
          >
            <CalendarDays size={15} />
            <span className="cta-full-label">Book pickup</span>
            <span className="cta-short-label">Book</span>
          </button>
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

      {/* Instant Pickup Booking Modal */}
      <BookPickupModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onSuccessToast={(toastData) => setActiveToast(toastData)}
      />

      {/* Floating Unique Toast Notification */}
      <ToastNotification
        toast={activeToast}
        onClose={() => setActiveToast(null)}
      />
    </>
  );
};

export default Navbar;


