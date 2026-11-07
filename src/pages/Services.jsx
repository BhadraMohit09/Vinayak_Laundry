import React, { useState } from 'react';
import { Shirt, Box, Wind, Droplets, CheckCircle2, ArrowUpRight, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import TypewriterHeading from '../components/TypewriterHeading';

const serviceCatalog = [
  {
    id: 'dry-cleaning',
    moduleNo: '01',
    category: 'delicates',
    tag: 'ECO SOLVENT',
    icon: Droplets,
    title: 'Advanced Dry Cleaning',
    subtitle: 'Zero percs · Pure fiber restoration',
    description: 'Using gentle next-generation solvents that preserve natural sheen, fabric elasticity, and delicate hand embroidery on silk, wool, and occasion wear.',
    features: ['Stain pre-spotting & fiber testing', 'Odor neutralization', 'Hand-finished steam pressing'],
    turnaround: '36-48 Hours',
    rateNote: 'From ₹120 / piece',
  },
  {
    id: 'wash-fold',
    moduleNo: '02',
    category: 'everyday',
    tag: 'DAILY ESSENTIAL',
    icon: Wind,
    title: 'Wash & Fold Precision',
    subtitle: 'Color separated · Hypoallergenic care',
    description: 'Your weekly wardrobe treated with precision. Sorted meticulously by color and weave, washed at optimal temperatures with mild German detergents.',
    features: ['Temperature-controlled drum washing', 'Anti-static gentle tumble drying', 'Crisp bundle folding & bag packaging'],
    turnaround: '24 Hours Express',
    rateNote: 'By weight or piece',
  },
  {
    id: 'steam-pressing',
    moduleNo: '03',
    category: 'everyday',
    tag: 'PROFESSIONAL',
    icon: Shirt,
    title: 'Steam Pressing & Detailing',
    subtitle: 'Crisp creases · No fiber scorching',
    description: 'Industrial steam tension presses safely eliminate stubborn creases without the fiber-flattening shine or heat scorch marks caused by domestic irons.',
    features: ['Lapel, collar & cuff detailing', 'Crease memory alignment', 'Hanger or flat delivery options'],
    turnaround: 'Same-day available',
    rateNote: 'From ₹25 / piece',
  },
  {
    id: 'commercial',
    moduleNo: '04',
    category: 'commercial',
    tag: 'B2B CONTRACT',
    icon: Box,
    title: 'Bulk & Commercial Linens',
    subtitle: 'Dedicated plant line · Scheduled logistics',
    description: 'High-volume linen management for boutique hotels, medical clinics, and corporate enterprises requiring strict hygiene standards and guaranteed SLAs.',
    features: ['Dedicated client account coordinator', 'RFID / barcode tracking per batch', 'Custom monthly billing cycles'],
    turnaround: 'Daily / bi-weekly cycles',
    rateNote: 'Contract rates upon quote',
  },
];

const Services = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = serviceCatalog.filter((item) => {
    const matchesFilter = filter === 'all' || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '96px' }}>
      {/* Services Header */}
      <section className="services-page-header">
        <div className="container">
          <div className="services-title-block">
            <div className="font-mono-tag" style={{ color: 'var(--accent-rust)', marginBottom: '12px' }}>
              01 · CARE DIRECTORY
            </div>
            <TypewriterHeading
              as="h1"
              className="services-main-heading"
              speed={34}
              delay={150}
              segments={[
                { text: 'Care standards for ' },
                { text: 'every garment.', italic: true, accent: true }
              ]}
            />
            <p className="services-main-subtext">
              We do not merely wash clothes; we restore and preserve their original weave. Explore our specialized services built for daily living and corporate standards.
            </p>
          </div>

          {/* Search & Filter Bar (Curriculum Catalog Style) */}
          <div className="services-filter-bar">
            <div className="services-search-box">
              <Search size={18} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search services, fabrics, or care methods..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="services-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: '13px', padding: '4px' }}
                >
                  Clear
                </button>
              )}
            </div>

            <div className="services-filter-pills">
              {['all', 'everyday', 'delicates', 'commercial'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`services-pill-btn ${filter === cat ? 'is-active' : ''}`}
                >
                  {cat === 'all' ? 'All Services' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Modular Grid of Cards */}
          {filteredServices.length > 0 ? (
            <div className="services-grid">
              {filteredServices.map((service) => {
                const Icon = service.icon;
                return (
                  <div key={service.id} className="service-bento-card">
                    <div>
                      <div className="service-card-top-row">
                        <span className="service-module-code">
                          MODULE {service.moduleNo}
                        </span>
                        <span className="service-category-tag">
                          {service.tag}
                        </span>
                      </div>

                      <div className="service-card-heading-row">
                        <div className="service-icon-pod">
                          <Icon size={22} />
                        </div>
                        <div>
                          <h3 className="service-card-title">
                            {service.title}
                          </h3>
                          <div className="service-card-subtitle">{service.subtitle}</div>
                        </div>
                      </div>

                      <p className="service-card-desc">
                        {service.description}
                      </p>

                      <div className="service-feature-list">
                        {service.features.map((feat, i) => (
                          <div key={i} className="service-feature-item">
                            <CheckCircle2 size={15} style={{ color: 'var(--accent-rust)', flexShrink: 0 }} />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="service-card-footer">
                      <div>
                        <div className="service-rate-label">
                          Turnaround · {service.rateNote}
                        </div>
                        <div className="service-rate-val">
                          {service.turnaround}
                        </div>
                      </div>

                      <Link to="/contact" className="ink-button service-book-btn">
                        Book now <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="services-empty-state">
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '16px' }}>
                No care services match "{searchQuery}".
              </p>
              <button
                type="button"
                className="soft-button"
                onClick={() => { setSearchQuery(''); setFilter('all'); }}
              >
                Reset catalog filter
              </button>
            </div>
          )}

          {/* Pricing Guarantee Banner */}
          <div className="services-quote-pod">
            <h2 className="services-quote-heading">
              Transparent pricing with zero compromise.
            </h2>
            <p className="services-quote-desc">
              Have specific garments, designer lehengas, or high-volume commercial linen needs? Request an instant tailored quote via WhatsApp or online booking.
            </p>
            <div className="services-quote-btn-row">
              <Link to="/contact" className="ink-button">
                Schedule a pickup <ArrowUpRight size={16} />
              </Link>
              <a
                href="https://wa.me/916351674100"
                target="_blank"
                rel="noreferrer"
                className="soft-button"
              >
                Chat on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

