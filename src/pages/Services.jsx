import React from 'react';
import { Shirt, Box, Wind, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className="animate-fade-in">
      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
              Premium <span className="text-gradient">Services</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
              We don't just wash clothes; we preserve them. Explore our range of specialized services designed for modern lifestyles and business needs.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            {/* Service 1 */}
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <Droplets size={40} style={{ color: 'var(--accent-secondary)', marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Advanced Dry Cleaning</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Using next-generation, environmentally safe solvents that clean deeper while being incredibly gentle on delicate fabrics like silk, wool, and cashmere.
              </p>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', listStylePosition: 'inside' }}>
                <li>Stain analysis & pre-treatment</li>
                <li>Odor neutralization</li>
                <li>Hand-finished pressing</li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <Wind size={40} style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Wash & Fold Precision</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Your everyday garments treated with extraordinary care. We separate by color, fabric type, and washing requirements to ensure perfect results.
              </p>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', listStylePosition: 'inside' }}>
                <li>Temperature-controlled washing</li>
                <li>Premium hypoallergenic detergents</li>
                <li>Meticulous folding and packaging</li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <Shirt size={40} style={{ color: 'var(--accent-secondary)', marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Steam Pressing & Ironing</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Achieve that crisp, professional look. Our advanced steam pressing equipment safely removes the toughest wrinkles without damaging fibers.
              </p>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', listStylePosition: 'inside' }}>
                <li>Precision creasing</li>
                <li>Collar and cuff detailing</li>
                <li>Hanging or flat packaging options</li>
              </ul>
            </div>

            {/* Service 4 */}
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <Box size={40} style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Bulk & Commercial Orders</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Dedicated solutions for hotels, restaurants, and businesses. We offer high-volume processing without compromising our rigorous quality standards.
              </p>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', listStylePosition: 'inside' }}>
                <li>Dedicated account manager</li>
                <li>Scheduled pickup & delivery</li>
                <li>Highly competitive corporate rates</li>
              </ul>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', background: 'rgba(0,0,0,0.02)' }}>
            <h2 style={{ marginBottom: '1rem' }}>Affordable Pricing for Unmatched Quality</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem' }}>
              We believe premium care shouldn't come at an exorbitant cost. Contact us with your specific requirements, and we'll provide a tailored, highly competitive quote.
            </p>
            <Link to="/contact" className="btn-primary">Request a Quote</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
