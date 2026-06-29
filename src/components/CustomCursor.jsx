import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Instant dot position
  const dotPos = useRef({ x: -100, y: -100 });
  const [dotRenderPos, setDotRenderPos] = useState({ x: -100, y: -100 });

  // Smooth halo position
  const haloPos = useRef({ x: -100, y: -100 });
  const [haloRenderPos, setHaloRenderPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    // Check if device uses fine pointer (mouse/trackpad)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mediaQuery.matches);

    const handleMediaChange = (e) => setIsFinePointer(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    const handleMouseMove = (e) => {
      dotPos.current = { x: e.clientX, y: e.clientY };
      setDotRenderPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, input, textarea, select, [role="button"], .interactive-cursor');
      setIsHovered(!!target);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    // Animation frame for smooth halo follow
    let animationFrameId;
    const updateHalo = () => {
      const dx = dotPos.current.x - haloPos.current.x;
      const dy = dotPos.current.y - haloPos.current.y;
      
      haloPos.current.x += dx * 0.18;
      haloPos.current.y += dy * 0.18;

      setHaloRenderPos({ x: haloPos.current.x, y: haloPos.current.y });
      animationFrameId = requestAnimationFrame(updateHalo);
    };
    animationFrameId = requestAnimationFrame(updateHalo);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Central exact dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: `translate3d(${dotRenderPos.x}px, ${dotRenderPos.y}px, 0) translate(-50%, -50%) scale(${clicked ? 0.6 : isHovered ? 1.4 : 1})`,
          width: '8px',
          height: '8px',
          backgroundColor: isHovered ? '#6366f1' : '#0284c7',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'transform 0.15s ease-out, background-color 0.2s ease',
          boxShadow: '0 0 10px rgba(2, 132, 199, 0.6)'
        }}
      />

      {/* Smooth physics halo bubble */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: `translate3d(${haloRenderPos.x}px, ${haloRenderPos.y}px, 0) translate(-50%, -50%) scale(${clicked ? 0.85 : isHovered ? 1.6 : 1})`,
          width: '38px',
          height: '38px',
          border: `1.5px solid ${isHovered ? 'rgba(99, 102, 241, 0.6)' : 'rgba(14, 165, 233, 0.45)'}`,
          backgroundColor: isHovered ? 'rgba(99, 102, 241, 0.12)' : 'rgba(14, 165, 233, 0.06)',
          backdropFilter: 'blur(1.5px)',
          WebkitBackdropFilter: 'blur(1.5px)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, background-color 0.2s ease',
          boxShadow: isHovered ? '0 0 20px rgba(99, 102, 241, 0.25)' : '0 0 15px rgba(14, 165, 233, 0.15)'
        }}
      />
    </>
  );
};

export default CustomCursor;
