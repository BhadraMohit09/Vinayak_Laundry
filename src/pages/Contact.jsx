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
      <section className="section" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
              Whether you're looking for premium personal care or need a reliable partner for bulk commercial orders, our team is ready to assist you.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '3rem', alignItems: 'start' }}>
            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Contact Information</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  
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
                    <label htmlFor="subject" style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.9rem' }}>Subject <span style={{ color: '#ef4444' }}>*</span></label>
                    <select 
                      id="subject"
                      name="subject"
                      className="form-control" 
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={status.loading}
                      style={{ marginBottom: 0, padding: '0.75rem 1rem', cursor: 'pointer', appearance: 'none', background: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E") no-repeat right 1rem top 50%', backgroundSize: '0.65rem auto' }}
                    >
                      <option value="" disabled>Select a subject...</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Bulk/Commercial Order">Bulk/Commercial Order</option>
                      <option value="Pricing Information">Pricing Information</option>
                      <option value="Pickup/Delivery Issue">Pickup/Delivery Issue</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.9rem' }}>Message <span style={{ color: '#ef4444' }}>*</span></label>
                  <textarea 
                    id="message"
                    name="message"
                    className="form-control" 
                    placeholder="Tell us about your requirements..."
                    required
                    minLength={10}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status.loading}
                    style={{ marginBottom: 0, minHeight: '120px', resize: 'vertical', padding: '0.75rem 1rem' }}
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
