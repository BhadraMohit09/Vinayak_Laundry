import React, { useState, useEffect, useRef } from "react";

const STAGES = [
  {
    id: 1,
    label: "SCENE 01 · PREPARATION",
    subtitle: "Each garment is tagged, sorted and inspected by fabric type.",
    scene: "preparation",
  },
  {
    id: 2,
    label: "SCENE 02 · GENTLE WASH",
    subtitle: "Eco-solvent cycle calibrated for fibre preservation.",
    scene: "wash",
  },
  {
    id: 3,
    label: "SCENE 03 · FRESH RINSE",
    subtitle: "Double-rinse removes all residue. Zero harsh chemicals.",
    scene: "rinse",
  },
  {
    id: 4,
    label: "SCENE 04 · STEAM FINISH",
    subtitle: "Professional steam de-wrinkling and fabric revival.",
    scene: "steam",
  },
  {
    id: 5,
    label: "SCENE 05 · FRESHLY FOLDED",
    subtitle: "Precision-folded, wrapped and ready within 24 hours.",
    scene: "fold",
  },
];

const STAGE_DURATION = 3600;

const ScenePreparation = () => (
  <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="gca-scene-svg" aria-hidden="true">
    <path d="M70 40 L55 55 L65 65 L65 125 L135 125 L135 65 L145 55 L130 40 Q115 50 100 50 Q85 50 70 40Z" fill="rgba(26,24,21,0.06)" stroke="rgba(26,24,21,0.25)" strokeWidth="1.5" strokeLinejoin="round" className="gca-shirt" />
    <path d="M100 50 L107 65 L100 70 L93 65 Z" fill="rgba(26,24,21,0.1)" stroke="rgba(26,24,21,0.2)" strokeWidth="1" />
    <circle cx="130" cy="88" r="18" stroke="#b2531a" strokeWidth="1.8" fill="rgba(178,83,26,0.08)" className="gca-magnifier" />
    <line x1="143" y1="101" x2="153" y2="111" stroke="#b2531a" strokeWidth="2" strokeLinecap="round" />
    <rect x="85" y="90" width="30" height="18" rx="3" fill="rgba(246,243,237,0.9)" stroke="rgba(26,24,21,0.2)" strokeWidth="1" />
    <line x1="92" y1="95" x2="108" y2="95" stroke="rgba(26,24,21,0.3)" strokeWidth="1" />
    <line x1="92" y1="99" x2="103" y2="99" stroke="rgba(26,24,21,0.2)" strokeWidth="1" />
    <circle cx="130" cy="84" r="1.5" fill="#b2531a" opacity="0.7" className="gca-pulse-dot" />
    <circle cx="134" cy="89" r="1.5" fill="#b2531a" opacity="0.5" className="gca-pulse-dot" style={{animationDelay:"0.3s"}} />
    <circle cx="126" cy="92" r="1.5" fill="#b2531a" opacity="0.5" className="gca-pulse-dot" style={{animationDelay:"0.6s"}} />
  </svg>
);

const SceneWash = () => (
  <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="gca-scene-svg" aria-hidden="true">
    <circle cx="100" cy="82" r="52" fill="rgba(26,24,21,0.05)" stroke="rgba(26,24,21,0.2)" strokeWidth="1.5" />
    <circle cx="100" cy="82" r="34" fill="rgba(178,83,26,0.07)" stroke="rgba(26,24,21,0.18)" strokeWidth="1.2" />
    <circle cx="100" cy="82" r="24" fill="rgba(178,83,26,0.12)" stroke="rgba(178,83,26,0.4)" strokeWidth="1" />
    <path d="M80 82 Q87 76 94 82 Q101 88 108 82 Q115 76 122 82" stroke="#b2531a" strokeWidth="1.5" fill="none" strokeLinecap="round" className="gca-wave1" />
    <path d="M80 88 Q87 82 94 88 Q101 94 108 88 Q115 82 122 88" stroke="rgba(178,83,26,0.5)" strokeWidth="1.2" fill="none" strokeLinecap="round" className="gca-wave2" />
    <circle cx="68" cy="82" r="3" fill="rgba(26,24,21,0.12)" />
    <circle cx="132" cy="82" r="3" fill="rgba(26,24,21,0.12)" />
    <circle cx="100" cy="50" r="3" fill="rgba(26,24,21,0.12)" />
    <circle cx="100" cy="114" r="3" fill="rgba(26,24,21,0.12)" />
    <path d="M100 36 A46 46 0 0 1 146 82" stroke="#b2531a" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="4 4" className="gca-spin-arc" />
    <rect x="72" y="26" width="56" height="8" rx="4" fill="rgba(26,24,21,0.08)" />
    <circle cx="88" cy="30" r="2" fill="#b2531a" opacity="0.6" />
    <circle cx="100" cy="30" r="2" fill="rgba(26,24,21,0.2)" />
    <circle cx="112" cy="30" r="2" fill="rgba(26,24,21,0.2)" />
  </svg>
);

