import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, CheckCircle2, Globe2, Sparkles, Building2, Factory, TestTube, Package, Ship } from 'lucide-react';
import AboutUs from '../components/AboutUs';
import CounterSection from '../components/CounterSection';
import CertificationsSection from '../components/CertificationsSection';
import CtaBanner from '../components/CtaBanner';

export default function AboutPage({ onNavigate, onOpenQuote }) {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      desc: 'To deliver 100% pure, unadulterated Indian spices and agricultural commodities directly from farm origin to global sea ports with complete quality transparency, zero adulteration, and guaranteed on-time ocean delivery.',
      img: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: Eye,
      title: 'Our Vision',
      desc: 'To stand as the most respected Indian agro-export brand globally, recognized across 50+ countries for uncompromising quality standards, modern processing infrastructure, and long-term client trust.',
      img: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: ShieldCheck,
      title: 'Quality Assurance Policy',
      desc: 'Every single export container batch undergoes rigorous multi-tier laboratory testing (curcumin %, piperine %, moisture levels, pesticide MRLs), Sortex machine cleaning, and APEDA/Phytosanitary inspection.',
      img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const highlights = [
    {
      title: 'Direct Farm Sourcing',
      desc: 'Partnering directly with audited farming communities across Gujarat (Unjha), Rajasthan (Kota), Tamil Nadu (Erode), and Kerala (Idukki) to ensure 100% farm freshness.',
      img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Cool-Temperature Milling',
      desc: 'Utilizing modern cool-grinding machinery that preserves volatile essential oils, natural flavor pigments, and spicy heat without thermal degradation.',
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Export-Grade Packaging',
      desc: 'Multi-layer PP woven bags, bulk jute sacks with PE liners, vacuum foil pouches, and OEM private-label packaging built to withstand long maritime sea transit.',
      img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Global Logistics Network',
      desc: 'Fast container dispatch via Mundra Port (Gujarat) with complete Phytosanitary, Certificate of Origin (COO), and customs documentation support.',
      img: 'https://images.unsplash.com/photo-1509358217951-4fd2d6d8fb03?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const infrastructureSteps = [
    {
      title: 'Sortex Cleaning & Milling',
      desc: 'State-of-the-art optical sorters remove discolored seeds and foreign matter.',
      icon: Factory,
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Accredited Lab Testing',
      desc: 'In-house & third-party NABL lab testing for ASTA color, moisture & purity.',
      icon: TestTube,
      img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Hygienic Bulk Packaging',
      desc: 'Food-grade moisture barrier packaging preserving natural freshness.',
      icon: Package,
      img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Port Container Dispatch',
      desc: 'Seamless ocean freight stuffing and port customs clearance at Mundra.',
      icon: Ship,
      img: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <div className="about-page" style={{ backgroundColor: '#F8FAFC' }}>
      
      {/* Page Hero — Guaranteed Background Image Overlay */}
      <section style={{
        position: 'relative',
        color: '#FFFFFF',
        padding: '75px 0 65px',
        overflow: 'hidden',
        backgroundColor: '#1C1917'
      }}>
        {/* Background Image */}
        <img 
          src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1920&q=80" 
          alt="About Priya Impex Background" 
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: 0
          }}
        />
        {/* Deep Ocean Maritime Dark Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(10, 34, 64, 0.78) 0%, rgba(7, 23, 44, 0.90) 100%)',
          zIndex: 1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              border: '1.5px solid #6E737D',
              color: '#CBD2DC',
              fontSize: '12px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              padding: '6px 20px',
              borderRadius: '100px',
              marginBottom: '20px',
              backdropFilter: 'blur(6px)'
            }}>
              <Sparkles size={14} style={{ color: '#CBD2DC' }} />
              MARVEX INTERNATIONAL • B2B AGRO EXPORTS
            </span>

            <h1 style={{
              fontFamily: 'var(--font-h, Outfit, sans-serif)',
              fontSize: 'clamp(34px, 5vw, 54px)',
              fontWeight: 900,
              marginBottom: '20px',
              lineHeight: 1.15,
              color: '#FFFFFF'
            }}>
              Pioneering Excellence in <br />
              <span style={{ color: 'var(--gold-light)' }}>Global Commodity Exports</span>
            </h1>

            <p style={{ fontSize: '17px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.65, maxWidth: '720px', margin: '0 auto', fontWeight: 500 }}>
              Connecting Indian spice farmers to global international markets with modern processing, Sortex sorting, and sea container freight logistics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main AboutUs Showcase */}
      <AboutUs />

      {/* Corporate Offices & Infrastructure — Rich Photo Cards */}
      <section className="py-50" style={{ backgroundColor: '#FFFDF7', padding: '54px 0' }}>
        <div className="container">
          <div className="section-title text-center" style={{ marginBottom: '44px' }}>
            <span className="eyebrow">
              GLOBAL FOOTPRINT
            </span>
            <h2 style={{ color: 'var(--navy)', marginTop: '10px' }}>
              Our International <span style={{ color: 'var(--gold)' }}>Business Desks</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px' }}>
            {/* Office 1: Rajkot India */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1.5px solid var(--border)',
                boxShadow: '0 8px 24px rgba(200, 148, 10, 0.06)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80" 
                  alt="Rajkot India Facility" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(42,29,8,0.85) 100%)' }}></div>
                <div style={{ position: 'absolute', bottom: '16px', left: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: '#FFFFFF' }}>
                  <Building2 size={22} style={{ color: '#F5C542' }} />
                  <span style={{ fontWeight: 800, fontSize: '18px' }}>India Headquarters</span>
                </div>
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '12.5px', color: 'var(--gold-deep)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Rajkot, Gujarat, INDIA</span>
                <p style={{ fontSize: '14.5px', color: 'var(--gray)', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                  Main procurement, Sortex processing, lab testing, and container stuffing hub. Proximity to Mundra Port ensures fast container dispatch.
                </p>
              </div>
            </motion.div>

            {/* Office 2: Johannesburg South Africa */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1.5px solid var(--border)',
                boxShadow: '0 8px 24px rgba(200, 148, 10, 0.06)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80" 
                  alt="Johannesburg South Africa Desk" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(42,29,8,0.85) 100%)' }}></div>
                <div style={{ position: 'absolute', bottom: '16px', left: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: '#FFFFFF' }}>
                  <Globe2 size={22} style={{ color: '#F5C542' }} />
                  <span style={{ fontWeight: 800, fontSize: '18px' }}>International Desk</span>
                </div>
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '12.5px', color: 'var(--gold-deep)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Johannesburg, SOUTH AFRICA</span>
                <p style={{ fontSize: '14.5px', color: 'var(--gray)', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                  African continent client relations, distribution logistics, and trade finance desk serving African and Middle East buyers.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Processing & Infrastructure Showcase Grid */}
      <section className="py-50" style={{ backgroundColor: '#FFFFFF', padding: '54px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-title text-center" style={{ marginBottom: '44px' }}>
            <span className="eyebrow">
              EXPORT INFRASTRUCTURE
            </span>
            <h2 style={{ color: 'var(--navy)', marginTop: '10px' }}>
              State-Of-The-Art <span style={{ color: 'var(--gold)' }}>Processing & Handling</span>
            </h2>
            <p style={{ color: 'var(--gray)', maxWidth: '620px', margin: '10px auto 0' }}>
              From farm-origin procurement to laboratory testing and container port dispatch.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {infrastructureSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1.5px solid var(--border)',
                    boxShadow: '0 6px 20px rgba(27, 75, 122, 0.05)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                    <img src={step.img} alt={step.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: 12, left: 12, width: 40, height: 40, borderRadius: '12px', background: 'linear-gradient(135deg, #040F22 0%, #0B2545 100%)', color: '#60A5FA', border: '1px solid rgba(96, 165, 250, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={20} />
                    </div>
                  </div>
                  <div style={{ padding: '20px', flex: 1 }}>
                    <h4 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--navy)', marginBottom: '6px' }}>{step.title}</h4>
                    <p style={{ fontSize: '13.5px', color: 'var(--gray)', lineHeight: 1.5, margin: 0 }}>{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission, Vision & Quality Policy Section with Header Photos */}
      <section className="py-50" style={{ backgroundColor: '#FFFDF7', padding: '54px 0' }}>
        <div className="container">
          <div className="section-title text-center" style={{ marginBottom: '48px' }}>
            <span className="eyebrow">
              OUR CORE FOUNDATION
            </span>
            <h2 style={{ color: 'var(--navy)', marginTop: '10px' }}>
              Driven by Purpose, <span style={{ color: 'var(--gold)' }}>Guided by Integrity</span>
            </h2>
            <p style={{ color: 'var(--gray)', maxWidth: '600px', margin: '10px auto 0' }}>
              Discover the core principles that power Marvex International's global reputation as a premier agro commodity exporter.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
            {values.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    border: '1.5px solid var(--border)',
                    boxShadow: '0 8px 24px rgba(2, 132, 199, 0.05)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ height: '170px', overflow: 'hidden', position: 'relative' }}>
                    <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 20%, rgba(10,34,64,0.85) 100%)' }}></div>
                    <div style={{ position: 'absolute', bottom: '14px', left: '16px', display: 'flex', alignItems: 'center', gap: '10px', color: '#FFFFFF' }}>
                      <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'linear-gradient(135deg, #1B4B7A 0%, #0284C7 100%)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={18} />
                      </div>
                      <span style={{ fontSize: '18px', fontWeight: 800 }}>{item.title}</span>
                    </div>
                  </div>

                  <div style={{ padding: '24px', flex: 1 }}>
                    <p style={{ fontSize: '14.5px', color: 'var(--gray)', lineHeight: 1.65, margin: 0, fontWeight: 500 }}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why We Excel Section — Rich Visual Feature Cards */}
      <section className="py-50" style={{ backgroundColor: '#FFFFFF', padding: '54px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-title text-center" style={{ marginBottom: '48px' }}>
            <span className="eyebrow">
              OUR ADVANTAGES
            </span>
            <h2 style={{ color: 'var(--navy)', marginTop: '10px' }}>
              Why Importers Choose <span style={{ color: 'var(--gold)' }}>Marvex International</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {highlights.map((hl, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1.5px solid var(--border)',
                  boxShadow: '0 6px 20px rgba(27, 75, 122, 0.05)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ height: '150px', overflow: 'hidden', position: 'relative' }}>
                  <img src={hl.img} alt={hl.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 12, right: 12, background: 'linear-gradient(135deg, #040F22 0%, #0B2545 100%)', color: '#60A5FA', border: '1px solid rgba(96, 165, 250, 0.3)', padding: '4px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 800 }}>
                    Verified Advantage
                  </div>
                </div>
                
                <div style={{ padding: '22px', flex: 1, display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={20} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-h, Outfit, sans-serif)', fontSize: '17px', fontWeight: 800, color: 'var(--navy)', marginBottom: '6px' }}>
                      {hl.title}
                    </h3>
                    <p style={{ fontSize: '13.5px', color: 'var(--gray)', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                      {hl.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Animated Statistics Counter */}
      <CounterSection />

      {/* Certifications Section */}
      <CertificationsSection bgColor="#FFFFFF" />

      {/* Connect With Us CTA */}
      <CtaBanner onOpenQuote={onOpenQuote} onNavigate={onNavigate} />
    </div>
  );
}
