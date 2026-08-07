import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import RateListPreview from '../components/RateListPreview';

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
      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
              Whether you're looking for premium personal care or need a reliable partner for bulk commercial orders, our team is ready to assist you.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '4rem' }}>
            {/* Contact Info */}
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Contact Information</h2>
              <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(59, 130, 246, 0.1)', width: '48px', height: '48px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: 'var(--accent-secondary)' }}>
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 style={{ marginBottom: '0.2rem' }}>Location</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Jamnagar, Gujarat, India</p>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(124, 58, 237, 0.1)', width: '48px', height: '48px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: 'var(--accent-primary)' }}>
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 style={{ marginBottom: '0.2rem' }}>Phone</h4>
                      <a href="tel:+916351674100" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textDecoration: 'none' }}>+91 6351674100</a>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(37, 211, 102, 0.1)', width: '48px', height: '48px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: '#25D366' }}>
                      <WhatsAppIcon size={24} color="#25D366" />
                    </div>
                    <div>
                      <h4 style={{ marginBottom: '0.2rem' }}>WhatsApp</h4>
                      <a href="https://wa.me/916351674100?text=Hello%20Siddhi%20Vinayak%20Laundry,%20I%20would%20like%20to%20inquire%20about%20your%20services." target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textDecoration: 'none' }}>+91 6351674100</a>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(59, 130, 246, 0.1)', width: '48px', height: '48px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: 'var(--accent-secondary)' }}>
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 style={{ marginBottom: '0.2rem' }}>Email</h4>
                      <a href="mailto:svinayaklaundry@gmail.com" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textDecoration: 'none' }}>svinayaklaundry@gmail.com</a>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="glass-panel" style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), transparent)' }}>
                <h3 style={{ marginBottom: '1rem' }}>Business Hours</h3>
                <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 8:00 PM</span>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Saturday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Sunday</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>

              {/* Rate List Trigger */}
              <RateListPreview />
            </div>

            {/* Contact Form */}
            <div className="glass-panel" style={{ padding: '3rem', position: 'relative' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Send a Message</h2>
              
              {status.success && (
                <div style={{
                  padding: '1.5rem',
                  backgroundColor: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: '12px',
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <CheckCircle size={24} style={{ color: '#22c55e', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ color: '#22c55e', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Message Sent Successfully!</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: '1.5' }}>
                      Thank you for contacting us. Your message has been sent to our team, and we've also sent a confirmation mail to your inbox. We will get back to you shortly!
                    </p>
                  </div>
                </div>
              )}

              {status.error && (
                <div style={{
                  padding: '1.25rem',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '12px',
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <AlertCircle size={24} style={{ color: '#ef4444', flexShrink: 0 }} />
                  <p style={{ color: '#ef4444', fontSize: '0.95rem', margin: 0 }}>{status.error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      className="form-control" 
                      placeholder="John Doe" 
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status.loading}
                      style={{ marginBottom: 0 }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Phone Number *</label>
                    <input 
                      type="tel" 
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
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Email *</label>
                    <input 
                      type="email" 
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
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Subject *</label>
                    <input 
                      type="text" 
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
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Message *</label>
                  <textarea 
                    name="message"
                    className="form-control" 
                    placeholder="Tell us about your requirements (e.g. bulk order, specific care needs)..."
                    required
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status.loading}
                    style={{ marginBottom: 0, minHeight: '120px' }}
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
                    cursor: status.loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {status.loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Sending...
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
