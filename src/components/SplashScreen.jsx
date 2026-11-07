import React, { useEffect, useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck, Droplets, Wind, Shirt } from "lucide-react";

const STAGES = [
  {
    step: "01",
    tag: "INSPECTION",
    title: "Fabric Analysis & Fiber Mapping",
    desc: "Gentle eco-solvent treatment calibrated to fabric weave.",
    icon: Droplets,
    progress: 35,
  },
  {
    step: "02",
    tag: "TREATMENT",
    title: "Precision Stain Extraction",
    desc: "Zero harsh percs. Preserving fiber elasticity and natural sheen.",
    icon: Wind,
    progress: 70,
  },
  {
    step: "03",
    tag: "FINISHING",
    title: "Hand Steam & Artisanal Fold",
    desc: "Crisp creases, tagged, itemized, and ready for return.",
    icon: Shirt,
    progress: 100,
  },
];

export default function SplashScreen({ onFinish }) {
  const [activeStage, setActiveStage] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInteracted, setIsInteracted] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setActiveStage(1), 900);
    const t2 = setTimeout(() => setActiveStage(2), 1800);
    const tFade = setTimeout(() => setIsFading(true), 2800);
    const tEnd = setTimeout(() => {
      if (onFinish) onFinish();
    }, 3400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(tFade);
      clearTimeout(tEnd);
    };
  }, [onFinish]);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 20;
    const y = ((clientY - top) / height - 0.5) * 20;
    setMousePos({ x, y });
  };

  const handleStageClick = (idx) => {
    setIsInteracted(true);
    setActiveStage(idx);
  };

  const handleSkip = () => {
    setIsFading(true);
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 450);
  };

  const stage = STAGES[activeStage];
  const IconComponent = stage.icon;

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "var(--bg-main, #f6f3ed)",
        zIndex: 999999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: isFading ? 0 : 1,
        visibility: isFading ? "hidden" : "visible",
        transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s ease",
        pointerEvents: isFading ? "none" : "auto",
        padding: "24px",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* Background Ambient Radial Glow */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(178, 83, 26, 0.08) 0%, rgba(246, 243, 237, 0) 70%)",
          transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px)`,
          transition: "transform 0.2s ease-out",
          pointerEvents: "none",
        }}
      />

      {/* Top Skip / Enter Experience Button */}
      <button
        onClick={handleSkip}
        type="button"
        style={{
          position: "absolute",
          top: "28px",
          right: "28px",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 16px",
          borderRadius: "9999px",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid var(--border-subtle, rgba(26,24,21,0.08))",
          color: "var(--ink, #1a1815)",
          fontSize: "12px",
          fontFamily: "'DM Mono', monospace",
          fontWeight: 600,
          letterSpacing: "0.06em",
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: "0 2px 10px rgba(26,24,21,0.04)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.background = "#ffffff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.8)";
        }}
      >
        <span>ENTER STUDIO</span>
        <ArrowRight size={13} style={{ color: "var(--accent-rust, #b2531a)" }} />
      </button>

      {/* Interactive Main Center Pod */}
      <div
        style={{
          position: "relative",
          width: "min(100%, 460px)",
          background: "#ffffff",
          borderRadius: "28px",
          padding: "clamp(28px, 5vw, 40px)",
          border: "1px solid var(--border-subtle, rgba(26,24,21,0.08))",
          boxShadow: "0 20px 50px -12px rgba(26, 24, 21, 0.12)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          transform: `perspective(1000px) rotateX(${-mousePos.y * 0.4}deg) rotateY(${mousePos.x * 0.4}deg)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        {/* Brand Crest & Monogram */}
        <div
          style={{
            position: "relative",
            width: "74px",
            height: "74px",
            borderRadius: "22px",
            background: "linear-gradient(135deg, #fdfbf7 0%, #f4ede2 100%)",
            border: "1px solid var(--border-subtle, rgba(26,24,21,0.1))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            boxShadow: "0 8px 24px -6px rgba(178, 83, 26, 0.18)",
          }}
        >
          {/* Subtle spinning outer orbit ring */}
          <div
            style={{
              position: "absolute",
              inset: "-6px",
              borderRadius: "26px",
              border: "1.5px dashed rgba(178, 83, 26, 0.35)",
              animation: "spin 14s linear infinite",
            }}
          />
          <img
            src="/assets/logo.svg"
            alt="Siddhi Vinayak Logo"
            style={{
              width: "42px",
              height: "42px",
              objectFit: "contain",
              filter: "drop-shadow(0 2px 4px rgba(26,24,21,0.12))",
            }}
          />
        </div>

        {/* Wordmark Title */}
        <div style={{ marginBottom: "6px" }}>
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "26px",
              fontWeight: 600,
              color: "var(--ink, #1a1815)",
              letterSpacing: "-0.02em",
            }}
          >
            Siddhi Vinayak
          </span>
          <i
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "26px",
              fontWeight: 400,
              color: "var(--accent-rust, #b2531a)",
              marginLeft: "6px",
            }}
          >
            Laundry
          </i>
        </div>

        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.14em",
            color: "var(--accent-rust, #b2531a)",
            textTransform: "uppercase",
            marginBottom: "24px",
            fontWeight: 500,
          }}
        >
          GARMENT CARE STUDIO · JAMNAGAR
        </p>

        {/* Dynamic Interactive Stage Card */}
        <div
          style={{
            width: "100%",
            background: "var(--bg-card-subtle, #f9f7f2)",
            border: "1px solid var(--border-subtle, rgba(26,24,21,0.06))",
            borderRadius: "18px",
            padding: "16px 20px",
            marginBottom: "22px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            textAlign: "left",
            transition: "all 0.3s ease",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "10.5px",
                letterSpacing: "0.1em",
                color: "var(--accent-rust, #b2531a)",
                fontWeight: 600,
                background: "rgba(178,83,26,0.1)",
                padding: "3px 8px",
                borderRadius: "9999px",
              }}
            >
              STAGE {stage.step} · {stage.tag}
            </span>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "#ffffff",
                display: "grid",
                placeItems: "center",
                color: "var(--accent-rust, #b2531a)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <IconComponent size={15} />
            </div>
          </div>

          <div
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--ink, #1a1815)",
              lineHeight: 1.25,
            }}
          >
            {stage.title}
          </div>

          <div style={{ fontSize: "12.5px", color: "var(--text-secondary, #78716c)", lineHeight: 1.5 }}>
            {stage.desc}
          </div>
        </div>

        {/* Interactive Clickable Stage Pill Nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            width: "100%",
            marginBottom: "16px",
          }}
        >
          {STAGES.map((s, i) => (
            <button
              key={s.step}
              type="button"
              onClick={() => handleStageClick(i)}
              style={{
                flex: 1,
                height: "6px",
                borderRadius: "3px",
                border: "none",
                background:
                  i === activeStage
                    ? "var(--accent-rust, #b2531a)"
                    : i < activeStage
                    ? "rgba(178, 83, 26, 0.45)"
                    : "rgba(26, 24, 21, 0.1)",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s ease",
              }}
              title={`Switch to ${s.title}`}
            />
          ))}
        </div>

        {/* Bottom Status / Hint */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "11.5px",
            color: "var(--text-secondary, #78716c)",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
              display: "inline-block",
            }}
          />
          <span>Plant Active · 24–36h Express Delivery</span>
        </div>
      </div>
    </div>
  );
}
