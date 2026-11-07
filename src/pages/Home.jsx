import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Clock3,
  MapPin,
  Sparkles,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Droplets,
  Wind,
  Shirt,
  Building2,
  Sparkle,
} from 'lucide-react';
import GarmentCareAnimation from '../components/GarmentCareAnimation';
import TypewriterHeading from '../components/TypewriterHeading';
import ReviewsSection from '../components/ReviewsSection';
import BookPickupModal from '../components/BookPickupModal';


// Animated Counter Component
const CountUpStat = ({ target, suffix = '', duration = 1200 }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasStarted) {
        setHasStarted(true);
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            setCount(target);
          }
        };
        window.requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [hasStarted, target, duration]);

  return (
    <span ref={elementRef}>
      {count}{suffix}
    </span>
  );
};

const processSteps = [
  {
    num: '01',
    label: 'REQUEST & SCHEDULE',
    title: 'Select care & doorstep window',
    desc: 'Pick your items, specify fabric sensitivities or stain alerts, and schedule a convenient Jamnagar doorstep pickup.',
  },
  {
    num: '02',
    label: 'INSPECT & PROCESS',
    title: 'Eco-solvent precision wash',
    desc: 'Each garment is barcoded, examined fiber-by-fiber, and treated with temperature-regulated, pH-balanced German solvents.',
  },
  {
    num: '03',
    label: 'STEAM FINISH & RETURN',
    title: 'Hand-pressed to perfection',
    desc: 'Garments receive custom steam creasing, breathable dust-free packaging, and are returned promptly to your doorstep.',
  },
];

const bentoServices = [
  {
    num: '01',
    tag: 'MOST POPULAR',
    title: 'Everyday Laundry Care',
    desc: 'Separate colors, temperature-controlled wash, hypoallergenic detergents, and crisp steam folding for daily wear.',
    specs: ['24-36h turnaround', 'Weight or piece-based'],
    link: '/services',
    featured: true,
  },
  {
    num: '02',
    tag: 'PREMIUM FIBERS',
    title: 'Delicate & Dry Clean',
    desc: 'Specialized low-impact non-toxic solvents protecting pure silks, wools, designer sarees, sherwanis, and blazers.',
    specs: ['Individual stain check', 'Fiber restore'],
    link: '/services',
    featured: false,
  },
  {
    num: '03',
    tag: 'HOSPITALITY & B2B',
    title: 'Commercial Linen Care',
    desc: 'High-volume scheduled processing for hotels, clinics, gyms, and corporate offices with dedicated SLA guarantees.',
    specs: ['Bulk contract pricing', 'Dedicated account'],
    link: '/commercial',
    featured: false,
  },
];

