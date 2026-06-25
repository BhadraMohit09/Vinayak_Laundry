import React, { useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';

const WhatsAppFloat = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <style>{`
        @keyframes pulse-whatsapp {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }

        .svl-wa-float {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          height: 60px;
          width: 60px;
          border-radius: 30px;
          background-color: #25D366;
          color: white;
          display: flex;
          align-items: center;
          padding: 0 14px;
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.4);
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          overflow: hidden;
          text-decoration: none;
          box-sizing: border-box;
        }

        .svl-wa-float.hovered {
          width: 190px;
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.5);
        }

        .svl-wa-pulse {
          position: absolute;
          top: 0;
          left: 0;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          animation: pulse-whatsapp 2s infinite;
          z-index: -1;
        }

        @media (max-width: 640px) {
          .svl-wa-float {
            bottom: 1.5rem;
            right: 1.5rem;
            height: 52px;
            width: 52px;
            padding: 0 10px;
          }
          .svl-wa-float.hovered {
            width: 165px;
          }
          .svl-wa-pulse {
            width: 52px;
            height: 52px;
          }
        }
      `}</style>

      <a
        href="https://wa.me/916351674100?text=Hello%20Siddhi%20Vinayak%20Laundry,%20I%20would%20like%20to%20inquire%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`svl-wa-float ${isHovered ? 'hovered' : ''}`}
        aria-label="Contact us on WhatsApp"
      >
        <div style={{ 
          minWidth: '32px', 
          height: '32px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          transform: isHovered ? 'rotate(-10deg) scale(1.1)' : 'rotate(0) scale(1)',
          transition: 'transform 0.3s ease',
          flexShrink: 0
        }}>
          <WhatsAppIcon size={32} />
        </div>
        
        <span style={{
          whiteSpace: 'nowrap',
          fontWeight: '600',
          fontSize: '1rem',
          marginLeft: '10px',
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateX(0)' : 'translateX(-10px)',
          transition: 'all 0.3s ease',
          transitionDelay: isHovered ? '0.05s' : '0s'
        }}>
          Chat with us
        </span>

        {/* Pulse animation for idle state */}
        {!isHovered && (
          <div className="svl-wa-pulse" />
        )}
      </a>
    </>
  );
};

export default WhatsAppFloat;
