import React from 'react';
import { FileText, Info, Download } from 'lucide-react';

const RateListPreview = () => {
  return (
    <div className="glass-panel reveal-scale" style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <FileText size={32} style={{ color: 'var(--accent-primary)' }} />
        <h2 style={{ fontSize: '2rem', margin: 0 }}>Rate List</h2>
      </div>

      {/* PDF Embed Container */}
      <div style={{
        width: '100%',
        height: '700px',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '1.5rem',
        background: '#fff' // Solid white background for the PDF iframe
      }}>
        <object 
          data="/rate-list.pdf" 
          type="application/pdf" 
          width="100%" 
          height="100%"
          style={{ display: 'block' }}
        >
          {/* Fallback for browsers (especially mobile) that don't support inline PDFs */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '2rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '1.1rem' }}>
              Your browser does not support inline PDF viewing.
            </p>
            <a href="/rate-list.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <Download size={18} style={{ marginRight: '0.5rem' }} /> Download Rate List
            </a>
          </div>
        </object>
      </div>

      <div style={{ 
        background: 'rgba(59, 130, 246, 0.08)', 
        border: '1px solid rgba(59, 130, 246, 0.2)',
        borderRadius: '12px', 
        padding: '1.25rem',
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
  );
};

export default RateListPreview;
