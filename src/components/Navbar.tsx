import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Properties', href: '/properties' },
    { name: 'Materials', href: '/materials' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${isScrolled
        ? 'bg-[#0D2136]/92 backdrop-blur-md border-b border-steel/30 py-3 shadow-lg'
        : 'bg-[#0D2136]/60 backdrop-blur-sm border-b border-steel/10 py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/assets/logo.png"
            alt="Dhaya Traders"
            className="h-10 w-auto object-contain"
            loading="eager"
          />
          <div>
            <h1 className="font-serif text-lg md:text-xl font-bold text-white tracking-wider group-hover:text-teal transition-all duration-300">
              DHAYATRADERS
            </h1>
            <p className="text-[9px] md:text-[10px] text-teal/80 uppercase tracking-widest leading-none">
              Building Prosperity • Global Trading
            </p>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-teal border-b-2 border-teal pb-0.5 text-sm font-medium transition-colors'
                      : 'text-white/80 hover:text-teal text-sm font-medium transition-colors'
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="h-6 w-[1px] bg-white/20 mx-2" />

          {/* Core Booking CTA */}
          <Link
            to="/contact"
            className="bg-steel hover:bg-navy text-white px-4 py-2 rounded text-sm font-semibold transition-all hover:-translate-y-0.5"
          >
            Book Consultation
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={onOpenConsultation}
            className="bg-steel hover:bg-navy text-white text-[10px] uppercase font-bold px-3 py-2 rounded-md transition-colors"
          >
            Consult
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:text-teal hover:bg-white/10 p-1.5 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#0D2136] border-b border-steel/30 py-6 px-6 shadow-2xl transition-all duration-300">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    isActive
                      ? 'block w-full text-left font-sans text-sm font-bold text-teal pl-2 border-l-2 border-teal transition-colors'
                      : 'block w-full text-left font-sans text-sm text-slate-300 hover:text-teal transition-colors'
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="h-[1.5px] bg-white/10 my-4" />

          <div className="flex flex-col gap-4">
            <Link
              to="/contact"
              className="w-full text-center bg-steel hover:bg-navy text-white font-sans text-xs uppercase tracking-widest font-semibold py-3 px-5 rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Book Consultation Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
