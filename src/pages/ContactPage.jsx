import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, ArrowRight, Clock, Send } from 'lucide-react';
import { addEnquiry } from '../utils/adminStore';

const countryCodes = ['+91', '+1', '+44', '+971', '+65', '+27', '+49', '+61', '+33', '+86', '+55', '+52'];

const contactCards = [
  {
    icon: Phone, label: 'Phone / WhatsApp',
    value: '+91 8200712955',
    sub: 'Direct B2B Export Desk • Mon–Sat IST',
    href: 'tel:+918200712955',
    color: '#011B47'
  },
  {
    icon: Mail, label: 'Email Address',
    value: 'info@marvexinternational.com',
    sub: 'We reply within 24 hours',
    href: 'mailto:info@marvexinternational.com',
    color: '#011B47'
  },
  {
    icon: MapPin, label: 'Head Office Address',
    value: 'Gujarat, India',
    sub: 'International Agro Commodities & Exports Desk',
    href: '#map',
    color: '#011B47'
  },
  {
    icon: Clock, label: 'Business Hours',
    value: 'Mon–Sat: 9AM – 6PM',
    sub: 'Sunday: Closed (IST)',
    href: null,
    color: '#011B47'
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', countryCode: '+91', phone: '', product: '', quantity: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEnquiry({
      source: 'Contact Us Form',
      name: form.name,
      company: form.company,
      email: form.email,
      phone: `${form.countryCode} ${form.phone}`,
      product: form.product || 'General Export Enquiry',
      quantity: form.quantity || 'N/A',
      notes: form.message
    });
    setSubmitted(true);
  };

  return (
    <div>
      {/* Page Hero */}
      <section style={{
        position: 'relative',
        color: '#FFFFFF',
        padding: '75px 0 65px',
        overflow: 'hidden',
        backgroundColor: '#07172C',
        textAlign: 'center'
      }}>
        {/* Background Image */}
        <img 
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80" 
          alt="Contact Marvex International Background" 
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
        {/* Ocean Maritime Dark Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(10, 34, 64, 0.78) 0%, rgba(7, 23, 44, 0.90) 100%)',
          zIndex: 1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ maxWidth: '820px', margin: '0 auto' }}>
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
              Available 6 Days a Week • Direct B2B Export Desk
            </span>

            <h1 style={{
              fontFamily: 'var(--font-h, Outfit, sans-serif)',
              fontSize: 'clamp(34px, 5vw, 54px)',
              fontWeight: 900,
              marginBottom: '20px',
              lineHeight: 1.15,
              color: '#FFFFFF'
            }}>
              Contact <span style={{ color: '#CBD2DC' }}>Marvex International</span>
            </h1>

            <p style={{ fontSize: '17px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6, maxWidth: '700px', margin: '0 auto', fontWeight: 500 }}>
              Get in touch for agro commodities, bulk orders, ocean freight quotes or sample requests. Our team responds within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section style={{ background: '#F0F9FF', padding: '48px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {contactCards.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 18,
                  padding: '24px 20px',
                  border: '1.5px solid var(--border)',
                  boxShadow: '0 4px 20px rgba(27, 75, 122, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  transition: 'all 0.25s'
                }}
              >
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: 'linear-gradient(135deg, #000E26 0%, #011B47 100%)',
                  color: '#6E737D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <c.icon size={22} />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--gray)', letterSpacing: 0.5, marginBottom: 2 }}>{c.label}</div>
                  {c.href ? (
                    <a href={c.href} style={{ fontSize: 14.5, fontWeight: 800, color: 'var(--navy)', textDecoration: 'none' }}>{c.value}</a>
                  ) : (
                    <div style={{ fontSize: 14.5, fontWeight: 800, color: 'var(--navy)' }}>{c.value}</div>
                  )}
                  <div style={{ fontSize: 12, color: 'var(--gray)', marginTop: 2 }}>{c.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-80 bg-light" id="map">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40, alignItems: 'start' }}>
            {/* Form */}
            <motion.div
              className="contact-form-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ background: '#FFFFFF', borderRadius: 24, padding: '36px 32px', border: '1.5px solid var(--border)', boxShadow: '0 8px 30px rgba(27,75,122,0.06)' }}
            >
              <h3 style={{ fontFamily: 'var(--font-h)', fontSize: 24, fontWeight: 900, marginBottom: 8, color: 'var(--navy)' }}>
                Request an Export Quote
              </h3>
              <p style={{ fontSize: 14.5, color: 'var(--gray)', marginBottom: 28, lineHeight: 1.6 }}>
                Fill out the form below with your required commodities, quantity, and destination port. Our desk will contact you with CIF rates.
              </p>

              {submitted && (
                <div style={{ background: '#F0F9FF', border: '1.5px solid #BAE6FD', color: '#0369A1', borderRadius: 14, padding: '16px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div>
                    <strong style={{ display: 'block', fontSize: 15 }}>Inquiry Received!</strong>
                    <span style={{ fontSize: 13.5 }}>Thank you for reaching out. We will provide formal quote within 24 hours.</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input name="name" placeholder="e.g. John Smith" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Company / Firm *</label>
                    <input name="company" placeholder="e.g. Global Foods Ltd" value={form.company} onChange={handleChange} required />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div className="form-group">
                    <label>Business Email *</label>
                    <input name="email" type="email" placeholder="john@company.com" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Phone / WhatsApp *</label>
                    <div className="phone-field">
                      <select name="countryCode" value={form.countryCode} onChange={handleChange}>
                        {countryCodes.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <input name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} required />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div className="form-group">
                    <label>Product Interest</label>
                    <select name="product" value={form.product} onChange={handleChange}>
                      <option value="">Select product category</option>
                      <option>1. Indian Spices (Ground, Whole, Seed, Blended)</option>
                      <option>2. Agro Commodities (Basmati Rice, Wheat, Pulses, Soybeans)</option>
                      <option>3. Machinery (Color Sorters, Pulverizers, Packaging Units)</option>
                      <option>4. Pipes & Tubes (SS304/SS316, Carbon Steel, HDPE, PVC)</option>
                      <option>Custom Bulk Vessel / Multi-Product Order</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Quantity / Volume</label>
                    <input name="quantity" placeholder="e.g. 20 MT (1x20ft FCL)" value={form.quantity} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 24 }}>
                  <label>Order Specifications / Destination Port</label>
                  <textarea name="message" rows="4" placeholder="Specify destination sea port (e.g. Jebel Ali, Hamburg, Klang, Rotterdam) and required certifications..." value={form.message} onChange={handleChange}></textarea>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', borderRadius: 12 }}>
                  <span>Submit Export Inquiry</span>
                  <Send size={16} />
                </button>
              </form>
            </motion.div>

            {/* Right Side */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Map */}
              <motion.div
                className="map-card"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                style={{ minHeight: 300 }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119067.87434720948!2d70.7284077!3d22.2736308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c98ac71cdf0f%3A0x76dd15cfbe93ad3b!2sRajkot%2C+Gujarat!5e0!3m2!1sen!2sin!4v1600000000000"
                  title="Marvex International Location - Gujarat India"
                  allowFullScreen
                  loading="lazy"
                />
              </motion.div>

              {/* WhatsApp Direct */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ background: '#F0FDF4', border: '1.5px solid #86EFAC', borderRadius: 16, padding: '24px 28px' }}
              >
                <h4 style={{ fontFamily: 'var(--font-h)', fontSize: 17, fontWeight: 800, marginBottom: 6 }}>
                  💬 Prefer to Chat Directly?
                </h4>
                <p style={{ fontSize: 14, color: 'var(--gray)', marginBottom: 16 }}>
                  Chat directly with our export desk on WhatsApp for immediate response!
                </p>
                <a
                  href="https://api.whatsapp.com/send?phone=918200712955&text=Hi%20Marvex%20International!%20I%20would%20like%20to%20enquire%20about%20your%20products."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ background: '#25D366', display: 'inline-flex', width: '100%', justifyContent: 'center', color: '#FFFFFF' }}
                >
                  <MessageCircle size={18} />
                  <span>Chat on WhatsApp</span>
                  <ArrowRight size={15} />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
