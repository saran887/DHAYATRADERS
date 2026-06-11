import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Columns, Calendar, MapPin, Eye, Building2, Quote } from 'lucide-react';

// Hardcoded matching the requested project definitions but mapping to our local files
const PROJECTS_LOCAL_DATA = [
  {
    id: 'proj1',
    title: 'The Azure Heritage Villa Complex',
    category: 'Luxury Residential',
    status: 'Completed',
    location: 'Emerald Hills Estates',
    year: '2025',
    imageBefore: '/assets/20260610_173450.jpg',
    imageAfter: '/assets/20260610_173518.jpg',
    description: 'Transforming 5 acres of undeveloped hillside land into a premium, completely secure gated layout of 6 architectural duplex smart villas.'
  },
  {
    id: 'proj2',
    title: 'Metro Hub Commercial Complex',
    category: 'Heavy Commercial Build',
    status: 'Completed',
    location: 'Business Central Strip',
    year: '2024',
    imageBefore: '/assets/20260610_173945.jpg',
    imageAfter: '/assets/20260610_173957.jpg',
    description: 'A multi-tier retail and corporate office development built completely using Dhaya high-tensile Fe-550 structural steel and Grade 53 high-compression cement. Full seismic mitigation architecture.'
  }
];

export default function ProjectsSection() {
  const [projectStateState, setProjectStateState] = useState<{ [projectId: string]: 'before' | 'after' }>({
    proj1: 'after',
    proj2: 'after'
  });

  const toggleProjectImage = (id: string) => {
    setProjectStateState((prev) => ({
      ...prev,
      [id]: prev[id] === 'after' ? 'before' : 'after'
    }));
  };

  return (
    <section id="projects" className="py-14 bg-white relative">
      <div className="absolute inset-0 bg-steel-radial opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 relative z-10">

        {/* Title */}
        <div className="text-center md:max-w-3xl md:mx-auto space-y-4 mb-8">
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-steel font-extrabold block">LANDMARK DEVELOPMENTS</span>
          <h2 className="font-serif text-3xl md:text-5xl text-navy tracking-tight font-medium">
            Completed Portfolios (Before &amp; After)
          </h2>
          <div className="w-16 h-1 bg-steel mx-auto rounded-full" />
          <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
            Witness the transformation. Click high-contrast toggles on each project sheet to switch between the raw foundation site and our finished architectural masterpieces.
          </p>
        </div>

        {/* Projects comparison sheets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {PROJECTS_LOCAL_DATA.map((proj) => {
            const activeState = projectStateState[proj.id] || 'after';
            const showsAfter = activeState === 'after';
            return (
              <div
                key={proj.id}
                className="rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-hover border border-silver flex flex-col bg-silver/20 hover-card-trigger"
              >
                {/* Visual comparator frame */}
                <div className="h-96 relative overflow-hidden bg-navy-deep group">
                  {/* Stacked before and after images with absolute positioning for crossfade */}
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={proj.imageBefore}
                      alt={`${proj.title} Before`}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out"
                      style={{ opacity: showsAfter ? 0 : 1 }}
                      loading="lazy"
                      width={800}
                      height={500}
                    />
                    <img
                      src={proj.imageAfter}
                      alt={`${proj.title} After`}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out"
                      style={{ opacity: showsAfter ? 1 : 0 }}
                      loading="lazy"
                      width={800}
                      height={500}
                    />
                  </div>

                  {/* Backdrop shading for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent pointer-events-none" />

                  {/* Header metadata tag */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1.5 rounded bg-[#0D2136]/90 backdrop-blur-md text-white border border-white/10 shadow-lg">
                      {proj.category}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-1 bg-teal text-white rounded flex items-center gap-1 shadow">
                      <Building2 className="h-3 w-3 text-white" /> DHAYA STANDARD
                    </span>
                  </div>

                  {/* Dynamic COMPARISON TACTILE CONTROLS */}
                  <div className="absolute top-4 right-4 flex items-center bg-[#0D2136]/90 backdrop-blur-md rounded-lg p-1 border border-white/10 shadow-lg z-10">
                    <button
                      onClick={() => setProjectStateState((prev) => ({ ...prev, [proj.id]: 'before' }))}
                      className={`text-[9px] uppercase tracking-widest font-extrabold px-3 py-1.5 rounded-md transition-all cursor-pointer ${!showsAfter ? 'bg-white text-navy shadow-lg' : 'text-slate-400 hover:text-white'
                        }`}
                    >
                      Before
                    </button>
                    <button
                      onClick={() => setProjectStateState((prev) => ({ ...prev, [proj.id]: 'after' }))}
                      className={`text-[9px] uppercase tracking-widest font-extrabold px-3 py-1.5 rounded-md transition-all cursor-pointer ${showsAfter ? 'bg-white text-navy shadow-lg' : 'text-slate-400 hover:text-white'
                        }`}
                    >
                      After Build
                    </button>
                  </div>

                  {/* Interactive toggle prompt overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-navy-deep/35 pointer-events-none z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleProjectImage(proj.id);
                      }}
                      className="bg-steel hover:bg-navy text-white font-sans text-[10px] uppercase tracking-widest font-extrabold py-3 px-6 rounded-full shadow-2xl flex items-center gap-2 border border-white/20 transition-all pointer-events-auto cursor-pointer transform hover:scale-103"
                    >
                      <Columns className="h-3.5 w-3.5 shrink-0" />
                      <span>Toggle {showsAfter ? 'Original Plot' : 'Completed Build'}</span>
                    </button>
                  </div>

                  {/* Floating active image caption */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10">
                    <div>
                      <p className="text-[9px] text-teal uppercase tracking-widest font-extrabold">Active State View</p>
                      <h4 className="text-white font-serif text-lg font-bold">
                        {showsAfter ? 'Completed Luxury Landmark' : 'Heavy Ground Site Excavations'}
                      </h4>
                    </div>
                    <span className="text-[10px] bg-white/10 backdrop-blur-sm border border-white/10 rounded px-2 py-1 text-slate-300 font-serif lowercase">
                      {showsAfter ? 'view: after' : 'view: foundation'}
                    </span>
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

                  {/* Custom transform quotes */}
                  <div className="bg-steel/5 border border-steel/10 rounded-2xl p-4.5 space-y-2">
                    <div className="flex gap-2">
                      <Quote className="h-4 w-4 text-steel font-bold shrink-0 mt-0.5" />
                      <p className="text-[11px] italic text-slate-600 leading-relaxed font-sans">
                        {showsAfter
                          ? '"DHAYATRADERS integrated complete pre-vetted design parameters, achieving absolute vertical grade alignments."'
                          : '"Excavation phase involved removing 3,500 cubic yards of high-moisture clays and implementing custom aggregate base columns."'}
                      </p>
                    </div>
                  </div>

                  {/* Navigation click trigger */}
                  <div className="pt-4 border-t border-silver flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-teal font-bold">Trading Integration Portfolio</span>
                    <Link
                      to="/contact"
                      className="text-[11px] font-sans font-bold uppercase tracking-wider text-steel hover:text-navy transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Inquire about this pipeline</span>
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
