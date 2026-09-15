// Centralized Product Database — Marvex International
// 3 Core Business Pillars:
// 1. Earthing Parts (Manufacturer & Exporter)
// 2. Spices & Agro Commodities (Merchant Exporter)
// 3. Hardware Items (Manufacturer & Exporter)

import biryaniMasala from '../assets/products/Biryani Masala.png';
import blackCardamom from '../assets/products/Black Cardamom.png';
import blackPepper from '../assets/products/Black Pepper.png';
import byadgiChilli from '../assets/products/Byadgi Chilli.png';
import cardamomPowder from '../assets/products/Cardamom Powder.png';
import chaatMasala from '../assets/products/Chaat Masala.png';
import chilliPowder from '../assets/products/Chilli Powder.png';
import cinnamonPowder from '../assets/products/Cinnamon Powder.png';
import cinnamonSticks from '../assets/products/Cinnamon Sticks.png';
import clovePowder from '../assets/products/Clove Powder.png';
import corianderPowder from '../assets/products/Coriander Powder.png';
import corianderSeeds from '../assets/products/Coriander Seeds.png';
import cuminPowder from '../assets/products/Cumin Powder.png';
import cuminSeeds from '../assets/products/Cumin Seeds.png';
import currySpiceMix from '../assets/products/Curry Spice Mix.png';
import dryGinger from '../assets/products/Dry Ginger.png';
import dryRedChilli from '../assets/products/Dry Red Chilli.png';
import fennelPowder from '../assets/products/Fennel Powder.png';
import fennelSeeds from '../assets/products/Fennel Seeds.png';
import garamMasala from '../assets/products/Garam Masala.png';
import gingerPowder from '../assets/products/Ginger Powder.png';
import greenCardamom from '../assets/products/Green Cardamom.png';
import greenPepper from '../assets/products/Green Pepper.png';
import gunturChilli from '../assets/products/Guntur Chilli.png';
import kashmiriChilli from '../assets/products/Kashmiri Chilli.png';
import kashmiriSaffron from '../assets/products/Kashmiri Saffron.png';
import kitchenKingMasala from '../assets/products/Kitchen King Masala.png';
import mace from '../assets/products/Mace.png';
import nutmegPowder from '../assets/products/Nutmeg Powder.png';
import nutmeg from '../assets/products/Nutmeg.png';
import saffronPowder from '../assets/products/Saffron Powder.png';
import turmericBulbs from '../assets/products/Turmeric Bulbs.png';
import turmericFingers from '../assets/products/Turmeric Fingers.png';
import turmericPowder from '../assets/products/Turmeric Powder.png';
import vanillaBeans from '../assets/products/Vanilla Beans.png';
import vanillaPowder from '../assets/products/Vanilla Powder.png';
import whitePepper from '../assets/products/White Pepper.png';
import wholeCloves from '../assets/products/Whole Cloves.png';

export const PRODUCT_CATEGORIES = [
  'Earthing Parts',
  'Spices & Agro Commodities',
  'Hardware & Sanitary Items'
];

