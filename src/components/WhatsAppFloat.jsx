import React, { useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';

const WhatsAppFloat = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <style>{`
        @keyframes pulse-whatsapp {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
          70% { box-shadow: 0 0 0 12px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }

        .svl-wa-float,
        .svl-wa-float:hover,
        .svl-wa-float:focus,
        .svl-wa-float:active {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          height: 54px;
          width: 54px;
          border-radius: 9999px;
          background-color: #25D366;
          color: #ffffff !important;
          display: flex;
          align-items: center;
          padding: 0 12px;
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.35);
          border: 1.5px solid rgba(255, 255, 255, 0.6);
          z-index: 1000;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          overflow: hidden;
          text-decoration: none !important;
          box-sizing: border-box;
        }

        .svl-wa-float.hovered,
        .svl-wa-float:hover {
          width: 175px;
          background-color: #20ba5a !important;
          color: #ffffff !important;
          box-shadow: 0 10px 28px rgba(37, 211, 102, 0.45);
        }

        .svl-wa-pulse {
          position: absolute;
          top: 0;
          left: 0;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          animation: pulse-whatsapp 2.5s infinite;
          z-index: -1;
        }

        @media (max-width: 640px) {
          .svl-wa-float {
            height: 48px !important;
            width: 48px !important;
            padding: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            overflow: visible !important;
          }
          .svl-wa-float.hovered {
            width: 48px !important;
          }
          .svl-wa-float span {
            display: none !important;
          }
          .svl-wa-pulse {
            width: 48px !important;
            height: 48px !important;
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
          width: '28px', 
          height: '28px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          transform: isHovered ? 'rotate(-10deg) scale(1.08)' : 'rotate(0) scale(1)',
          transition: 'transform 0.3s ease',
          flexShrink: 0
        }}>
          <WhatsAppIcon size={28} color="#ffffff" />
        </div>
        
        <span style={{
          whiteSpace: 'nowrap',
          fontWeight: '600',
          fontSize: '1rem',
          marginLeft: '10px',
          color: '#ffffff',
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
