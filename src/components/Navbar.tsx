import { useState, useEffect, useMemo } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import logo from '../assets/Logo.png';
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
    { name: 'Blog', href: '/blog' },
    { name: 'Enquiry', href: '/contact' }
  ];

  // Generate breadcrumbs JSON-LD dynamically based on current URL path
  const breadcrumbSchema = useMemo(() => {
    const paths = location.pathname.split('/').filter(Boolean);
    const itemListElement = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://dhayatraders.com/"
      }
    ];

    let accumulatedPath = "";
    paths.forEach((pathSegment, index) => {
      accumulatedPath += `/${pathSegment}`;
      const name = pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1);
      itemListElement.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": name,
        "item": `https://dhayatraders.com${accumulatedPath}`
      });
    });

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": itemListElement
    };
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      <nav
        id="main-navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-[#0D2136] border-b border-steel/30 shadow-lg ${
          isScrolled ? 'py-3' : 'py-4.5'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo Section */}
        
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-14 w-14 lg:h-20 lg:w-20 flex items-center justify-center bg-white rounded-full shadow-md overflow-hidden border border-steel/20">
              <img
                src={logo}
                alt="Dhaya Traders Logo"
                draggable={false}
                className="w-20 h-20 object-contain select-none"
                loading="eager" />
            </div>

          <div className="flex flex-col justify-center">
            <h1 className="font-serif text-lg md:text-xl font-bold text-white tracking-wider group-hover:text-teal transition-all duration-300 leading-tight">
              DHAYATRADERS
            </h1>
            <p className="text-[8px] md:text-[9px] text-teal uppercase tracking-widest font-semibold mt-0.5 leading-none">
              Trusted Building &amp; Property Solutions
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
                      ? 'text-teal border-b-2 border-teal pb-1 text-sm font-bold tracking-wide transition-colors'
                      : 'text-white/90 hover:text-teal text-sm font-medium tracking-wide transition-colors'
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="h-6 w-[1px] bg-white/20 mx-2" />

          {/* Core Booking CTA */}
          <button
            onClick={onOpenConsultation}
            className="bg-steel hover:bg-navy text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all hover:-translate-y-0.5 shadow-md hover:shadow-steel-glow cursor-pointer"
          >
            Book Consultation
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={onOpenConsultation}
            className="bg-steel hover:bg-navy text-white text-[10px] uppercase font-extrabold px-3 py-2 rounded-md transition-colors cursor-pointer"
          >
            Book Consultation
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:text-teal hover:bg-white/10 p-2.5 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
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
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? 'block w-full text-left font-sans text-sm font-bold text-teal pl-3 border-l-2 border-teal transition-colors py-2'
                      : 'block w-full text-left font-sans text-sm text-slate-300 hover:text-teal transition-colors py-2'
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="h-[1.5px] bg-white/10 my-4" />

          <div className="flex flex-col gap-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full text-center bg-steel hover:bg-navy text-white font-sans text-xs uppercase tracking-widest font-bold py-4 px-5 rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              Book Consultation
            </button>
          </div>
        </div>
      )}
      </nav>
    </>
  );
}
