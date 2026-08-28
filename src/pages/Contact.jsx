import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle, Loader2, Clock } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

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
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(0, 0, 0, 0.04);
          transition: all 0.3s ease;
          text-decoration: none;
          color: inherit;
        }
        .contact-card:hover {
          background: white;
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
          border-color: var(--accent-secondary);
        }
        .contact-icon-wrapper {
          width: 52px;
          height: 52px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justifyContent: center;
          border-radius: 50%;
          transition: transform 0.3s ease;
        }
        .contact-card:hover .contact-icon-wrapper {
          transform: scale(1.1);
        }
      `}</style>
      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
              Whether you're looking for premium personal care or need a reliable partner for bulk commercial orders, our team is ready to assist you.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '4rem' }}>
            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Contact Information</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  
                  <a href="https://maps.google.com/?q=Jamnagar,+Gujarat,+India" target="_blank" rel="noopener noreferrer" className="contact-card">
                    <div className="contact-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-secondary)' }}>
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 style={{ marginBottom: '0.2rem', fontSize: '1.05rem' }}>Location</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Jamnagar, Gujarat, India</p>
                    </div>
                  </a>

                  <a href="https://wa.me/916351674100?text=Hello%20Siddhi%20Vinayak%20Laundry,%20I%20would%20like%20to%20inquire%20about%20your%20services." target="_blank" rel="noopener noreferrer" className="contact-card">
                    <div className="contact-icon-wrapper" style={{ background: 'rgba(37, 211, 102, 0.1)', color: '#25D366' }}>
                      <WhatsAppIcon size={24} color="#25D366" />
                    </div>
                    <div>
                      <h4 style={{ marginBottom: '0.2rem', fontSize: '1.05rem' }}>WhatsApp</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>+91 63516 74100 (Click to Chat)</p>
                    </div>
                  </a>

                  <a href="mailto:svinayaklaundry@gmail.com" className="contact-card">
                    <div className="contact-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-secondary)' }}>
                      <Mail size={24} />
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
                  <Clock size={24} style={{ color: 'var(--accent-primary)' }} />
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
              <div className="glass-panel hover-lift" style={{ overflow: 'hidden', padding: '0.5rem' }}>
                <iframe 
                  title="SVL Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117924.96637372134!2d70.04838634999999!3d22.4578136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39571549d443bdcd%3A0xc6fc1e048d085938!2sJamnagar%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="200" 
                  style={{ border: 0, borderRadius: '12px' }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

            </div>

            {/* Contact Form */}
            <div className="glass-panel" style={{ padding: '3rem', position: 'relative' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Send a Message</h2>
              
              {status.success && (
                <div className="animate-fade-in" style={{
                  padding: '1.5rem',
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: '12px',
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <CheckCircle size={24} style={{ color: '#22c55e', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ color: '#16a34a', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Message Sent Successfully!</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: '1.5' }}>
                      Thank you for contacting us. Your message has been sent to our team. We will get back to you shortly!
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
                  <AlertCircle size={24} style={{ color: '#ef4444', flexShrink: 0 }} />
                  <p style={{ color: '#dc2626', fontSize: '0.95rem', margin: 0, fontWeight: 500 }}>{status.error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1.5rem' }}>
                  <div>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: 500 }}>Name <span style={{ color: '#ef4444' }}>*</span></label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      className="form-control" 
                      placeholder="John Doe" 
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status.loading}
                      style={{ marginBottom: 0, transition: 'all 0.2s', borderColor: formData.name ? 'rgba(0,0,0,0.1)' : '' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: 500 }}>Phone Number <span style={{ color: '#ef4444' }}>*</span></label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone"
                      className="form-control" 
                      placeholder="+91 98765 43210" 
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={status.loading}
                      style={{ marginBottom: 0 }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1.5rem' }}>
                  <div>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: 500 }}>Email Address <span style={{ color: '#ef4444' }}>*</span></label>
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
                      style={{ marginBottom: 0 }}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: 500 }}>Subject <span style={{ color: '#ef4444' }}>*</span></label>
                    <input 
                      type="text" 
                      id="subject"
                      name="subject"
                      className="form-control" 
                      placeholder="How can we help?" 
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={status.loading}
                      style={{ marginBottom: 0 }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: 500 }}>Message <span style={{ color: '#ef4444' }}>*</span></label>
                  <textarea 
                    id="message"
                    name="message"
                    className="form-control" 
                    placeholder="Tell us about your requirements (e.g. bulk order, specific care needs)..."
                    required
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status.loading}
                    style={{ marginBottom: 0, minHeight: '140px', resize: 'vertical' }}
                  ></textarea>
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
