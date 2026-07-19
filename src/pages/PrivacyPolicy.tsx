import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';

export default function PrivacyPolicy() {
  return (
    <PageTransition>
      <Helmet>
        <title>Privacy Policy | DHAYA TRADERS</title>
        <meta name="description" content="Privacy Policy for DHAYA TRADERS. Learn how we handle and protect your coordinates, messages, and enquiry data securely." />
        <link rel="canonical" href="https://dhayatraders.com/privacy" />
      </Helmet>

      <section className="py-8 sm:py-16 bg-gradient-to-b from-[#0D2136] to-[#1B3A5C] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-steel-radial opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-8 text-left">
          
          <div className="space-y-4">
            <span className="text-teal text-xs uppercase tracking-widest font-extrabold block">LEGAL COMPLIANCE</span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">Privacy Policy</h1>
            <div className="w-20 h-1 bg-teal rounded-full" />
            <p className="text-xs text-slate-300 font-sans">Last Updated: July 19, 2026</p>
          </div>

          <div className="space-y-6 text-sm font-sans text-slate-200 leading-relaxed">
            <p>
              At <strong>DHAYA TRADERS</strong> (referred to as "we", "us", or "our"), we hold your privacy in the highest regard. This Privacy Policy details our practices concerning the collection, storage, and handling of information submitted through our direct enquiry desks and consultation booking workflows.
            </p>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">1. Information We Collect</h3>
              <p>
                When you initiate an enquiry or schedule a consultation with our senior project coordinators, we collect details necessary to fulfill your request. This includes:
              </p>
              <ul className="list-disc list-inside pl-4 space-y-1.5 text-xs text-slate-300">
                <li>Your Full Name</li>
                <li>Email Address</li>
                <li>Phone Number (optional)</li>
                <li>Your specific property requirements, construction queries, or materials procurement preferences</li>
                <li>Your chosen appointment date and time slots</li>
              </ul>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">2. How We Use Your Data</h3>
              <p>
                The information you provide is utilized strictly for executing your building construction projects, land sales title verifications, or materials supply deliveries. Specifically, we use your data to:
              </p>
              <ul className="list-disc list-inside pl-4 space-y-1.5 text-xs text-slate-300">
                <li>Coordinate and confirm individual appointment slots.</li>
                <li>Prepare accurate budget estimations and feasibility quotes.</li>
                <li>Communicate regarding layout registries, structural steel deliveries, or red clay brick fleets.</li>
                <li>Address customer support tickets and legal compliance requests.</li>
              </ul>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">3. Sharing & Disclosing Information</h3>
              <p>
                We do not sell, trade, or distribute your personally identifiable information to external third parties. All communications are kept strictly confidential inside DHAYA TRADERS. Data is only shared with authorized logistics managers or panel lawyers explicitly to process your registry deed or schedule material truck shipments.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">4. Data Security</h3>
              <p>
                We execute standard electronic and administrative safeguards to keep your communications secure. All submissions through our site are stored within protected environments to guard against unauthorized access, loss, or manipulation.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">5. Contact Information</h3>
              <p>
                If you have questions regarding this policy, or wish to update or erase your recorded data details, contact us directly at:
              </p>
              <p className="text-xs text-slate-300 bg-white/5 border border-white/10 p-4 rounded-xl mt-2">
                <strong>DHAYA TRADERS Office</strong><br />
                Dhaya Plaza, Perundurai Road Junction,<br />
                Erode, Tamil Nadu, 638011<br />
                Email: <a href="mailto:trade@dhayatraders.com" className="text-teal hover:underline">trade@dhayatraders.com</a>
              </p>
            </div>
          </div>

        </div>
      </section>
    </PageTransition>
  );
}
