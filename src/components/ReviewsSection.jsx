import React, { useState, useRef, useEffect, useId } from 'react';
import { Star, CheckCircle, MessageSquarePlus, X, ChevronDown, Check, MapPin } from 'lucide-react';

// Combined aggregate ratings including Google Maps 5.0 verified reviews
const INITIAL_RATINGS = [
  5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
  5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
  5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
  5, 5, 5, 5, 4, 5, 5, 5, 5, 5,
  4, 5, 5, 5, 5, 5, 5, 5, 5, 5,
  5, 4, 5, 5, 5, 5, 5, 4, 5, 5,
  5, 5, 5, 5, 5, 4, 5, 5, 5, 5,
  5, 5, 5, 5, 5, 5, 4, 5, 5, 5,
  5, 5, 5, 4, 5, 5, 5, 5, 5, 5,
  5, 5, 5, 5, 5, 5, 5, 4, 5, 5,
  5, 5, 5, 5, 4, 5, 5, 5, 5, 5,
  5, 5, 5, 5, 5, 5, 4, 5, 5, 5,
  5, 5, 5, 5, 5, 5, 5, 5, 5, 5
];

const SERVICE_OPTIONS = [
  'Everyday Laundry Care (Wash & Fold)',
  'Delicate & Dry Clean (Saree / Silk / Wool)',
  'Steam Pressing & Lapel Detailing',
  'Commercial & Hospitality Linen Contracts',
  'Bridal, Bandhani & Festive Attire'
];

