import React from 'react';
import { Building2, TrendingUp, ShieldCheck, Clock, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Commercial = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="section" style={{ paddingTop: '8rem', background: 'linear-gradient(to bottom, rgba(37, 99, 235, 0.03), transparent)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.2rem', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--accent-secondary)', borderRadius: '50px', marginBottom: '2rem', fontWeight: '600', fontSize: '0.9rem' }}>
            <Building2 size={16} /> B2B Laundry Solutions
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: '1.1', letterSpacing: '-1px' }}>
            Scale Your Operations with <br />
            <span className="text-gradient">Industrial Precision</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
            We provide high-volume, uncompromising garment and linen care for hotels, restaurants, healthcare facilities, and corporate clients across Jamnagar.
          </p>
          <Link to="/contact" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            Request Bulk Quote
          </Link>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2rem' }}>
            {[
              { icon: TrendingUp, title: 'Volume Scalability', desc: 'Whether you have 100 or 10,000 items, our advanced facility handles massive loads without ever compromising on individual quality.' },
              { icon: Clock, title: 'Predictable Logistics', desc: 'We offer rock-solid pickup and delivery schedules. Your business operations will never stall waiting for fresh linens.' },
              { icon: ShieldCheck, title: 'Asset Preservation', desc: 'Commercial linens are expensive assets. Our eco-friendly solvents clean deeply while extending the lifespan of your textiles by up to 30%.' },
              { icon: Users, title: 'Dedicated Account Manager', desc: 'You get a single point of contact available 24/7. We adapt to your specific invoicing and operational requirements.' }
            ].map((benefit, i) => (
              <div key={i} className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(124, 58, 237, 0.08)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <benefit.icon size={24} />
                </div>
                <h3 style={{ fontSize: '1.4rem' }}>{benefit.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="section" style={{ background: 'rgba(0,0,0,0.02)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Industries We Elevate</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>We tailor our proprietary cleaning protocols to the rigorous standards of your specific sector.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2rem' }}>
            {['Hotels & Hospitality', 'Healthcare & Clinics', 'Restaurants & Catering', 'Corporate Uniforms', 'Spas & Salons', 'Event Management'].map((industry, i) => (
              <div key={i} className="hover-lift" style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <CheckCircle size={20} style={{ color: '#25D366' }} />
                <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Commercial;
