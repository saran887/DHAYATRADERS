import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Eye, Image as ImageIcon, Filter, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import RevealCard from './RevealCard';

interface GalleryItem {
  id: string;
  category: 'Buildings' | 'Lands' | 'Materials' | 'Site Operations';
  title: string;
  image: string;
  caption: string;
}

const GALLERY_LOCAL_DATA: GalleryItem[] = [
  {
    id: 'g1',
    category: 'Buildings',
    title: 'The Royal Palms Duplex',
    image: '/assets/20260610_174155.jpg',
    caption: 'Finished premium dual-wing architectural villa layout showing customized glaze panels.'
  },
  {
    id: 'g2',
    category: 'Buildings',
    title: 'Meridian Office Glazing',
    image: '/assets/20260610_174158.jpg',
    caption: 'Heavy glazing and structural steel works for metropolitan tech headquarters.'
  },
  {
    id: 'g3',
    category: 'Lands',
    title: 'Emerald Gated Plots Layout',
    image: '/assets/20260610_174254.jpg',
    caption: 'Sovereign-vetted layout parcels showing certified concrete road bounds.'
  },
  {
    id: 'g4',
    category: 'Materials',
    title: 'Fe-550 TMT Rebar Bundles',
    image: '/assets/20260610_174338.jpg',
    caption: 'Oxidized protective layer high tensile rebar rods prepared for deep excavation grids.'
  },
  {
    id: 'g5',
    category: 'Site Operations',
    title: 'Meridian Tower Excavations',
    image: '/assets/20260610_174613.jpg',
    caption: 'Heavy gantry cranes and concrete batch columns foundation preparation.'
  },
  {
    id: 'g6',
    category: 'Site Operations',
    title: 'Supervisory Blueprint Audit',
    image: '/assets/20260610_174615.jpg',
    caption: 'Master electrical and drainage draft analysis executed in our plaza hub.'
  }
];

export default React.memo(function GallerySection() {
  const [selectedCat, setSelectedCat] = useState<'All' | 'Buildings' | 'Lands' | 'Materials' | 'Site Operations'>('All');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const filterList: ('All' | 'Buildings' | 'Lands' | 'Materials' | 'Site Operations')[] = [
    'All', 'Buildings', 'Lands', 'Materials', 'Site Operations'
  ];

  const filteredItems = useMemo(() => {
    return GALLERY_LOCAL_DATA.filter((item) => selectedCat === 'All' || item.category === selectedCat);
  }, [selectedCat]);

  return (
    <section id="gallery" className="py-14 bg-gray-light relative">
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">

        {/* Title */}
        <div className="text-center md:max-w-3xl md:mx-auto space-y-4 mb-8">
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-steel font-extrabold block">MEDIA LIBRARY</span>
          <h2 className="font-serif text-3xl md:text-5xl text-navy tracking-tight font-medium">
            Project Glass Gallery
          </h2>
          <div className="w-16 h-1 bg-steel mx-auto rounded-full" />
          <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
            Take a deep structural look at our completed luxury villas, custom sands aggregates, massive steel columns, on-site heavy cranes, and verified land layout developments.
          </p>
        </div>

        {/* Gallery Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 pb-4 border-b border-silver">
          <Filter className="h-4.5 w-4.5 text-steel mr-1.5 hidden sm:inline" />
          {filterList.map((catKey) => (
            <button
              key={catKey}
              onClick={() => setSelectedCat(catKey)}
              className={`font-sans text-[10px] uppercase tracking-wider py-2 px-4.5 rounded-lg font-bold transition-all duration-300 cursor-pointer ${selectedCat === catKey
                ? 'bg-steel text-white shadow'
                : 'bg-white text-slate-500 hover:text-navy border border-silver hover:bg-slate-50'
                }`}
            >
              {catKey === 'Site Operations' ? 'On Site Work' : catKey}
            </button>
          ))}
        </div>

        {/* Gallery Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <RevealCard key={item.id} delay={index * 100}>
                <div
                  onClick={() => setActiveImage(item)}
                  className="group relative h-72 rounded-2xl overflow-hidden shadow-premium border border-silver bg-white cursor-zoom-in"
                >
                  {/* Photo container */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    loading="lazy"
                    width={400}
                    height={300}
                  />

                  {/* Dark rich lens gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/15 to-transparent opacity-0 group-hover:opacity-90 transition-all duration-400 flex flex-col justify-end p-5" />

                  {/* Info block hidden until hover */}
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none">
                    <span className="text-[9px] text-teal uppercase tracking-widest font-extrabold block">
                      {item.category === 'Site Operations' ? 'On Site Work' : item.category}
                    </span>
                    <h4 className="font-serif text-md font-bold text-white mt-0.5">{item.title}</h4>
                    <p className="text-[10px] text-slate-300 font-sans line-clamp-2 mt-1 leading-relaxed">
                      {item.caption}
                    </p>

                    <div className="mt-3 flex items-center gap-1.5 text-teal text-[9px] uppercase tracking-widest font-extrabold font-sans">
                      <Eye className="h-3.5 w-3.5" />
                      <span>Enlarge photo</span>
                    </div>
                  </div>
                </div>
              </RevealCard>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Gallery Large Lightroom Dialog */}
      <AnimatePresence>
        {activeImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImage(null)}
              className="absolute inset-0 bg-navy-deep/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl relative z-10 border border-white/10 text-white flex flex-col md:flex-row bg-navy-deep max-h-[85vh]"
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-20 bg-navy-deep border border-white/20 hover:bg-steel rounded-full p-2 text-white/85 transition-colors cursor-pointer"
                aria-label="Close photo"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Large Image Frame */}
              <div className="w-full md:w-2/3 bg-slate-950 flex items-center justify-center relative min-h-64 md:min-h-[450px]">
                <img
                  src={activeImage.image}
                  alt={activeImage.title}
                  className="w-full h-full object-contain max-h-[80vh]"
                />
              </div>

              {/* Photos detail story */}
              <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-[9px] text-teal uppercase tracking-widest font-extrabold block">
                    {activeImage.category === 'Site Operations' ? 'On Site Work' : activeImage.category}
                  </span>
                  <h4 className="font-serif text-xl md:text-2xl font-bold mt-1 text-white">{activeImage.title}</h4>
                  <div className="w-10 h-0.5 bg-teal block mt-3" />

                  <p className="text-xs text-slate-300 font-sans mt-5 leading-relaxed">
                    {activeImage.caption}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-5 space-y-3.5">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 uppercase tracking-widest">
                    <span>Authorized Owner</span>
                    <span className="text-white font-bold">DHAYATRADERS</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 uppercase tracking-widest">
                    <span>Release Index</span>
                    <span className="text-emerald-400 font-bold">Public Docket</span>
                  </div>

                  <Link
                    to="/contact"
                    onClick={() => setActiveImage(null)}
                    className="w-full text-center bg-steel hover:bg-navy text-white font-sans text-[10px] uppercase tracking-widest font-extrabold py-3.5 rounded-lg border border-white/10 hover:border-transparent transition-all cursor-pointer block"
                  >
                    Send Sourcing Request
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
