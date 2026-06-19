import { Service, Property, Material, Project, Testimonial } from './types';

export const SERVICES_DATA: Service[] = [
  {
    id: 'house-construction',
    title: 'House Construction',
    iconName: 'Building',
    description: 'Bespoke architectural execution, premium structural builds, and expert turn-key contracting.',
    longDescription: 'Our construction division represents the pinnacle of residential and commercial luxury engineering. We handle everything from soil investigation, architectural sketching, foundation laying, structural steel layout, premium masonry, custom tiling, state-of-the-art waterproofing, to smart automation. Partnering with elite material sciences guarantees lifelong structural integrity.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800'
  },
  {
    id: 'land-sales',
    title: 'Land Sales',
    iconName: 'Map',
    description: 'Prime real estate acquisition and strategic parcel investments with clean title authorization.',
    longDescription: 'In corporate property development, nothing is more critical than a flawless transaction history. We offer verified land plots in high-appreciation zones, complete with transparent government documentation, soil certifications, and comprehensive zoning clearance. Every plot has fully surveyed boundaries and immediate registry access.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800'
  },
  {
    id: 'ready-houses',
    title: 'Ready-Made Houses',
    iconName: 'Home',
    description: 'Turnkey luxury residences featuring curated spatial aesthetics and premium immediate occupancy.',
    longDescription: 'Skip the stress of building timelines. Our ready-made portfolio hosts ultra-premium modern villas, duplexes, and luxury residential units designed by award-winning architects. Fully fitted with top-line modular kitchens, elegant sanitaries, customized false ceilings, and multi-layered security frameworks.',
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=800'
  },
  {
    id: 'materials-supply',
    title: 'Materials Supply',
    iconName: 'Package',
    description: 'Direct procurement of high-grade construction components directly from verified source networks.',
    longDescription: 'Avoid secondary markup costs. Dhaya Traders operates an expansive import-export and local sourcing network delivering structural metals, high-grade sand, high-strength clinker cement, and custom bricks. Constant stress-testing guarantees that every supply consignment matches absolute regulatory mandates.',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800'
  },
  {
    id: 'bricks-supply',
    title: 'Bricks Supply',
    iconName: 'Layers',
    description: 'High-compression red clay bricks and automated concrete solid blocks built to survive extreme pressures.',
    longDescription: 'Sourced from heavy-clinker high-temperature kilns, our red bricks boast incredible compression strengths exceeding 15 MPa and extremely low water absorption rates under 12%. Perfect for load-bearing applications and severe weather resilience.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800'
  },
  {
    id: 'sand-supply',
    title: 'River & M-Sand',
    iconName: 'Droplets',
    description: 'Double-washed graded river sand and fine manufactured sand optimized for flawless plastering work.',
    longDescription: 'Sieve-graded to achieve perfect density curves, our sand contains zero silt or organic compounds. This eliminates structural shrinkage cracks and produces high-adhesion plaster and masonry mortars of unparalleled durability.',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800'
  },
  {
    id: 'steel-supply',
    title: 'TMT Steel Supply',
    iconName: 'Cpu',
    description: 'Fe-550 and Fe-550D thermo-mechanically treated reinforcement rebar for world-class seismic protection.',
    longDescription: 'Dhaya steel rebars feature high tensile-to-yield strength ratios and incredible fatigue limits. Designed with special uniform rib patterns to guarantee supreme bonding with concrete, resisting deep moisture corrosion and heavy seismic loads.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800'
  },
  {
    id: 'consultation',
    title: 'Construction Consultation',
    iconName: 'FileText',
    description: 'Accurate budget forecasting, project feasibility maps, and structural validation workflows.',
    longDescription: 'Connect with senior engineering counsels and material traders. We evaluate architectural drafts, provide rigorous cost-to-build breakdowns, run local authority clearance vetting, and optimize sourcing bills to save significant expenditures.',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7eed?q=80&w=800'
  }
];

export const PROPERTIES_DATA: Property[] = [
  {
    id: 'p1',
    title: 'Nandavan Luxury Villa',
    type: 'Villa',
    location: 'KK Nagar Extension, Madurai',
    size: '4,800 sq ft',
    price: 'Contact for Quote',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800',
    features: ['5 Bedrooms', '6 Bathrooms', 'Private Infinity Pool', 'Solar Integration'],
    documentsVerified: true,
    description: 'A masterpiece of contemporary luxury featuring glass facades, premium steel framing, structural marble, and complete smart-home capabilities.'
  },
  {
    id: 'p2',
    title: 'Prime Gated Plots',
    type: 'Land',
    location: 'Trichy-Madurai National Highway (NH-45)',
    size: '2,400 - 9,600 sq ft',
    price: '₹1,500/sq ft Onwards',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800',
    features: ['Approved Layout', '40ft Concrete Roads', 'Dual Gated Perimeter', 'Underground Utilities'],
    documentsVerified: true,
    description: 'Highly strategic gated plot layouts with clean document verification, fully cleared titles, and instant registry capabilities. Perfect for architectural customization.'
  },
  {
    id: 'p3',
    title: 'Heritage Contemporary Duplex',
    type: 'Ready-Made House',
    location: 'Kovaipudur, Coimbatore',
    size: '3,200 sq ft',
    price: '₹85 Lakhs',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800',
    features: ['4 Bedrooms', '4.5 Bathrooms', 'German Sanitary Work', 'Fully Furnished Modular Kitchen'],
    documentsVerified: true,
    description: 'A brand-new, modern turnkey house built with elite materials supplied by our own trading warehouses. Optimized insulation and premium acoustic glass.'
  },
  {
    id: 'p4',
    title: 'Dhaya Business Park Hub',
    type: 'Commercial',
    location: 'OMR IT Corridor, Chennai',
    size: '12,500 sq ft',
    price: 'Contact for Lease/Sale',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800',
    features: ['Multiple Office Zones', 'Heavy Structural Load-Rating', 'High-Speed HVAC System', 'VIP Parking'],
    documentsVerified: true,
    description: 'Premium light-commercial and retail hub with incredible traffic visibility. Built with Fe-550 structural engineering standards for structural longevity.'
  }
];

