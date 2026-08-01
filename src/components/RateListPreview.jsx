import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { FileText, Info, Download, X, ExternalLink } from 'lucide-react';

const RateListPreview = () => {
  const [isOpen, setIsOpen] = useState(false);

  const modalContent = isOpen ? createPortal(
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      {/* Modal Content */}
      <div className="animate-fade-in" style={{
        background: 'var(--bg-main)',
        width: '100%',
        maxWidth: '900px',
        maxHeight: '90vh',
        borderRadius: '20px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Header */}
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FileText size={24} style={{ color: 'var(--accent-primary)' }} />
            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Rate List</h2>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            style={{
              background: 'rgba(0,0,0,0.05)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-primary)'
            }}
            className="hover-lift"
          >
            <X size={24} />
          </button>
        </div>

        {/* PDF Embed Container */}
        <div style={{
          flex: 1,
          width: '100%',
          background: '#fff',
          overflow: 'hidden'
        }}>
          <object 
            data="/rate-list.pdf" 
            type="application/pdf" 
            width="100%" 
            height="100%"
            style={{ display: 'block', minHeight: '50vh' }}
          >
            {/* Fallback for browsers (especially mobile) that don't support inline PDFs */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '3rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                Your browser does not support inline PDF viewing.
              </p>
              <a href="/rate-list.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
                <Download size={18} style={{ marginRight: '0.5rem' }} /> Download Rate List
              </a>
            </div>
          </object>
        </div>

        {/* Footer Note */}
        <div style={{ 
          background: 'rgba(59, 130, 246, 0.08)', 
          padding: '1.25rem 2rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem'
        }}>
          <Info size={24} style={{ color: 'var(--accent-secondary)', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ color: 'var(--accent-secondary)', marginBottom: '0.25rem' }}>Please Note</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
              Prices may vary based on fabric condition and specific requirements. We also offer special rates for bulk hotel linen laundry. Please contact us directly for exact rates and personalized quotes.
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      {/* Trigger Card */}
      <div 
        className="glass-panel hover-lift" 
        style={{ 
          padding: '1.5rem', 
          marginTop: '2rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), transparent)'
        }}
        onClick={() => setIsOpen(true)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(37, 99, 235, 0.1)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-secondary)' }}>
            <FileText size={24} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>View Rate List</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Click to open PDF preview</p>
          </div>
        </div>
        <ExternalLink size={20} style={{ color: 'var(--accent-secondary)' }} />
      </div>

      {modalContent}
    </>
  );
};

export default RateListPreview;
