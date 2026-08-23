import { Service, Property, Material, Project, Testimonial } from './types';

import brickImg from './assets/Brick.webp';
import cementImg from './assets/Cement.webp';
import consultantImg from './assets/Cuncultant.webp';
import houseConstructionImg from './assets/House Construction.webp';
import landSaleImg from './assets/Land Sale.webp';
import sandImg from './assets/Sand.webp';
import steelImg from './assets/Steal.webp';

import house1 from './assets/House-1.webp';
import house2 from './assets/House-2.webp';
import house3 from './assets/House-3.webp';
import house4 from './assets/House-4.webp';

export const SERVICES_DATA: Service[] = [
  {
    id: 'house-construction',
    title: 'House Construction',
    iconName: 'Building',
    description: 'Complete house construction, architectural plans, foundation work, and turnkey delivery.',
    longDescription: 'Our team handles your house construction from start to finish. We take care of floor plan design, foundation laying, structural civil work, brick masonry, plastering, custom flooring, painting, and electrical & plumbing installations to give you a strong, beautiful home.',
    image: houseConstructionImg
  },
  {
    id: 'land-sales',
    title: 'Land Sales',
    iconName: 'Map',
    description: 'Verified land plots in prime locations with clean legal titles and DTCP approvals.',
    longDescription: 'We provide legal-verified residential land plots in growing locations. All plots come with clean title deeds, clear boundary markers, road access, and hassle-free registration support.',
    image: landSaleImg
  },
  {
    id: 'ready-houses',
    title: 'Ready-Made Houses',
    iconName: 'Home',
    description: 'Ready-to-move luxury homes, duplexes, and villas built with top quality materials.',
    longDescription: 'Move into your dream home immediately. Our ready-made houses and duplex villas feature modern layouts, quality fittings, modular kitchens, and sturdy structural construction ready for instant living.',
    image: house1
  },
  {
    id: 'bricks-supply',
    title: 'Bricks Supply',
    iconName: 'Layers',
    description: 'High strength red clay bricks supplied directly to your site at transparent prices.',
    longDescription: 'We supply premium chamber-burnt red clay bricks with excellent strength and uniform shape. Perfect for load-bearing walls, house construction, and boundary walls.',
    image: brickImg
  },
  {
    id: 'sand-supply',
    title: 'River & M-Sand',
    iconName: 'Droplets',
    description: 'Clean washed river sand and fine M-Sand for strong masonry work and plastering.',
    longDescription: 'Get double-washed river sand and fine manufactured sand free of silt and mud. Ensures smooth plastering work, strong cement bonding, and crack-free walls.',
    image: sandImg
  },
  {
    id: 'steel-supply',
    title: 'TMT Steel Supply',
    iconName: 'Cpu',
    description: 'Fe-550 grade TMT steel rods in all sizes (8mm to 32mm) for strong structural safety.',
    longDescription: 'Direct supply of high-grade Fe-550 TMT steel bars. Highly flexible, rust-resistant, and built for strong foundation pillars, roof slabs, and beams.',
    image: steelImg
  },
  {
    id: 'consultation',
    title: 'Construction Consultation',
    iconName: 'FileText',
    description: 'Expert guidance on building cost estimation, material planning, and approval procedures.',
    longDescription: 'Speak with our construction experts before starting your project. We help you estimate total building costs, plan material requirements, inspect architectural drafts, and optimize your budget.',
    image: consultantImg
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
    image: house1,
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
    image: landSaleImg,
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
    image: house2,
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
    image: house3,
    features: ['Multiple Office Zones', 'Heavy Structural Load-Rating', 'High-Speed HVAC System', 'VIP Parking'],
    documentsVerified: true,
    description: 'Premium light-commercial and retail hub with incredible traffic visibility. Built with Fe-550 structural engineering standards for structural longevity.'
  }
];