export const PRODUCTS = [
  // ==========================================
  // 1. EARTHING PARTS (Manufacturer & Exporter)
  // ==========================================
  {
    id: 'copper-bonded-earth-rods',
    title: 'Copper Bonded Earth Rods (UL Listed)',
    category: 'Earthing Parts',
    cat: 'Earthing Parts',
    businessType: 'Manufacturer & Exporter',
    subcategory: 'Earth Rods & Conductors',
    hsCode: 'HS 85389000',
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80',
    origin: 'Gujarat, India (In-House Manufactured)',
    packaging: 'Bundles of 5/10 pcs in Protective Heavy Plastic Sleeves',
    specs: 'Copper Coating: 254 Microns (UL 467) | Core: Low Carbon Steel Tensile > 600 N/mm²',
    description: 'High-conductivity molecularly bonded copper earth rods engineered for high fault current dissipation, low electrical resistance, and 30+ years soil corrosion lifespan.',
    desc: 'Molecularly bonded 254-micron copper coated earth rods with high tensile steel core for industrial electrical grounding.',
    isFeatured: true
  },
  {
    id: 'solid-pure-copper-earth-rods',
    title: 'Solid Pure Copper Earth Rods & Couplers',
    category: 'Earthing Parts',
    cat: 'Earthing Parts',
    businessType: 'Manufacturer & Exporter',
    subcategory: 'Earth Rods & Conductors',
    hsCode: 'HS 74071010',
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80',
    origin: 'Gujarat, India (In-House Manufactured)',
    packaging: 'Wooden Crates / Seaworthy Bundles',
    specs: 'Purity: 99.9% Electrolytic Tough Pitch (ETP) Copper | Diameters: 14mm to 25mm',
    description: '100% solid ETP electrolytic copper grounding rods designed for corrosive coastal, petrochemical, and high-salinity substation installations.',
    desc: 'Solid pure copper grounding rods for extreme corrosive environments and critical power substations.',
    isFeatured: true
  },
  {
    id: 'heavy-duty-brass-earth-clamps',
    title: 'Heavy-Duty Brass Ground Clamps & Rod-to-Tape Clamps',
    category: 'Earthing Parts',
    cat: 'Earthing Parts',
    businessType: 'Manufacturer & Exporter',
    subcategory: 'Earth Clamps & Couplers',
    hsCode: 'HS 85389000',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    origin: 'Gujarat, India (In-House Manufactured)',
    packaging: 'Corrugated Export Boxes in Pallets',
    specs: 'Material: Naval Brass / Gunmetal / Phosphor Bronze | Corrosion Resistant Stainless Hardware',
    description: 'Precision forged brass clamps for secure mechanical and electrical bonding between earth rods, grounding cables, and copper flat tapes.',
    desc: 'Heavy-duty forged brass rod-to-cable and rod-to-tape clamps for reliable grounding connections.',
    isFeatured: true
  },
  {
    id: 'hot-line-clamp-electrical',
    title: 'Hot Line Clamp (Hotline Tap Clamps for Overhead Distribution)',
    category: 'Earthing Parts',
    cat: 'Earthing Parts',
    businessType: 'Manufacturer & Exporter',
    subcategory: 'Earth Clamps & Couplers',
    hsCode: 'HS 85359090',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    origin: 'Gujarat, India (In-House Manufactured)',
    packaging: 'Heavy Export Wooden Crates / Sea-Worthy Cartons',
    specs: 'Material: High Conductivity Cast Bronze Alloy / Aluminum Alloy | Eye-Screw: Stainless Steel / Forged Bronze | Current Rating: Up to 400A',
    description: 'Heavy-duty Hot Line Clamps (Hotline Clamps / Transformer Tap Clamps) engineered for live-line distribution tap connections, transformer take-offs, and overhead powerline grounding. Corrosion-resistant with high torque tightening screws for maximum mechanical and electrical reliability.',
    desc: 'Precision engineered Hot Line Clamps for live-line overhead distribution and transformer tap connections.',
    isFeatured: true
  },
  {
    id: 'chemical-earthing-electrodes',
    title: 'Maintenance-Free Chemical Earthing Electrode & Backfill Compound',
    category: 'Earthing Parts',
    cat: 'Earthing Parts',
    businessType: 'Manufacturer & Exporter',
    subcategory: 'Chemical Electrodes & Compounds',
    hsCode: 'HS 85389000',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    origin: 'Gujarat, India (In-House Manufactured)',
    packaging: 'Individual Protective Packing + 25kg Compound Bags',
    specs: 'Electrode: Copper / GI Dual Pipe | Compound: Carbonaceous Conductive Soil Enhancer',
    description: 'Maintenance-free pipe-in-pipe chemical earthing electrode pre-filled with crystalline conductive salts for high soil resistivity areas.',
    desc: 'Maintenance-free chemical earthing electrodes and low-resistivity soil backfill compound.',
    isFeatured: true
  },
  {
    id: 'lightning-protection-air-terminals',
    title: 'Lightning Protection Air Terminals & Early Streamer Emission (ESE) Arresters',
    category: 'Earthing Parts',
    cat: 'Earthing Parts',
    businessType: 'Manufacturer & Exporter',
    subcategory: 'Lightning Protection',
    hsCode: 'HS 85354010',
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    origin: 'Gujarat, India (In-House Manufactured)',
    packaging: 'Padded Export Boxes with Elevation Mounting Hardware',
    specs: 'Standard: NFC 17-102 / IEC 62305 | Material: Pure Copper / SS 316',
    description: 'Advanced structural lightning protection systems and conventional copper multi-point air terminals engineered to protect commercial and industrial buildings.',
    desc: 'High-grade copper and stainless steel lightning protection terminals and arresters.',
    isFeatured: false
  },
  {
    id: 'polyplastic-earth-inspection-pit',
    title: 'Heavy-Duty Earth Inspection Pits & Ground Test Boxes',
    category: 'Earthing Parts',
    cat: 'Earthing Parts',
    businessType: 'Manufacturer & Exporter',
    subcategory: 'Chemical Electrodes & Compounds',
    hsCode: 'HS 39269099',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
    origin: 'Gujarat, India (In-House Manufactured)',
    packaging: 'Palletized Bulk Bundles',
    specs: 'Load Rating: Up to 5000 kg (Class C250) | UV-Stabilized Polypropylene & Concrete',
    description: 'Robust surface inspection chambers allowing easy access for periodic earth loop resistance measurements and maintenance inspections.',
    desc: 'UV-resistant high-load earth pit chambers for electrical grounding access and inspection.',
    isFeatured: false
  },

  // ==================================================
  // 2. SPICES & AGRO COMMODITIES (Merchant Exporter)
  // ==================================================
  {
    id: 'cumin-seeds-bold',
    title: 'Cumin Seeds (Jeera) — 99.5% Sortex Cleaned',
    category: 'Spices & Agro Commodities',
    cat: 'Spices & Agro Commodities',
    businessType: 'Merchant Exporter',
    subcategory: 'Seed Spices',
    hsCode: 'HS 09093129',
    image: cuminSeeds,
    origin: 'Unjha, Gujarat, India',
    packaging: '25kg / 50kg PP Bags / Jute Bags / Custom Vacuum',
    specs: 'Purity: 99% / 99.5% Sortex Cleaned (Singapore / Europe Quality) | Volatile Oil > 3.0%',
    description: 'Premier grade Indian cumin seeds with high volatile oil content and distinctive aromatic fragrance. Sourced directly from Unjha mandi.',
    desc: 'Sortex 99.5% pure bold cumin seeds with high essential oil from Unjha Gujarat.',
    isFeatured: true
  },
  {
    id: 'coriander-seeds-eagle',
    title: 'Coriander Seeds (Dhana) — Eagle & Scooter Quality',
    category: 'Spices & Agro Commodities',
    cat: 'Spices & Agro Commodities',
    businessType: 'Merchant Exporter',
    subcategory: 'Seed Spices',
    hsCode: 'HS 09092110',
    image: corianderSeeds,
    origin: 'Kota & Ramganj, Rajasthan / Gujarat, India',
    packaging: '20kg / 25kg PP Woven Bags / Jute Sacks',
    specs: 'Purity: 99% Sortex Cleaned | Grade: Eagle / Single Parrot / Double Parrot',
    description: 'Golden-green aromatic whole coriander seeds. Machine-cleaned and graded for maximum essential oil retention and sweet citrus notes.',
    desc: 'Golden-green machine-cleaned coriander seeds with natural citrus aroma.',
    isFeatured: true
  },
  {
    id: 'fennel-seeds-green',
    title: 'Fennel Seeds (Variyali) — Green Bold Sortex',
    category: 'Spices & Agro Commodities',
    cat: 'Spices & Agro Commodities',
    businessType: 'Merchant Exporter',
    subcategory: 'Seed Spices',
    hsCode: 'HS 09096139',
    image: fennelSeeds,
    origin: 'Gujarat & Rajasthan, India',
    packaging: '25kg / 50kg Multi-Wall Paper / PP Bags',
    specs: 'Purity: 99% / 99.5% Sortex Cleaned | Grade: Abu Road / Green Extra Bold',
    description: 'Sweet, highly fragrant whole green fennel seeds. Thoroughly sortex cleaned and sized to deliver rich anethole essential oil content.',
    desc: 'Sweet fragrant green fennel seeds sortex cleaned for global export.',
    isFeatured: true
  },
  {
    id: 'turmeric-fingers-erode',
    title: 'Turmeric Whole Fingers (Salem & Nizamabad Quality)',
    category: 'Spices & Agro Commodities',
    cat: 'Spices & Agro Commodities',
    businessType: 'Merchant Exporter',
    subcategory: 'Whole Spices',
    hsCode: 'HS 09103010',
    image: turmericFingers,
    origin: 'Erode (Tamil Nadu) & Nizamabad (Telangana), India',
    packaging: '25kg / 50kg Jute Sacks / Multi-Wall PP Bags',
    specs: 'Curcumin Content: 3.5% to 5.0% | Moisture < 10% | Machine Polished (Single/Double)',
    description: 'Hard, deep orange-yellow cured turmeric fingers. Sourced directly from premier growing belts with verified high curcumin percentage.',
    desc: 'Double-polished high curcumin turmeric fingers from Salem and Nizamabad.',
    isFeatured: true
  },
  {
    id: 'dry-red-chilli-guntur-s4-sanitary',
    title: 'Dry Red Chilli (Guntur Sannam S4 / Teja / Byadgi Whole)',
    category: 'Spices & Agro Commodities',
    cat: 'Spices & Agro Commodities',
    businessType: 'Merchant Exporter',
    subcategory: 'Whole Spices',
    hsCode: 'HS 09042110',
    image: dryRedChilli,
    origin: 'Guntur (Andhra Pradesh) & Byadgi (Karnataka), India',
    packaging: '5kg to 25kg Jute Bags / Carton Boxes',
    specs: 'Stemless / With Stem | Capsaicin: 25,000 - 90,000 SHU | ASTA Color: 60 - 150',
    description: 'Sun-dried vibrant red whole chillies with intense fiery heat and deep natural color. Machine cleaned and fumigated for overseas export.',
    desc: 'Sun-dried Guntur S4 and Teja whole red chillies with rich color and fiery heat.',
    isFeatured: true
  },
  {
    id: 'turmeric-powder-pure',
    title: 'Pure Turmeric Powder (Curcumin > 3.5%)',
    category: 'Spices & Agro Commodities',
    cat: 'Spices & Agro Commodities',
    businessType: 'Merchant Exporter',
    subcategory: 'Ground Spices',
    hsCode: 'HS 09103020',
    image: turmericPowder,
    origin: 'Erode & Sangli, India',
    packaging: '25kg / 50kg PP Bags / Custom Vacuum',
    specs: 'Curcumin > 3.5% | Moisture < 10% | Sortex Cleaned',
    description: 'Golden-yellow turmeric powder milled from premium curcuma longa roots. Double-sifted for rich color, vibrant aroma, and high curcumin content.',
    desc: 'Golden-yellow turmeric powder milled from premium curcuma longa roots.',
    isFeatured: true
  },
  {
    id: 'chilli-powder-export',
    title: 'Guntur Red Chilli Powder (Fine Mesh)',
    category: 'Spices & Agro Commodities',
    cat: 'Spices & Agro Commodities',
    businessType: 'Merchant Exporter',
    subcategory: 'Ground Spices',
    hsCode: 'HS 09042211',
    image: chilliPowder,
    origin: 'Guntur, Andhra Pradesh, India',
    packaging: '25kg Kraft Bags / Drums / PP Bags',
    specs: 'ASTA Color 80 - 120 | Pungency 25,000 - 40,000 SHU',
    description: 'Ultra-fine spicy red chilli powder ground from select Guntur chillies. Delivers an authentic deep red color and fiery pungent kick.',
    desc: 'Ultra-fine spicy red chilli powder ground from select Guntur chillies.',
    isFeatured: true
  },
  {
    id: 'green-cardamom-bold',
    title: 'Green Cardamom (Elaichi) — 7mm & 8mm Bold Extra Green',
    category: 'Spices & Agro Commodities',
    cat: 'Spices & Agro Commodities',
    businessType: 'Merchant Exporter',
    subcategory: 'Whole Spices',
    hsCode: 'HS 09083110',
    image: greenCardamom,
    origin: 'Idukki & Bodinayakanur, Kerala / Tamil Nadu, India',
    packaging: '5kg Master Cartons with 1kg Vacuum Seal Poly Bags',
    specs: 'Sizes: 7mm, 7.5mm, 8mm, 8.5mm Jumbo | 100% Natural Green Pods',
    description: 'The "Queen of Spices" sourced from misty hills of Western Ghats. Hand-picked uniform extra bold green pods with intense sweet-spicy eucalyptus aroma.',
    desc: '7mm-8mm extra bold green cardamom pods with intense eucalyptus aroma.',
    isFeatured: true
  },
  {
    id: 'black-pepper-malabar-550gl',
    title: 'Black Pepper (Tellicherry & Malabar Garbled 550GL / 570GL)',
    category: 'Spices & Agro Commodities',
    cat: 'Spices & Agro Commodities',
    businessType: 'Merchant Exporter',
    subcategory: 'Whole Spices',
    hsCode: 'HS 09041120',
    image: blackPepper,
    origin: 'Malabar Coast, Kerala / Karnataka, India',
    packaging: '25kg / 50kg Multi-Wall Paper Bags / Jute Bags',
    specs: 'Density: 500GL, 550GL, 570GL, 600GL | Piperine > 4.5% | Moisture < 11%',
    description: 'World-famous Malabar black peppercorns offering robust pungency, high piperine percentage, and rich culinary complexity.',
    desc: 'Premium Malabar 550GL/570GL whole black peppercorns with high piperine content.',
    isFeatured: true
  },
  {
    id: 'natural-hulled-sesame-seeds',
    title: 'Natural & Hulled White Sesame Seeds (99.95% Sortex)',
    category: 'Spices & Agro Commodities',
    cat: 'Spices & Agro Commodities',
    businessType: 'Merchant Exporter',
    subcategory: 'Oilseeds & Grains',
    hsCode: 'HS 12074090',
    image: 'https://images.unsplash.com/photo-1509358217951-4fd2d6d8fb03?auto=format&fit=crop&w=800&q=80',
    origin: 'Gujarat, India',
    packaging: '25kg / 50kg Multi-wall Paper Bags & Poly Bags',
    specs: 'Purity: 99.95% / 99.99% Auto-Sortex | Oil Content > 48% | Premium Whitish Grade',
    description: 'Mechanically hulled and optical sortex-cleaned white sesame seeds. Uniform pearly appearance with rich nutty flavor, ideal for bakery, tahini, and confectionery.',
    desc: 'Auto-Sortex 99.95% pure hulled white sesame seeds with high oil content.',
    isFeatured: true
  },
  {
    id: 'mustard-seeds-black-bold',
    title: 'Black & Yellow Mustard Seeds (Rai)',
    category: 'Spices & Agro Commodities',
    cat: 'Spices & Agro Commodities',
    businessType: 'Merchant Exporter',
    subcategory: 'Oilseeds & Grains',
    hsCode: 'HS 12075000',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    origin: 'Rajasthan & Gujarat, India',
    packaging: '25kg / 50kg PP Woven Sacks',
    specs: 'Purity: 99% Sortex Cleaned | Oil Content: 38% - 42%',
    description: 'Pungent, oil-rich small and bold whole mustard seeds. Cleaned and graded for edible oil extraction and food spice blending.',
    desc: 'High-oil content sortex cleaned black and yellow mustard seeds.',
    isFeatured: false
  },
  {
    id: 'basmati-rice-1121-steam',
    title: '1121 Extra Long Grain Basmati Rice (Steam & Sella)',
    category: 'Spices & Agro Commodities',
    cat: 'Spices & Agro Commodities',
    businessType: 'Merchant Exporter',
    subcategory: 'Oilseeds & Grains',
    hsCode: 'HS 10063020',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    origin: 'Punjab & Haryana, India',
    packaging: '5kg, 10kg, 25kg Non-Woven & BOPP Bags',
    specs: 'Average Grain Length: 8.35mm+ | Moisture < 12.5% | 100% Sortex Silky Polished',
    description: 'Royal aromatic long-grain Indian Basmati rice. Delivers elongation up to 2x upon cooking with delightful natural aroma and fluffy texture.',
    desc: '1121 Extra Long Steam Basmati rice with exquisite aroma and 8.35mm+ grain length.',
    isFeatured: true
  },

  // ==========================================================
  // 3. HARDWARE & SANITARY ITEMS (Manufacturer & Exporter)
  // ==========================================================
  {
    id: 'stainless-steel-kitchen-sink',
    title: 'Stainless Steel Kitchen Sinks (SS 304 Handmade & Pressed)',
    category: 'Hardware & Sanitary Items',
    cat: 'Hardware & Sanitary Items',
    businessType: 'Manufacturer & Exporter',
    subcategory: 'Kitchen Sinks',
    hsCode: 'HS 73241000',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    origin: 'Gujarat, India (In-House Manufactured)',
    packaging: 'Individually Corner-Protected Foam Pack in 5-Ply Master Carton',
    specs: 'Material: AISI 304 Grade (1.2mm / 1.5mm Gauge) | Finish: Satin Hairline, Nano Black, PVD Gold | Type: Single & Double Bowl',
    description: 'Heavy-duty food-grade SS 304 kitchen sinks with sound-absorbing acoustic dampening pads, anti-condensation undercoat, and precision slope drainage.',
    desc: 'Premium AISI 304 stainless steel kitchen sinks with anti-scratch coating and acoustic noise pads.',
    isFeatured: true
  },
  {
    id: 'quartz-granite-composite-sink',
    title: 'Quartz Composite & Granite Kitchen Sinks',
    category: 'Hardware & Sanitary Items',
    cat: 'Hardware & Sanitary Items',
    businessType: 'Manufacturer & Exporter',
    subcategory: 'Kitchen Sinks',
    hsCode: 'HS 68109990',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    origin: 'Gujarat, India (In-House Manufactured)',
    packaging: 'Export Heavy Thermocol Mold Packing in Seaworthy Pallets',
    specs: 'Composition: 80% Natural Granite Quartz + 20% Acrylic Resin | Heat Resistant to 280°C | Non-Porous & Stain Proof',
    description: 'High-durability molded granite quartz sinks resistant to scratches, stains, and high thermal impact. Available in metallic black, white, and slate grey.',
    desc: 'Modern granite quartz composite kitchen sinks engineered for luxury modular kitchens.',
    isFeatured: true
  },
  {
    id: 'ceramic-countertop-wash-basin',
    title: 'Designer Ceramic Tabletop & Countertop Wash Basins',
    category: 'Hardware & Sanitary Items',
    cat: 'Hardware & Sanitary Items',
    businessType: 'Manufacturer & Exporter',
    subcategory: 'Wash Basins & Ceramics',
    hsCode: 'HS 69101000',
    image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=800&q=80',
    origin: 'Morbi / Gujarat, India (In-House Manufactured)',
    packaging: 'Honeycomb Export Box with Inner Moulded Foam',
    specs: 'Material: Vitreous China Ceramic (Fired at 1280°C) | Glaze: Ultra-Smooth Nano Antibacterial Glaze | Shapes: Oval, Rectangular, Round Bowl',
    description: 'Modern artistic tabletop wash basins with flawless high-gloss stain-resistant glaze, thin rim edges, and smooth water overflow contours.',
    desc: 'Ultra-smooth nano-glazed ceramic countertop wash basins for modern bathrooms.',
    isFeatured: true
  },
  {
    id: 'wall-hung-pedestal-wash-basin',
    title: 'Wall-Hung & One-Piece Ceramic Wash Basins',
    category: 'Hardware & Sanitary Items',
    cat: 'Hardware & Sanitary Items',
    businessType: 'Manufacturer & Exporter',
    subcategory: 'Wash Basins & Ceramics',
    hsCode: 'HS 69101000',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80',
    origin: 'Morbi / Gujarat, India (In-House Manufactured)',
    packaging: 'Heavy Seaworthy Pallet Packaging with Corner Guards',
    specs: 'Material: Vitreous China Ceramic | Water Absorption < 0.5% | Pre-punched Standard Tap Hole & Overflow',
    description: 'Ergonomic wall-mounted and half-pedestal ceramic wash basins designed for residential villas, hotels, and luxury commercial projects.',
    desc: 'High-durability wall-hung ceramic sanitary wash basins with integrated overflow.',
    isFeatured: true
  },
  {
    id: 'brass-kitchen-sink-mixer-taps',
    title: 'Brass & SS Kitchen Sink Mixer Taps (360° Swivel & Pull-Out)',
    category: 'Hardware & Sanitary Items',
    cat: 'Hardware & Sanitary Items',
    businessType: 'Manufacturer & Exporter',
    subcategory: 'Taps & Faucets',
    hsCode: 'HS 84818020',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
    origin: 'Jamnagar & Rajkot, Gujarat, India (In-House Manufactured)',
    packaging: 'Padded Gift Box with Foam Cutout in Master Export Cartons',
    specs: 'Body: Solid Brass IS 319 / SS 304 | Cartridge: 35mm Ceramic Disc (500k Cycles Tested) | Plating: Multi-Layer Chrome / Matte Black / Brushed Gold',
    description: 'Single-lever hot and cold kitchen sink mixer taps with 360-degree rotating spout, water-saving aerator, and flexible braided SS connection pipes.',
    desc: 'Solid brass 360° swivel kitchen sink mixer faucets with drip-free ceramic cartridge.',
    isFeatured: true
  },
  {
    id: 'bathroom-basin-mixer-pillar-taps',
    title: 'Bathroom Basin Mixer Taps, Pillar Cocks & Bib Taps',
    category: 'Hardware & Sanitary Items',
    cat: 'Hardware & Sanitary Items',
    businessType: 'Manufacturer & Exporter',
    subcategory: 'Taps & Faucets',
    hsCode: 'HS 84818020',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
    origin: 'Jamnagar & Rajkot, Gujarat, India (In-House Manufactured)',
    packaging: 'Color Box Packing in Heavy Export Master Cartons',
    specs: 'Material: Heavy Forged Brass | Plating: 12+ Micron Nickel Chrome | Working Pressure: 0.5 to 6.0 Bar',
    description: 'Precision-engineered bathroom basin faucets, tall body counter mixers, and quarter-turn brass bib cocks with mirror-polished chrome finish.',
    desc: 'Heavy-duty brass bathroom basin mixer taps and pillar cocks with smooth quarter-turn control.',
    isFeatured: true
  },
  {
    id: 'overhead-rain-shower-arms',
    title: 'Ultra-Slim SS 304 Overhead Rain Showers & Shower Arms',
    category: 'Hardware & Sanitary Items',
    cat: 'Hardware & Sanitary Items',
    businessType: 'Manufacturer & Exporter',
    subcategory: 'Showers & Bath Sets',
    hsCode: 'HS 84818090',
    image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&w=800&q=80',
    origin: 'Gujarat, India (In-House Manufactured)',
    packaging: 'Individual Visual Box in 5-Ply Seaworthy Cartons',
    specs: 'Material: AISI 304 Stainless Steel | Sizes: 8", 10", 12", 16" (Square / Round) | Nozzles: Food-Grade Anti-Clog Silicon Nozzles',
    description: 'Laser-welded ultra-slim rainfall shower heads with air-boost booster technology delivering a soothing deluge shower even with low water pressure.',
    desc: 'Ultra-slim SS 304 rainfall shower heads with self-cleaning silicone rub nozzles.',
    isFeatured: true
  },
  {
    id: 'hand-showers-health-faucets-jet-sprays',
    title: 'Multi-Flow Hand Showers & Health Faucets (Jet Sprays)',
    category: 'Hardware & Sanitary Items',
    cat: 'Hardware & Sanitary Items',
    businessType: 'Manufacturer & Exporter',
    subcategory: 'Showers & Bath Sets',
    hsCode: 'HS 84818090',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    origin: 'Gujarat, India (In-House Manufactured)',
    packaging: 'Blister Pack / Printed Box with SS Braided Flexible Hose',
    specs: 'Material: Solid Brass Core / ABS Chrome / SS 304 | Hose: 1.2m / 1.5m Heavy Duty EPDM SS Tube | Modes: Rain, Massage, Jet Mist',
    description: 'Ergonomic hand-held showers and high-pressure toilet health faucets (bidet sprays) with anti-burst braided stainless steel hoses and wall hooks.',
    desc: 'High-pressure brass & ABS health faucets and multi-spray handheld shower sets.',
    isFeatured: true
  },
  {
    id: 'sanitary-bath-fittings-angle-valves-traps',
    title: 'Sanitary Brass Angle Valves, Waste Couplings & Floor Drains',
    category: 'Hardware & Sanitary Items',
    cat: 'Hardware & Sanitary Items',
    businessType: 'Manufacturer & Exporter',
    subcategory: 'Sanitary Fittings & Accessories',
    hsCode: 'HS 84818030',
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    origin: 'Jamnagar & Rajkot, Gujarat, India (In-House Manufactured)',
    packaging: 'Export Master Carton with Moisture Proof Inner Packing',
    specs: 'Items: Quarter-Turn Angle Valves, Pop-Up Basin Waste Couplings, SS 304 Cockroach Trap Floor Drains, Brass Bottle Traps',
    description: 'Complete range of precision bathroom plumbing hardware and sanitary brass fittings ensuring 100% leak-proof connection and odor-free drainage.',
    desc: 'Precision brass angle valves, popup waste couplings, and SS cockroach trap floor drains.',
    isFeatured: true
  },
  {
    id: 'ss-bathroom-accessories-set',
    title: 'Stainless Steel 304 Bathroom Accessories & Hardware Sets',
    category: 'Hardware & Sanitary Items',
    cat: 'Hardware & Sanitary Items',
    businessType: 'Manufacturer & Exporter',
    subcategory: 'Sanitary Fittings & Accessories',
    hsCode: 'HS 83024110',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    origin: 'Gujarat, India (In-House Manufactured)',
    packaging: 'Complete 6-Piece Hardware Set Box with Concealed Wall Screws',
    specs: 'Material: SS 304 Solid Stainless Steel | Set: Towel Rod, Towel Ring, Soap Dish, Tumbler Holder, Robe Hook, Toilet Roll Holder',
    description: 'Corrosion-proof, heavy-duty SS 304 bathroom hardware sets with concealed wall mounting fixtures. Built for luxury hotels, resorts, and modern homes.',
    desc: 'Rust-proof SS 304 bathroom hardware sets including towel bars, soap dishes, and robe hooks.',
    isFeatured: false
  }
];

// Helper utilities for filtering
export function getProductsByCategory(category = 'All') {
  if (!category || category === 'All') return PRODUCTS;
  return PRODUCTS.filter(p => {
    const cat = p.category || p.cat || '';
    const subcat = p.subcategory || '';
    return cat.toLowerCase() === category.toLowerCase() || 
           subcat.toLowerCase() === category.toLowerCase();
  });
}

export function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.isFeatured);
}

export function searchProducts(query = '', category = 'All') {
  const list = getProductsByCategory(category);
  if (!query.trim()) return list;
  const q = query.toLowerCase();
  return list.filter(p => 
    (p.title && p.title.toLowerCase().includes(q)) ||
    (p.description && p.description.toLowerCase().includes(q)) ||
    (p.origin && p.origin.toLowerCase().includes(q)) ||
    (p.hsCode && p.hsCode.toLowerCase().includes(q)) ||
    (p.category && p.category.toLowerCase().includes(q)) ||
    (p.subcategory && p.subcategory.toLowerCase().includes(q)) ||
    (p.businessType && p.businessType.toLowerCase().includes(q))
  );
}
