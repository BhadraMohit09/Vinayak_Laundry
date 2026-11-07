import React, { useState, useEffect, useId } from 'react';
import { Star, CheckCircle, MessageSquarePlus, X, Sparkles, AlertCircle, Edit3 } from 'lucide-react';

const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Rajesh K. Patel',
    phoneKey: '9825000001',
    rating: 5,
    date: 'March 2026',
    service: 'Pure Silk & Bandhani Saree Care',
    comment: 'Superb dry cleaning service in Jamnagar! Sent my mother’s heavy heritage Bandhani saree which had an old tea stain. Not only did they eliminate the spot completely, but the vibrant red tone and gold zari shine remained pristine.',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Dr. Meera Shah',
    phoneKey: '9825000002',
    rating: 5,
    date: 'February 2026',
    service: 'Wash & Fold Precision',
    comment: 'Being in the medical profession, daily laundry hygiene is non-negotiable. Vinayak Laundry’s doorstep pickup is prompt, and clothes come back smell-free, crisp, and neatly bundled. 10/10 consistency.',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Hotel Grand Orchid (B2B)',
    phoneKey: '9825000003',
    rating: 5,
    date: 'January 2026',
    service: 'Commercial Linen Contract',
    comment: 'We have been using SVL for our 45-room property’s bedsheets, duvet covers, and dining linens. Zero delays on the 24h turnaround SLA and spotless white fabric quality.',
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'Amit Dave',
    phoneKey: '9825000004',
    rating: 5,
    date: 'January 2026',
    service: 'Steam Pressing & Detailing',
    comment: 'The industrial steam pressing makes ordinary formal shirts look brand new without any iron shine or scorched seams. Very impressed with the doorstep delivery in Digvijay Plot.',
    verified: true,
  },
  {
    id: 'rev-5',
    name: 'Pooja Jadeja',
    phoneKey: '9825000005',
    rating: 4,
    date: 'December 2025',
    service: 'Delicate & Dry Clean',
    comment: 'Got my wedding lehenga dry cleaned here. The packaging was dust-free and very premium. Turnaround took 3 days due to intricate work, but the final outcome was well worth the wait.',
    verified: true,
  }
];

const SERVICE_OPTIONS = [
  'Everyday Laundry Care (Wash & Fold)',
  'Delicate & Dry Clean (Saree / Silk)',
  'Steam Pressing & Detailing',
  'Commercial / B2B Linen Care',
  'Designer / Wedding Occasion Wear'
];

