import React, { useState, useId } from 'react';
import { X, Send, CheckCircle, AlertCircle, Loader2, Sparkles, Truck } from 'lucide-react';

const SUBJECT_OPTIONS = [
  'Doorstep Pickup Booking',
  'Express 24h Laundry',
  'Delicate / Bandhani Saree Dry Clean',
  'Steam Pressing & Detailing',
  'Commercial / Hotel Bulk Order',
  'General Inquiry'
];

const BookPickupModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: SUBJECT_OPTIONS[0],
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const subjectId = useId();
  const messageId = useId();

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit pickup request. Please try again.');
      }

      setStatus({ loading: false, success: true, error: '' });
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: SUBJECT_OPTIONS[0],
        message: ''
      });

      setTimeout(() => {
        onClose();
        setStatus({ loading: false, success: false, error: '' });
      }, 2000);
    } catch (err) {
      console.error('Submit error:', err);
      setStatus({
        loading: false,
        success: false,
        error: err.message || 'Something went wrong. Please try again or WhatsApp us directly.'
      });
    }
  };

  return (
    <div className="review-modal-backdrop" onClick={onClose}>
      <div
        className="review-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ width: 'min(100%, 580px)' }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-tertiary)',
            cursor: 'pointer',
            padding: '4px'
          }}
          aria-label="Close booking modal"
        >
          <X size={22} />
        </button>

        <div className="font-mono-tag" style={{ color: 'var(--accent-rust)', marginBottom: '8px' }}>
          DOORSTEP CARE · JAMNAGAR
        </div>
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px' }}>
          Book an Instant Pickup
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', marginBottom: '22px', lineHeight: 1.5 }}>
          Fill in your details below and our Jamnagar logistics coordinator will arrange an express doorstep pickup window for your garments.
        </p>

        {status.error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 16px',
            color: '#b91c1c',
            fontSize: '13.5px',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={16} /> {status.error}
          </div>
        )}

        {status.success && (
          <div style={{
            background: 'var(--accent-olive-light)',
            border: '1px solid rgba(72, 99, 73, 0.25)',
            borderRadius: 'var(--radius-sm)',
            padding: '14px 18px',
            color: 'var(--accent-olive)',
            fontSize: '14px',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 500
          }}>
            <CheckCircle size={18} /> Pickup request booked successfully! Our team will contact you shortly.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name & Phone */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label htmlFor={nameId} style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                Your Name*
              </label>
              <input
                id={nameId}
                name="name"
                type="text"
                required
                placeholder="e.g. Ramesh Patel"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div>
              <label htmlFor={phoneId} style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                Mobile Number*
              </label>
              <input
                id={phoneId}
                name="phone"
                type="tel"
                required
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          {/* Email & Subject */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label htmlFor={emailId} style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                Email Address*
              </label>
              <input
                id={emailId}
                name="email"
                type="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div>
              <label htmlFor={subjectId} style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                Service / Subject*
              </label>
              <select
                id={subjectId}
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-control custom-theme-select"
              >
                {SUBJECT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message / Pickup Address */}
          <div style={{ marginBottom: '22px' }}>
            <label htmlFor={messageId} style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
              Pickup Address & Specific Instructions*
            </label>
            <textarea
              id={messageId}
              name="message"
              required
              rows={3}
              placeholder="Enter your doorstep address in Jamnagar, preferred time window, or special garment care notes..."
              value={formData.message}
              onChange={handleChange}
              className="form-control"
              style={{ resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-tertiary)', fontFamily: 'DM Mono, monospace' }}>
              <Truck size={14} color="var(--accent-rust)" /> Free Doorstep Pickup in Jamnagar
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={onClose}
                className="soft-button"
                style={{ border: 'none' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status.loading}
                className="ink-button"
                style={{ padding: '12px 26px', opacity: status.loading ? 0.7 : 1 }}
              >
                {status.loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Booking...
                  </>
                ) : (
                  <>
                    <Send size={15} /> Confirm Pickup
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookPickupModal;
