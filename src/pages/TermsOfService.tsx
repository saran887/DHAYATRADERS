import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';

export default function TermsOfService() {
  return (
    <PageTransition>
      <Helmet>
        <title>Terms of Service | DHAYA TRADERS</title>
        <meta name="description" content="Terms of Service for DHAYA TRADERS. Read our guidelines on real estate estimates, material shipments, and consultation rules." />
        <link rel="canonical" href="https://dhayatraders.com/terms" />
      </Helmet>

      <section className="py-14 sm:py-20 bg-gradient-to-b from-[#0D2136] to-[#1B3A5C] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-steel-radial opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-8 text-left">
          
          <div className="space-y-4">
            <span className="text-teal text-xs uppercase tracking-widest font-extrabold block">LEGAL COMPLIANCE</span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">Terms of Service</h1>
            <div className="w-20 h-1 bg-teal rounded-full" />
            <p className="text-xs text-slate-300 font-sans">Last Updated: July 19, 2026</p>
          </div>

          <div className="space-y-6 text-sm font-sans text-slate-200 leading-relaxed">
            <p>
              Welcome to <strong>DHAYA TRADERS</strong> (referred to as the "Service", "Website", or "we"). By visiting our website at dhayatraders.com, browsing properties, or initiating materials requests, you agree to comply with and be bound by the following terms, conditions, and disclaimer policies.
            </p>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">1. Use of Website</h3>
              <p>
                You agree to use this site strictly for legitimate scheduling enquiries, checking properties availability, or assessing materials cost lists. Any usage intended to disrupt server operations, submit fraudulent information, or scrape catalog media is strictly prohibited.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">2. Property Listings & Materials Estimates</h3>
              <p>
                We strive to keep all property descriptions, layouts, sizing (sq ft), and construction materials prices accurate. However, all listed figures, estimates, and parameters (including TMT steel weights or brick compression indices) are meant for preliminary cost assessment. Final prices and agreements are subject to direct physical verification and contract execution between the client and our corporate managers.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">3. Consultation Slot Bookings</h3>
              <p>
                Each booking time slot (Physical or Online) is dedicated to a <strong>single person (Individual Session)</strong> to ensure focused project assessment. We reserve the right to cancel or relocate scheduled slots in case of double bookings, logistics emergencies, or coordinates vetting conflicts.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">4. Intellectual Property</h3>
              <p>
                All brand logos, text layouts, structural descriptions, and site illustrations are the property of DHAYA TRADERS. Copying or modifying them for commercial redistribution without our explicit written permission is strictly prohibited.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">5. Regional Jurisdiction</h3>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of the State of Tamil Nadu, India. Any legal disputes arising out of the website use, material orders, or land sales shall be subject to the exclusive jurisdiction of the courts located in Erode, Tamil Nadu.
              </p>
            </div>
          </div>

        </div>
      </section>
    </PageTransition>
  );
}