export const MATERIALS_DATA: Material[] = [
  {
    id: 'm1',
    name: 'Red Clay Kiln Bricks',
    subtitle: 'High Compression Grade-A',
    category: 'Bricks',
    grade: 'A-Grade Clinker',
    image: '/assets/materials/bricks.jpg',
    specs: ['Compression Strength: >15 MPa', 'Efflorescence: Nil', 'Water Absorption: <12%', 'Weight: 3.2 Kg/brick'],
    priceInfo: '₹7.50 per unit',
    unit: 'Brick',
    estimatedPrice: 7.5
  },
  {
    id: 'm2',
    name: 'Washed Medium River Sand',
    subtitle: 'Triple-Washed Premium',
    category: 'Sand',
    grade: 'Double Sieve Quality',
    image: '/assets/materials/sand.jpg',
    specs: ['Silt content: < 1.0%', 'Grain Size: 1.2mm - 2.5mm', 'pH Value: Neutral (7.2)', 'Moisture: Dry Guarded'],
    priceInfo: '₹3,500 per Tonne',
    unit: 'Tonne',
    estimatedPrice: 3500
  },
  {
    id: 'm3',
    name: 'Fe-550D TMT Reinforcement Steel',
    subtitle: 'Anti-Corrosion High Tensile',
    category: 'Steel',
    grade: 'TMT BIS IS:1786',
    image: '/assets/materials/steel.jpg',
    specs: ['Yield Stress: >550 N/mm²', 'Elongation Rate: >16%', 'Coating: Epoxy Shield Protective', 'Dia Ranges: 8mm - 32mm'],
    priceInfo: '₹62,000 per Tonne',
    unit: 'Metric Tonne',
    estimatedPrice: 62000
  },
  {
    id: 'm4',
    name: 'OPC Grade 53 Clinker Cement',
    subtitle: 'Rapid Curing Ultra High Strength',
    category: 'Cement',
    grade: 'Ultra High Compression 53',
    image: '/assets/materials/cement.jpg',
    specs: ['28-Day Strength: 53+ MPa', 'Setting Time: 45m Int - 260m Fin', 'Silica Ratio: Optimized 2.1', 'Ideal For: High Rise & Rafts'],
    priceInfo: '₹420 per 50Kg Bag',
    unit: '50Kg Bag',
    estimatedPrice: 420
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'proj1',
    title: 'Nandavan Villas Complex',
    category: 'Luxury Residential',
    status: 'Completed',
    location: 'Melur Bypass Road, Madurai',
    year: '2025',
    image: '/assets/20260610_173518.jpg', // glorious villa
    description: 'Transforming 5 acres of undeveloped land into a premium, secure gated layout of modern duplex villas with DTCP approvals and clear water facilities.'
  },
  {
    id: 'proj2',
    title: 'Dhaya Business Center',
    category: 'Heavy Commercial Build',
    status: 'Completed',
    location: 'Thillai Nagar, Trichy',
    year: '2024',
    image: '/assets/20260610_173957.jpg', // commercial glazing
    description: 'A multi-tier commercial showroom complex built completely using Dhaya Fe-550 TMT Steel and Grade 53 Cement for strong structural stability.'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    name: 'Ramasamy K.',
    role: 'House Owner, Madurai',
    review: "I built my dream house in Madurai using Dhaya Traders' materials. Romba trusted company. They supplied high-strength brick and river sand directly to my site. Saved me a lot of money compared to other retail dealers!",
    rating: 5,
    image: ''
  },
  {
    id: 't2',
    name: 'Muthuvel Pandian',
    role: 'Real Estate Developer, Trichy',
    review: 'No document tension at all. Clear DTCP approvals and transparent registry works. Dhaya Traders has clean titles for all lands they sell. Very straightforward business, strongly recommended for Tamil Nadu buyers.',
    rating: 5,
    image: ''
  },
  {
    id: 't3',
    name: 'Senthil Kumar',
    role: 'Mason & Contractor, Coimbatore',
    review: 'As a contractor, material delivery timing is very important. Sieve sand and Fe-550D TMT Steel arrived exactly when promised. Zero structure cracks, super quality cement and bricks. Best customer support!',
    rating: 5,
    image: ''
  }
];