const Home = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
  <div className="home-page animate-fade-in">

    {/* Modular Hero Section */}
    <section className="home-hero-wrap">
      <div className="container">
        <div className="home-hero-grid">
          {/* Main Hero Pod */}
          <div className="hero-main-pod">
            <div>
              <div className="eyebrow-pill">
                <span className="eyebrow-dot" />
                JAMNAGAR’S GARMENT CARE STUDIO
              </div>

              <TypewriterHeading
                as="h1"
                className="hero-heading"
                typeSpeed={55}
                backSpeed={30}
                holdDelay={2800}
                minHeight="2.1em"
                phrases={[
                  [
                    { text: 'Care for clothes', br: true },
                    { text: 'you ' },
                    { text: 'love.', italic: true, accent: true }
                  ],
                  [
                    { text: 'Artisan cleaning', br: true },
                    { text: 'for your ' },
                    { text: 'finest fabrics.', italic: true, accent: true }
                  ],
                  [
                    { text: 'Doorstep pickup,', br: true },
                    { text: 'restored to ' },
                    { text: 'perfection.', italic: true, accent: true }
                  ],
                  [
                    { text: 'Eco-solvent science,', br: true },
                    { text: 'zero ' },
                    { text: 'harsh percs.', italic: true, accent: true }
                  ]
                ]}
              />

              <p className="hero-subtext">
                Thoughtful, fabric-first laundry and eco-dry-cleaning for your daily staples, luxury occasion wear, and business linens.
              </p>

              <div className="hero-btn-row">
                <Link className="ink-button" to="/contact">
                  Schedule a pickup <ArrowUpRight size={17} />
                </Link>
                <Link className="soft-button" to="/services">
                  Browse catalog & rates <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>

            <div className="hero-metrics-strip">
              <span className="hero-metric-item">
                <MapPin size={16} /> Serving Jamnagar & Suburbs
              </span>
              <span className="hero-metric-item">
                <Clock3 size={16} /> 24–36 Hour Express Return
              </span>
              <span className="hero-metric-item">
                <ShieldCheck size={16} /> 100% Eco-Solvent Care
              </span>
            </div>
          </div>

          {/* Right Hero Stack / Spec Pods */}
          <div className="hero-side-stack">
            {/* Garment Care Brand Animation */}
            <div className="hero-visual-pod" aria-label="Siddhi Vinayak Garment Care">
              <GarmentCareAnimation />
            </div>


            {/* Quick Stats Pod */}
            <div className="hero-card-pod hero-stats-container">
              <div className="hero-stats-grid">
                <div className="hero-stat-col">
                  <div className="hero-stat-num">
                    <CountUpStat target={10} suffix="k+" duration={1400} />
                  </div>
                  <div className="hero-stat-label">
                    Pieces Cleaned
                  </div>
                </div>
                <div className="hero-stat-col has-borders">
                  <div className="hero-stat-num">
                    <CountUpStat target={99} suffix=".4%" duration={1400} />
                  </div>
                  <div className="hero-stat-label">
                    Stain Clearance
                  </div>
                </div>
                <div className="hero-stat-col">
                  <div className="hero-stat-num accent">
                    <CountUpStat target={24} suffix="h" duration={1000} />
                  </div>
                  <div className="hero-stat-label">
                    Fast Delivery
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Editorial Numbered Process Section (Bandobast inspired) */}
    <section className="editorial-process-wrap">
      <div className="container">
        <div className="process-header-row">
          <div>
            <div className="font-mono-tag" style={{ color: 'var(--accent-rust)', marginBottom: '8px' }}>
              02 · OUR METHODOLOGY
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 3.8vw, 48px)', fontWeight: 500, letterSpacing: '-0.03em' }}>
              Clean clothes. <i>Clear mind.</i>
            </h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '440px', fontSize: '15px', lineHeight: 1.6 }}>
            From the initial barcode tagging to final pressurized steam detailing, every piece is cleaned with personalized care.
          </p>
        </div>

        <div className="process-columns-grid">
          {processSteps.map((step) => (
            <article key={step.num} className="process-column-item">
              <div className="step-numeral">{step.num}</div>
              <div className="step-label">{step.label}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* Bento Services Catalog (Curriculum Dashboard inspired) */}
    <section className="catalog-bento-section">
      <div className="container">
        <div className="catalog-header-bar">
          <div>
            <div className="font-mono-tag" style={{ color: 'var(--accent-rust)', marginBottom: '8px' }}>
              03 · SERVICE SUITE
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 3.8vw, 48px)', fontWeight: 500, letterSpacing: '-0.03em' }}>
              Tailored care for every fiber.
            </h2>
          </div>

          <Link to="/services" className="soft-button">
            View complete price catalog <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="bento-grid">
          {bentoServices.map((service) => (
            <Link
              key={service.num}
              to={service.link}
              className={`bento-card ${service.featured ? 'featured-dark' : ''}`}
            >
              <div>
                <div className="bento-top-row">
                  <span className="bento-num">{service.num}</span>
                  <span className="bento-tag">{service.tag}</span>
                </div>
                <h3 className="bento-title">{service.title}</h3>
                <p className="bento-desc">{service.desc}</p>
              </div>

              <div className="bento-specs">
                {service.specs.map((spec, i) => (
                  <span key={i}>• {spec}</span>
                ))}
                <ArrowUpRight className="bento-action-arrow" size={20} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Customer Ratings & Reviews */}
    <ReviewsSection />

    {/* Editorial Booking Banner */}
    <section className="container">
      <div className="editorial-booking-pod">
        <div>
          <div className="font-mono-tag" style={{ color: 'var(--accent-rust)', marginBottom: '12px' }}>
            READY WHEN YOU ARE
          </div>
          <TypewriterHeading
            as="h2"
            speed={32}
            delay={100}
            segments={[
              { text: 'Your laundry,', br: true },
              { text: 'handled effortlessly.', italic: true, accent: true }
            ]}
          />
          <p>
            Message us on WhatsApp to schedule an express doorstep pickup, request stain assistance, or book custom corporate laundry service.
          </p>
        </div>

        <div className="booking-action-buttons">
          <button
            type="button"
            onClick={() => setIsBookingOpen(true)}
            className="ink-button"
            style={{ padding: '14px 26px', cursor: 'pointer' }}
          >
            Book a pickup online <ArrowUpRight size={18} />
          </button>
          <a
            href="https://wa.me/916351674100"
            target="_blank"
            rel="noreferrer"
            className="soft-button"
            style={{ border: 'none', background: 'rgba(255, 255, 255, 0.7)' }}
          >
            Chat directly on WhatsApp →
          </a>
        </div>
      </div>

      <div className="reassurance-strip">
        <span><Truck size={19} /> Doorstep pickup & delivery</span>
        <span><ShieldCheck size={19} /> Fabric-safe eco formulations</span>
        <span><CheckCircle2 size={19} /> Barcode tracking per piece</span>
        <span><Sparkle size={19} /> 100% Satisfaction guarantee</span>
      </div>
    </section>

    {/* Instant Booking Modal */}
    <BookPickupModal
      isOpen={isBookingOpen}
      onClose={() => setIsBookingOpen(false)}
    />
  </div>
  );
};

export default Home;

