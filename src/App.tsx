import { useState, Suspense, lazy } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import PageLoader from './components/PageLoader';
import ConsultationModal from './components/ConsultationModal';
import { ShieldCheck, Phone, Mail, Award, MessageCircle } from 'lucide-react';

// Lazy load all 6 pages
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Properties = lazy(() => import('./pages/Properties'));
const Materials = lazy(() => import('./pages/Materials'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-light flex flex-col text-navy-deep">

      {/* Scroll to top component */}
      <ScrollToTop />

      {/* Skip link for accessibility */}
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-white focus:text-navy-deep focus:px-4 focus:py-2 focus:rounded focus:shadow-lg focus:z-50">
        Skip to main content
      </a>

      {/* Sticky Premium Navbar */}
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Main Pages with Suspense Loader */}
      <main id="main" className={`flex-grow min-h-[85vh] ${isHomePage ? '' : 'pt-24 lg:pt-28'}`}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            <Route path="/services" element={<Services />} />
            <Route path="/properties" element={<Properties onOpenConsultation={() => setIsConsultationOpen(true)} />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Blog />} />
          </Routes>
        </Suspense>
      </main>

      {/* Persistent Brand Footer */}
      <footer className="bg-navy-deep text-white pt-14 pb-10 border-t border-steel/30 relative min-h-[360px] md:min-h-[290px]">
        <div className="absolute inset-0 bg-steel-radial opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-white/10 pb-8 mb-8">

            {/* Column 1 - Brand Slogan */}
            <div className="md:col-span-4 space-y-4 text-left">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center bg-white border border-steel/30 rounded-full shadow-sm overflow-hidden shrink-0">
                  <img
                    src="/assets/logo.webp?v=2"
                    alt="DHAYATRADERS Logo"
                    draggable={false}
                    className="w-full h-full object-contain scale-120 select-none"
                    width={48}
                    height={48}
                  />
                </div>
                <h4 className="font-serif text-xl font-bold tracking-wider text-white">DHAYATRADERS</h4>
              </div>
              <p className="text-xs text-slate-200 font-sans font-bold">
                “Trusted Building &amp; Property Solutions”
              </p>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Delivering solid house construction, pre-vetted land sales, ready houses, and certified construction materials.
              </p>


            </div>

            {/* Column 2 - Sitemap Links */}
            <div className="md:col-span-3 space-y-4 text-left">
              <h5 className="text-xs uppercase tracking-widest font-extrabold text-teal font-sans">Quick Links</h5>
              <ul className="grid grid-cols-1 gap-2.5 text-xs text-slate-400 font-semibold font-sans">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">Home</Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white transition-colors">Services</Link>
                </li>
                <li>
                  <Link to="/properties" className="hover:text-white transition-colors">Properties</Link>
                </li>
                <li>
                  <Link to="/materials" className="hover:text-white transition-colors">Materials</Link>
                </li>
                <li>
                  <Link to="/projects" className="hover:text-white transition-colors">Projects</Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">Enquiry</Link>
                </li>
              </ul>
            </div>

            {/* Column 3 - Quick Enquiry Actions */}
            <div className="md:col-span-3 space-y-4 text-left">
              <h5 className="text-xs uppercase tracking-widest font-extrabold text-teal font-sans">Quick Enquiry</h5>
              <ul className="grid grid-cols-1 gap-3 text-xs text-slate-400 font-semibold font-sans">
                <li>
                  <a
                    href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=Hello%20DHAYATRADERS,%20I%20am%20interested%20in%20a%20construction%20project/materials.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-teal transition-colors flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-400 fill-emerald-400/10 shrink-0" />
                    <span>WhatsApp</span>
                  </a>
                </li>
                <li>
                  <a href={`tel:+${import.meta.env.VITE_WHATSAPP_NUMBER}`} className="hover:text-teal transition-colors flex items-center gap-2">
                    <Phone className="h-4 w-4 text-teal shrink-0" />
                    <span>Call Now</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:trade@dhayatraders.com" className="hover:text-teal transition-colors flex items-center gap-2">
                    <Mail className="h-4 w-4 text-teal shrink-0" />
                    <span>Email</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4 - Vetting Certifications */}
            <div className="md:col-span-2 space-y-4 text-left">
              <h5 className="text-xs uppercase tracking-widest font-extrabold text-teal font-sans">Credentials</h5>
              <div className="space-y-3">
                <div className="flex gap-2 items-center bg-white/5 border border-white/10 p-2.5 rounded-lg">
                  <ShieldCheck className="h-4.5 w-4.5 text-teal shrink-0" />
                  <span className="text-[9px] uppercase tracking-widest font-bold text-slate-300 font-sans">
                    Registry Vetted
                  </span>
                </div>
                <div className="flex gap-2 items-center bg-white/5 border border-white/10 p-2.5 rounded-lg">
                  <Award className="h-4.5 w-4.5 text-teal shrink-0" />
                  <span className="text-[9px] uppercase tracking-widest font-bold text-slate-300 font-sans">
                    Fe-550 Approved
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright Block */}
          <div className="pt-4 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
            <p className="font-sans text-center md:text-left">
              © {new Date().getFullYear()} DHAYATRADERS. All rights reserved. Sourced &amp; Engineered with Absolute Precision.
            </p>
            <div className="flex gap-6 font-sans">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Booking Dialogue Scheduler modal popup */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

    </div>
  );
}
