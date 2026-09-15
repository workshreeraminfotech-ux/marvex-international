import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import AboutUs from '../components/AboutUs';
import CounterSection from '../components/CounterSection';
import CertificationsSection from '../components/CertificationsSection';
import CtaBanner from '../components/CtaBanner';

export default function AboutPage({ onNavigate, onOpenQuote }) {
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
          alt="About Marvex International Background" 
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

      {/* Live Animated Statistics Counter */}
      <CounterSection />

      {/* Certifications Section */}
      <CertificationsSection bgColor="#FFFFFF" />

      {/* Connect With Us CTA */}
      <CtaBanner onOpenQuote={onOpenQuote} onNavigate={onNavigate} />
    </div>
  );
}
