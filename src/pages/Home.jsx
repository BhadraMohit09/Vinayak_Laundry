import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Clock, Zap, CheckCircle2 } from 'lucide-react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

const Home = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '6rem'
      }}>
        {/* Background glow effects */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)',
          zIndex: -1
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
          zIndex: -1
        }}></div>

        <div className="container" style={{ zIndex: 1 }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              display: 'inline-block',
              padding: '0.5rem 1.2rem',
              background: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid var(--border-color)',
              borderRadius: '2rem',
              marginBottom: '2rem',
              color: 'var(--text-secondary)',
              boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
            }}>
              <span className="text-gradient" style={{ fontWeight: '600' }}>Jamnagar's Finest</span> - Premium Garment Care
            </div>
            
            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              lineHeight: '1.1',
              marginBottom: '1.5rem',
              fontWeight: '700',
              letterSpacing: '-1px'
            }}>
              The Future of <br />
              <span className="text-gradient">Garment Care</span>
            </h1>
            
            <p style={{
              fontSize: '1.2rem',
              color: 'var(--text-secondary)',
              marginBottom: '2.5rem',
              maxWidth: '600px',
              margin: '0 auto 2.5rem'
            }}>
              Experience unprecedented quality with SVL. We leverage advanced technology to provide meticulous cleaning, ensuring your garments look flawless. Affordable excellence, tailored for you.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/services" className="btn-primary">
                Explore Services
              </Link>
              <Link to="/contact" className="btn-outline">
                Book Bulk Order
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', letterSpacing: '-0.5px' }}>Why Choose Siddhi Vinayak?</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              We set the standard for modern laundry services, focusing entirely on quality, precision, and customer satisfaction.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
            gap: '2rem'
          }}>
            {[
              { icon: Sparkles, title: 'Premium Quality', desc: 'Meticulous attention to detail ensuring every fiber is perfectly cleaned and restored.', color: 'var(--accent-primary)', bg: 'rgba(124, 58, 237, 0.08)' },
              { icon: Zap, title: 'Advanced Tech', desc: 'Utilizing state-of-the-art equipment for efficient and fabric-safe washing processes.', color: 'var(--accent-secondary)', bg: 'rgba(37, 99, 235, 0.08)' },
              { icon: ShieldCheck, title: 'Garment Protection', desc: 'Advanced eco-friendly solvents that protect your clothes and extend their lifespan.', color: 'var(--accent-primary)', bg: 'rgba(124, 58, 237, 0.08)' },
              { icon: Clock, title: 'Reliable Delivery', desc: 'On-time pickup and delivery tailored to your busy schedule with precision.', color: 'var(--accent-secondary)', bg: 'rgba(37, 99, 235, 0.08)' }
            ].map((feature, i) => (
              <div key={i} className="glass-panel" style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
                <div style={{ 
                  background: feature.bg, 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '16px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  color: feature.color,
                  transform: 'rotate(-5deg)'
                }}>
                  <feature.icon size={32} />
                </div>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Magic Slider Section */}
      <section className="section" style={{ background: 'rgba(37, 99, 235, 0.02)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', letterSpacing: '-0.5px' }}>Experience the <span className="text-gradient">SVL Difference</span></h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
              Drag the slider below to see how our advanced fabric care revives and restores your garments.
            </p>
          </div>
          
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <BeforeAfterSlider />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section" style={{ background: 'rgba(0,0,0,0.02)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', letterSpacing: '-0.5px' }}>How It Works</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              Three simple steps to pristine garments. We handle the complexity so you don't have to.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '3rem',
            position: 'relative'
          }}>
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--accent-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 auto 1.5rem', boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)' }}>1</div>
              <h3 style={{ marginBottom: '1rem' }}>Book & Schedule</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Contact us via WhatsApp, phone, or email to schedule a pickup or drop off your garments at our Jamnagar facility.</p>
            </div>
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--accent-secondary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 auto 1.5rem', boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)' }}>2</div>
              <h3 style={{ marginBottom: '1rem' }}>Advanced Cleaning</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Our experts analyze your fabrics and use state-of-the-art tech and premium solvents to safely remove stains and dirt.</p>
            </div>
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--accent-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 auto 1.5rem', boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)' }}>3</div>
              <h3 style={{ marginBottom: '1rem' }}>Fresh Delivery</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Your garments are meticulously pressed, folded or hung, and returned to you feeling completely renewed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="glass-panel" style={{ 
            padding: '5rem 2rem', 
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.95))',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(124, 58, 237, 0.1)'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, transparent 60%)',
              zIndex: 0
            }}></div>
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', letterSpacing: '-0.5px' }}>Ready for a Flawless Clean?</h2>
              <p style={{ 
                color: 'var(--text-secondary)', 
                maxWidth: '600px', 
                margin: '0 auto 2.5rem',
                fontSize: '1.1rem'
              }}>
                Whether you need everyday garment care or specialized bulk orders for your business, we offer unparalleled service at affordable rates.
              </p>
              <Link to="/contact" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                Contact Us Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
