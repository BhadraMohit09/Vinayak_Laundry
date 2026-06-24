import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use mailto as a fallback since there is no backend
    const mailtoLink = `mailto:svinayaklaundry@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
            {/* Contact Info */}
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Contact Information</h2>
              <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-secondary)' }}>
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 style={{ marginBottom: '0.2rem' }}>Location</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Jamnagar, Gujarat, India</p>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(124, 58, 237, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-primary)' }}>
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 style={{ marginBottom: '0.2rem' }}>Phone</h4>
                      <a href="tel:+919924787882" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textDecoration: 'none' }}>+91 9924787882</a>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(37, 211, 102, 0.1)', padding: '1rem', borderRadius: '50%', color: '#25D366' }}>
                      <MessageCircle size={24} />
                    </div>
                    <div>
                      <h4 style={{ marginBottom: '0.2rem' }}>WhatsApp</h4>
                      <a href="https://wa.me/918780570242?text=Hello%20Siddhi%20Vinayak%20Laundry,%20I%20would%20like%20to%20inquire%20about%20your%20services." target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textDecoration: 'none' }}>+91 8780570242</a>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-secondary)' }}>
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
            </div>

            {/* Contact Form */}
            <div className="glass-panel" style={{ padding: '3rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Send a Message</h2>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Name</label>
                    <input 
                      type="text" 
                      name="name"
                      className="form-control" 
                      placeholder="John Doe" 
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Email</label>
                    <input 
                      type="email" 
                      name="email"
                      className="form-control" 
                      placeholder="john@example.com" 
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div style={{ marginTop: '0.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    className="form-control" 
                    placeholder="How can we help?" 
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div style={{ marginTop: '0.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Message</label>
                  <textarea 
                    name="message"
                    className="form-control" 
                    placeholder="Tell us about your requirements (e.g. bulk order, specific care needs)..."
                    required
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                  <Send size={18} /> Send Message
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
