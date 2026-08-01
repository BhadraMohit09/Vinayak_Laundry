import React, { useEffect, useState } from 'react';
import { CheckCircle2, Droplets, Wind } from 'lucide-react';

const SplashScreen = ({ onFinish }) => {
  const [step, setStep] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Step transitions to simulate laundry workflow
    const step1 = setTimeout(() => setStep(1), 700);
    const step2 = setTimeout(() => setStep(2), 1400);

    // Start fade out at 2.1 seconds
    const fadeTimer = setTimeout(() => setIsFading(true), 2100);

    // Remove from DOM at 2.7 seconds
    const finishTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2700);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  const workflowSteps = [
    { text: 'Gentle Wash & Stain Treatment...', icon: Droplets, color: '#0284c7' },
    { text: 'Eco-Solvent Rinse & Spin...', icon: Wind, color: '#4338ca' },
    { text: 'Pristine & Flawlessly Ready!', icon: CheckCircle2, color: '#059669' }
  ];

  const CurrentIcon = workflowSteps[step].icon;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#FAF9F6', /* Granthika Warm Cream */
      zIndex: 999999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: isFading ? 0 : 1,
      visibility: isFading ? 'hidden' : 'visible',
      transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s ease',
      pointerEvents: isFading ? 'none' : 'auto',
      padding: '1.5rem'
    }}>
      {/* Interactive Laundry Drum / Vortex Animation */}
      <div style={{
        position: 'relative',
        width: '140px',
        height: '140px',
        borderRadius: '50%',
        background: 'rgba(67, 56, 202, 0.05)',
        border: '3px dashed rgba(67, 56, 202, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2.5rem',
        animation: 'spin 8s linear infinite'
      }}>
        {/* Counter-rotating Inner Ring */}
        <div style={{
          position: 'absolute',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(2, 132, 199, 0.1) 0%, transparent 70%)',
          border: '2px solid rgba(2, 132, 199, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'spin 4s linear infinite reverse'
        }}>
          <div style={{ animation: 'splashPulse 1.5s ease-in-out infinite' }}>
            <CurrentIcon size={44} color={workflowSteps[step].color} style={{ transition: 'all 0.4s ease' }} />
          </div>
        </div>

        {/* Floating Animated Bubbles */}
        <div style={{ position: 'absolute', top: '-10px', left: '20px', width: '12px', height: '12px', borderRadius: '50%', background: '#38bdf8', opacity: 0.7, animation: 'bubbleRise 2s infinite ease-in' }} />
        <div style={{ position: 'absolute', bottom: '-5px', right: '25px', width: '8px', height: '8px', borderRadius: '50%', background: '#818cf8', opacity: 0.6, animation: 'bubbleRise 2.5s infinite ease-in 0.5s' }} />
        <div style={{ position: 'absolute', top: '30px', right: '-10px', width: '14px', height: '14px', borderRadius: '50%', background: '#0284c7', opacity: 0.5, animation: 'bubbleRise 1.8s infinite ease-in 0.8s' }} />
      </div>

      {/* Typography Header */}
      <h1 style={{
        color: '#1c1917',
        fontSize: '1.75rem',
        fontWeight: '800',
        letterSpacing: '0.5px',
        margin: '0 0 0.5rem 0',
        fontFamily: "'Inter', sans-serif"
      }}>
        SIDDHI <span style={{ color: '#4338ca' }}>VINAYAK</span>
      </h1>

      {/* Dynamic Workflow Status Pill */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.6rem',
        padding: '0.6rem 1.4rem',
        background: 'rgba(255, 255, 255, 0.9)',
        border: '1px solid rgba(28, 25, 23, 0.08)',
        borderRadius: '50px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
        marginTop: '1rem',
        minWidth: '280px',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: workflowSteps[step].color,
          transition: 'background-color 0.4s ease',
          animation: 'splashPulse 1s infinite'
        }} />
        <span style={{
          color: '#475569',
          fontSize: '0.95rem',
          fontWeight: '600',
          transition: 'all 0.3s ease'
        }}>
          {workflowSteps[step].text}
        </span>
      </div>

      {/* Workflow Progress Steps Bar */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginTop: '2.5rem',
        width: '180px'
      }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: '4px',
              borderRadius: '4px',
              backgroundColor: i <= step ? workflowSteps[step].color : 'rgba(0,0,0,0.06)',
              transition: 'background-color 0.4s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;
