// Centralized Category & Subcategory Master Data — Marvex International
// Pre-configured with the 3 Core Business Verticals

export const INITIAL_CATEGORIES = [
  {
    id: 'earthing-parts',
    name: 'Earthing Parts',
    businessRole: 'Manufacturer & Exporter',
    highlight: '1st Vertical: Earthing Systems (Manufacturer & Exporter)',
    eyebrow: 'UL 467 & IEC 62305 Standard Compliant • In-House Manufacturing',
    desc: 'High-conductivity molecularly bonded copper earth rods (254 microns), pure solid copper rods, heavy-duty brass ground clamps, grounding tapes, lightning air terminals, and chemical earthing electrodes.',
    bgImg: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=1920&q=80',
    icon: 'Zap',
    badges: ['In-House Manufacturer', 'UL / IEC Standard Compliant', '254 Micron Molecular Copper Coating', 'Custom Technical Drawings'],
    subcategories: [
      'Earth Rods & Conductors',
      'Earth Clamps & Couplers',
      'Chemical Electrodes & Compounds',
      'Lightning Protection'
    ]
  },
  {
    id: 'spices-agro-commodities',
    name: 'Spices & Agro Commodities',
    businessRole: 'Merchant Exporter',
    highlight: '2nd Vertical: Spices & Agro (Merchant Exporter)',
    eyebrow: 'APEDA & Spices Board of India Certified • Direct Mandi Procurement',
    desc: 'Premier merchant export of 100% Sortex-cleaned whole bold spices, ultra-fine ground spice powders, oilseeds (sesame, mustard), and long-grain Basmati rice with fast maritime container dispatch.',
    bgImg: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1920&q=80',
    icon: 'Flame',
    badges: ['Merchant Exporter', '100% Sortex 99.5%+ Purity', 'APEDA / FSSAI / Spices Board Certified', 'Moisture Proof Packaging'],
    subcategories: [
      'Seed Spices',
      'Whole Spices',
      'Ground Spices',
      'Oilseeds & Grains'
    ]
  },
  {
    id: 'hardware-sanitary-items',
    name: 'Hardware & Sanitary Items',
    businessRole: 'Manufacturer & Exporter',
    highlight: '3rd Vertical: Hardware & Sanitary Items (Manufacturer & Exporter)',
    eyebrow: 'SS Kitchen Sinks, Wash Basins, Taps, Showers & Sanitaryware • In-House Manufacturing',
    desc: 'Export-grade stainless steel SS 304 & quartz kitchen sinks, designer ceramic wash basins, precision brass mixer taps, rainfall shower sets, and sanitary bathroom fittings.',
    bgImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1920&q=80',
    icon: 'Wrench',
    badges: ['In-House Manufacturer', 'Food-Grade SS 304 & Vitreous Ceramic', 'Tested Drip-Free Cartridges', 'Seaworthy Export Packing'],
    subcategories: [
      'Kitchen Sinks',
      'Wash Basins & Ceramics',
      'Taps & Faucets',
      'Showers & Bath Sets',
      'Sanitary Fittings & Accessories'
    ]
  }
];
