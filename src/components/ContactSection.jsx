import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

import { addEnquiry } from '../utils/adminStore';

const countryCodes = ['+91', '+1', '+44', '+971', '+65', '+49', '+61', '+27', '+33', '+86'];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', countryCode: '+91', phone: '', product: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEnquiry({
      source: 'Contact Us Form',
      name: form.name,
      email: form.email,
      phone: `${form.countryCode} ${form.phone}`,
      product: form.product || 'General Enquiry',
      notes: form.message
    });
    setSubmitted(true);
  };

  return (
    <section className="py-80 bg-light" id="contact-section">
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">Get In Touch</span>
          <h2>Contact <span>Us</span></h2>
          <p>Reach out for bulk enquiries, export quotes or commodity samples. We respond within 24 hours.</p>
        </motion.div>

        <div className="contact-grid">
          {/* Form */}
          <motion.div
            className="contact-form-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <h3 style={{ fontFamily: 'var(--font-h)', fontSize: 22, fontWeight: 800, marginBottom: 24 }}>
              Send Us An Enquiry
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input name="email" type="email" placeholder="email@example.com" value={form.email} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <div className="phone-field">
                  <select name="countryCode" value={form.countryCode} onChange={handleChange}>
                    {countryCodes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label>Product Interest</label>
                <select name="product" value={form.product} onChange={handleChange}>
                  <option value="">Select product category</option>
                  <option>1. Indian Spices (Ground, Whole, Seed, Blended)</option>
                  <option>2. Agro Commodities (Basmati Rice, Wheat, Pulses, Seeds)</option>
                  <option>3. Machinery (Color Sorters, Pulverizers, Packaging Units)</option>
                  <option>4. Pipes & Tubes (Stainless Steel, Carbon Steel, HDPE, PVC)</option>
                  <option>Custom Commodity / Bulk Vessel Inquiry</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message / Enquiry *</label>
                <textarea name="message" placeholder="Tell us about your requirements — quantity, packaging, destination port..." value={form.message} onChange={handleChange} required />
              </div>
            {submitted ? (
              <div style={{ backgroundColor: '#F0F9FF', border: '1px solid #BAE6FD', color: '#0369A1', padding: '20px', borderRadius: '16px', textAlign: 'center', fontWeight: 700, marginBottom: '20px' }}>
                ✓ Thank you! Your enquiry has been received. Our export desk will contact you within 24 hours.
              </div>
            ) : (
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <span>Submit Enquiry</span>
                <ArrowRight size={16} />
              </button>
            )}
            </form>

            <div className="contact-info-box">
              <div className="contact-info-item">
                <div className="ci-icon"><Phone size={18} /></div>
                <div className="ci-text">
                  <strong>+91 8200712955</strong>
                  <span>Direct B2B Desk • Mon–Sat IST</span>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="ci-icon"><Mail size={18} /></div>
                <div className="ci-text">
                  <strong>info@marvexinternational.com</strong>
                  <span>We reply within 24 hours</span>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="ci-icon"><MapPin size={18} /></div>
                <div className="ci-text">
                  <strong>Gujarat, India</strong>
                  <span>Global Export Hub</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            className="map-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119067.87434720948!2d70.7284077!3d22.2736308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c98ac71cdf0f%3A0x76dd15cfbe93ad3b!2sRajkot%2C+Gujarat!5e0!3m2!1sen!2sin!4v1600000000000"
              title="Marvex International Location - Gujarat, India"
              allowFullScreen
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
