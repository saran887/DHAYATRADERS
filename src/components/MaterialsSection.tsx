import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles, Diamond } from 'lucide-react';
import { MATERIALS_DATA } from '../data';
import { Material } from '../types';
import RevealCard from './RevealCard';

export default React.memo(function MaterialsSection() {
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  return (
    <section id="materials" className="py-14 bg-gray-light relative">
      <div className="absolute inset-0 bg-steel-radial opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 relative z-10">

        {/* Title Block */}
        <div className="text-center md:max-w-3xl md:mx-auto space-y-4 mb-8">
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-steel font-extrabold flex items-center justify-center gap-1">
            <Diamond className="h-3 w-3 animate-pulse" /> ELITE BUILDING MATERIALS
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-navy tracking-tight font-medium">
            Procure Certified Materials
          </h2>
          <div className="w-16 h-1 bg-steel mx-auto rounded-full" />
          <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
            Direct bulk supply straight from our corporate yards. Vetted for maximum structural performance, complying with peak seismic codes and regional testing mandates.
          </p>
        </div>

        {/* 2x2/1-col card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MATERIALS_DATA.map((mat, index) => (
            <RevealCard key={mat.id} delay={index * 100}>
              <div className="rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-hover border border-silver flex flex-col bg-white hover-card-trigger h-full">

                {/* Visual frame */}
                <div className="h-64 relative overflow-hidden bg-navy-deep group">
                  <img
                    src={mat.image}
                    alt={mat.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                    width={800}
                    height={500}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent pointer-events-none" />

                  {/* Category overlay */}
                  <span className="absolute top-4 left-4 text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1.5 rounded bg-navy-deep/90 backdrop-blur-md text-white border border-white/10 shadow-lg">
                    {mat.category}
                  </span>
                </div>

                {/* Content Details */}
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">

                    {/* Badge Row */}
                    <div className="flex flex-wrap gap-1.5">
                      <span className="bg-teal/20 text-teal text-[10px] px-2 py-0.5 rounded-full border border-teal/30 font-medium">
                        {mat.grade}
                      </span>
                      <span className="bg-teal/20 text-teal text-[10px] px-2 py-0.5 rounded-full border border-teal/30 font-medium">
                        Unit: {mat.unit}
                      </span>
                      <span className="bg-teal/20 text-teal text-[10px] px-2 py-0.5 rounded-full border border-teal/30 font-medium">
                        {mat.subtitle}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-semibold text-navy leading-snug">
                      {mat.name}
                    </h3>

                    {/* Specs List (Bullet list of 3 specs) */}
                    <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside">
                      {mat.specs.slice(0, 3).map((spec, sIdx) => (
                        <li key={sIdx}>{spec}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Call to Actions */}
                  <div className="pt-4 border-t border-silver flex items-center gap-3">
                    <button
                      onClick={() => setSelectedMaterial(mat)}
                      className="flex-1 text-center border-2 border-steel text-steel hover:bg-steel hover:text-white px-4 py-2 rounded text-sm font-medium transition-all cursor-pointer"
                    >
                      View Details
                    </button>
                    <Link
                      to="/contact"
                      className="flex-1 text-center bg-steel text-white hover:bg-navy px-4 py-2 rounded text-sm font-semibold transition-all hover:-translate-y-0.5 block"
                    >
                      Request Quote
                    </Link>
                  </div>
                </div>

              </div>
            </RevealCard>
          ))}
        </div>

      </div>

      {/* Details Specs Overlay Modal */}
      {selectedMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={() => setSelectedMaterial(null)}
            className="absolute inset-0 bg-navy-deep/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="max-w-xl w-full rounded-2xl overflow-hidden shadow-2xl relative z-10 border border-white/10 text-white flex flex-col bg-navy-deep max-h-[90vh]">

            {/* Close Button */}
            <button
              onClick={() => setSelectedMaterial(null)}
              className="absolute top-4 right-4 z-20 bg-navy-deep border border-white/20 hover:bg-steel rounded-full p-2 text-white/85 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Image */}
            <div className="h-56 w-full bg-slate-950 flex items-center justify-center relative">
              <img
                src={selectedMaterial.image}
                alt={selectedMaterial.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-4 left-4 text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1.5 rounded bg-[#0D2136]/90 backdrop-blur-md text-white border border-white/10 shadow-lg">
                {selectedMaterial.category}
              </span>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
              <div>
                <span className="text-[10px] text-teal uppercase tracking-widest font-extrabold block">
                  {selectedMaterial.grade}
                </span>
                <h4 className="font-serif text-2xl font-bold mt-1 text-white">{selectedMaterial.name}</h4>
                <p className="text-xs text-slate-400 mt-1 italic">{selectedMaterial.subtitle}</p>
                <div className="w-10 h-0.5 bg-teal block mt-3" />
              </div>

              {/* Specs block */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-widest text-teal">Technical Specifications</h5>
                <ul className="grid grid-cols-1 gap-2.5 text-xs text-slate-300">
                  {selectedMaterial.specs.map((spec, specIdx) => (
                    <li key={specIdx} className="flex items-center gap-2 bg-white/5 border border-white/5 p-2.5 rounded-lg">
                      <Sparkles className="h-3.5 w-3.5 text-teal shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-white/10 pt-5 flex flex-col gap-3">
                <div className="flex justify-between items-center text-[10px] text-slate-400 uppercase tracking-widest">
                  <span>Standard unit</span>
                  <span className="text-white font-bold">{selectedMaterial.unit}</span>
                </div>

                <Link
                  to="/contact"
                  onClick={() => setSelectedMaterial(null)}
                  className="w-full text-center bg-steel hover:bg-navy text-white font-sans text-xs uppercase tracking-widest font-extrabold py-3.5 rounded-lg border border-white/10 hover:border-transparent transition-all hover:-translate-y-0.5 block"
                >
                  Request Quote →
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
});
