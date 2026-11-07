import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import WhatsAppFloat from './components/WhatsAppFloat';

import ErrorBoundary from './components/ErrorBoundary';
import SVLChatbot from './components/SVLChatbot';
import SplashScreen from './components/SplashScreen';
import { useScrollReveal } from './utils/useScrollReveal';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Lazy load routes
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Commercial = lazy(() => import('./pages/Commercial'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Blog = lazy(() => import('./pages/Blog'));

const routeTitles = {
  '/': "Jamnagar's Most Trusted Laundry Service | Siddhi Vinayak Laundry",
  '/services': "Garment Care & Dry Cleaning Services | Siddhi Vinayak Laundry Jamnagar",
  '/commercial': "B2B & Commercial Linen Care Contracts | Siddhi Vinayak Laundry Jamnagar",
  '/about': "Our Fabric Science Philosophy | Siddhi Vinayak Laundry Jamnagar",
  '/faq': "Frequently Asked Questions & Care Guide | Siddhi Vinayak Laundry Jamnagar",
  '/blog': "Fabric Insights & Garment Care Journal | Siddhi Vinayak Laundry Jamnagar",
  '/contact': "Book Doorstep Pickup & Contact | Siddhi Vinayak Laundry Jamnagar",
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useScrollReveal();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = routeTitles[pathname] || "Jamnagar's Most Trusted Laundry Service | Siddhi Vinayak Laundry";
  }, [pathname]);
  return null;
};

function App() {
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem('svl_splash_shown'));

  const handleSplashFinish = () => {
    sessionStorage.setItem('svl_splash_shown', 'true');
    setShowSplash(false);
  };

  return (
    <Router>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <ErrorBoundary>
            <Suspense fallback={<div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/commercial" element={<Commercial />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blog" element={<Blog />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
        <SVLChatbot />
        <WhatsAppFloat />
        <Analytics />
        <SpeedInsights />
      </div>
    </Router>
  );
}

export default App;
