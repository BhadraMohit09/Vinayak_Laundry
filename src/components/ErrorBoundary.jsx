import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught React Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}>
          <div className="glass-panel" style={{
            padding: '3rem 2rem',
            maxWidth: '500px',
            textAlign: 'center',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <AlertTriangle size={32} />
            </div>
            
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Unexpected Rendering Error
            </h2>
            
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>
              We encountered a minor glitch while loading this section. Please refresh the page to continue using Siddhi Vinayak Laundry.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
              style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}
            >
              <RefreshCw size={18} /> Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
