import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, MapPin, Award, ArrowRight } from 'lucide-react';

interface HeroProps {
  onExploreProperties: () => void;
  onGetMaterialsQuote: () => void;
  onBookSiteVisit: () => void;
}

const HERO_SLIDES = [
  {
    image: '/assets/20260610_173338.jpg',
    title: 'Architectural Excellence',
    tagline: 'Designing residences that stand the test of civilizational shifts.',
    badge: 'Luxury Real Estate'
  },
  {
    image: '/assets/20260610_173341.jpg',
    title: 'Direct Sourcing, Absolute Quality',
    tagline: 'Direct-to-site structural metals, clinker cements, and premium sands.',
    badge: 'Industrial Metals & Bricks'
  },
  {
    image: '/assets/20260610_173443.jpg',
    title: 'Verified Sovereign Land Deals',
    tagline: '100% audited title land blocks in high-growth investment sectors.',
    badge: 'Prime Land Portfolios'
  }
];

export default function Hero({ onExploreProperties, onGetMaterialsQuote, onBookSiteVisit }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const headlineWords = "Building Your Future With Trust".split(" ");

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-deep pt-14 md:pt-0">
      {/* Background Slides with smooth crossfade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.65, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${HERO_SLIDES[currentSlide].image}')` }}
          />
        </AnimatePresence>

        {/* Gradients blending content */}
        <div className="absolute inset-0 bg-[#0D2136]/70 lg:bg-gradient-to-r lg:from-[#0D2136] lg:via-[#0D2136]/65 lg:to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D2136] via-[#0D2136]/30 to-[#0D2136]/50 z-1" />
      </div>

      {/* Floating abstract decorative blueprints in background */}
      <div className="absolute inset-0 bg-steel-radial opacity-20 pointer-events-none z-1" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-14 w-full flex flex-col justify-center min-h-[90vh]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">

          {/* Main Hero Copy - Column 1 to 8 */}
          <div className="lg:col-span-8 space-y-4 text-left">

            {/* Dynamic Slider Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal/25 border border-teal/50 text-[10px] md:text-xs text-teal tracking-widest font-sans uppercase font-bold shadow-sm"
            >
              <Award className="h-4 w-4 animate-pulse text-teal" />
              <span>{HERO_SLIDES[currentSlide].badge}</span>
            </motion.div>

            {/* Static Core Title with word-by-word reveal */}
            <h2 
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white tracking-normal leading-tight font-bold"
              style={{ textShadow: '2px 2px 10px rgba(0, 0, 0, 0.95), 0 4px 15px rgba(13, 33, 86, 0.8)' }}
            >
              {headlineWords.map((word, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    opacity: 0,
                    animation: 'fadeSlideUp 0.6s ease forwards',
                    animationDelay: `${i * 0.08}s`
                  }}
                >
                  {word}&nbsp;
                </span>
              ))}
            </h2>

            {/* Subtext description */}
            <p 
              className="font-sans text-sm sm:text-lg text-slate-100 max-w-2xl leading-relaxed font-semibold"
              style={{ textShadow: '1px 2px 5px rgba(0, 0, 0, 0.95)' }}
            >
              House Construction • Land Sales • Ready House • Bricks • Sand • Steel • Building Materials
            </p>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row gap-4 pt-3">
              <button
                onClick={onExploreProperties}
                className="group flex items-center justify-center gap-2 bg-[#2E6B9E] hover:bg-[#1B3A5C] text-white font-sans text-xs uppercase tracking-widest font-extrabold py-4 px-8 rounded-lg shadow-lg hover:shadow-[#2E6B9E]/50 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Properties</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onBookSiteVisit}
                className="group flex items-center justify-center gap-2 bg-[#4AABB8] hover:bg-[#3d919c] text-[#0D2136] font-sans text-xs uppercase tracking-widest font-extrabold py-4 px-8 rounded-lg shadow-lg hover:shadow-[#4AABB8]/50 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Book Site Visit</span>
              </button>

              <button
                onClick={onGetMaterialsQuote}
                className="group flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/40 font-sans text-xs uppercase tracking-widest font-extrabold py-4 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Request Quote</span>
              </button>
            </div>

            {/* Quick Metrics Overlay */}
            <div className="grid grid-cols-2 gap-4 pt-8 max-w-md">
              <div className="p-3 bg-white/10 rounded-lg border border-white/20 backdrop-blur-md">
                <p className="text-xl md:text-2xl font-serif text-teal font-bold" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>100%</p>
                <p className="text-[10px] text-slate-200 uppercase tracking-widest font-bold">Trusted</p>
              </div>
              <div className="p-3 bg-white/10 rounded-lg border border-white/20 backdrop-blur-md">
                <p className="text-xl md:text-2xl font-serif text-teal font-bold" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>1000+</p>
                <p className="text-[10px] text-slate-200 uppercase tracking-widest font-bold">Happy Customers</p>
              </div>
            </div>


          </div>

          {/* Core Visual Presentation Widget on Right Side */}
          <div className="hidden lg:block lg:col-span-4 justify-self-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass-card-dark w-80 p-6 rounded-2xl shadow-2xl relative border border-teal/25 space-y-4 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between">
                <div className="text-[10px] uppercase font-bold tracking-widest text-[#a5cbea] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping" />
                  <span>Interactive Map Live</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">#DH-683</span>
              </div>

              {/* Minimal preview map placeholder */}
              <div className="h-40 rounded-lg overflow-hidden relative group cursor-pointer border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=400"
                  alt="Sovereign Land Plot Layout Sketch"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  width={400}
                  height={200}
                />
                <div className="absolute inset-0 bg-[#0D2136]/60 flex items-center justify-center p-3 text-center">
                  <div>
                    <MapPin className="h-6 w-6 text-teal mx-auto mb-2" />
                    <p className="text-xs font-semibold text-white uppercase tracking-wider">Emerald Hills Plot Layout</p>
                    <p className="text-[10px] text-slate-300">Phase 2 Plot Sales Live</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  "Sovereign Land Sales represent DHAYATRADERS double-audited residential layouts with immediate deed transfers."
                </p>
                <div className="flex items-center justify-between text-[11px] border-t border-white/10 pt-3">
                  <span className="text-slate-400">Registry status</span>
                  <span className="text-emerald-400 font-semibold uppercase flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> Ready
                  </span>
                </div>
              </div>

              <button
                onClick={onExploreProperties}
                className="w-full text-center bg-white/10 hover:bg-white/20 text-white font-sans text-[10px] uppercase tracking-widest font-bold py-3 rounded-lg border border-white/15 hover:border-teal/50 transition-all cursor-pointer"
              >
                Browse Gated Plots
              </button>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Decorative Slide Indicators */}
      <div className="absolute bottom-6 flex gap-2.5 z-20">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-8 bg-teal' : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
