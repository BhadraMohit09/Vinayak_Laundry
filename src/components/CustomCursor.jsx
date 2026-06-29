import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [ripples, setRipples] = useState([]);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mediaQuery.matches);
    const handleMediaChange = (e) => setIsFinePointer(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleClick = (e) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <>
      <style>{`
        @keyframes rippleExpand {
          0% { transform: translate(-50%, -50%) scale(0.2); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
        }
      `}</style>

      {/* Subtle Ambient Mouse Spotlight Glow (Keeps native pointer visible for 100% ease of use) */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) translate(-50%, -50%)`,
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(67, 56, 202, 0.045) 0%, rgba(14, 165, 233, 0.02) 40%, rgba(255,255,255,0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9990,
          transition: 'transform 0.08s linear'
        }}
      />

      {/* Click Interactive Ripples */}
      {ripples.map((r) => (
        <div
          key={r.id}
          style={{
            position: 'fixed',
            top: r.y,
            left: r.x,
            width: '36px',
            height: '36px',
            border: '1.5px solid rgba(67, 56, 202, 0.4)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 99999,
            animation: 'rippleExpand 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