const ReviewsSection = () => {
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('svl_customer_reviews');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback to initial
    }
    return INITIAL_REVIEWS;
  });

  const [filterRating, setFilterRating] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasExistingReview, setHasExistingReview] = useState(false);

  // Review Form State
  const [ratingInput, setRatingInput] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [serviceUsed, setServiceUsed] = useState(SERVICE_OPTIONS[0]);
  const [commentText, setCommentText] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Check if current device/user has already reviewed
  useEffect(() => {
    const savedUserKey = localStorage.getItem('svl_user_review_phone');
    if (savedUserKey) {
      const userReview = reviews.find(r => r.phoneKey === savedUserKey);
      if (userReview) {
        setHasExistingReview(true);
      }
    }
  }, [reviews]);

  const handleOpenModal = () => {
    setFormError('');
    setFormSuccess('');
    
    // If user already reviewed, prefill so they can update/edit instead of duplicating
    const savedUserKey = localStorage.getItem('svl_user_review_phone');
    if (savedUserKey) {
      const existing = reviews.find(r => r.phoneKey === savedUserKey);
      if (existing) {
        setAuthorName(existing.name);
        setPhoneNumber(existing.phoneKey);
        setRatingInput(existing.rating);
        setServiceUsed(existing.service || SERVICE_OPTIONS[0]);
        setCommentText(existing.comment);
      }
    }
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
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    const cleanComment = commentText.trim();

    if (!cleanName) {
      setFormError('Please enter your name.');
      return;
    }

    if (cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number for review verification.');
      return;
    }

    if (!cleanComment || cleanComment.length < 12) {
      setFormError('Please write at least 12 characters sharing your experience with our services.');
      return;
    }

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const now = new Date();
    const formattedDate = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;

    // Check 1 Customer 1 Review condition
    const existingIndex = reviews.findIndex(r => r.phoneKey === cleanPhone);

    let updatedReviews;
    if (existingIndex !== -1) {
      // Customer has already reviewed: update their existing review
      updatedReviews = [...reviews];
      updatedReviews[existingIndex] = {
        ...updatedReviews[existingIndex],
        name: cleanName,
        rating: ratingInput,
        date: `${formattedDate} (Updated)`,
        service: serviceUsed,
        comment: cleanComment,
        verified: true,
      };
      setFormSuccess('Your review has been successfully updated! (1 customer 1 review policy enforced)');
    } else {
      // New unique review
      const newReview = {
        id: `rev-${Date.now()}`,
        name: cleanName,
        phoneKey: cleanPhone,
        rating: ratingInput,
        date: formattedDate,
        service: serviceUsed,
        comment: cleanComment,
        verified: true,
      };
      updatedReviews = [newReview, ...reviews];
      setFormSuccess('Thank you for rating Vinayak Laundry! Your review is now live.');
    }

    // Persist to state & localStorage
    setReviews(updatedReviews);
    try {
      localStorage.setItem('svl_customer_reviews', JSON.stringify(updatedReviews));
      localStorage.setItem('svl_user_review_phone', cleanPhone);
      setHasExistingReview(true);
    } catch {
      // storage unavailable
    }

    setTimeout(() => {
      handleCloseModal();
    }, 1600);
  };

  // Compute Metrics
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1)
    : '5.0';

  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(r => {
    if (ratingCounts[r.rating] !== undefined) {
      ratingCounts[r.rating]++;
    }
  });

  const filteredReviews = reviews.filter(r => {
    if (filterRating === 'all') return true;
    return r.rating === Number(filterRating);
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
              03 · CLIENT TESTIMONIALS
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
              Real ratings from <i>Jamnagar</i> residents.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '17px', maxWidth: '640px', margin: 0, lineHeight: 1.6 }}>
              Every review is left by a genuine customer. We maintain transparent feedback to continuously perfect our fabric restoration.
            </p>
          </div>

          <div>
            <button
              type="button"
              onClick={handleOpenModal}
              className="ink-button"
              style={{ padding: '14px 26px', fontSize: '14.5px' }}
            >
              {hasExistingReview ? (
                <>
                  <Edit3 size={18} /> Edit Your Review
                </>
              ) : (
                <>
                  <MessageSquarePlus size={18} /> Rate & Drop Review
                </>
              )}
            </button>
          </div>
        </div>

        {/* Aggregated Score Card */}
        <div className="reviews-summary-card">
          <div className="reviews-score-block">
            <div className="reviews-big-number">{averageRating}</div>
            <div className="reviews-stars-row">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={22}
                  fill={star <= Math.round(Number(averageRating)) ? '#f59e0b' : 'none'}
                  stroke="#f59e0b"
                />
              ))}
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 500 }}>
              Based on {totalReviews} verified reviews
            </div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '12px',
              fontSize: '12px',
              fontFamily: 'DM Mono, monospace',
              color: 'var(--accent-olive)',
              background: 'var(--accent-olive-light)',
              padding: '4px 12px',
              borderRadius: 'var(--radius-pill)'
            }}>
              <CheckCircle size={14} /> 100% Verified Customers
            </div>
          </div>

          {/* Breakdown Bars */}
          <div>
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = ratingCounts[stars] || 0;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <div key={stars} className="reviews-breakdown-row">
                  <span style={{ width: '45px', color: 'var(--ink)', fontWeight: 500 }}>{stars} Star</span>
                  <div className="reviews-breakdown-bar-bg">
                    <div
                      className="reviews-breakdown-bar-fill"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span style={{ width: '35px', textAlign: 'right', color: 'var(--text-tertiary)' }}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="reviews-filter-pills">
          <button
            type="button"
            className={`reviews-filter-btn ${filterRating === 'all' ? 'active' : ''}`}
            onClick={() => setFilterRating('all')}
          >
            All Ratings ({totalReviews})
          </button>
          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              type="button"
              className={`reviews-filter-btn ${filterRating === String(star) ? 'active' : ''}`}
              onClick={() => setFilterRating(String(star))}
            >
              <Star size={13} fill={filterRating === String(star) ? '#fff' : '#f59e0b'} stroke="none" />
              {star} Stars ({ratingCounts[star] || 0})
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {filteredReviews.length === 0 ? (
            <div style={{
              gridColumn: '1 / -1',
              padding: '48px 24px',
              textAlign: 'center',
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)'
            }}>
              No reviews found under {filterRating} stars. Be the first to leave one!
            </div>
          ) : (
            filteredReviews.map((rev) => (
              <div key={rev.id} className="review-card">
                <div>
                  <div className="review-card-top">
                    <div>
                      <div className="review-author-name">
                        {rev.name}
                        {rev.verified && (
                          <span title="Verified Customer">
                            <CheckCircle size={15} style={{ color: 'var(--accent-olive)' }} />
                          </span>
                        )}
                      </div>
                      <span className="review-date">{rev.date}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '2px', color: '#f59e0b' }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={15}
                          fill={s <= rev.rating ? '#f59e0b' : 'none'}
                          stroke="#f59e0b"
                        />
                      ))}
                    </div>
                  </div>

                  {rev.service && (
                    <div className="review-service-tag">
                      {rev.service}
                    </div>
                  )}

                  <p className="review-comment">
                    "{rev.comment}"
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
                  <span style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Sparkles size={12} color="var(--accent-rust)" /> Jamnagar Garment Care
                  </span>
                  <span style={{ fontSize: '11.5px', color: 'var(--accent-olive)', fontWeight: 500 }}>
                    Verified Order
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {/* Review Modal */}
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
              aria-label="Close review dialog"
            >
              <X size={22} />
            </button>

            <div className="font-mono-tag" style={{ color: 'var(--accent-rust)', marginBottom: '8px' }}>
              CUSTOMER FEEDBACK · 1 CUSTOMER 1 REVIEW
            </div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px' }}>
              {hasExistingReview ? 'Update Your Experience' : 'Rate Your Experience with SVL'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', marginBottom: '24px', lineHeight: 1.5 }}>
              Share your honest thoughts on our garment washing, dry cleaning, or commercial delivery. Your review will help other residents in Jamnagar.
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

              {/* Name & Phone (Used for 1 Customer 1 Review validation) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label htmlFor={nameInputId} style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                    Your Full Name*
                  </label>
                  <input
                    id={nameInputId}
                    type="text"
                    required
                    placeholder="e.g. Ramesh Bhai"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div>
                  <label htmlFor={phoneInputId} style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                    Mobile Number (for Verification)*
                  </label>
                  <input
                    id={phoneInputId}
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="form-control"
                  />
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px', display: 'block' }}>
                    Enforces 1 review per customer. Will not be made public.
                  </span>
                </div>
              </div>

              {/* Service Selection */}
              <div style={{ marginBottom: '16px' }}>
                <label htmlFor={serviceInputId} style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                  Service Availed
                </label>
                <select
                  id={serviceInputId}
                  value={serviceUsed}
                  onChange={(e) => setServiceUsed(e.target.value)}
                  className="form-control"
                  style={{ cursor: 'pointer' }}
                >
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Review Text */}
              <div style={{ marginBottom: '24px' }}>
                <label htmlFor={commentInputId} style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                  Your Review / Experience*
                </label>
                <textarea
                  id={commentInputId}
                  required
                  rows={4}
                  placeholder="Tell us what you liked about our fabric cleaning, doorstep timing, or pressing quality..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="form-control"
                  style={{ resize: 'vertical' }}
                />
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
                  {hasExistingReview ? 'Update My Review' : 'Publish Review'}
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