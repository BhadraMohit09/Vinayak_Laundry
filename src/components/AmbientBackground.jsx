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
      overflow: 'hidden'
    }}>
      <style>{`
        @keyframes floatOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(5%, 8%) scale(1.08); }
          66% { transform: translate(-4%, 4%) scale(0.95); }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-6%, -6%) scale(0.92); }
          66% { transform: translate(6%, -3%) scale(1.06); }
        }
        @keyframes floatOrb3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(4%, -8%) scale(1.05); }
        }
        @keyframes bubbleRise1 {
          0% { transform: translateY(110vh) scale(0.8); opacity: 0; }
          20% { opacity: 0.35; }
          80% { opacity: 0.35; }
          100% { transform: translateY(-10vh) scale(1.1); opacity: 0; }
        }
        @keyframes bubbleRise2 {
          0% { transform: translateY(110vh) scale(0.6); opacity: 0; }
          30% { opacity: 0.25; }
          70% { opacity: 0.25; }
          100% { transform: translateY(-10vh) scale(1.3); opacity: 0; }
        }
      `}</style>

      {/* Primary Cyan/Cerulean Orb */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        left: '-10%',
        width: '50vw',
        height: '50vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, rgba(255,255,255,0) 70%)',
        filter: 'blur(90px)',
        animation: 'floatOrb1 25s ease-in-out infinite'
      }} />

      {/* Secondary Indigo/Violet Orb */}
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '-12%',
        width: '55vw',
        height: '55vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(255,255,255,0) 70%)',
        filter: 'blur(110px)',
        animation: 'floatOrb2 28s ease-in-out infinite'
      }} />

      {/* Tertiary Teal/Aqua Orb */}
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '20%',
        width: '45vw',
        height: '45vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(20, 184, 166, 0.09) 0%, rgba(255,255,255,0) 70%)',
        filter: 'blur(100px)',
        animation: 'floatOrb3 22s ease-in-out infinite'
      }} />

      {/* Subtle Rising Laundry Soap Micro-Bubbles */}
      <div style={{
        position: 'absolute',
        left: '15%',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        border: '1px solid rgba(14, 165, 233, 0.3)',
        background: 'rgba(14, 165, 233, 0.05)',
        backdropFilter: 'blur(1px)',
        animation: 'bubbleRise1 18s linear infinite',
        animationDelay: '0s'
      }} />
      <div style={{
        position: 'absolute',
        left: '45%',
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        border: '1px solid rgba(99, 102, 241, 0.25)',
        background: 'rgba(99, 102, 241, 0.04)',
        animation: 'bubbleRise2 22s linear infinite',
        animationDelay: '6s'
      }} />
      <div style={{
        position: 'absolute',
        left: '78%',
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        border: '1px solid rgba(20, 184, 166, 0.25)',
        background: 'rgba(20, 184, 166, 0.04)',
        backdropFilter: 'blur(1px)',
        animation: 'bubbleRise1 25s linear infinite',
        animationDelay: '12s'
      }} />
    </div>
  );
};

export default AmbientBackground;
