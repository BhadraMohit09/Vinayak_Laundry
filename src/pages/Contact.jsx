import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle, Loader2, Clock, ChevronDown, Check, Shirt, Truck } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import TypewriterHeading from '../components/TypewriterHeading';

const SUBJECT_OPTIONS = [
  'General Inquiry',
  'Bulk/Commercial Order',
  'Pricing Information',
  'Pickup/Delivery Issue',
  'Others'
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });
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
        throw new Error(data.error || 'Failed to send message. Please try again.');
      }

      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Submit error:', err);
      setStatus({ loading: false, success: false, error: err.message || 'Something went wrong. Please try again or call us directly.' });
    }
  };

  return (
    <div className="animate-fade-in">
      <style>{`
        .contact-card {
          display: flex;
          gap: 1.2rem;
          align-items: center;
          padding: 1.2rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(0, 0, 0, 0.04);
          transition: background 0.2s ease, border-color 0.2s ease;
          text-decoration: none;
          color: inherit;
        }
        .contact-card:hover {
          background: white;
          border-color: rgba(0, 0, 0, 0.1);
        }
        .contact-icon-wrapper {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
      `}</style>
      <section className="page-header-standard">
        <div className="container">
          <div className="page-title-block">
            <div className="font-mono-tag" style={{ color: 'var(--accent-rust)', marginBottom: '12px' }}>
              01 · REACH OUT
            </div>
            <TypewriterHeading
              as="h1"
              className="page-main-heading"
              speed={32}
              delay={140}
              segments={[
                { text: 'Let’s arrange your ' },
                { text: 'care.', italic: true, accent: true }
              ]}
            />
            <p className="page-main-subtext">
              Whether you need an express doorstep pickup in Jamnagar, advice on delicate saree restoration, or a contract quote for hotel linens, we are here to help.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: '32px', alignItems: 'start' }}>
            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div className="glass-panel" style={{ padding: '32px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)' }}>
                <div className="font-mono-tag" style={{ color: 'var(--text-tertiary)', marginBottom: '10px' }}>
                  DIRECT CHANNELS
                </div>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>
                  Contact Information
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                  
                  <a href="https://maps.google.com/?q=Jamnagar,+Gujarat,+India" target="_blank" rel="noopener noreferrer" className="contact-card">
                    <div className="contact-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-secondary)' }}>
                      <MapPin size={22} />
                    </div>
                    <div>
                      <h4 style={{ marginBottom: '0.2rem', fontSize: '1.05rem' }}>Location</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Jamnagar, Gujarat, India</p>
                    </div>
                  </a>

                  <a href="https://wa.me/916351674100?text=Hello%20Siddhi%20Vinayak%20Laundry,%20I%20would%20like%20to%20inquire%20about%20your%20services." target="_blank" rel="noopener noreferrer" className="contact-card">
                    <div className="contact-icon-wrapper" style={{ background: 'rgba(37, 211, 102, 0.1)', color: '#25D366' }}>
                      <WhatsAppIcon size={22} color="#25D366" />
                    </div>
                    <div>
                      <h4 style={{ marginBottom: '0.2rem', fontSize: '1.05rem' }}>WhatsApp</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Message our Support Team</p>
                    </div>
                  </a>

                  <a href="mailto:svinayaklaundry@gmail.com" className="contact-card">
                    <div className="contact-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-secondary)' }}>
                      <Mail size={22} />
                    </div>
                    <div>
                      <h4 style={{ marginBottom: '0.2rem', fontSize: '1.05rem' }}>Email</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>svinayaklaundry@gmail.com</p>
                    </div>
                  </a>

                </div>
              </div>
              
              <div className="glass-panel" style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.05), transparent)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <Clock size={22} style={{ color: 'var(--accent-primary)' }} />
                  <h3 style={{ margin: 0 }}>Business Hours</h3>
                </div>
                <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, padding: 0 }}>
                  <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px dashed rgba(0,0,0,0.1)' }}>
                    <span style={{ fontWeight: 500 }}>Monday - Friday</span>
                    <span>8:00 AM - 8:00 PM</span>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px dashed rgba(0,0,0,0.1)' }}>
                    <span style={{ fontWeight: 500 }}>Saturday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 500 }}>Sunday</span>
                    <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Closed</span>
                  </li>
                </ul>
              </div>

              {/* Map Embed */}
              <div className="glass-panel" style={{ overflow: 'hidden', padding: '0.5rem' }}>
                <iframe 
                  title="SVL Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117924.96637372134!2d70.04838634999999!3d22.4578136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39571549d443bdcd%3A0xc6fc1e048d085938!2sJamnagar%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="220" 
                  style={{ border: 0, borderRadius: '12px' }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

            </div>

            {/* Contact Form */}
            <div className="glass-panel" style={{ padding: '2.5rem', position: 'relative' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Send a Message</h2>
              
              {status.success && (
                <div className="animate-fade-in" style={{
                  padding: '1.25rem',
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: '12px',
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <CheckCircle size={22} style={{ color: '#16a34a', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ color: '#16a34a', marginBottom: '0.25rem', fontSize: '1.05rem' }}>Message Sent!</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>
                      Thank you for contacting us. Our team will get back to you shortly.
                    </p>
                  </div>
                </div>
              )}

              {status.error && (
                <div className="animate-fade-in" style={{
                  padding: '1.25rem',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '12px',
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <AlertCircle size={22} style={{ color: '#dc2626', flexShrink: 0 }} />
                  <p style={{ color: '#dc2626', fontSize: '0.95rem', margin: 0, fontWeight: 500 }}>{status.error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1.25rem' }}>
                  <div>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.9rem' }}>Full Name <span style={{ color: '#ef4444' }}>*</span></label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      className="form-control" 
                      placeholder="John Doe" 
                      required
                      minLength={2}
                      pattern="^[a-zA-Z\s]+$"
                      title="Please enter a valid full name (letters and spaces only)"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status.loading}
                      style={{ marginBottom: 0, padding: '0.75rem 1rem' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.9rem' }}>Mobile Number <span style={{ color: '#ef4444' }}>*</span></label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone"
                      className="form-control" 
                      placeholder="9876543210" 
                      required
                      pattern="[0-9]{10}"
                      title="Please enter a valid 10-digit mobile number"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={status.loading}
                      style={{ marginBottom: 0, padding: '0.75rem 1rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1.25rem' }}>
                  <div>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.9rem' }}>Email Address <span style={{ color: '#ef4444' }}>*</span></label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      className="form-control" 
                      placeholder="john@example.com" 
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status.loading}
                      style={{ marginBottom: 0, padding: '0.75rem 1rem' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.9rem' }}>
                      Subject <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <div ref={subjectDropdownRef} style={{ position: 'relative' }}>
                      <button
                        type="button"
                        id="subject"
                        onClick={() => !status.loading && setIsSubjectOpen(!isSubjectOpen)}
                        disabled={status.loading}
                        aria-haspopup="listbox"
                        aria-expanded={isSubjectOpen}
                        className="form-control"
                        style={{
                          marginBottom: 0,
                          padding: '0.75rem 1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          background: 'var(--bg-card)',
                          textAlign: 'left',
                          fontFamily: 'inherit',
                          fontSize: '0.92rem',
                          color: formData.subject ? 'var(--ink)' : 'var(--text-tertiary)',
                          borderColor: isSubjectOpen ? 'var(--ink)' : 'var(--border-subtle)',
                          boxShadow: isSubjectOpen ? '0 0 0 2px rgba(26, 24, 21, 0.08)' : 'none',
                          transition: 'all 0.2s ease',
                          borderRadius: 'var(--radius-sm)'
                        }}
                      >
                        <span>{formData.subject || 'Select a subject...'}</span>
                        <ChevronDown 
                          size={16} 
                          style={{ 
                            color: 'var(--text-secondary)', 
                            transform: isSubjectOpen ? 'rotate(180deg)' : 'rotate(0)', 
                            transition: 'transform 0.2s ease',
                            flexShrink: 0
                          }} 
                        />
                      </button>

                      {/* Dropdown Menu */}
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
                            borderRadius: '12px',
                            boxShadow: '0 12px 32px -4px rgba(26, 24, 21, 0.14)',
                            zIndex: 50,
                            overflow: 'hidden',
                            padding: '6px',
                            animation: 'fadeIn 0.18s ease forwards'
                          }}
                        >
                          {SUBJECT_OPTIONS.map((option) => {
                            const isSelected = formData.subject === option;
                            return (
                              <button
                                key={option}
                                type="button"
                                role="option"
                                aria-selected={isSelected}
                                onClick={() => {
                                  setFormData({ ...formData, subject: option });
                                  setIsSubjectOpen(false);
                                }}
                                style={{
                                  width: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  padding: '10px 14px',
                                  border: 'none',
                                  background: isSelected ? 'var(--bg-panel-light)' : 'transparent',
                                  color: isSelected ? 'var(--accent-rust)' : 'var(--ink)',
                                  fontWeight: isSelected ? 600 : 500,
                                  fontSize: '0.9rem',
                                  borderRadius: '8px',
                                  cursor: 'pointer',
                                  textAlign: 'left',
                                  transition: 'background 0.15s ease, color 0.15s ease'
                                }}
                                onMouseEnter={(e) => {
                                  if (!isSelected) {
                                    e.currentTarget.style.background = 'var(--bg-card-subtle)';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!isSelected) {
                                    e.currentTarget.style.background = 'transparent';
                                  }
                                }}
                              >
                                <span>{option}</span>
                                {isSelected && <Check size={15} style={{ color: 'var(--accent-rust)' }} />}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Hidden input to ensure HTML form validation passes */}
                      <input 
                        type="text" 
                        name="subject" 
                        value={formData.subject} 
                        required 
                        tabIndex={-1}
                        style={{ 
                          opacity: 0, 
                          height: 0, 
                          width: 0, 
                          position: 'absolute', 
                          pointerEvents: 'none' 
                        }} 
                        readOnly 
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="address" style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.9rem' }}>Pickup / Doorstep Address</label>
                  <input 
                    type="text" 
                    id="address"
                    name="address"
                    className="form-control" 
                    placeholder="Flat / House No., Landmark, Area (Jamnagar)" 
                    value={formData.address}
                    onChange={handleChange}
                    disabled={status.loading}
                    style={{ marginBottom: 0, padding: '0.75rem 1rem' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
                    <label htmlFor="items" style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.9rem', margin: 0 }}>
                      Items & Clothes Details
                    </label>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                      e.g. 10 T-Shirts, 10 Shirts, Towels
                    </span>
                  </div>
                  <input 
                    type="text" 
                    id="items"
                    name="items"
                    className="form-control" 
                    placeholder="e.g. 10 T-Shirts, 10 Shirts, Towels, Bed sheets" 
                    value={formData.items}
                    onChange={handleChange}
                    disabled={status.loading}
                    style={{ marginBottom: 0, padding: '0.75rem 1rem' }}
                  />
                </div>

                <div>
                  <label htmlFor="message" style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.9rem' }}>Message / Special Instructions <span style={{ color: '#ef4444' }}>*</span></label>
                  <textarea 
                    id="message"
                    name="message"
                    className="form-control" 
                    placeholder="Tell us about your garment care preferences or schedule..."
                    required
                    minLength={5}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status.loading}
                    style={{ marginBottom: 0, minHeight: '100px', resize: 'vertical', padding: '0.75rem 1rem' }}
                  ></textarea>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', padding: '10px 14px', background: 'var(--bg-card-subtle)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 600, color: 'var(--ink)' }}>
                    <Truck size={15} color="var(--accent-rust)" /> Free Doorstep Pickup Across Jamnagar
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', paddingLeft: '23px' }}>
                    *Applicable on bulk orders & eligible quantities of garment items
                  </span>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={status.loading}
                  style={{ 
                    width: '100%', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    marginTop: '1rem',
                    opacity: status.loading ? 0.7 : 1,
                    cursor: status.loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  {status.loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Sending Message...
                    </>
                  ) : (
                    <>
                      <Send size={18} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
