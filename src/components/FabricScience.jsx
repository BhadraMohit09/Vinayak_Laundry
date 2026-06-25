import React, { useState } from 'react';
import { Microscope, Sparkles, CheckCircle2, XCircle } from 'lucide-react';

const fabricProfiles = {
  silk: {
    name: "Pure Silk & Zari Saree",
    desc: "Delicate natural protein fibers prone to alkaline burn and dye bleeding.",
    traditional: {
      title: "Traditional Harsh Wash",
      points: [
        "High pH detergent strips natural sericin luster",
        "Aggressive tumbling causes microscopic thread fracturing",
        "Zari oxidation leading to dull black tarnishing"
      ],
      score: "42% Fiber Retention"
    },
    svl: {
      title: "SVL Bio-Solvent X-Ray Protocol",
      points: [
        "Neutral pH 7.0 silicone solvent protects delicate protein cuticles",
        "Hydrocarbon immersion suspends dirt particles without mechanical rubbing",
        "Color-lock polymer shield prevents dye migration across contrasting zari"
      ],
      score: "99.4% Fiber Integrity"
    }
  },
  wool: {
    name: "Cashmere & Woolen Blazer",
    desc: "Complex animal keratin structures that easily mat, shrink, or deform.",
    traditional: {
      title: "Standard Dry / Wet Cleaning",
      points: [
        "Thermal shock causes irreversible felting and shrinkage",
        "Chlorine residues make fabric feel rough and stiff",
        "Improper pressing flattens the natural lapel roll"
      ],
      score: "58% Structure Score"
    },
    svl: {
      title: "SVL Bio-Solvent X-Ray Protocol",
      points: [
        "Cold-cycle distillation prevents keratin scale felting",
        "Bio-conditioner restores natural loft and breathability",
        "Form-fitting steam tension mannequins preserve tailored blazer lines"
      ],
      score: "100% Tailored Shape"
    }
  },
  cotton: {
    name: "Egyptian Cotton & Linen",
    desc: "High-density cellulose weave that wrinkles sharply and absorbs collar perspiration.",
    traditional: {
      title: "Regular Commercial Laundry",
      points: [
        "Boiling water causes rapid collar interlining debonding",
        "Harsh bleaching degrades tensile cellulose strength over time",
        "Flat roller ironers leave shiny scorch marks on seams"
      ],
      score: "65% Lifespan Span"
    },
    svl: {
      title: "SVL Bio-Solvent X-Ray Protocol",
      points: [
        "Bio-enzyme targeted pre-spray dissolves perspiration lipids organically",
        "Optical brighteners revive brilliant white luminance naturally",
        "Soft-pad vacuum pressing ensures crisp, wrinkle-free finish without shine"
      ],
      score: "98% Crisp Finish"
    }
  }
};

const FabricScience = () => {
  const [activeTab, setActiveTab] = useState('silk');
  const current = fabricProfiles[activeTab];

  return (
    <section className="section" style={{ background: 'linear-gradient(180deg, var(--bg-main) 0%, #f1f5f9 100%)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1.2rem',
            background: 'rgba(124, 58, 237, 0.1)',
            color: 'var(--accent-primary)',
            borderRadius: '50px',
            fontSize: '0.85rem',
            fontWeight: '600',
            marginBottom: '1rem'
          }}>
            <Microscope size={16} /> Advanced Textile Science
          </div>
          
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem', letterSpacing: '-0.5px' }}>
            Interactive <span className="text-gradient">Molecular X-Ray</span>
          </h2>
          
          <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto', fontSize: '1.1rem' }}>
            Select a textile type below to inspect how traditional washing degrades microscopic fibers compared to SVL's next-generation fabric restoration protocol.
          </p>
        </div>

        {/* Textile Selector Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {Object.keys(fabricProfiles).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={activeTab === key ? 'btn-primary' : 'btn-outline'}
              style={{
                padding: '0.8rem 2rem',
                fontSize: '1rem',
                fontWeight: activeTab === key ? '700' : '500',
                boxShadow: activeTab === key ? '0 10px 25px rgba(124, 58, 237, 0.3)' : 'none'
              }}
            >
              {fabricProfiles[key].name}
            </button>
          ))}
        </div>

        {/* X-Ray Comparison Card */}
        <div className="glass-panel hover-lift" style={{ padding: '3rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>{current.name}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{current.desc}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '2.5rem' }}>
            
            {/* Left Column: Traditional Wash */}
            <div style={{
              background: 'rgba(239, 68, 68, 0.03)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '20px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem', color: '#dc2626' }}>
                  <XCircle size={28} />
                  <h4 style={{ fontSize: '1.25rem', margin: 0 }}>{current.traditional.title}</h4>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.5rem' }}>
                  {current.traditional.points.map((pt, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                      <span style={{ color: '#ef4444', fontWeight: 'bold', marginTop: '2px' }}>✕</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{
                padding: '1rem',
                background: 'rgba(239, 68, 68, 0.1)',
                borderRadius: '12px',
                textAlign: 'center',
                color: '#dc2626',
                fontWeight: '700',
                fontSize: '1rem'
              }}>
                ⚠️ Integrity Metric: {current.traditional.score}
              </div>
            </div>

            {/* Right Column: SVL Protocol */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.06), rgba(37, 99, 235, 0.06))',
              border: '2px solid var(--accent-primary)',
              borderRadius: '20px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 15px 35px rgba(124, 58, 237, 0.1)'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
                  <Sparkles size={28} />
                  <h4 style={{ fontSize: '1.25rem', margin: 0 }}>{current.svl.title}</h4>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.5rem' }}>
                  {current.svl.points.map((pt, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.5', fontWeight: '500' }}>
                      <CheckCircle2 size={20} style={{ color: '#22c55e', flexShrink: 0, marginTop: '2px' }} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{
                padding: '1rem',
                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                borderRadius: '12px',
                textAlign: 'center',
                color: 'white',
                fontWeight: '700',
                fontSize: '1rem',
                boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)'
              }}>
                🛡️ Integrity Metric: {current.svl.score}
              </div>
            </div>

          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Want to experience zero-shrinkage garment care?
            </span>
            <a href="https://wa.me/916351674100?text=Hello%20SVL,%20I%20want%20to%20try%20your%20Bio-Solvent%20Dry%20Cleaning!" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-secondary)', fontWeight: '700', marginLeft: '8px', textDecoration: 'underline' }}>
              Book via WhatsApp (+91 6351674100)
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FabricScience;
