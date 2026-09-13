import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { Home, Phone } from 'lucide-react';

export default function NotFound() {
  return (
    <PageTransition>
      <Helmet>
        <title>Page Not Found | DHAYATRADERS</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-light text-navy-deep px-4 py-16 md:py-24 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <span className="text-[12px] uppercase tracking-widest text-teal font-extrabold block">Error 404</span>
          
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-navy">
            Page Not Found
          </h1>
          
          <div className="w-16 h-1 bg-teal mx-auto rounded-full" />
          
          <p className="font-sans text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
            The page you are looking for doesn't exist or has been moved. 
            Please check the URL or navigate back to our main services.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              to="/"
              className="w-full sm:w-auto bg-navy text-white hover:bg-steel font-sans text-xs uppercase tracking-widest font-extrabold py-3.5 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            
            <Link
              to="/contact"
              className="w-full sm:w-auto bg-white text-navy border border-silver hover:border-steel hover:bg-slate-50 font-sans text-xs uppercase tracking-widest font-extrabold py-3.5 px-8 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-teal" />
              <span>Contact Support</span>
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
