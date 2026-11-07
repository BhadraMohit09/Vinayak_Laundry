import React, { useState, useRef, useEffect, useId } from 'react';
import { X, Send, AlertCircle, Loader2, Truck, ChevronDown, Check, Phone, User, Mail, MapPin } from 'lucide-react';

const SUBJECT_OPTIONS = [
  'Doorstep Pickup Booking',
  'Express 24h Laundry',
  'Delicate / Bandhani Saree Dry Clean',
  'Steam Pressing & Detailing',
  'Commercial / Hotel Bulk Order',
  'General Inquiry'
];

const BookPickupModal = ({ isOpen, onClose, onSuccessToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: SUBJECT_OPTIONS[0],
    message: ''
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, error: '' });
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const subjectDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (subjectDropdownRef.current && !subjectDropdownRef.current.contains(e.target)) {
        setIsSubjectOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const subjectId = useId();
  const messageId = useId();

  // Reset state when modal is opened or closed
  useEffect(() => {
    if (!isOpen) {
      setFieldErrors({});
      setStatus({ loading: false, error: '' });
      setIsSubjectOpen(false);
    }
  }, [isOpen]);

  const handleModalClose = () => {
    setFieldErrors({});
    setStatus({ loading: false, error: '' });
    setIsSubjectOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  const validateField = (field, value) => {
    let error = '';
    if (field === 'name') {
      if (!value.trim()) error = 'Full name is required.';
      else if (value.trim().length < 2) error = 'Name must be at least 2 characters.';
      else if (!/^[a-zA-Z\s.]+$/.test(value)) error = 'Name should only contain letters.';
    }
    if (field === 'phone') {
      const cleaned = value.replace(/\D/g, '');
      if (!cleaned) error = 'Mobile number is required.';
      else if (cleaned.length !== 10) error = 'Please enter a valid 10-digit mobile number.';
      else if (!/^[6-9]\d{9}$/.test(cleaned)) error = 'Number should start with 6, 7, 8, or 9.';
    }
    if (field === 'email') {
      if (!value.trim()) error = 'Email address is required.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) error = 'Please enter a valid email address.';
    }
    if (field === 'message') {
      if (!value.trim()) error = 'Pickup address / notes are required.';
      else if (value.trim().length < 6) error = 'Please provide your doorstep address (at least 6 chars).';
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Live validation as user types
    if (value.trim().length > 0) {
      const liveErr = validateField(name, value);
      setFieldErrors((prev) => ({ ...prev, [name]: liveErr }));
    } else {
      // If user clears the field, clear error until submit or further typing
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: false, error: '' });

    // Validate all fields on submit
    const errors = {
      name: validateField('name', formData.name),
      phone: validateField('phone', formData.phone),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };

    const hasAnyError = Object.values(errors).some(Boolean);
    if (hasAnyError) {
      setFieldErrors(errors);
      return;
    }

    setStatus({ loading: true, error: '' });

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

      setStatus({ loading: false, error: '' });
      const clientName = formData.name.trim();

      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: SUBJECT_OPTIONS[0],
        message: ''
      });
      setFieldErrors({});

      onClose();

      // Trigger unique floating toast
      if (onSuccessToast) {
        onSuccessToast({
          type: 'pickup',
          title: `Pickup Scheduled, ${clientName}!`,
          message: 'Your doorstep pickup window is confirmed. An SVL care associate will contact you shortly.'
        });
      }
    } catch (err) {
      console.error('Submit error:', err);
      setStatus({
        loading: false,
        error: err.message || 'Something went wrong. Please check your connection or WhatsApp us directly.'
      });
    }
  };

  return (
    <div className="review-modal-backdrop" onClick={handleModalClose}>
      <div
        className="review-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ width: 'min(100%, 580px)' }}
      >
        <button
          type="button"
          onClick={handleModalClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-tertiary)',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s ease, color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--bg-panel-light)';
            e.currentTarget.style.color = 'var(--ink)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--text-tertiary)';
          }}
          aria-label="Close booking modal"
        >
          <X size={20} />
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

        <form onSubmit={handleSubmit} noValidate>
          {/* Name & Phone */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))', gap: '16px', marginBottom: '14px' }}>
            <div>
              <label htmlFor={nameId} style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                Full Name <span style={{ color: 'var(--accent-rust)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id={nameId}
                  name="name"
                  type="text"
                  placeholder="e.g. Ramesh Patel"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  style={{
                    paddingLeft: '38px',
                    borderColor: fieldErrors.name ? '#ef4444' : undefined
                  }}
                />
                <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }} />
              </div>
              {fieldErrors.name && (
                <span style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px', display: 'block' }}>
                  {fieldErrors.name}
                </span>
              )}
            </div>

            <div>
              <label htmlFor={phoneId} style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                Mobile Number <span style={{ color: 'var(--accent-rust)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id={phoneId}
                  name="phone"
                  type="tel"
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                  style={{
                    paddingLeft: '38px',
                    borderColor: fieldErrors.phone ? '#ef4444' : undefined
                  }}
                />
                <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }} />
              </div>
              {fieldErrors.phone && (
                <span style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px', display: 'block' }}>
                  {fieldErrors.phone}
                </span>
              )}
            </div>
          </div>

          {/* Email & Subject */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))', gap: '16px', marginBottom: '14px' }}>
            <div>
              <label htmlFor={emailId} style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                Email Address <span style={{ color: 'var(--accent-rust)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  style={{
                    paddingLeft: '38px',
                    borderColor: fieldErrors.email ? '#ef4444' : undefined
                  }}
                />
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }} />
              </div>
              {fieldErrors.email && (
                <span style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px', display: 'block' }}>
                  {fieldErrors.email}
                </span>
              )}
            </div>

            {/* Custom Themed Dropdown Component */}
            <div ref={subjectDropdownRef} style={{ position: 'relative' }}>
              <label htmlFor={subjectId} style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                Service Availed <span style={{ color: 'var(--accent-rust)' }}>*</span>
              </label>
              <button
                type="button"
                id={subjectId}
                onClick={() => setIsSubjectOpen(!isSubjectOpen)}
                className="form-control"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  background: 'var(--bg-card)',
                  color: 'var(--ink)',
                  textAlign: 'left',
                  borderColor: isSubjectOpen ? 'var(--accent-rust)' : 'var(--border-subtle)',
                  boxShadow: isSubjectOpen ? '0 0 0 3px var(--accent-rust-light)' : 'none',
                  borderRadius: 'var(--radius-sm)',
                  padding: '11px 14px'
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {formData.subject}
                </span>
                <ChevronDown
                  size={16}
                  style={{
                    color: isSubjectOpen ? 'var(--accent-rust)' : 'var(--text-tertiary)',
                    transform: isSubjectOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    flexShrink: 0
                  }}
                />
              </button>

              {isSubjectOpen && (
                <div
                  role="listbox"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    left: 0,
                    right: 0,
                    background: '#ffffff',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: '0 16px 36px -8px rgba(26, 24, 21, 0.2)',
                    zIndex: 150,
                    overflow: 'hidden',
                    padding: '6px',
                    animation: 'fadeIn 0.15s ease-out'
                  }}
                >
                  {SUBJECT_OPTIONS.map((opt) => {
                    const isSelected = formData.subject === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, subject: opt }));
                          setIsSubjectOpen(false);
                        }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          border: 'none',
                          borderRadius: '8px',
                          background: isSelected ? 'var(--accent-rust-light)' : 'transparent',
                          color: isSelected ? 'var(--accent-rust)' : 'var(--ink)',
                          fontWeight: isSelected ? 600 : 500,
                          fontSize: '13.5px',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'background 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) e.currentTarget.style.background = 'var(--bg-card-subtle)';
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <span>{opt}</span>
                        {isSelected && <Check size={16} color="var(--accent-rust)" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Message / Pickup Address */}
          <div style={{ marginBottom: '22px' }}>
            <label htmlFor={messageId} style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
              Pickup Address & Specific Instructions <span style={{ color: 'var(--accent-rust)' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <textarea
                id={messageId}
                name="message"
                rows={3}
                placeholder="Enter your doorstep address in Jamnagar, preferred pickup time, or fabric care notes..."
                value={formData.message}
                onChange={handleChange}
                className="form-control"
                style={{
                  paddingLeft: '38px',
                  resize: 'vertical',
                  borderColor: fieldErrors.message ? '#ef4444' : undefined
                }}
              />
              <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-tertiary)', pointerEvents: 'none' }} />
            </div>
            {fieldErrors.message && (
              <span style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px', display: 'block' }}>
                {fieldErrors.message}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-tertiary)', fontFamily: 'DM Mono, monospace' }}>
              <Truck size={14} color="var(--accent-rust)" /> Free Doorstep Pickup Across Jamnagar
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', width: 'fit-content' }}>
              <button
                type="button"
                onClick={handleModalClose}
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
