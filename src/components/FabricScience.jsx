import React, { useState } from 'react';
import { Microscope, ShieldCheck, AlertTriangle, Activity, Fingerprint, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

const fabricProfiles = {
  silk: {
    name: "Pure Silk & Zari Saree",
    specimen: "SPECIMEN #SVL-SLK-01",
    compound: "Fibroin & Sericin Protein Matrix [(C15H23N5O6)n]",
    zoom: "50,000x SEM Magnification",
    phTolerance: "Strictly pH 6.8 - 7.2 (Neutral)",
    desc: "Delicate natural protein polypeptides highly vulnerable to alkaline swelling and metallic zari oxidation.",
    traditional: {
      title: "Standard Dhobi / Harsh Commercial Wash",
      status: "DEGRADATION DETECTED",
      integrityScore: 42,
      points: [
        "High-pH alkaline detergents dissolve natural protective sericin coating",
        "Aggressive rotary tumbling causes micro-fissures along thread shafts",
        "Uncontrolled oxidation tarnishes real silver/gold zari into dull black"
      ]
    },
    svl: {
      title: "SVL Bio-Solvent X-Ray Immersion Protocol",
      status: "MOLECULAR PRESERVATION",
      integrityScore: 99.4,
      points: [
        "Neutral pH 7.0 silicone solvent cushions protein cuticles without swelling",
        "Hydrocarbon suspension lifts embedded particulate without mechanical rubbing",
        "Cationic polymer shield locks pigments to stop cross-bleeding on zari"
      ]
    }
  },
  wool: {
    name: "Cashmere & Tailored Woolen Blazer",
    specimen: "SPECIMEN #SVL-WOL-04",
    compound: "Alpha-Keratin Helical Polypeptide Weave",
    zoom: "65,000x SEM Magnification",
    phTolerance: "Strictly pH 6.5 - 7.0 (Slightly Acidic/Neutral)",
    desc: "Complex interlocking keratin cuticles that rapidly mat, felt, or irreversibly shrink under thermal shock.",
    traditional: {
      title: "Standard Wet Wash / Local Dry Clean",
      status: "STRUCTURAL FAILURE",
      integrityScore: 58,
      points: [
        "Thermal shock forces keratin scales to interlock causing severe felting shrinkage",
        "Harsh chemical residues leave fine cashmere feeling rough and scratchy",
        "Flat iron pressing crushes the internal canvas chest piece and lapel roll"
      ]
    },
    svl: {
      title: "SVL Bio-Solvent X-Ray Immersion Protocol",
      status: "DIMENSIONAL STABILITY",
      integrityScore: 100,
      points: [
        "Cold-cycle distillation maintains cuticle alignment preventing shrinkage",
        "Lanolin-rich bio-conditioner replenishes natural animal fiber softness",
        "Tension-controlled steam mannequins restore tailored anatomical drape"
      ]
    }
  },
  cotton: {
    name: "Egyptian Cotton & Premium Linen",
    specimen: "SPECIMEN #SVL-CTN-09",
    compound: "Crystalline Cellulose D-Glucose Polymer",
    zoom: "40,000x SEM Magnification",
    phTolerance: "pH 6.0 - 8.5 (Broad Range)",
    desc: "High-tensile plant cellulose weave that develops sharp memory creases and traps stubborn collar lipid acids.",
    traditional: {
      title: "Regular Commercial Laundry Machine",
      status: "WEAR & SCORCHING",
      integrityScore: 65,
      points: [
        "High-temperature boiling debonds fused collar & cuff interlinings prematurely",
        "Chlorine bleach micro-pits cellulose walls weakening tensile garment strength",
        "Heavy mechanical roller ironing creates permanent shiny scorch marks on seams"
      ]
    },
    svl: {
      title: "SVL Bio-Solvent X-Ray Immersion Protocol",
      status: "CRISP LUSTER RESTORED",
      integrityScore: 98.5,
      points: [
        "Enzymatic lipid pre-targeting dissolves collar perspiration sebum organically",
        "Optical brightening matrix restores brilliant white luminance without bleach wear",
        "Soft-pad vacuum table pressing imparts crisp executive finish with zero shine"
      ]
    }
  }
};

const FabricScience = () => {
  const [activeTab, setActiveTab] = useState('silk');
  const current = fabricProfiles[activeTab];

  return (
    <section className="section" style={{ background: '#0f172a', color: '#f8fafc', padding: '5rem 0' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1.2rem',
            background: 'rgba(192, 132, 252, 0.15)',
            color: '#c084fc',
            border: '1px solid rgba(192, 132, 252, 0.3)',
            borderRadius: '50px',
            fontSize: '0.82rem',
            fontWeight: '600',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '1.2rem'
          }}>
            <Microscope size={15} /> Textile Laboratory Diagnostic
          </div>
          
          <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.5px', color: 'white' }}>
            Interactive <span style={{ background: 'linear-gradient(135deg, #60a5fa, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Molecular X-Ray</span>
          </h2>
          
          <p style={{ color: '#94a3b8', maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Explore our forensic laboratory diagnostic comparing mechanical fiber wear against SVL's bio-solvent molecular care.
          </p>
        </div>

        {/* Specimen Selector Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
          {Object.keys(fabricProfiles).map((key) => {
            const profile = fabricProfiles[key];
            const isSelected = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  padding: '0.85rem 1.75rem',
                  borderRadius: '12px',
                  border: isSelected ? '1px solid #60a5fa' : '1px solid #334155',
                  background: isSelected ? 'rgba(96, 165, 250, 0.15)' : '#1e293b',
                  color: isSelected ? '#60a5fa' : '#cbd5e1',
                  fontSize: '0.95rem',
                  fontWeight: isSelected ? '700' : '500',
                  cursor: 'pointer',
                  transition: 'background 0.2s, border-color 0.2s, color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: isSelected ? '0 0 20px rgba(96, 165, 250, 0.2)' : 'none'
                }}
              >
                <Fingerprint size={16} style={{ opacity: isSelected ? 1 : 0.6 }} />
                <span>{profile.name}</span>
              </button>
            );
          })}
        </div>

        {/* Professional Diagnostic Report Container */}
        <div style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '24px',
          padding: 'clamp(1.5rem, 4vw, 3rem)',
          maxWidth: '1080px',
          margin: '0 auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          
          {/* Specimen Telemetry Banner */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            padding: '1.2rem 1.5rem',
            background: '#0f172a',
            borderRadius: '16px',
            border: '1px solid #334155',
            marginBottom: '2.5rem',
            fontSize: '0.88rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Activity size={20} style={{ color: '#38bdf8' }} />
              <div>
                <span style={{ color: '#64748b', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', fontWeight: '700' }}>Active Analysis</span>
                <strong style={{ color: '#f1f5f9', fontSize: '1rem' }}>{current.name}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: '#94a3b8' }}>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.72rem', display: 'block' }}>Specimen ID</span>
                <span style={{ fontFamily: 'monospace', color: '#cbd5e1' }}>{current.specimen}</span>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.72rem', display: 'block' }}>Bio-Chemistry</span>
                <span style={{ color: '#cbd5e1' }}>{current.compound}</span>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.72rem', display: 'block' }}>Telemetry Resolution</span>
                <span style={{ color: '#cbd5e1' }}>{current.zoom}</span>
              </div>
            </div>
          </div>

          <p style={{ color: '#94a3b8', fontSize: '0.96rem', marginBottom: '2.5rem', lineHeight: '1.6', textAlign: 'center', maxWidth: '850px', margin: '0 auto 2.5rem' }}>
            {current.desc}
          </p>

          {/* Side-by-Side Diagnostic Columns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: '2rem' }}>
            
            {/* Left Box: Traditional Degradation */}
            <div style={{
              background: '#0f172a',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              borderRadius: '20px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#f87171' }}>
                    <AlertTriangle size={22} />
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>{current.traditional.title}</h4>
                  </div>
                  <span style={{ padding: '3px 10px', background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.5px' }}>
                    {current.traditional.status}
                  </span>
                </div>

                {/* Integrity Progress Bar */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: '#94a3b8' }}>Calculated Fiber Retention</span>
                    <strong style={{ color: '#f87171' }}>{current.traditional.integrityScore}% (Critical Wear)</strong>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#334155', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${current.traditional.integrityScore}%`, height: '100%', background: '#ef4444', borderRadius: '4px' }}></div>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0, margin: '0 0 2rem' }}>
                  {current.traditional.points.map((pt, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', color: '#cbd5e1', fontSize: '0.92rem', lineHeight: '1.5' }}>
                      <XCircle size={18} style={{ color: '#ef4444', flexShrink: 0, marginTop: '3px' }} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ padding: '0.85rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px dashed rgba(239, 68, 68, 0.3)', borderRadius: '10px', color: '#fca5a5', fontSize: '0.82rem', textAlign: 'center' }}>
                Outcome: Accelerated textile aging & visible luster loss
              </div>
            </div>

            {/* Right Box: SVL Bio-Solvent Care */}
            <div style={{
              background: 'linear-gradient(180deg, #0f172a 0%, rgba(30, 58, 138, 0.2) 100%)',
              border: '2px solid #3b82f6',
              borderRadius: '20px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.15)'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#60a5fa' }}>
                    <ShieldCheck size={22} />
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>{current.svl.title}</h4>
                  </div>
                  <span style={{ padding: '3px 10px', background: 'rgba(34, 197, 94, 0.2)', color: '#86efac', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.5px' }}>
                    {current.svl.status}
                  </span>
                </div>

                {/* Integrity Progress Bar */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: '#94a3b8' }}>Calculated Fiber Retention</span>
                    <strong style={{ color: '#4ade80' }}>{current.svl.integrityScore}% (Pristine Condition)</strong>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#334155', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${current.svl.integrityScore}%`, height: '100%', background: '#22c55e', borderRadius: '4px' }}></div>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0, margin: '0 0 2rem' }}>
                  {current.svl.points.map((pt, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', color: '#f1f5f9', fontSize: '0.92rem', lineHeight: '1.5', fontWeight: '500' }}>
                      <CheckCircle2 size={18} style={{ color: '#22c55e', flexShrink: 0, marginTop: '3px' }} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ padding: '0.85rem', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '10px', color: '#93c5fd', fontSize: '0.82rem', textAlign: 'center', fontWeight: '600' }}>
                Outcome: Extended wardrobe durability & vibrant original finish
              </div>
            </div>

          </div>

          {/* Action Callout */}
          <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #334155', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.95rem', color: '#cbd5e1' }}>
              Want laboratory-grade care for your favorite designer outfits?
            </span>
            <a
              href="https://wa.me/916351674100?text=Hello%20SVL,%20I%20would%20like%20to%20experience%20your%20Bio-Solvent%20Dry%20Cleaning."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.7rem 1.5rem',
                background: '#3b82f6',
                color: 'white',
                fontWeight: '700',
                borderRadius: '50px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                transition: 'background 0.2s',
                boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)'
              }}
            >
              Consult SVL Specialists <ArrowRight size={16} />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FabricScience;
