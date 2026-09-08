import React from 'react';
import HeroBannerSlider from '../components/HeroBannerSlider';
import AboutUs from '../components/AboutUs';
import CounterSection from '../components/CounterSection';
import MainSeedsShowcase from '../components/MainSeedsShowcase';
import WhyChooseUs from '../components/WhyChooseUs';
import WorkProcess from '../components/WorkProcess';
import ExportCapabilitiesSection from '../components/ExportCapabilitiesSection';
import CertificationsSection from '../components/CertificationsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQ from '../components/FAQ';
import CtaBanner from '../components/CtaBanner';

export default function Home({ onSelectProduct, onNavigate, onOpenQuote }) {
  return (
    <div className="home-page">
      <HeroBannerSlider onOpenQuote={() => onOpenQuote()} onNavigate={onNavigate} />
      <AboutUs onNavigate={onNavigate} />
      <CounterSection />
      <MainSeedsShowcase onSelectProduct={onSelectProduct} onOpenQuote={(product) => onOpenQuote(product)} onNavigate={onNavigate} />
      <WhyChooseUs onNavigate={onNavigate} />
      <WorkProcess />
      <ExportCapabilitiesSection onNavigate={onNavigate} onOpenQuote={(item) => onOpenQuote(item)} />
      <CertificationsSection />
      <TestimonialsSection />
      <FAQ />
      <CtaBanner onOpenQuote={() => onOpenQuote()} onNavigate={onNavigate} />
    </div>
  );
}
