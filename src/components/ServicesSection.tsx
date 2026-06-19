import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Building,
  Map,
  Home,
  Package,
  Layers,
  Sparkles,
  Cpu,
  FileText,
  X,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { SERVICES_DATA } from '../data';
import { Service } from '../types';
import RevealCard from './RevealCard';

// Map icon name from data to Lucide Components
const renderServiceIcon = (iconName: string) => {
  const props = { className: "h-8 w-8 text-steel" };
  switch (iconName) {
    case 'Building': return <Building {...props} />;
    case 'Map': return <Map {...props} />;
    case 'Home': return <Home {...props} />;
    case 'Package': return <Package {...props} />;
    case 'Layers': return <Layers {...props} />;
    case 'Droplets': return <Sparkles {...props} />;
    case 'Cpu': return <Cpu {...props} />;
    case 'FileText': return <FileText {...props} />;
    default: return <Building {...props} />;
  }
};

export default React.memo(function ServicesSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What construction models do you offer?",
      a: "We offer end-to-end turn-key contracts, design-build services, and structural shell contracts. Our architectural division drafts complete 2D plans and 3D elevations while securing necessary building permits."
    },
    {
      q: "Are the gated community plots DTCP or RERA approved?",
      a: "Yes. All land layouts marketed by DHAYATRADERS hold 100% clear legal titles, complete DTCP/Local Body approvals, and are fully vetted by panel attorneys before listing. We handle the registration process directly."
    },
    {
      q: "How do you manage quality control during construction?",
      a: "We deploy dedicated site engineers for constant supervision. Standard cube tests for concrete, brick absorption audits, and steel grade inspections are conducted and logged daily for absolute compliance."
    }
  ];

  return (
    <section id="services" className="py-14 bg-gradient-to-b from-gray-light to-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">

        {/* Section Header */}
        <div className="text-center md:max-w-3xl md:mx-auto space-y-4 mb-8">
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-steel font-extrabold block">WHAT WE DELIVER</span>
          <h2 className="font-serif text-3xl md:text-5xl text-navy tracking-tight font-medium">
            Core Business Services
          </h2>
          <div className="w-16 h-1 bg-steel mx-auto rounded-full" />
          <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
            Delivering vertical integration across global clinker trading, structural steel fabrications, certified land distributions, and turn-key luxury estate constructions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES_DATA.map((service, index) => (
            <RevealCard key={service.id} delay={index * 100}>
              <div className="group relative h-96 rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-hover bg-white border border-silver hover:border-teal/50 transition-all duration-300 flex flex-col justify-between h-full">
                {/* Image Header with brand-colored mask */}
                <div className="h-44 w-full relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={400}
                    height={300}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-navy-deep/15 to-transparent" />

                  {/* Floating Icon Base */}
                  <div className="absolute bottom-3 left-4 h-12 w-12 bg-white rounded-xl shadow-lg flex items-center justify-center border border-white">
                    {renderServiceIcon(service.iconName)}
                  </div>
                </div>

                {/* Title and Short description */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg md:text-xl text-navy font-semibold group-hover:text-steel transition-colors">
                      {service.title}
                    </h3>
                    <p className="font-sans text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-silver flex items-center justify-between">
                    <span className="text-[10px] text-steel uppercase tracking-widest font-bold">Dhaya Standard</span>
                    <button
                      onClick={() => setSelectedService(service)}
                      className="flex items-center gap-1 text-[11px] font-sans font-bold uppercase tracking-wider text-steel group-hover:text-navy transition-colors cursor-pointer"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </RevealCard>
          ))}
        </div>

        {/* Rich Corporate Services FAQ */}
        <div className="mt-16 border-t border-silver pt-12 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl md:text-3xl text-navy tracking-tight font-medium">
              Construction & Land Services FAQ
            </h3>
            <div className="w-10 h-0.5 bg-steel mx-auto rounded-full mt-2" />
          </div>
          <div className="space-y-3">
            {faqs.map((faq, fIdx) => (
              <div key={fIdx} className="bg-white rounded-xl border border-silver overflow-hidden transition-all duration-300">
                <button
                  onClick={() => setActiveFaq(activeFaq === fIdx ? null : fIdx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-serif text-sm md:text-base font-semibold text-navy hover:text-steel transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-steel shrink-0 text-xl font-mono leading-none">
                    {activeFaq === fIdx ? '−' : '+'}
                  </span>
                </button>
                <div
                  className={`px-5 transition-all duration-300 ease-in-out overflow-hidden ${
                    activeFaq === fIdx ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Learn More popover modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-navy-deep/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card-dark max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl relative z-10 border border-teal/30 text-white flex flex-col max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 bg-steel hover:bg-navy border border-white/25 rounded-full p-1.5 text-white/85 transition-colors cursor-pointer z-10"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="h-48 w-full relative">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
                    {renderServiceIcon(selectedService.iconName)}
                  </div>
                  <div>
                    <span className="text-[10px] text-teal uppercase tracking-widest font-extrabold block">DHAYATRADERS CORPORATE SERVICE</span>
                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">{selectedService.title}</h4>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
                <div className="space-y-3">
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans first-letter:text-2xl first-letter:font-serif first-letter:text-teal first-letter:mr-1">
                    {selectedService.longDescription}
                  </p>
                </div>

                {/* Corporate Trust Badges Inside Services Detail */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-6">
                  <div className="flex gap-2.5 items-start">
                    <ShieldCheck className="h-5 w-5 text-teal shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-white uppercase tracking-wider">Quality Guarantee</p>
                      <p className="text-[10px] text-slate-400">Direct provenance certificate matching absolute compliance indices.</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <CheckCircle2 className="h-5 w-5 text-teal shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-white uppercase tracking-wider">Turnaround Protection</p>
                      <p className="text-[10px] text-slate-400 font-sans">Structured scheduling agreements backed by direct fleet delivery logs.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-[11px] text-slate-400 font-sans text-center sm:text-left">
                    Connect with our supply trade divisions for bespoke commercial options.
                  </p>
                  <Link
                    to="/contact"
                    onClick={() => setSelectedService(null)}
                    className="w-full sm:w-auto bg-teal hover:bg-white text-navy-deep hover:text-navy-deep text-xs uppercase tracking-widest font-extrabold py-3 px-6 rounded-lg transition-colors cursor-pointer text-center block"
                  >
                    Inquire For This Service
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
});
