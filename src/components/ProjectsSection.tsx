import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Eye, Building2, Quote, ChevronDown } from 'lucide-react';
import { PROJECTS_DATA } from '../data';

export default function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Completed' | 'Ongoing'>('All');

  // Track "showAfter" per project id — default true (show After)
  const [showAfterMap, setShowAfterMap] = useState<Record<string, boolean>>({});
  const toggleImage = (id: string) =>
    setShowAfterMap(prev => ({ ...prev, [id]: !(prev[id] !== false) }));

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((proj) => {
      if (selectedFilter === 'All') return true;
      return proj.status === selectedFilter;
    });
  }, [selectedFilter]);

  return (
    <section id="projects" className="py-14 bg-white relative">
      <div className="absolute inset-0 bg-steel-radial opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 relative z-10">

        {/* Title */}
        <div className="text-center md:max-w-3xl md:mx-auto space-y-4 mb-8">
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-steel font-extrabold block">LANDMARK DEVELOPMENTS</span>
          <h2 className="font-serif text-3xl md:text-5xl text-navy tracking-tight font-medium">
            Our Landmark Developments
          </h2>
          <div className="w-16 h-1 bg-steel mx-auto rounded-full" />
          <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
            Witness the build precision. Explore our premium completed portfolios and ongoing masterworks crafted with certified materials.
          </p>
        </div>

        {/* Projects Filter Dropdown */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-xs">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as any)}
              className="w-full text-xs sm:text-sm font-sans px-4 py-3.5 bg-white border border-steel text-steel font-bold rounded-xl cursor-pointer shadow-premium hover:shadow-premium-hover focus:outline-none appearance-none transition-all duration-300 pr-10"
            >
              <option value="All">All Projects</option>
              <option value="Completed">Completed Projects</option>
              <option value="Ongoing">Ongoing Projects</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-steel">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((proj) => {
            const showAfter = showAfterMap[proj.id] !== false; // default: show After
            return (
              <div
                key={proj.id}
                className="rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-hover border border-silver flex flex-col bg-silver/20 hover-card-trigger"
              >
                {/* Image area with Before/After toggle */}
                <div className="aspect-video w-full relative overflow-hidden bg-navy-deep">

                  {/* Before image */}
                  <img
                    src={proj.image}
                    alt={`${proj.title} — Before`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${showAfter ? 'opacity-0' : 'opacity-100'}`}
                    loading="lazy"
                    width={800}
                    height={500}
                  />
                  {/* After image */}
                  <img
                    src={proj.image}
                    alt={`${proj.title} — After`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${showAfter ? 'opacity-100' : 'opacity-0'}`}
                    loading="lazy"
                    width={800}
                    height={500}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent pointer-events-none" />

                  {/* Top-left: category + standard badges */}
                  <div className="absolute top-4 left-4 flex gap-2 z-10">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1.5 rounded bg-[#0D2136]/90 backdrop-blur-md text-white border border-white/10 shadow-lg">
                      {proj.category}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-1 bg-teal text-white rounded flex items-center gap-1 shadow">
                      <Building2 className="h-3 w-3 text-white" /> DHAYA STANDARD
                    </span>
                  </div>

                  {/* Top-right: status badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`text-[10px] uppercase tracking-widest font-extrabold px-3 py-1.5 rounded-lg text-white shadow-md border border-white/10 ${
                      proj.status === 'Completed' ? 'bg-emerald-600' : 'bg-blue-600'
                    }`}>
                      {proj.status}
                    </span>
                  </div>

                  {/* Bottom-center: Before / After pill toggle */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                    <button
                      onClick={() => toggleImage(proj.id)}
                      className="flex items-center bg-[#0D2136]/80 backdrop-blur-md border border-white/20 rounded-full p-1 shadow-lg cursor-pointer"
                      aria-label="Toggle Before/After image"
                    >
                      <span className={`text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full transition-all duration-300 ${
                        !showAfter ? 'bg-white text-navy shadow' : 'text-white/50'
                      }`}>
                        Before
                      </span>
                      <span className={`text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full transition-all duration-300 ${
                        showAfter ? 'bg-teal text-white shadow' : 'text-white/50'
                      }`}>
                        After
                      </span>
                    </button>
                  </div>
                </div>

                {/* Narrative description section */}
                <div className="p-6 md:p-8 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-slate-400 text-[10px] font-sans font-semibold tracking-wider uppercase">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-steel" />
                        <span>{proj.location}</span>
                      </div>
                      <div className="h-3 w-[1.5px] bg-silver hidden sm:inline" />
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-steel" />
                        <span>Est. Delivery: {proj.year}</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-xl md:text-2xl text-navy font-bold leading-snug">
                      {proj.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  {/* Quote */}
                  <div className="bg-steel/5 border border-steel/10 rounded-2xl p-4 space-y-2">
                    <div className="flex gap-2">
                      <Quote className="h-4 w-4 text-steel font-bold shrink-0 mt-0.5" />
                      <p className="text-[11px] italic text-slate-600 leading-relaxed font-sans">
                        "Dhaya Traders supplied all raw materials on time, ensuring strong foundation and quick structural completion."
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-silver flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-teal font-bold">Trading Integration Portfolio</span>
                    <Link
                      to="/contact"
                      className="text-[11px] font-sans font-bold uppercase tracking-wider text-steel hover:text-navy transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Submit Enquiry</span>
                      <Eye className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
