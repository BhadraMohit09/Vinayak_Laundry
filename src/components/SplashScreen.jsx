import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onFinish }) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Trigger fade out after 1.8 seconds
    const timer = setTimeout(() => {
      setIsFading(true);
    }, 1800);

    // Inform parent component to unmount after transition finishes
    const removeTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2400);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#0f172a', /* Deep Midnight Slate */
      zIndex: 999999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: isFading ? 0 : 1,
      visibility: isFading ? 'hidden' : 'visible',
      transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s ease',
      pointerEvents: isFading ? 'none' : 'auto'
    }}>
      {/* Glowing Golden Logo Wrapper */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2rem',
        animation: 'splashPulse 2s infinite ease-in-out'
      }}>
        <div style={{
          position: 'absolute',
          width: '130px',
          height: '130px',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(12px)'
        }} />
        <img 
          src="/assets/logo-small.png" 
          alt="Siddhi Vinayak Laundry" 
          style={{ 
            width: '85px', 
            height: '85px', 
            objectFit: 'contain', 
            position: 'relative',
            zIndex: 1,
            filter: 'drop-shadow(0 4px 15px rgba(245, 158, 11, 0.45))'
          }} 
        />
      </div>

      {/* Brand Name */}
      <h1 style={{
        color: '#ffffff',
        fontSize: '2rem',
        fontWeight: '800',
        letterSpacing: '1px',
        margin: '0 0 0.5rem 0',
        textAlign: 'center',
        fontFamily: "'Inter', sans-serif"
      }}>
        SIDDHI <span style={{ color: '#f59e0b' }}>VINAYAK</span>
      </h1>
      <p style={{
        color: '#94a3b8',
        fontSize: '0.85rem',
        textTransform: 'uppercase',
        letterSpacing: '3.5px',
        fontWeight: '600',
        margin: 0,
        fontFamily: "'Inter', sans-serif"
      }}>
        Premium Garment Care
      </p>

      {/* Golden Progress Bar Loader */}
      <div style={{
        width: '160px',
        height: '3px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '3px',
        overflow: 'hidden',
        marginTop: '2.5rem'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, #f59e0b, #d97706)',
          animation: 'splashProgress 1.8s ease-in-out forwards'
        }} />
      </div>
    </div>
  );
};

export default SplashScreen;
