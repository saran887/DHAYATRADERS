import { useEffect, useState } from 'react';
import { Award, Compass, ShieldCheck, Milestone } from 'lucide-react';
import { motion } from 'motion/react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function AboutSection() {
  const [revealRef, isVisible] = useScrollReveal();
  const [animatedStats, setAnimatedStats] = useState({
    estates: 0,
    sqft: 0,
    vetting: 0,
    fleets: 0
  });

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1500; // 1500ms
    const startTime = performance.now();
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / duration, 1);

      // Easing: ease-out cubic
      const progress = 1 - Math.pow(1 - t, 3);

      setAnimatedStats({
        estates: Math.floor(progress * 15),
        sqft: Math.floor(progress * 500),
        vetting: Math.floor(progress * 100),
        fleets: Math.floor(progress * 25)
      });

      if (t < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible]);

  const stats = [
    { value: `${animatedStats.estates}+`, label: 'Elite Estates Completed' },
    { value: `${animatedStats.sqft}k+`, label: 'Sq Ft Constructed' },
    { value: `${animatedStats.vetting}%`, label: 'Clean Land Deed Vetting' },
    { value: `${animatedStats.fleets}+`, label: 'Sourcing Material Fleets' }
  ];

  return (
    <section id="about" className="py-14 bg-white relative overflow-hidden" ref={revealRef}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-steel-radial opacity-20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Collage Gallery Grid */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=400"
                    alt="Elegant luxury villa dining exterior"
                    className="rounded-2xl shadow-premium object-cover h-64 w-full"
                    loading="lazy"
                    width={400}
                    height={300}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-navy p-6 rounded-2xl text-white space-y-2 border border-white/10 shadow-2xl"
                >
                  <Milestone className="h-7 w-7 text-teal animate-pulse" />
                  <p className="text-xl font-serif font-bold text-white">100% Certified</p>
                  <p className="text-[10px] text-slate-300 uppercase tracking-widest font-sans font-semibold">
                    DTCP & RERA Approved Layouts
                  </p>
                </motion.div>
              </div>

              <div className="space-y-4 pt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=400"
                    alt="Excavation and building crane operations"
                    className="rounded-2xl shadow-premium object-cover h-44 w-full"
                    loading="lazy"
                    width={400}
                    height={200}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=400"
                    alt="Structural grade steels stacked on site"
                    className="rounded-2xl shadow-premium object-cover h-56 w-full"
                    loading="lazy"
                    width={400}
                    height={280}
                  />
                </motion.div>
              </div>
            </div>

            {/* Floating Trust Indicator Badge */}
            <div className="absolute -bottom-6 -right-3 bg-white border border-silver p-4 rounded-xl shadow-2xl hidden md:flex items-center gap-3 max-w-xs">
              <div className="h-10 w-10 rounded-full bg-silver flex items-center justify-center text-steel shrink-0 shadow-inner">
                <Compass className="h-5 w-5 animate-spin-slow" />
              </div>
              <div className="text-left">
                <p className="text-xs font-serif font-bold text-navy">Elite Real Estate Hub</p>
                <p className="text-[8px] text-slate-400 uppercase tracking-widest font-semibold mt-0.5 leading-none">DHAYA TRUST LINE</p>
              </div>
            </div>
          </div>

          {/* Corporate story text details on right */}
          <div className="lg:col-span-6 space-y-6 text-left lg:pl-6">

            <div className="space-y-4">
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-steel font-extrabold block font-sans">WHO WE ARE</span>
              <h2 className="font-serif text-3xl md:text-5xl text-navy tracking-tight font-medium leading-tight">
                Building Prosperity • Trusted Global Trading
              </h2>
              <div className="w-16 h-1 bg-steel rounded-full" />
            </div>

            <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
              Established as a trusted partner for home builders and property buyers in Tamil Nadu, DHAYA TRADERS combines quality material supply with reliable construction services. We help families, local builders, and contractors across Madurai, Erode, Trichy, Coimbatore, and Chennai build strong homes and secure verified plots with 100% clear deeds.
            </p>

            {/* Highlighted Values bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b border-silver py-6">
              <div className="flex gap-2.5 items-start">
                <Award className="h-5 w-5 text-steel shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-navy uppercase tracking-wider">Uncompromising Grade</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed font-sans">Lab-analyzed Fe-550 TMT steel rods and triple-washed River Sand aggregates.</p>
                </div>
              </div>

              <div className="flex gap-2.5 items-start">
                <ShieldCheck className="h-5 w-5 text-steel shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-navy uppercase tracking-wider">Flawless Registration</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed font-sans">Absolute double-audited land deeds providing secure, instant government transfer.</p>
                </div>
              </div>
            </div>

            {/* Quick stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {stats.map((stat, sIdx) => (
                <div key={sIdx} className="p-3 bg-silver/40 rounded-xl border border-silver shadow-sm">
                  <p className="text-2xl font-serif text-steel font-bold font-mono">{stat.value}</p>
                  <p className="text-[9px] text-slate-400 uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
