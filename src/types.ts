export interface Service {
  id: string;
  title: string;
  iconName: string;
  description: string;
  longDescription: string;
  image: string;
}

export type PropertyType = 'Villa' | 'Ready-Made House' | 'Land' | 'Commercial';

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  location: string;
  size: string;
  price: string;
  image: string;
  features: string[];
  documentsVerified: boolean;
  description: string;
}

export interface Material {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  grade: string;
  image: string;
  specs: string[];
  priceInfo: string;
  unit: string;
  estimatedPrice: number; // For interactive cost calculator
}

export interface Project {
  id: string;
  title: string;
  category: string;
  status: 'Completed' | 'Ongoing';
  location: string;
  year: string;
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  image: string;
}
