import React, { useEffect } from 'react';
import { CheckCircle2, Sparkles, X, Truck } from 'lucide-react';

const ToastNotification = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="svl-toast-backdrop" aria-live="polite">
      <div className="svl-toast-card">
        <div className="svl-toast-icon-wrap">
          {toast.type === 'pickup' ? (
            <Truck size={18} />
          ) : (
            <Sparkles size={18} />
          )}
        </div>
        <div style={{ flex: 1, paddingRight: '8px' }}>
          <div className="svl-toast-title">
            {toast.title || 'Request Received!'}
          </div>
          <div className="svl-toast-desc">
            {toast.message}
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.45)',
            cursor: 'pointer',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.15s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)')}
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;