export const MATERIALS_DATA: Material[] = [
  {
    id: 'm1',
    name: 'Red Clay Bricks',
    subtitle: 'High Quality Chamber Bricks',
    category: 'Bricks',
    grade: 'First Quality',
    image: brickImg,
    specs: ['High strength red bricks', 'Uniform size & shape', 'Low water absorption', 'Direct kiln site supply'],
    priceInfo: '₹7.50 per unit',
    unit: 'Brick',
    estimatedPrice: 7.5
  },
  {
    id: 'm2',
    name: 'River & M-Sand',
    subtitle: 'Clean Washed Sand',
    category: 'Sand',
    grade: 'Grade A Quality',
    image: sandImg,
    specs: ['Clean washed river sand', 'Fine M-Sand for plastering', 'Zero mud or silt content', 'Strong mortar bonding'],
    priceInfo: '₹3,500 per Tonne',
    unit: 'Tonne',
    estimatedPrice: 3500
  },
  {
    id: 'm3',
    name: 'TMT Steel Rods',
    subtitle: 'Fe-550 High Strength Steel',
    category: 'Steel',
    grade: 'Fe-550 TMT',
    image: steelImg,
    specs: ['High tensile steel strength', 'Rust resistant coating', 'Strong concrete grip', 'Available from 8mm to 32mm'],
    priceInfo: '₹62,000 per Tonne',
    unit: 'Metric Tonne',
    estimatedPrice: 62000
  },
  {
    id: 'm4',
    name: 'Construction Cement',
    subtitle: '53 Grade Strong Cement',
    category: 'Cement',
    grade: '53 Grade',
    image: cementImg,
    specs: ['Fast setting formula', 'Maximum concrete strength', 'Ideal for house construction', 'Top certified brand bags'],
    priceInfo: '₹420 per 50Kg Bag',
    unit: '50Kg Bag',
    estimatedPrice: 420
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'proj1',
    title: 'Nandavan Luxury Villa Complex',
    category: 'Luxury Residential',
    status: 'Completed',
    location: 'Melur Bypass Road, Madurai',
    year: '2025',
    image: house1,
    description: 'Transforming acres of land into a premium, secure gated layout of modern duplex villas built with DTCP approvals and top quality civil engineering.'
  },
  {
    id: 'proj2',
    title: 'Royal Heritage Duplex Residency',
    category: 'Turnkey Residence',
    status: 'Completed',
    location: 'Kovaipudur, Coimbatore',
    year: '2025',
    image: house2,
    description: 'Ultra-modern multi-story luxury residence engineered with Dhaya Fe-550 TMT steel and Grade 53 Cement for structural longevity.'
  },
  {
    id: 'proj3',
    title: 'Emerald Sovereign Haven Villa',
    category: 'Contemporary Villa',
    status: 'Completed',
    location: 'Thillai Nagar, Trichy',
    year: '2024',
    image: house3,
    description: 'Architectural masterpiece residence featuring modern glass elevations, custom masonry, and turnkey interior design.'
  },
  {
    id: 'proj4',
    title: 'Grand Horizon Executive House',
    category: 'Luxury Residential',
    status: 'Completed',
    location: 'Perundurai Road, Erode',
    year: '2024',
    image: house4,
    description: 'Bespoke executive family residence engineered to resist heavy weather and built with lab-analyzed materials.'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-anish',
    name: 'அனிஷ் ராஜகோபாலன்',
    role: 'வீட்டு உரிமையாளர்',
    review: "திரு. சுப்பிரமணியன் அவர்களின் சிறப்பான வழிகாட்டுதலுக்கும், அர்ப்பணிப்புடனான பணிக்கும் எங்களது மனமார்ந்த நன்றிகள். வீட்டு கட்டுமானப் பணிகள் முழுவதும் மிகவும் பொறுப்புடனும், நேர்த்தியாகவும் செயல்பட்டு, கட்டுமானத் தரத்தில் சிறப்பான கவனம் செலுத்தினார். அவருடைய சேவையில் நாங்கள் மிகவும் திருப்தி அடைந்துள்ளோம்.",
    rating: 5,
    image: ''
  },
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
