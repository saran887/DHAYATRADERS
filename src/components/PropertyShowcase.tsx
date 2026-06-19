import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'motion/react';
import { MapPin, Filter, Search, Check, ShieldAlert } from 'lucide-react';
import { PROPERTIES_DATA } from '../data';
import { Property, PropertyType } from '../types';
import RevealCard from './RevealCard';

const renderSpecs = (prop: Property) => {
  switch (prop.type) {
    case 'Land':
      return (
        <div className="space-y-2 border-t border-b border-silver py-3 my-1">
          <div className="grid grid-cols-2 gap-2 text-[10px] font-sans">
            <div className="bg-emerald-50 border border-emerald-100 p-2 rounded text-left">
              <span className="text-[8px] text-emerald-800 uppercase tracking-wider font-extrabold block">Plot Size</span>
              <span className="text-navy font-bold">{prop.size}</span>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 p-2 rounded text-left">
              <span className="text-[8px] text-emerald-800 uppercase tracking-wider font-extrabold block">Doc Verification</span>
              <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                <span className="truncate">Title Vetted</span>
              </span>
            </div>
          </div>
          <div className="text-[10px] text-slate-600 bg-slate-50 p-2 rounded text-left space-y-1">
            <div className="flex gap-2 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block shrink-0" />
              <span className="truncate"><strong>Area:</strong> {prop.location}</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block shrink-0" />
              <span className="truncate"><strong>Location:</strong> Erode, Tamil Nadu</span>
            </div>
          </div>
        </div>
      );
    case 'Ready-Made House':
    case 'Villa': {
      const bedrooms = prop.features.find(f => f.toLowerCase().includes('bedroom')) || '3-4 BHK';
      const parking = prop.features.find(f => f.toLowerCase().includes('parking') || f.toLowerCase().includes('garage')) || 'Private Garage';
      const quality = 'Direct Steel & OPC-53';
      return (
        <div className="space-y-2 border-t border-b border-silver py-3 my-1">
          <div className="grid grid-cols-2 gap-2 text-[10px] font-sans">
            <div className="bg-blue-50 border border-blue-100 p-2 rounded text-left">
              <span className="text-[8px] text-blue-800 uppercase tracking-wider font-extrabold block">Bedrooms</span>
              <span className="text-navy font-bold">{bedrooms}</span>
            </div>
            <div className="bg-blue-50 border border-blue-100 p-2 rounded text-left">
              <span className="text-[8px] text-blue-800 uppercase tracking-wider font-extrabold block">House Type</span>
              <span className="text-navy font-bold">{prop.type}</span>
            </div>
          </div>
          <div className="text-[10px] text-slate-600 bg-slate-50 p-2 rounded text-left space-y-1">
            <div className="flex gap-2 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-steel inline-block shrink-0" />
              <span className="truncate"><strong>Parking:</strong> {parking}</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-steel inline-block shrink-0" />
              <span className="truncate"><strong>Construction:</strong> {quality}</span>
            </div>
          </div>
        </div>
      );
    }
    case 'Commercial': {
      const suitability = prop.features.find(f => f.toLowerCase().includes('suitability') || f.toLowerCase().includes('retail') || f.toLowerCase().includes('office') || f.toLowerCase().includes('commercial')) || 'Office / Retail';
      const parking = prop.features.find(f => f.toLowerCase().includes('parking') || f.toLowerCase().includes('garage')) || 'Ample Parking';
      const accessibility = 'NH Frontage Access';
      return (
        <div className="space-y-2 border-t border-b border-silver py-3 my-1">
          <div className="grid grid-cols-2 gap-2 text-[10px] font-sans">
            <div className="bg-teal-50 border border-teal-100 p-2 rounded text-left">
              <span className="text-[8px] text-teal-800 uppercase tracking-wider font-extrabold block">Building Area</span>
              <span className="text-navy font-bold">{prop.size}</span>
            </div>
            <div className="bg-teal-50 border border-teal-100 p-2 rounded text-left">
              <span className="text-[8px] text-teal-800 uppercase tracking-wider font-extrabold block">Accessibility</span>
              <span className="text-navy font-bold truncate block">{accessibility}</span>
            </div>
          </div>
          <div className="text-[10px] text-slate-600 bg-slate-50 p-2 rounded text-left space-y-1">
            <div className="flex gap-2 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-teal inline-block shrink-0" />
              <span className="truncate"><strong>Suitability:</strong> {suitability}</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-teal inline-block shrink-0" />
              <span className="truncate"><strong>Parking:</strong> {parking}</span>
            </div>
          </div>
        </div>
      );
    }
    default:
      return null;
  }
};

