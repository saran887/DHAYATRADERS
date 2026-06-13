import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data';

export default React.memo(function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  return (
    <section id="testimonials" className="py-14 bg-white relative">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-silver/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 relative z-10">

        {/* Header Title */}
        <div className="text-center md:max-w-3xl md:mx-auto space-y-4 mb-8">
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-steel font-extrabold block">TRUSTED REVIEWS</span>
          <h2 className="font-serif text-3xl md:text-5xl text-navy tracking-tight font-medium">
            What Our Customers Say
          </h2>
          <div className="w-16 h-1 bg-steel mx-auto rounded-full" />
        </div>

        {/* Carousel frame */}
        <div className="relative bg-silver/30 border border-silver rounded-3xl p-8 sm:p-12 shadow-premium hover-card-trigger">

          {/* Giant decorative quotation mark */}
          <Quote className="absolute top-6 left-6 h-16 w-16 text-steel/10 select-none pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 text-center sm:text-left"
            >
              {/* Star Rating Panel */}
              <div className="flex items-center justify-center sm:justify-start gap-1">
                {[...Array(TESTIMONIALS_DATA[active].rating)].map((_, i) => (
                  <Star key={i} className="h-4.5 w-4.5 fill-teal text-teal" />
                ))}
              </div>

              {/* Review block text */}
              <p className="font-sans text-xs sm:text-lg text-navy leading-relaxed italic md:font-medium">
                "{TESTIMONIALS_DATA[active].review}"
              </p>

              {/* User Bio Details */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-silver">
                <div className="text-center sm:text-left">
                  <h4 className="font-serif text-md font-bold text-navy">{TESTIMONIALS_DATA[active].name}</h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-sans font-semibold mt-0.5">
                    {TESTIMONIALS_DATA[active].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons in carousel corners */}
          <div className="absolute bottom-6 right-6 flex gap-2 pt-4 justify-end">
            <button
              onClick={handlePrev}
              className="h-10 w-10 rounded-lg bg-white hover:bg-slate-100 border border-silver flex items-center justify-center text-slate-500 hover:text-navy transition-colors cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="h-10 w-10 rounded-lg bg-white hover:bg-slate-100 border border-silver flex items-center justify-center text-slate-500 hover:text-navy transition-colors cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Floating review count markers */}
        <div className="flex items-center justify-center gap-1.5 mt-8">
          {TESTIMONIALS_DATA.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`h-1.5 rounded-full transition-all duration-350 ${index === active ? 'w-6 bg-steel' : 'w-1.5 bg-slate-300'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
