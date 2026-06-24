import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppFloat = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="https://wa.me/918780570242?text=Hello%20Siddhi%20Vinayak%20Laundry,%20I%20would%20like%20to%20inquire%20about%20your%20services."
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        backgroundColor: '#25D366',
        color: 'white',
        height: '60px',
        width: isHovered ? '200px' : '60px',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 14px',
        boxShadow: isHovered 
          ? '0 8px 25px rgba(37, 211, 102, 0.5)' 
          : '0 4px 14px rgba(37, 211, 102, 0.4)',
        zIndex: 1000,
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        cursor: 'pointer',
        overflow: 'hidden',
        textDecoration: 'none'
      }}
      aria-label="Contact us on WhatsApp"
    >
      <div style={{ 
        minWidth: '32px', 
        height: '32px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        transform: isHovered ? 'rotate(-10deg) scale(1.1)' : 'rotate(0) scale(1)',
        transition: 'transform 0.3s ease'
      }}>
        <MessageCircle size={32} />
      </div>
      
      <span style={{
        whiteSpace: 'nowrap',
        fontWeight: '600',
        fontSize: '1.05rem',
        marginLeft: '12px',
        opacity: isHovered ? 1 : 0,
        transform: isHovered ? 'translateX(0)' : 'translateX(-10px)',
        transition: 'all 0.3s ease',
        transitionDelay: isHovered ? '0.1s' : '0s'
      }}>
        Chat with us
      </span>

      {/* Pulse animation for idle state */}
      {!isHovered && (
        <>
          <style>{`
            @keyframes pulse-whatsapp {
              0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
              70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
              100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
            }
          `}</style>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            animation: 'pulse-whatsapp 2s infinite',
            zIndex: -1
          }}></div>
        </>
      )}
    </a>
  );
};

export default WhatsAppFloat;
