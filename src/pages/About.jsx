import React from 'react';
import { Target, Users, Award } from 'lucide-react';
import TypewriterHeading from '../components/TypewriterHeading';

const About = () => {
  return (
    <div className="animate-fade-in" style={{ paddingBottom: '96px' }}>
      <section className="page-header-standard">
        <div className="container">
          <div className="page-title-block">
            <div className="font-mono-tag" style={{ color: 'var(--accent-rust)', marginBottom: '12px' }}>
              01 · OUR PHILOSOPHY
            </div>
            <TypewriterHeading
              as="h1"
              className="page-main-heading"
              speed={32}
              delay={140}
              segments={[
                { text: 'Redefining garment care in ' },
                { text: 'Jamnagar.', italic: true, accent: true }
              ]}
            />
            <p className="page-main-subtext">
              Founded on the principles of precision, fabric science, and non-toxic formulations, SVL delivers a garment care standard built for precious fabrics and everyday living.
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