const SceneRinse = () => (
  <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="gca-scene-svg" aria-hidden="true">
    <path d="M50 80 L60 130 L140 130 L150 80 Z" fill="rgba(26,24,21,0.05)" stroke="rgba(26,24,21,0.2)" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M62 110 L138 110 L136 128 L64 128 Z" fill="rgba(178,83,26,0.12)" />
    <path d="M65 110 Q76 104 87 110 Q98 116 109 110 Q120 104 131 110" stroke="#b2531a" strokeWidth="1.4" fill="none" strokeLinecap="round" className="gca-wave1" />
    <rect x="88" y="30" width="24" height="8" rx="4" fill="rgba(26,24,21,0.15)" />
    <line x1="100" y1="38" x2="100" y2="52" stroke="rgba(26,24,21,0.2)" strokeWidth="1.5" />
    <ellipse cx="92" cy="60" rx="2" ry="3" fill="#b2531a" opacity="0.6" className="gca-drop1" />
    <ellipse cx="100" cy="68" rx="2" ry="3" fill="#b2531a" opacity="0.5" className="gca-drop2" />
    <ellipse cx="108" cy="58" rx="2" ry="3" fill="#b2531a" opacity="0.6" className="gca-drop3" />
    <ellipse cx="96" cy="76" rx="2" ry="3" fill="#b2531a" opacity="0.4" className="gca-drop1" style={{animationDelay:"0.4s"}} />
    <ellipse cx="104" cy="82" rx="2" ry="3" fill="#b2531a" opacity="0.4" className="gca-drop2" style={{animationDelay:"0.2s"}} />
    <circle cx="78" cy="122" r="3" stroke="rgba(26,24,21,0.2)" strokeWidth="1" fill="none" className="gca-bubble" />
    <circle cx="100" cy="119" r="4" stroke="rgba(178,83,26,0.4)" strokeWidth="1" fill="none" className="gca-bubble" style={{animationDelay:"0.5s"}} />
    <circle cx="122" cy="123" r="3" stroke="rgba(26,24,21,0.2)" strokeWidth="1" fill="none" className="gca-bubble" style={{animationDelay:"1s"}} />
  </svg>
);

