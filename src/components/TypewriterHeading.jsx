import React, { useState, useEffect, useRef } from "react";

/**
 * TypewriterHeading
 * - Can accept a single phrase (`segments`) OR an array of phrases (`phrases: Array<Array<Segment>>`).
 * - When `phrases` is provided, it loops infinitely (typing -> pause -> backspacing -> next phrase).
 * - Retains block layout and minHeight to prevent layout shifts.
 * - Interactive: clicking skips to the next phrase.
 */
export default function TypewriterHeading({
  as: Tag = "h1",
  className = "",
  style = {},
  segments = null,
  phrases = null,
  typeSpeed = 65,
  backSpeed = 35,
  holdDelay = 2600,
  startDelay = 200,
  minHeight = "auto",
}) {
  // Normalize phrases list
  const phraseList = phrases && phrases.length > 0 ? phrases : segments ? [segments] : [];
  const isMultiPhrase = phraseList.length > 1;

  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayedSegments, setDisplayedSegments] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted || phraseList.length === 0) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplayedSegments(phraseList[phraseIdx].map((s) => s.text || ""));
      setIsTyping(false);
      return;
    }

    const currentPhrase = phraseList[phraseIdx];
    let isCancelled = false;

    // Helper: calculate total characters across all segments
    const totalChars = currentPhrase.reduce((sum, s) => sum + (s.text ? s.text.length : 0), 0);

    // Build segments from a flat character count
    const buildFromCharCount = (count) => {
      let remaining = count;
      return currentPhrase.map((seg) => {
        const text = seg.text || "";
        if (remaining <= 0) return "";
        if (remaining >= text.length) {
          remaining -= text.length;
          return text;
        }
        const slice = text.slice(0, remaining);
        remaining = 0;
        return slice;
      });
    };

    let currentCharCount = 0;
    setIsTyping(true);

    const stepForward = () => {
      if (isCancelled) return;
      if (currentCharCount < totalChars) {
        currentCharCount++;
        setDisplayedSegments(buildFromCharCount(currentCharCount));

        // Natural cadence
        const lastChar =
          currentCharCount > 0 ? currentPhrase.map((s) => s.text || "").join("")[currentCharCount - 1] : "";
        let cadence = typeSpeed + Math.random() * 20 - 10;
        if (lastChar === "," || lastChar === ";") cadence += 150;
        if (lastChar === "." || lastChar === "!" || lastChar === "?") cadence += 200;

        setTimeout(stepForward, Math.max(25, cadence));
      } else {
        setIsTyping(false);

        if (isMultiPhrase) {
          // Pause then backspace
          setTimeout(stepBackward, holdDelay);
        }
      }
    };

    const stepBackward = () => {
      if (isCancelled) return;
      setIsTyping(true);
      if (currentCharCount > 0) {
        currentCharCount--;
        setDisplayedSegments(buildFromCharCount(currentCharCount));
        setTimeout(stepBackward, backSpeed);
      } else {
        setIsTyping(false);
        // Advance to next phrase
        setPhraseIdx((prev) => (prev + 1) % phraseList.length);
      }
    };

    const initialTimer = setTimeout(stepForward, startDelay);

    return () => {
      isCancelled = true;
      clearTimeout(initialTimer);
    };
  }, [hasStarted, phraseIdx, phrases, segments, isMultiPhrase]);

  const currentPhrase = phraseList[phraseIdx] || [];

  const handleSkipOrReplay = () => {
    if (isMultiPhrase) {
      setPhraseIdx((prev) => (prev + 1) % phraseList.length);
    }
  };

  return (
    <Tag
      ref={containerRef}
      className={`typewriter-heading-root ${className} ${isTyping ? "is-typing" : ""}`}
      style={{
        display: "block",
        minHeight: minHeight !== "auto" ? minHeight : undefined,
        cursor: isMultiPhrase ? "pointer" : "default",
        ...style,
      }}
      onClick={handleSkipOrReplay}
      title={isMultiPhrase ? "Click to see next phrase" : undefined}
    >
      {currentPhrase.map((seg, i) => {
        const text = hasStarted ? displayedSegments[i] || "" : "";
        const isItalic = seg.italic;
        const isAccent = seg.accent;

        let content = text;
        if (isItalic) {
          content = (
            <i key={i} style={isAccent ? { color: "var(--accent-rust)" } : {}}>
              {text}
            </i>
          );
        } else if (isAccent) {
          content = (
            <span key={i} style={{ color: "var(--accent-rust)" }}>
              {text}
            </span>
          );
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
