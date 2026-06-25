import React, { useState } from 'react';
import { Microscope, CheckCircle2, XCircle, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';

const fabricProfiles = {
  silk: {
    name: "Silk & Designer Sarees",
    subtitle: "Protects delicate zari embroidery and stops color bleeding.",
    traditional: {
      title: "Washing at Home or Local Dhobi",
      healthScore: 45,
      points: [
        "Harsh regular detergents strip natural silk luster and softness",
        "Rough hand scrubbing or machine spinning damages fine gold & silver zari",
        "Dyes easily bleed and transfer across contrasting bright patterns"
      ]
    },
    svl: {
      title: "SVL Gentle Bio-Solvent Care",
      healthScore: 100,
      points: [
        "Neutral pH silicone dry cleaning protects delicate natural protein fibers",
        "Gentle immersion cleans deeply without any rough mechanical scrubbing",
        "Advanced color-lock technology completely prevents dye migration"
      ]
    }
  },
  wool: {
    name: "Woolen Blazers & Winter Coats",
    subtitle: "Prevents shrinking and maintains tailored coat shape.",
    traditional: {
      title: "Washing at Home or Local Dhobi",
      healthScore: 60,
      points: [
        "Warm water and rotary tumbling force wool fibers to mat and permanently shrink",
        "Harsh chemical residues leave fine cashmere feeling rough and scratchy",
        "Flat heavy ironing flattens the natural chest canvas and lapel roll"
      ]
    },
    svl: {
      title: "SVL Gentle Bio-Solvent Care",
      healthScore: 100,
      points: [
        "Cold-cycle distillation dry cleaning guarantees 100% zero shrinkage",
        "Specialized bio-conditioners restore natural plush animal fiber softness",
        "Form-fitting tension steam mannequins preserve crisp tailored lines"
      ]
    }
  },
  cotton: {
    name: "Premium Cotton & Linen",
    subtitle: "Removes tough yellow collar stains while keeping fabric crisp.",
    traditional: {
      title: "Washing at Home or Local Dhobi",
      healthScore: 70,
      points: [
        "Boiling hot water weakens fused collar and cuff linings over time",
        "Harsh chlorine bleaching degrades tensile cotton threads causing tearing",
        "Direct heavy roller ironing creates permanent shiny iron marks on seams"
      ]
    },
    svl: {
      title: "SVL Gentle Bio-Solvent Care",
      healthScore: 99,
      points: [
        "Targeted bio-enzymes dissolve stubborn collar perspiration oils organically",
        "Optical brighteners revive brilliant white luminance without fabric thinning",
        "Soft-pad vacuum table pressing imparts a crisp executive finish with zero shine"
      ]
    }
  }
};

const FabricScience = () => {
  const [activeTab, setActiveTab] = useState('silk');
  const current = fabricProfiles[activeTab];

  return (
    <section className="section" style={{ background: 'linear-gradient(180deg, var(--bg-main) 0%, #f8fafc 100%)', padding: '5rem 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 1.25rem',
            background: 'rgba(124, 58, 237, 0.08)',
            color: 'var(--accent-primary)',
            border: '1px solid rgba(124, 58, 237, 0.2)',
            borderRadius: '50px',
            fontSize: '0.85rem',
            fontWeight: '600',
            marginBottom: '1rem'
          }}>
            <Microscope size={16} /> Gentle Garment Care Showcase
          </div>
          
          <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
            The Science of <span className="text-gradient">Fabric Preservation</span>
          </h2>
          
          <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
            See why ordinary home washing and local dhobis degrade your favorite outfits, and how SVL keeps them looking brand new.
          </p>
        </div>

        {/* Friendly Fabric Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {Object.keys(fabricProfiles).map((key) => {
            const profile = fabricProfiles[key];
            const isSelected = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={isSelected ? 'btn-primary' : 'btn-outline'}
                style={{
                  padding: '0.85rem 2rem',
                  fontSize: '0.98rem',
                  fontWeight: isSelected ? '700' : '600',
                  borderRadius: '14px',
                  boxShadow: isSelected ? '0 8px 20px rgba(124, 58, 237, 0.25)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                {profile.name}
              </button>
            );
          })}
        </div>

        {/* Clean Comparison Panel */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid rgba(124, 58, 237, 0.18)',
          borderRadius: '24px',
          padding: 'clamp(1.8rem, 4vw, 3.5rem)',
          maxWidth: '1020px',
          margin: '0 auto',
          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.06)'
        }}>
          
          {/* Subtitle Banner */}
          <div style={{ textAlign: 'center', marginBottom: '3rem', paddingBottom: '1.8rem', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '0.5rem', fontWeight: '700' }}>{current.name}</h3>
            <p style={{ color: 'var(--accent-primary)', fontSize: '1.05rem', fontWeight: '500', margin: 0 }}>{current.subtitle}</p>
          </div>

          {/* Side-by-Side Comparison Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '2.5rem' }}>
            
            {/* Left Box: Traditional Methods */}
            <div style={{
              background: '#fef2f2',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              borderRadius: '20px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: '#dc2626' }}>
                  <AlertTriangle size={24} />
                  <h4 style={{ fontSize: '1.18rem', fontWeight: '700', margin: 0 }}>{current.traditional.title}</h4>
                </div>

                {/* Visual Health Bar */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.45rem', fontWeight: '600' }}>
                    <span style={{ color: '#991b1b' }}>Fabric Health & Lifespan</span>
                    <span style={{ color: '#dc2626' }}>{current.traditional.healthScore}% (Wear Risk)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#fecaca', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${current.traditional.healthScore}%`, height: '100%', background: '#ef4444', borderRadius: '4px' }}></div>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.1rem', padding: 0, margin: '0 0 2rem' }}>
                  {current.traditional.points.map((pt, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', color: '#7f1d1d', fontSize: '0.95rem', lineHeight: '1.5' }}>
                      <XCircle size={19} style={{ color: '#ef4444', flexShrink: 0, marginTop: '2px' }} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ padding: '0.9rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', color: '#b91c1c', fontSize: '0.88rem', textAlign: 'center', fontWeight: '600' }}>
                Result: Rapid fabric aging, color fading, and stiffness
              </div>
            </div>

            {/* Right Box: SVL Gentle Care */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.06), rgba(37, 99, 235, 0.06))',
              border: '2px solid var(--accent-primary)',
              borderRadius: '20px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 12px 30px rgba(124, 58, 237, 0.08)'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
                  <ShieldCheck size={26} />
                  <h4 style={{ fontSize: '1.18rem', fontWeight: '700', margin: 0 }}>{current.svl.title}</h4>
                </div>

                {/* Visual Health Bar */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.45rem', fontWeight: '600' }}>
                    <span style={{ color: 'var(--text-primary)' }}>Fabric Health & Lifespan</span>
                    <span style={{ color: '#16a34a' }}>{current.svl.healthScore}% (Pristine Care)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#dcfce7', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${current.svl.healthScore}%`, height: '100%', background: '#22c55e', borderRadius: '4px' }}></div>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.1rem', padding: 0, margin: '0 0 2rem' }}>
                  {current.svl.points.map((pt, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.5', fontWeight: '500' }}>
                      <CheckCircle2 size={19} style={{ color: '#16a34a', flexShrink: 0, marginTop: '2px' }} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ padding: '0.9rem', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', borderRadius: '12px', color: 'white', fontSize: '0.88rem', textAlign: 'center', fontWeight: '600', boxShadow: '0 4px 15px rgba(124, 58, 237, 0.25)' }}>
                Result: Keeps clothes soft, vibrant, and perfectly shaped
              </div>
            </div>

          </div>

          {/* Action Footer */}
          <div style={{ textAlign: 'center', marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
              Want expert care for your precious garments?
            </span>
            <a
              href="https://wa.me/916351674100?text=Hello%20SVL,%20I%20would%20like%20to%20schedule%20a%20pickup%20for%20my%20clothes."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.8rem 1.8rem',
                fontSize: '0.95rem',
                textDecoration: 'none'
              }}
            >
              Book Gentle Care on WhatsApp <ArrowRight size={18} />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FabricScience;
