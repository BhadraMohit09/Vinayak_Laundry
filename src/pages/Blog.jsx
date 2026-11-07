import React from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import TypewriterHeading from '../components/TypewriterHeading';

const articles = [
  {
    id: 1,
    title: "How Advanced Tech is Changing Garment Care in 2026",
    excerpt: "Discover how AI-driven fabric analysis and automated logistics are eliminating human error and ensuring your clothes last 40% longer.",
    category: "Technology",
    date: "June 15, 2026",
    author: "SVL Team",
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "The Ultimate Guide to Preserving Delicate Silks",
    excerpt: "Silk requires specialized care. Learn the common mistakes people make at home and why professional eco-solvents are necessary.",
    category: "Fabric Care",
    date: "June 02, 2026",
    author: "SVL Experts",
    image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Why Jamnagar Businesses are Switching to SVL",
    excerpt: "From 5-star hotels to top-tier restaurants, commercial entities are realizing the massive ROI of outsourcing to high-tech laundry facilities.",
    category: "B2B Solutions",
    date: "May 28, 2026",
    author: "SVL Corporate",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800"
  }
];

const Blog = () => {
  return (
    <div className="animate-fade-in" style={{ paddingBottom: '96px' }}>
      <section className="page-header-standard">
        <div className="container">
          <div className="page-title-block">
            <div className="font-mono-tag" style={{ color: 'var(--accent-rust)', marginBottom: '12px' }}>
              01 · FABRIC JOURNAL
            </div>
            <TypewriterHeading
              as="h1"
              className="page-main-heading"
              speed={32}
              delay={140}
              segments={[
                { text: 'Fabric insights & ' },
                { text: 'garment care.', italic: true, accent: true }
              ]}
            />
            <p className="page-main-subtext">
              Expert advice on preserving delicate silks and wools, commercial linen hygiene standards, and inside looks at our Jamnagar garment care facility.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '3rem' }}>
            {articles.map((article) => (
              <article key={article.id} className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-primary)', backdropFilter: 'blur(4px)' }}>
                    {article.category}
                  </div>
                </div>
                
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={14} /> {article.date}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><User size={14} /> {article.author}</span>
                  </div>
                  
                  <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem', lineHeight: '1.4' }}>{article.title}</h2>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6', flexGrow: 1 }}>
                    {article.excerpt}
                  </p>
                  
                  <Link to="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-secondary)', fontWeight: '600', marginTop: 'auto' }} onClick={(e) => e.preventDefault()}>
                    Read Article <ArrowRight size={18} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