const SceneSteam = () => (
  <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="gca-scene-svg" aria-hidden="true">
    <path d="M60 90 L60 110 Q60 120 70 120 L150 120 Q164 120 168 108 L172 90 Z" fill="rgba(26,24,21,0.1)" stroke="rgba(26,24,21,0.25)" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M80 90 L80 72 Q80 62 90 62 L120 62 Q130 62 130 72 L130 90" fill="rgba(26,24,21,0.07)" stroke="rgba(26,24,21,0.2)" strokeWidth="1.3" />
    <path d="M62 118 Q62 124 70 124 L150 124 Q163 124 166 118 Z" fill="#b2531a" opacity="0.2" />
    <circle cx="88" cy="108" r="2" fill="rgba(26,24,21,0.15)" />
    <circle cx="100" cy="108" r="2" fill="rgba(26,24,21,0.15)" />
    <circle cx="112" cy="108" r="2" fill="rgba(26,24,21,0.15)" />
    <circle cx="124" cy="108" r="2" fill="rgba(26,24,21,0.15)" />
    <path d="M88 100 Q84 92 88 84 Q92 76 88 68" stroke="#b2531a" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" className="gca-steam1" />
    <path d="M100 100 Q96 90 100 80 Q104 70 100 60" stroke="#b2531a" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" className="gca-steam2" />
    <path d="M112 100 Q108 92 112 84 Q116 76 112 68" stroke="#b2531a" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" className="gca-steam3" />
    <rect x="40" y="128" width="128" height="4" rx="2" fill="rgba(26,24,21,0.08)" />
    <line x1="50" y1="138" x2="80" y2="138" stroke="rgba(26,24,21,0.1)" strokeWidth="2" strokeLinecap="round" />
    <line x1="90" y1="138" x2="150" y2="138" stroke="rgba(26,24,21,0.1)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SceneFold = () => (
  <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="gca-scene-svg" aria-hidden="true">
    <rect x="50" y="118" width="100" height="14" rx="4" fill="rgba(26,24,21,0.08)" stroke="rgba(26,24,21,0.15)" strokeWidth="1" />
    <rect x="54" y="104" width="92" height="14" rx="4" fill="rgba(26,24,21,0.1)" stroke="rgba(26,24,21,0.18)" strokeWidth="1" />
    <rect x="58" y="90" width="84" height="14" rx="4" fill="rgba(26,24,21,0.12)" stroke="rgba(26,24,21,0.2)" strokeWidth="1" className="gca-top-garment" />
    <line x1="66" y1="97" x2="134" y2="97" stroke="rgba(26,24,21,0.12)" strokeWidth="1" />
    <path d="M100 88 L100 134" stroke="#b2531a" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.5" />
    <path d="M94 92 Q88 86 82 90 Q88 96 94 92Z" fill="#b2531a" opacity="0.35" className="gca-bow" />
    <path d="M106 92 Q112 86 118 90 Q112 96 106 92Z" fill="#b2531a" opacity="0.35" className="gca-bow" />
    <circle cx="100" cy="92" r="3" fill="#b2531a" opacity="0.5" />
    <circle cx="148" cy="78" r="14" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.4)" strokeWidth="1.2" className="gca-check-circle" />
    <path d="M141 78 L146 83 L155 73" stroke="#10b981" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="58" cy="72" r="2" fill="#b2531a" opacity="0.4" className="gca-sparkle" />
    <circle cx="142" cy="118" r="1.5" fill="#b2531a" opacity="0.3" className="gca-sparkle" style={{animationDelay:"0.5s"}} />
    <circle cx="68" cy="118" r="1.5" fill="rgba(26,24,21,0.2)" className="gca-sparkle" style={{animationDelay:"1s"}} />
  </svg>
);

const SCENE_COMPONENTS = { preparation: ScenePreparation, wash: SceneWash, rinse: SceneRinse, steam: SceneSteam, fold: SceneFold };

export default function GarmentCareAnimation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const prefersReduced = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (prefersReduced.current) return;
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setActiveIndex(i => (i + 1) % STAGES.length); setVisible(true); }, 380);
    }, STAGE_DURATION);
    return () => clearInterval(timer);
  }, []);

  const stage = STAGES[activeIndex];
  const SceneSVG = SCENE_COMPONENTS[stage.scene];

  return (
    <div className="gca-root" aria-label="Garment care animation">
      <div className="gca-topbar">
        <span className="gca-label">{stage.label}</span>
        <span className="gca-stage-dots">
          {STAGES.map((s, i) => (
            <button key={s.id} className={"gca-dot" + (i === activeIndex ? " active" : "")}
              onClick={() => { setVisible(false); setTimeout(() => { setActiveIndex(i); setVisible(true); }, 280); }}
              aria-label={"Scene " + s.id} />
          ))}
        </span>
      </div>
      <div className="gca-heading">THE ART OF<br />GARMENT CARE</div>
      <div className={"gca-scene-wrap" + (visible ? " gca-visible" : " gca-hidden")}>
        <SceneSVG />
      </div>
      <p className={"gca-subtitle" + (visible ? " gca-visible" : " gca-hidden")}>{stage.subtitle}</p>
      <div className="gca-progress-track" aria-hidden="true">
        <div key={activeIndex} className="gca-progress-fill" style={{animationDuration: STAGE_DURATION + "ms"}} />
      </div>
    </div>
  );
}
