import React, { useState, useEffect, useRef } from "react";

/**
 * TypewriterHeading
 * Types out segments at natural human speed with subtle variability,
 * interactive blinking cursor, and replay upon click/tap.
 */
export default function TypewriterHeading({
  as: Tag = "h1",
  className = "",
  style = {},
  segments = [],
  speed = 70, // Human typing speed (~60-90ms)
  delay = 250,
}) {
  const [displayedSegments, setDisplayedSegments] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplayedSegments(segments.map((s) => s.text || ""));
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    let segIdx = 0;
    let charIdx = 0;
    const currentTexts = segments.map(() => "");
    setDisplayedSegments([...currentTexts]);

    let timeoutId;

    const typeNextChar = () => {
      if (segIdx >= segments.length) {
        setIsTyping(false);
        return;
      }

      const targetText = segments[segIdx].text || "";
      if (charIdx < targetText.length) {
        charIdx++;
        currentTexts[segIdx] = targetText.slice(0, charIdx);
        setDisplayedSegments([...currentTexts]);

        // Human cadence: punctuation has longer pause, slight random jitter
        const char = targetText[charIdx - 1];
        let cadence = speed + Math.random() * 25 - 12;
        if (char === "," || char === ";") cadence += 140;
        if (char === "." || char === "!" || char === "?") cadence += 220;

        timeoutId = setTimeout(typeNextChar, Math.max(30, cadence));
      } else {
        segIdx++;
        charIdx = 0;
        timeoutId = setTimeout(typeNextChar, 100);
      }
    };

    timeoutId = setTimeout(typeNextChar, delay);
    return () => clearTimeout(timeoutId);
  }, [hasStarted, segments, speed, delay, playCount]);

  // Click/tap to replay typing animation interactively
  const handleReplay = () => {
    if (isTyping) return;
    setPlayCount((c) => c + 1);
  };

  return (
    <Tag
      ref={containerRef}
      className={`typewriter-heading-root ${className} ${isTyping ? "is-typing" : ""}`}
      style={{ cursor: "pointer", ...style }}
      onClick={handleReplay}
      title="Click to replay animation"
    >
      {segments.map((seg, i) => {
        const text = hasStarted ? displayedSegments[i] || "" : "";
        const isItalic = seg.italic;
        const isAccent = seg.accent;

        let content = text;
        if (isItalic) {
          content = <i key={i} style={isAccent ? { color: "var(--accent-rust)" } : {}}>{text}</i>;
        } else if (isAccent) {
          content = <span key={i} style={{ color: "var(--accent-rust)" }}>{text}</span>;
        }

        return (
          <React.Fragment key={i}>
            {content}
            {seg.br && <br />}
          </React.Fragment>
        );
      })}
      <span className={`typewriter-cursor ${isTyping ? "typing" : "idle"}`} aria-hidden="true" />
    </Tag>
  );
}
