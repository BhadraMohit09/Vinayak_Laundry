import React from 'react';
import { Target, Users, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="animate-fade-in">
      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
              Redefining <span className="text-gradient">Garment Care</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
              Founded on the principles of precision and quality, SVL leverages state-of-the-art methodology to deliver a laundry experience unlike any other. Welcome to the standard of 2026.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '1.5rem' }}>Our Mission</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                At SVL, our mission is to eliminate the friction of garment care while elevating the results. We believe that your clothes are an investment, and they deserve professional, advanced care that extends their life and keeps them looking pristine.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                We've moved beyond traditional washing methods. By adopting the latest in fabric science and automated tracking, we ensure consistency, quality, and complete transparency in every order.
              </p>
            </div>
            <div className="glass-panel" style={{ padding: '3rem', position: 'relative' }}>
               <div style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '100px',
                  height: '100px',
                  background: 'var(--accent-primary)',
                  filter: 'blur(50px)',
                  opacity: 0.5,
                  zIndex: -1
                }}></div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <li style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(37, 99, 235, 0.08)', padding: '1rem', borderRadius: '12px', color: 'var(--accent-secondary)' }}>
                    <Target size={24} />
                  </div>
                  <div>
                    <h3 style={{ marginBottom: '0.5rem' }}>Precision Focus</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Every garment undergoes a multi-point inspection before and after cleaning.</p>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(37, 99, 235, 0.08)', padding: '1rem', borderRadius: '12px', color: 'var(--accent-primary)' }}>
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 style={{ marginBottom: '0.5rem' }}>Customer Centric</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>We tailor our processes to accommodate delicate fabrics and specific customer requests.</p>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(37, 99, 235, 0.08)', padding: '1rem', borderRadius: '12px', color: 'var(--accent-secondary)' }}>
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 style={{ marginBottom: '0.5rem' }}>Excellence Guaranteed</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>We don't compromise. Our standards are the highest in the industry.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