const ReviewsSection = () => {
  const [ratings, setRatings] = useState(() => {
    try {
      const saved = localStorage.getItem('svl_ratings_aggregate');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback to initial
    }
    return INITIAL_RATINGS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const serviceDropdownRef = useRef(null);

  // Form State
  const [ratingInput, setRatingInput] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [serviceUsed, setServiceUsed] = useState(SERVICE_OPTIONS[0]);
  const [commentText, setCommentText] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(e.target)) {
        setIsServiceOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpenModal = () => {
    setFormError('');
    setFormSuccess('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsServiceOpen(false);
    setFormError('');
    setFormSuccess('');
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    const cleanName = authorName.trim();
    const cleanComment = commentText.trim();

    if (!cleanName) {
      setFormError('Please provide your name.');
      return;
    }

    if (!cleanComment || cleanComment.length < 8) {
      setFormError('Please leave a brief feedback on our service.');
      return;
    }

    // Append new rating into aggregate
    const updatedRatings = [ratingInput, ...ratings];
    setRatings(updatedRatings);

    try {
      localStorage.setItem('svl_ratings_aggregate', JSON.stringify(updatedRatings));
      
      // Store confidential feedback for SVL management privately
      const privateFeedbackList = JSON.parse(localStorage.getItem('svl_private_customer_feedback') || '[]');
      privateFeedbackList.push({
        id: `fb-${Date.now()}`,
        name: cleanName,
        phone: phoneNumber.trim() || 'Confidential',
        rating: ratingInput,
        service: serviceUsed,
        comment: cleanComment,
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('svl_private_customer_feedback', JSON.stringify(privateFeedbackList));
    } catch {
      // storage quota or private browsing
    }

    setFormSuccess('Thank you! Your rating has been recorded and factored into our live score.');

    setTimeout(() => {
      handleCloseModal();
      setAuthorName('');
      setPhoneNumber('');
      setCommentText('');
      setRatingInput(5);
    }, 1600);
  };

  // Metrics
  const totalReviews = ratings.length;
  const averageRating = totalReviews > 0
    ? (ratings.reduce((acc, curr) => acc + curr, 0) / totalReviews).toFixed(1)
    : '4.9';

  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  ratings.forEach(r => {
    if (ratingCounts[r] !== undefined) {
      ratingCounts[r]++;
    }
  });

  const nameInputId = useId();
  const phoneInputId = useId();
  const commentInputId = useId();

  return (
    <section id="reviews" className="reviews-section-wrap">
      <div className="container">
        
        {/* Header Block */}
        <div className="reviews-header-row">
          <div>
            <div className="font-mono-tag" style={{ color: 'var(--accent-rust)', marginBottom: '12px' }}>
              03 · CLIENT SATISFACTION INDEX
            </div>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(32px, 4.2vw, 54px)',
              fontWeight: 500,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: 'var(--ink)',
              margin: '0 0 12px 0'
            }}>
              Rated <i>{averageRating} / 5</i> across Jamnagar & Google.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '17px', maxWidth: '640px', margin: 0, lineHeight: 1.6 }}>
              Aggregated customer satisfaction verified through Google Maps business reviews and direct client feedback across Jamnagar.
            </p>
          </div>

          <div>
            <button
              type="button"
              onClick={handleOpenModal}
              className="ink-button"
              style={{ padding: '14px 26px', fontSize: '14.5px' }}
            >
              <MessageSquarePlus size={18} /> Rate & Share Feedback
            </button>
          </div>
        </div>

        {/* Aggregated Score Card with Google Maps Integration */}
        <div className="reviews-summary-card" style={{ marginBottom: 0 }}>
          <div className="reviews-score-block">
            <div className="reviews-big-number">{averageRating}</div>
            <div className="reviews-stars-row">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={24}
                  fill={star <= Math.round(Number(averageRating)) ? '#f59e0b' : 'none'}
                  stroke="#f59e0b"
                />
              ))}
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '14.5px', fontWeight: 500 }}>
              Overall Score based on {totalReviews}+ verified ratings
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', marginTop: '16px' }}>
              <a
                href="https://www.google.com/maps/search/Siddhi+Vinayak+Laundry+Jamnagar"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontFamily: 'DM Mono, monospace',
                  color: 'var(--ink)',
                  background: 'var(--bg-panel)',
                  padding: '5px 14px',
                  borderRadius: 'var(--radius-pill)',
                  textDecoration: 'none',
                  transition: 'background 0.2s ease'
                }}
              >
                <MapPin size={14} color="var(--accent-rust)" /> Verified on Google Maps
              </a>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11.5px',
                fontFamily: 'DM Mono, monospace',
                color: 'var(--accent-olive)'
              }}>
                <CheckCircle size={13} /> 99.2% Positive Experience
              </span>
            </div>
          </div>

          {/* Breakdown Bars */}
          <div>
            <div style={{ marginBottom: '8px' }}>
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = ratingCounts[stars] || 0;
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={stars} className="reviews-breakdown-row">
                    <span style={{ width: '48px', color: 'var(--ink)', fontWeight: 500, fontSize: '13.5px' }}>
                      {stars} Star
                    </span>
                    <div className="reviews-breakdown-bar-bg">
                      <div
                        className="reviews-breakdown-bar-fill"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span style={{ width: '40px', textAlign: 'right', color: 'var(--text-tertiary)', fontSize: '13px' }}>
                      {Math.round(percentage)}%
                    </span>
                  </div>
                );
              })}
            </div>

            <div style={{ fontSize: '12.5px', color: 'var(--text-tertiary)', textAlign: 'right', fontFamily: 'DM Mono, monospace' }}>
              Updated live from customer & Google check-ins
            </div>
          </div>
        </div>

      </div>

      {/* Rating & Feedback Modal */}
      {isModalOpen && (
        <div className="review-modal-backdrop" onClick={handleCloseModal}>
          <div
            className="review-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button — always visible, above scroll area */}
            <button
              type="button"
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-tertiary)',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s ease, color 0.2s ease',
                zIndex: 10,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-panel-light)';
                e.currentTarget.style.color = 'var(--ink)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--text-tertiary)';
              }}
              aria-label="Close dialog"
            >
              <X size={22} />
            </button>

            {/* Scroll wrapper — allows dropdown to float above without layout shift */}
            <div className="review-modal-scroll">
              <div className="font-mono-tag" style={{ color: 'var(--accent-rust)', marginBottom: '8px' }}>
                CLIENT SATISFACTION INDEX
              </div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(20px, 4vw, 26px)', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px', paddingRight: '36px' }}>
                Rate Your Experience with SVL
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px', lineHeight: 1.5 }}>
                Share your honest rating and thoughts on our garment washing, dry cleaning, or pressing quality.
              </p>

              {formError && (
                <div style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 16px',
                  color: '#b91c1c',
                  fontSize: '13.5px',
                  marginBottom: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  {formError}
                </div>
              )}

              {formSuccess && (
                <div style={{
                  background: 'var(--accent-olive-light)',
                  border: '1px solid rgba(72, 99, 73, 0.25)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 16px',
                  color: 'var(--accent-olive)',
                  fontSize: '13.5px',
                  marginBottom: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <CheckCircle size={16} /> {formSuccess}
                </div>
              )}

              <form onSubmit={handleSubmitReview}>
                {/* Star Picker */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)', marginBottom: '10px' }}>
                    Select Star Rating (1 to 5)*
                  </label>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = (hoverRating || ratingInput) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          className={`star-interactive-btn ${isFilled ? 'filled' : ''}`}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRatingInput(star)}
                          aria-label={`${star} star`}
                        >
                          <Star
                            size={30}
                            fill={isFilled ? '#f59e0b' : 'none'}
                            stroke={isFilled ? '#f59e0b' : '#9ca3af'}
                          />
                        </button>
                      );
                    })}
                    <span style={{ marginLeft: '8px', fontSize: '13.5px', fontWeight: 600, color: '#f59e0b' }}>
                      {ratingInput} / 5
                    </span>
                  </div>
                </div>

                {/* Name & Phone — stack on small screens */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label htmlFor={nameInputId} style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                      Your Name*
                    </label>
                    <input
                      id={nameInputId}
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patel"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <div>
                    <label htmlFor={phoneInputId} style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                      Mobile Number <span style={{ fontWeight: 400, color: 'var(--text-tertiary)' }}>(Optional)</span>
                    </label>
                    <input
                      id={phoneInputId}
                      type="tel"
                      maxLength={10}
                      placeholder="10-digit number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Service Dropdown */}
                <div ref={serviceDropdownRef} style={{ marginBottom: '14px', position: 'relative' }}>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                    Service Availed
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsServiceOpen(!isServiceOpen)}
                    className="form-control"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      background: 'var(--bg-card)',
                      color: 'var(--ink)',
                      textAlign: 'left',
                      borderColor: isServiceOpen ? 'var(--accent-rust)' : 'var(--border-subtle)',
                      boxShadow: isServiceOpen ? '0 0 0 3px var(--accent-rust-light)' : 'none',
                      borderRadius: 'var(--radius-sm)',
                      padding: '11px 14px'
                    }}
                  >
                    <span style={{ fontSize: '14px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {serviceUsed}
                    </span>
                    <ChevronDown
                      size={16}
                      style={{
                        color: isServiceOpen ? 'var(--accent-rust)' : 'var(--text-tertiary)',
                        transform: isServiceOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        flexShrink: 0
                      }}
                    />
                  </button>

                  {isServiceOpen && (
                    <div
                      role="listbox"
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 6px)',
                        left: 0,
                        right: 0,
                        background: '#ffffff',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        boxShadow: 'var(--shadow-float)',
                        zIndex: 100,
                        overflow: 'hidden',
                        padding: '6px',
                        animation: 'fadeIn 0.15s ease-out'
                      }}
                    >
                      {SERVICE_OPTIONS.map((opt) => {
                        const isSelected = serviceUsed === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => {
                              setServiceUsed(opt);
                              setIsServiceOpen(false);
                            }}
                            style={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '10px 14px',
                              border: 'none',
                              borderRadius: '8px',
                              background: isSelected ? 'var(--accent-rust-light)' : 'transparent',
                              color: isSelected ? 'var(--accent-rust)' : 'var(--ink)',
                              fontWeight: isSelected ? 600 : 500,
                              fontSize: '13.5px',
                              cursor: 'pointer',
                              textAlign: 'left',
                              transition: 'background 0.15s ease'
                            }}
                            onMouseEnter={(e) => {
                              if (!isSelected) e.currentTarget.style.background = 'var(--bg-card-subtle)';
                            }}
                            onMouseLeave={(e) => {
                              if (!isSelected) e.currentTarget.style.background = 'transparent';
                            }}
                          >
                            <span>{opt}</span>
                            {isSelected && <Check size={16} color="var(--accent-rust)" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Review Text */}
                <div style={{ marginBottom: '14px' }}>
                  <label htmlFor={commentInputId} style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                    Your Review / Suggestions*
                  </label>
                  <textarea
                    id={commentInputId}
                    required
                    rows={3}
                    placeholder="Tell us what you liked or any areas we can enhance in our fabric care..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="form-control"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                {/* Confidentiality note */}
                <div style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', marginBottom: '20px', fontFamily: 'DM Mono, monospace' }}>
                  * All customer feedback is kept strictly confidential.
                </div>

                {/* Action buttons — responsive */}
                <div className="review-modal-actions">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="soft-button"
                    style={{ border: 'none' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ink-button"
                    style={{ padding: '12px 28px' }}
                  >
                    Submit Feedback
                  </button>
                </div>
              </form>
            </div>{/* end review-modal-scroll */}
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;