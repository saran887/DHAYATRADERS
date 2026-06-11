import { useState, Suspense, lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import PageLoader from './components/PageLoader';
import ConsultationModal from './components/ConsultationModal';
import { ShieldCheck, Phone, Mail, Clock, Award } from 'lucide-react';

// Lazy load all 6 pages
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Properties = lazy(() => import('./pages/Properties'));
const Materials = lazy(() => import('./pages/Materials'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-light flex flex-col text-navy-deep">

      {/* Scroll to top component */}
      <ScrollToTop />

      {/* Sticky Premium Navbar */}
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Main Pages with Suspense Loader */}
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>

      {/* Persistent Brand Footer */}
      <footer className="bg-navy-deep text-white pt-14 pb-10 border-t border-steel/30 relative">
        <div className="absolute inset-0 bg-steel-radial opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-white/10 pb-8 mb-8">

            {/* Column 1 - Brand Slogan */}
            <div className="md:col-span-4 space-y-4 text-left">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/10">
                  <span className="font-serif text-lg font-bold text-white tracking-widest leading-none">D</span>
                </div>
                <h4 className="font-serif text-xl font-bold tracking-wider text-white">DHAYATRADERS</h4>
              </div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Building Prosperity • Trusted Global Trading. Delivering architectural permanence, direct bulk aggregate logistics, and premium gated layout sales matching top regulatory indices.
              </p>

              {/* Quick Contact Line */}
              <div className="space-y-1 pt-2">
                <p className="text-xs text-white uppercase tracking-widest font-bold font-sans">Trading Desk Line</p>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Phone className="h-4 w-4 text-teal" />
                  <a href="tel:+18005553429" className="hover:text-teal transition-colors">+1 (800) DHAYA-TRADE</a>
                </div>
              </div>
            </div>

            {/* Column 2 - Sitemap Links */}
            <div className="md:col-span-3 space-y-4 text-left">
              <h5 className="text-xs uppercase tracking-widest font-extrabold text-teal font-sans">Corporate Portal</h5>
              <ul className="grid grid-cols-1 gap-2 text-xs text-slate-400">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Home Workspace
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Our Heritage &amp; Profile
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white transition-colors">
                    Services Directory
                  </Link>
                </li>
                <li>
                  <Link to="/properties" className="hover:text-white transition-colors">
                    Estate &amp; Plot Database
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 - Enterprise Trading Links */}
            <div className="md:col-span-3 space-y-4 text-left">
              <h5 className="text-xs uppercase tracking-widest font-extrabold text-teal font-sans">Enterprise Trading</h5>
              <ul className="grid grid-cols-1 gap-2 text-xs text-slate-400">
                <li>
                  <Link to="/materials" className="hover:text-white transition-colors">
                    Materials Catalog
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="hover:text-white transition-colors">
                    Transformation Portfolios
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="hover:text-white transition-colors">
                    Media Glass Gallery
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Feasibility Docket Forms
                  </Link>
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
              <a href="#" className="hover:text-white transition-colors">Trading Compliance Docket</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Legal Deed Terms</a>
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
