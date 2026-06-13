import React, { useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MapPin, Sparkles, Filter, Search, Check, ShieldAlert, ArrowRight, Calendar, User, Phone, CheckCircle2 } from 'lucide-react';
import { PROPERTIES_DATA } from '../data';
import { Property, PropertyType } from '../types';
import { Link } from 'react-router-dom';
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

export default React.memo(function PropertyShowcase() {
  const [activeType, setActiveType] = useState<PropertyType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Custom quick modal form states
  const [visitDate, setVisitDate] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [visitType, setVisitType] = useState('Site Visit');
  const [timeSlot, setTimeSlot] = useState('Morning (9 AM - 12 PM)');
  const [clientMessage, setClientMessage] = useState('');
  const [submittingVisit, setSubmittingVisit] = useState(false);
  const [submittedVisit, setSubmittedVisit] = useState(false);

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

  const handleBookVisitSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!visitDate || !clientName || !clientPhone) return;

    setSubmittingVisit(true);
    setTimeout(() => {
      setSubmittingVisit(false);
      setSubmittedVisit(true);
      setTimeout(() => {
        setSubmittedVisit(false);
        setSelectedProperty(null);
        setVisitDate('');
        setClientName('');
        setClientPhone('');
        setVisitType('Site Visit');
        setTimeSlot('Morning (9 AM - 12 PM)');
        setClientMessage('');
      }, 3500);
    }, 1500);
  }, [visitDate, clientName, clientPhone]);

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

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setSelectedProperty(prop)}
                            className="flex items-center justify-center bg-steel hover:bg-navy text-white text-[10px] uppercase tracking-widest font-extrabold py-2.5 px-3 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer text-center"
                          >
                            <span>Book Visit</span>
                          </button>
                          
                          <Link
                            to="/contact"
                            className="flex items-center justify-center border border-steel text-steel hover:bg-steel hover:text-white text-[10px] uppercase tracking-widest font-extrabold py-2.5 px-3 rounded-lg transition-all cursor-pointer text-center"
                          >
                            <span>Request Details</span>
                          </Link>
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

      {/* Book Site Visit Request Dialog (modal-based) */}
      <AnimatePresence>
        {selectedProperty && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProperty(null)}
              className="absolute inset-0 bg-navy-deep/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card-dark max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl relative z-10 border border-teal/25 text-white flex flex-col p-6 space-y-4"
            >
              <div>
                <span className="text-[10px] text-teal uppercase tracking-widest font-extrabold block">LANDMARK SITE INQUIRY</span>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-white">Book Site Visit</h4>
                <p className="text-xs text-slate-300 font-sans mt-1">
                  You are scheduling a premium site visit or consultation for <span className="font-semibold text-white">{selectedProperty.title}</span> in {selectedProperty.location}.
                </p>
              </div>

              {submittedVisit ? (
                <div className="py-8 text-center space-y-4">
                  <div className="h-14 w-14 bg-emerald-500/20 border border-emerald-400 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div>
                    <h5 className="font-serif text-md font-bold text-white">Visit Scheduled Successfully!</h5>
                    <p className="text-xs text-slate-300 font-sans mt-1">
                      Thank you! Our local coordinator will call you shortly on your provided contact number to confirm the details.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookVisitSubmit} className="space-y-3.5 text-left">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1">
                        <User className="h-3 w-3 text-teal" /> Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Rajesh Kumar"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full text-xs font-sans px-3 py-2.5 bg-white/10 border border-white/20 focus:border-teal focus:outline-none rounded-lg text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1">
                        <Phone className="h-3 w-3 text-teal" /> Mobile Contact
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98450 12345"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full text-xs font-sans px-3 py-2.5 bg-white/10 border border-white/20 focus:border-teal focus:outline-none rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-teal" /> Inquiry / Visit Type
                      </label>
                      <select
                        value={visitType}
                        onChange={(e) => setVisitType(e.target.value)}
                        className="w-full text-xs font-sans px-3 py-2.5 bg-[#0D2136] border border-white/20 focus:border-teal focus:outline-none rounded-lg text-white cursor-pointer"
                      >
                        <option value="Site Visit">Physical Site Visit</option>
                        <option value="Consultation">Free Builders Consultation</option>
                        <option value="Property Discussion">Property Specs Discussion</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-teal" /> Time Slot
                      </label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full text-xs font-sans px-3 py-2.5 bg-[#0D2136] border border-white/20 focus:border-teal focus:outline-none rounded-lg text-white cursor-pointer"
                      >
                        <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                        <option value="Afternoon (12 PM - 3 PM)">Afternoon (12 PM - 3 PM)</option>
                        <option value="Evening (3 PM - 6 PM)">Evening (3 PM - 6 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-teal" /> Preferred Visit Date
                    </label>
                    <input
                      type="date"
                      required
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full text-xs font-sans px-3 py-2.5 bg-white/10 border border-white/20 focus:border-teal focus:outline-none rounded-lg text-white cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-slate-300 font-bold">Message (Optional)</label>
                    <textarea
                      rows={2}
                      placeholder="Specify any questions or details about your requirement..."
                      value={clientMessage}
                      onChange={(e) => setClientMessage(e.target.value)}
                      className="w-full text-xs font-sans px-3 py-2 bg-white/10 border border-white/20 focus:border-teal focus:outline-none rounded-lg text-white resize-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedProperty(null)}
                      className="w-1/2 text-center bg-white/10 hover:bg-white/15 text-slate-300 font-sans text-xs uppercase tracking-widest font-bold py-3 rounded-lg border border-white/10 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submittingVisit}
                      className="w-1/2 text-center bg-teal hover:bg-white text-navy-deep font-sans text-xs uppercase tracking-widest font-extrabold py-3 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {submittingVisit ? 'Scheduling...' : 'Book Visit'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
});
