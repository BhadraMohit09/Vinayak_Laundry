import React from 'react';

const AmbientBackground = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden',
      backgroundColor: '#faf9f6'
    }}>
      <style>{`
        @keyframes ambientBreathe {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.05); }
        }
        @keyframes driftGradient {
          0%, 100% { transform: translate(0%, 0%); }
          50% { transform: translate(3%, -3%); }
        }
      `}</style>

      {/* Minimalist Architectural Dot Matrix Grid */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'radial-gradient(rgba(28, 25, 23, 0.055) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        opacity: 0.85
      }} />

      {/* Subtle Atmospheric Warm & Cool Light Sheen */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '10%',
        width: '80vw',
        height: '80vh',
        background: 'radial-gradient(ellipse at center, rgba(67, 56, 202, 0.035) 0%, rgba(14, 165, 233, 0.025) 45%, rgba(255, 255, 255, 0) 75%)',
        filter: 'blur(80px)',
        animation: 'ambientBreathe 16s ease-in-out infinite'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '10%',
        width: '70vw',
        height: '70vh',
        background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.03) 0%, rgba(20, 184, 166, 0.025) 50%, rgba(255, 255, 255, 0) 80%)',
        filter: 'blur(90px)',
        animation: 'driftGradient 20s ease-in-out infinite'
      }} />
    </div>
  );
};

export default AmbientBackground;
