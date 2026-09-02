import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Eye, Building2, Quote } from 'lucide-react';
import { PROJECTS_DATA } from '../data';
import CustomSelect from './CustomSelect';

export default function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Completed' | 'Ongoing'>('All');

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((proj) => {
      if (selectedFilter === 'All') return true;
      return proj.status === selectedFilter;
    });
  }, [selectedFilter]);

  return (
    <section id="projects" className="py-8 md:py-14 bg-white relative">
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
          <div className="w-full max-w-xs">
            <CustomSelect
              value={selectedFilter}
              onChange={(val) => setSelectedFilter(val as any)}
              options={[
                { label: 'All Projects', value: 'All' },
                { label: 'Completed Projects', value: 'Completed' },
                { label: 'Ongoing Projects', value: 'Ongoing' }
              ]}
              dark={false}
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((proj) => {
            return (
              <div
                key={proj.id}
                className="rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-hover border border-silver flex flex-col bg-silver/20 hover-card-trigger"
              >
                {/* Project Image */}
                <div className="aspect-video w-full relative overflow-hidden bg-navy-deep group">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={500}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent pointer-events-none" />

                  {/* Top Header Bar Badges - Responsive flex-wrap to prevent overlaps */}
                  <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-1.5 z-10">
                    <div className="flex flex-wrap items-center gap-1.5 max-w-[calc(100%-85px)]">
                      <span className="text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded bg-[#0D2136]/90 backdrop-blur-md text-white border border-white/10 shadow-lg truncate">
                        {proj.category}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-1 bg-teal text-white rounded flex items-center gap-1 shadow">
                        <Building2 className="h-3 w-3 text-white shrink-0" />
                        <span className="hidden sm:inline">DHAYA STANDARD</span>
                        <span className="sm:hidden">STANDARD</span>
                      </span>
                    </div>

                    <div className="shrink-0">
                      <span className={`text-[9px] sm:text-[10px] uppercase tracking-widest font-extrabold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-white shadow-md border border-white/10 ${
                        proj.status === 'Completed' ? 'bg-emerald-600' : 'bg-blue-600'
                      }`}>
                        {proj.status}
                      </span>
                    </div>
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
