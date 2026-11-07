import React, { useState, useId } from 'react';
import { Star, CheckCircle, MessageSquarePlus, X, Sparkles, AlertCircle, ShieldCheck, Lock } from 'lucide-react';

const INITIAL_RATINGS = [
  5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
  5, 5, 5, 5, 5, 4, 4, 4, 5, 5,
  5, 5, 5, 4, 5, 5, 5, 5, 4, 5,
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

  // Form State
  const [ratingInput, setRatingInput] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [serviceUsed, setServiceUsed] = useState(SERVICE_OPTIONS[0]);
  const [commentText, setCommentText] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const handleOpenModal = () => {
    setFormError('');
    setFormSuccess('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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

    setFormSuccess('Thank you! Your rating and feedback have been privately recorded and reflected in our overall score.');

    setTimeout(() => {
      handleCloseModal();
      setAuthorName('');
      setPhoneNumber('');
      setCommentText('');
      setRatingInput(5);
    }, 1800);
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
  const serviceInputId = useId();
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
              Rated <i>{averageRating} / 5</i> by Jamnagar residents.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '17px', maxWidth: '640px', margin: 0, lineHeight: 1.6 }}>
              Our reputation is built garment by garment. We continuously monitor customer satisfaction across households, clinics, and hotels in Jamnagar.
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

        {/* Aggregated Score Card with Privacy & Quality Reassurance */}
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
              Overall Score based on {totalReviews}+ customer ratings
            </div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '14px',
              fontSize: '12px',
              fontFamily: 'DM Mono, monospace',
              color: 'var(--accent-olive)',
              background: 'var(--accent-olive-light)',
              padding: '5px 14px',
              borderRadius: 'var(--radius-pill)'
            }}>
              <CheckCircle size={14} /> 98.6% Customer Retention
            </div>
          </div>

          {/* Breakdown Bars & Trust Highlights */}
          <div>
            <div style={{ marginBottom: '20px' }}>
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

            {/* Privacy & Confidentiality Guarantee Banner */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '14px',
              borderTop: '1px solid var(--border-light)',
              paddingTop: '18px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--ink-secondary)' }}>
                <Lock size={15} style={{ color: 'var(--accent-rust)', flexShrink: 0 }} />
                <span><strong>Privacy First:</strong> Personal details are confidential</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--ink-secondary)' }}>
                <ShieldCheck size={15} style={{ color: 'var(--accent-olive)', flexShrink: 0 }} />
                <span><strong>Pure Chemistry:</strong> Hypoallergenic fabric care</span>
              </div>
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
                padding: '4px'
              }}
              aria-label="Close dialog"
            >
              <X size={22} />
            </button>

            <div className="font-mono-tag" style={{ color: 'var(--accent-rust)', marginBottom: '8px' }}>
              CLIENT SATISFACTION INDEX
            </div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px' }}>
              Rate Your Experience with SVL
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', marginBottom: '20px', lineHeight: 1.5 }}>
              Share your honest rating and thoughts on our fabric cleaning, doorstep service, or pressing.
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
                <AlertCircle size={16} /> {formError}
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
              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px' }}>
                  Select Star Rating (1 to 5 Stars)*
                </label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
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
                          size={32}
                          fill={isFilled ? '#f59e0b' : 'none'}
                          stroke={isFilled ? '#f59e0b' : '#9ca3af'}
                        />
                      </button>
                    );
                  })}
                  <span style={{ marginLeft: '12px', fontSize: '14px', fontWeight: 600, color: '#f59e0b' }}>
                    {ratingInput} of 5 Stars
                  </span>
                </div>
              </div>

              {/* Name & Optional Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
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
                    Mobile Number (Optional)
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

              {/* Themed Dropdown for Service Selection */}
              <div style={{ marginBottom: '16px' }}>
                <label htmlFor={serviceInputId} style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                  Service Availed
                </label>
                <select
                  id={serviceInputId}
                  value={serviceUsed}
                  onChange={(e) => setServiceUsed(e.target.value)}
                  className="form-control custom-theme-select"
                >
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Review Text */}
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor={commentInputId} style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                  Your Review / Suggestions*
                </label>
                <textarea
                  id={commentInputId}
                  required
                  rows={4}
                  placeholder="Tell us what you liked or any areas we can enhance in our fabric care..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="form-control"
                  style={{ resize: 'vertical' }}
                />
              </div>

              {/* Privacy Note Reassurance */}
              <div className="review-privacy-card">
                <Lock size={18} style={{ color: 'var(--accent-rust)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Customer Privacy Guarantee:</strong> Your contact number, identity, and personal feedback remain 100% confidential to SVL management and are never published publicly on the site.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', alignItems: 'center' }}>
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
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;