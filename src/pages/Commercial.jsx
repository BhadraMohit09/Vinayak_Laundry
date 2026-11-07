import React from 'react';
import { 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  Users, 
  CheckCircle, 
  ArrowUpRight, 
  Hotel, 
  Cross, 
  UtensilsCrossed, 
  Briefcase, 
  Sparkles, 
  PartyPopper 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import TypewriterHeading from '../components/TypewriterHeading';

const commercialSectors = [
  {
    icon: Hotel,
    tag: 'HOSPITALITY',
    title: 'Hotels & Resorts',
    desc: 'Bedsheets, duvet covers, bath sheets, and robes returned with crisp linen pressing and zero residual detergent odor.',
    metrics: 'Turnaround: 24h cycle'
  },
  {
    icon: Cross,
    tag: 'HEALTHCARE',
    title: 'Healthcare & Clinics',
    desc: 'Thermal sanitization and medical-grade bio-wash compliance for scrubs, bed linens, lab coats, and patient drapery.',
    metrics: 'Sanitization: 75°C thermal'
  },
  {
    icon: UtensilsCrossed,
    tag: 'F&B SERVICES',
    title: 'Restaurants & Catering',
    desc: 'Heavy oil, curry, and red wine stain lifting protocols for banquet table cloths, napkins, aprons, and chef uniforms.',
    metrics: 'Stain clearance: 99.2%'
  },
  {
    icon: Briefcase,
    tag: 'ENTERPRISE',
    title: 'Corporate Uniforms',
    desc: 'Individual barcode-tracked employee blazers, shirts, and industrial workwear delivered tagged and hangar-ready.',
    metrics: 'Tracking: 100% itemized'
  },
  {
    icon: Sparkles,
    tag: 'WELLNESS',
    title: 'Spas & Luxury Salons',
    desc: 'Essential oil degradation treatment for microfibre and plush Egyptian cotton towels, maintaining cloud-soft absorbency.',
    metrics: 'Softness: Zero stiffening'
  },
  {
    icon: PartyPopper,
    tag: 'EVENTS',
    title: 'Event & Banquet Venues',
    desc: 'Mass volume rapid turnaround for wedding stage canopies, chair covers, runner sashes, and marquee drapery.',
    metrics: 'Capacity: 3,000+ pcs/day'
  }
];

const Commercial = () => {
  return (
    <div className="animate-fade-in" style={{ paddingBottom: '96px' }}>
      {/* Hero Section */}
      <section className="section" style={{ paddingTop: '32px', paddingBottom: '48px' }}>
        <div className="container">
          <div style={{ maxWidth: '820px', marginBottom: '40px' }}>
            <div className="font-mono-tag" style={{ color: 'var(--accent-rust)', marginBottom: '12px' }}>
              01 · B2B LINEN CONTRACTS
            </div>
            <TypewriterHeading
              as="h1"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(38px, 5vw, 68px)',
                fontWeight: 500,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                marginBottom: '16px',
                color: 'var(--ink)'
              }}
              speed={32}
              delay={140}
              segments={[
                { text: 'High-volume scale with ' },
                { text: 'artisan precision.', italic: true, accent: true }
              ]}
            />
            <p style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: 1.6, marginBottom: '28px' }}>
              We provide dependable, scheduled linen cycles for hotels, restaurants, healthcare clinics, and corporate enterprises across Jamnagar with dedicated SLA commitments.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link to="/contact" className="ink-button">
                Request bulk contract quote <ArrowUpRight size={16} />
              </Link>
              <a
                href="https://wa.me/916351674100"
                target="_blank"
                rel="noreferrer"
                className="soft-button"
              >
                Chat with B2B manager →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid (Curriculum Pods) */}
      <section className="section" style={{ paddingTop: '0', paddingBottom: '64px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '24px' }}>
            {[
              { num: '01', icon: TrendingUp, title: 'Volume Scalability', desc: 'Whether you process 50 or 5,000 items daily, our dedicated facility handles bulk volume without compromising individual garment inspection.' },
              { num: '02', icon: Clock, title: 'Predictable Logistics', desc: 'Clockwork scheduled doorstep pickup and drop-off windows so your operations never pause waiting for fresh, pressed linens.' },
              { num: '03', icon: ShieldCheck, title: 'Textile Preservation', desc: 'Our eco-solvent chemistries extend commercial fabric lifespan by up to 30% compared to aggressive caustic bleach treatments.' },
              { num: '04', icon: Users, title: 'Dedicated SLA Account', desc: 'A dedicated client account coordinator with flexible billing, itemized digital manifests, and direct priority phone support.' }
            ].map((benefit, i) => (
              <div key={i} className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: '14px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-card)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', color: 'var(--accent-rust)', fontWeight: 600 }}>{benefit.num}</span>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--bg-panel-light)', color: 'var(--accent-rust)', display: 'grid', placeItems: 'center' }}>
                    <benefit.icon size={20} />
                  </div>
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: 600, color: 'var(--ink)' }}>{benefit.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '14px' }}>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section — Elevated Editorial Cards */}
      <section className="section" style={{ background: 'var(--bg-card-subtle)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', paddingBlock: '80px' }}>
        <div className="container">
          <div style={{ maxWidth: '720px', marginBottom: '48px' }}>
            <div className="font-mono-tag" style={{ color: 'var(--accent-rust)', marginBottom: '8px' }}>
              02 · SECTORS SERVED
            </div>
            <TypewriterHeading
              as="h2"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(30px, 4vw, 46px)',
                fontWeight: 500,
                color: 'var(--ink)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15
              }}
              speed={34}
              delay={120}
              segments={[
                { text: 'Industries We ' },
                { text: 'Elevate.', italic: true, accent: true }
              ]}
            />
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginTop: '12px' }}>
              Every industry comes with distinct fabric compositions, hygiene standards, and operational cycles. We tailor chemistry and handling protocols specifically to your sector.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '20px' }}>
            {commercialSectors.map((sector, i) => {
              const IconComp = sector.icon;
              return (
                <div
                  key={i}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '28px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '16px',
                    boxShadow: 'var(--shadow-card)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '12px',
                          background: 'var(--accent-rust-light)',
                          color: 'var(--accent-rust)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <IconComp size={22} />
                      </div>
                      <span
                        style={{
                          fontFamily: 'DM Mono, monospace',
                          fontSize: '11px',
                          letterSpacing: '0.08em',
                          color: 'var(--accent-rust)',
                          fontWeight: 600,
                          background: 'var(--bg-panel-light)',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-pill)',
                          border: '1px solid var(--border-subtle)'
                        }}
                      >
                        {sector.tag}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '21px',
                        fontWeight: 600,
                        color: 'var(--ink)',
                        marginBottom: '8px'
                      }}
                    >
                      {sector.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
                      {sector.desc}
                    </p>
                  </div>

                  <div
                    style={{
                      paddingTop: '14px',
                      borderTop: '1px solid var(--border-light)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--ink)',
                      fontSize: '12.5px',
                      fontFamily: 'DM Mono, monospace',
                      fontWeight: 500
                    }}
                  >
                    <CheckCircle size={14} style={{ color: 'var(--accent-rust)', flexShrink: 0 }} />
                    <span>{sector.metrics}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Commercial;

