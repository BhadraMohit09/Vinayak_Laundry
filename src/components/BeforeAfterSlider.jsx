import React, { useState, useRef } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

const BeforeAfterSlider = ({ 
  imageSrc = "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&q=80&w=1200" 
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) { // Only move when mouse is clicked and dragged
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div 
      ref={containerRef}
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: 'clamp(250px, 50vw, 450px)', // Makes it perfectly responsive
        overflow: 'hidden', 
        borderRadius: '24px',
        cursor: 'ew-resize',
        boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
        userSelect: 'none'
      }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={(e) => handleMove(e.clientX)}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* "After" Image (Pristine background layer) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <img 
          src={imageSrc} 
          alt="After Washing" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(1.1) contrast(1.1)' }} 
          draggable="false"
        />
      </div>

      {/* "Before" Image (Faded/Dirty clipped foreground layer) */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
        transition: 'clip-path 0.05s linear'
      }}>
        <img 
          src={imageSrc} 
          alt="Before Washing" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            filter: 'sepia(0.3) contrast(0.7) brightness(0.85) grayscale(0.2) blur(1px)', // Simulates dull/aged fabric
          }} 
          draggable="false"
        />
      </div>

      {/* Fixed Labels (Placed entirely outside the clipped image layers so they NEVER move or disappear) */}
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '0.4rem 1rem', borderRadius: '30px', fontWeight: '700', backdropFilter: 'blur(8px)', fontSize: 'clamp(0.7rem, 2vw, 0.9rem)', zIndex: 30, pointerEvents: 'none' }}>
        Before
      </div>
      
      <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'var(--accent-primary)', color: 'white', padding: '0.4rem 1rem', borderRadius: '30px', fontWeight: '700', boxShadow: '0 8px 15px rgba(124, 58, 237, 0.3)', fontSize: 'clamp(0.7rem, 2vw, 0.9rem)', zIndex: 30, pointerEvents: 'none' }}>
        After
      </div>

      {/* Slider Handle Line */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: `${sliderPosition}%`,
        width: '4px',
        background: 'white',
        transform: 'translateX(-50%)',
        boxShadow: '0 0 15px rgba(0,0,0,0.5)',
        pointerEvents: 'none',
        zIndex: 20
      }}>
        {/* Slider Handle Button */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(36px, 10vw, 46px)',
          height: 'clamp(36px, 10vw, 46px)',
          background: 'white',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          color: 'var(--accent-primary)',
          border: '2px solid rgba(0,0,0,0.05)'
        }}>
          <ChevronsLeftRight size={20} />
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
