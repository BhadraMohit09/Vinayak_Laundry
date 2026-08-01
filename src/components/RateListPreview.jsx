import React from 'react';
import { FileText, Info } from 'lucide-react';

const RateListPreview = () => {
  const rateList = [
    { item: 'Towels', rate: '10 Rs.' },
    { item: 'Half Towels', rate: '7 Rs.' },
    { item: 'Pillow Covers', rate: '7 Rs.' },
    { item: 'Single Bedsheet', rate: '15 Rs.' },
    { item: 'Double-Bed-Sheet', rate: '20 Rs.' },
    { item: 'Single-Bed-Cover', rate: '20 Rs.' },
    { item: 'Double-Bed-Cover', rate: '30 Rs.' },
    { item: 'Shirt / T-Shirt', rate: '15 Rs.' },
    { item: 'Pant/Track', rate: '15 Rs.' },
    { item: 'Women Dresses', rate: '30 Rs.' },
  ];

  return (
    <div className="glass-panel reveal-scale" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
      {/* Background Accent */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, transparent 70%)',
        zIndex: 0
      }}></div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <FileText size={32} style={{ color: 'var(--accent-primary)' }} />
          <h2 style={{ fontSize: '2rem', margin: 0 }}>Rate List Preview</h2>
        </div>
        
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
          Inclusive of Wash & Iron
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {rateList.map((entry, idx) => (
            <div key={idx} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem 1.25rem',
              background: 'rgba(255, 255, 255, 0.6)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              transition: 'all 0.3s ease'
            }}
            className="hover-lift"
            >
              <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{entry.item}</span>
              <span style={{ fontWeight: '700', color: 'var(--accent-primary)' }}>{entry.rate}</span>
            </div>
          ))}
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
              The prices displayed above are for preview purposes and <strong>may vary</strong> based on fabric condition and specific requirements. We also offer special rates for bulk hotel linen laundry. Please contact us directly for exact rates and personalized quotes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateListPreview;