export default React.memo(function PropertyShowcase({ onOpenConsultation }: { onOpenConsultation: () => void }) {
  const [activeType, setActiveType] = useState<PropertyType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Categories list ordered: All | Land | House | Villa | Commercial
  const categories: (PropertyType | 'All')[] = ['All', 'Land', 'Ready-Made House', 'Villa', 'Commercial'];

  // Filters calculation
  const filteredProperties = useMemo(() => {
    return PROPERTIES_DATA.filter((p) => {
      const matchesType = activeType === 'All' || p.type === activeType;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [activeType, searchQuery]);


  return (
    <section id="properties" className="py-14 bg-gradient-to-b from-white to-gray-light relative">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 relative z-10">

        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-6">
          <div className="space-y-4 max-w-2xl text-left">
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-steel font-extrabold block">LAND &amp; PROPERTY SHOWCASE</span>
            <h2 className="font-serif text-3xl md:text-5xl text-navy tracking-tight font-medium">
              Visions of Landmark Estates
            </h2>
            <div className="w-16 h-1 bg-steel rounded-full" />
            <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
              Browse our elite portfolio of sovereign land acquisitions, bespoke design-build ready houses, and pre-zoned heavy commercial centers.
            </p>
          </div>

          {/* Quick search input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search estates or zones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-sans pl-10 pr-4 py-3 bg-white border border-silver focus:border-teal focus:outline-none rounded-xl shadow-sm transition-all text-navy placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-silver pb-4 mb-8 overflow-x-auto">
          <Filter className="h-4.5 w-4.5 text-steel mr-2" />
          {categories.map((catKey) => (
            <button
              key={catKey}
              onClick={() => setActiveType(catKey)}
              className={`font-sans text-xs uppercase tracking-wider py-2.5 px-5 rounded-lg transition-all duration-300 font-bold cursor-pointer ${activeType === catKey
                ? 'bg-steel text-white shadow-md shadow-steel/20'
                : 'bg-white text-slate-500 hover:text-navy border border-silver hover:bg-slate-50'
                }`}
            >
              {catKey}
            </button>
          ))}
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((prop, index) => (
                <RevealCard key={prop.id} delay={index * 100}>
                  <div className="rounded-2xl overflow-hidden glass-card shadow-premium border border-silver flex flex-col sm:flex-row group h-full">
                    {/* Property Image Container */}
                    <div className="relative w-full sm:w-1/2 h-64 sm:h-auto overflow-hidden min-h-64">
                      <img
                        src={prop.image}
                        alt={prop.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                        loading="lazy"
                        width={400}
                        height={300}
                      />
                      {/* Dark bottom gradient on image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent pointer-events-none" />

                      {/* Top floating tags */}
                      <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                        <span className="text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1.5 rounded bg-navy text-white shadow">
                          {prop.type}
                        </span>
                        {prop.documentsVerified && (
                          <span className="text-[8px] uppercase tracking-wider font-bold px-2 py-1 bg-teal text-white rounded flex items-center gap-1 shadow">
                            <Check className="h-3 w-3 text-white" /> Documents Audited
                          </span>
                        )}
                      </div>

                      {/* Size and area banner indicator */}
                      <div className="absolute bottom-4 left-4 z-10">
                        <p className="text-[10px] text-white/80 uppercase tracking-widest font-sans font-medium">Estates Metric</p>
                        <p className="text-sm font-serif font-bold text-white">{prop.size}</p>
                      </div>
                    </div>

                    {/* Description & specs section */}
                    <div className="w-full sm:w-1/2 p-6 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <MapPin className="h-3.5 w-3.5 text-steel" />
                          <span className="text-[10px] font-sans font-semibold tracking-wider uppercase">{prop.location}</span>
                        </div>
                        <h4 className="font-serif text-lg md:text-xl text-navy font-bold">{prop.title}</h4>
                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{prop.description}</p>
                      </div>

                      {/* Category Specific Layout */}
                      {renderSpecs(prop)}

                      {/* Bottom CTA & Pricing */}
                      <div className="flex flex-col space-y-3 pt-2">
                        <div className="flex items-center justify-between border-b border-silver pb-2">
                          <div>
                            <p className="text-[9px] text-slate-400 uppercase tracking-widest leading-none">Est Price Guide</p>
                            <p className="text-md font-serif text-[#2E6B9E] font-bold">{prop.price}</p>
                          </div>
                          <span className="text-[9px] font-sans font-bold text-teal bg-teal/10 px-2 py-0.5 rounded">
                            {prop.type === 'Ready-Made House' ? 'House' : prop.type}
                          </span>
                        </div>

                        <div className="pt-2">
                          <button
                            onClick={onOpenConsultation}
                            className="w-full flex items-center justify-center bg-steel hover:bg-navy text-white text-[10px] uppercase tracking-widest font-extrabold py-3 px-4 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer text-center"
                          >
                            <span>Book Consultation</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </RevealCard>
              ))
            ) : (
              <div className="col-span-2 py-16 text-center space-y-3">
                <ShieldAlert className="h-10 w-10 text-steel mx-auto" />
                <h5 className="font-serif text-md text-navy font-bold">No Premium Estates Found</h5>
                <p className="text-xs text-slate-500">We do the continuous search indexing. Please re-adjust search criteria.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
});
