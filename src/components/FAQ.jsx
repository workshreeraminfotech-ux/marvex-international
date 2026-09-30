import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: "What Earthing Parts, Copper Earth Rods (Copper Roads) & Clamps do you manufacture?",
    a: "Marvex International manufactures UL 467 compliant 254-micron copper bonded earth rods (copper roads), 99.9% solid electrolytic copper rods, heavy-duty brass ground clamps, Hot Line Clamps (transformer tap clamps), maintenance-free chemical earthing electrodes, and lightning protection air terminals."
  },
  {
    q: "Do you supply custom Precision Brass Parts and Brass Components?",
    a: "Yes, we manufacture precision CNC turned brass parts, heavy-duty brass ground clamps, brass cable glands, brass neutral links, threaded inserts, and sanitary brass mixer valves to exact client technical drawings and tolerance requirements."
  },
  {
    q: "What Indian Spices & Agro Commodities do you export worldwide?",
    a: "We are a premier merchant exporter of 100% Sortex-cleaned Indian spices including bold Cumin Seeds (Jeera), Coriander Seeds (Dhana), Turmeric Fingers & Powders, Red Chilli (Guntur & Byadgi), Black Pepper, Green Cardamom, Cloves, and 1121 Basmati Rice with APEDA, FSSAI, and Spices Board certifications."
  },
  {
    q: "What Copper Parts and Copper Items are available for international export?",
    a: "We supply electrolytic copper earth rods, pure copper busbars, copper grounding flat tapes, copper terminal lugs, and custom copper electrical items engineered for power substations, switchgears, and lightning protection systems."
  },
  {
    q: "What is your typical container dispatch timeline and export packaging?",
    a: "Standard containerized FCL / LCL shipments are dispatched within 7–12 business days from Gujarat ports (Mundra, Kandla, Pipavav, Nhava Sheva). We provide seaworthy wooden crates, corner-protected pallets, and moisture-proof vacuum sealing tailored for international maritime transit."
  },
  {
    q: "Can I request product samples and laboratory test certificates before ordering?",
    a: "Absolutely! We provide product test certificates (MTC, Curcumin purity lab reports, UL coating test reports) and dispatch sample packages worldwide for commercial bulk buyers before finalizing container contracts."
  }
];

export default function FAQ({ onNavigate }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="faq-redesign-section" id="faq">
      <div className="container">
        <div className="faq-grid">
          {/* Left Title & Help Box */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-title left-align" style={{ marginBottom: '28px' }}>
              <span className="eyebrow">FREQUENTLY ASKED QUESTIONS</span>
              <h2>
                Got Questions? <span>We Have Answers</span>
              </h2>
              <p>
                Find answers to common questions about our agro product certifications, bulk export shipping, packaging, and quality guarantees.
              </p>
            </div>

            {/* Quick Support Card */}
            <div className="faq-support-card">
              <div className="faq-support-icon">
                <HelpCircle size={26} />
              </div>
              <div className="faq-support-content">
                <h4>Have more specific questions?</h4>
                <p>Our export specialists are available to assist with quotes and custom specifications.</p>
                <button
                  onClick={() => onNavigate && onNavigate('contact')}
                  className="btn btn-primary"
                  style={{ padding: '10px 20px', fontSize: '13.5px', marginTop: '12px' }}
                >
                  <span>Contact Export Desk</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Accordion List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="faq-accordion-list">
              {faqs.map((faq, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <div key={idx} className={`faq-card-item ${isOpen ? 'active' : ''}`}>
                    <button
                      className="faq-accordion-btn"
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      type="button"
                    >
                      <span className="faq-q-text">{faq.q}</span>
                      <span className="faq-toggle-icon">
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="faq-answer-body">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


