import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'House Construction',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'House Construction',
          message: ''
        });
      }, 4000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-14 bg-gradient-to-b from-white to-gray-light relative">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-gray-light to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 relative z-10">

        {/* Title Unit */}
        <div className="text-center md:max-w-3xl md:mx-auto space-y-4 mb-8">
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-steel font-extrabold block">CONNECTED WORLDWIDE</span>
          <h2 className="font-serif text-3xl md:text-5xl text-navy tracking-tight font-medium">
            Initiate Consultation
          </h2>
          <div className="w-16 h-1 bg-steel mx-auto rounded-full" />
          <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
            Connect directly with our master builders and metal traders. Fill out the direct project docket below or wire our direct helpline to authorize your strategic project planning.
          </p>
        </div>

        {/* Dual Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">

          {/* CONTACT INFO CARD & MAP MARKER */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-navy-deep text-white rounded-2xl shadow-2xl border border-teal/25 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6">
              <div>
                <span className="text-[10px] text-teal uppercase tracking-widest font-extrabold block">HEAD OFFICE COORDINATES</span>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">Dhaya Plaza Holdings</h4>
                <p className="text-xs text-slate-400 font-sans mt-0.5">Dual-Registered Construction and Sourcing Logistics Hub</p>
              </div>

              {/* Direct Coordinate Links */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex gap-4 items-start">
                  <div className="h-10 w-10 shrink-0 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-teal">
                    <MapPin className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">HQ Office Address</p>
                    <p className="text-xs text-slate-200 mt-0.5 font-sans leading-relaxed">
                      Suite 92A, Tower B, Meridian Central Square, Commercial Terminal 2, Global Trade District
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="h-10 w-10 shrink-0 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-teal">
                    <Phone className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Trading Helpline</p>
                    <a href="tel:+18005553429" className="text-xs text-slate-200 hover:text-teal transition-colors block mt-0.5 font-sans">
                      +1 (800) DHAYA-TRADE
                    </a>
                    <a href="tel:+1555983429" className="text-xs text-slate-400 hover:text-teal transition-colors block leading-none font-sans">
                      Direct: +1 (555) 983-4292
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="h-10 w-10 shrink-0 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-teal">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Secure Email Channels</p>
                    <a href="mailto:trade@dhayatraders.com" className="text-xs text-slate-200 hover:text-teal transition-colors block mt-0.5 font-sans">
                      trade@dhayatraders.com
                    </a>
                    <a href="mailto:build@dhayatraders.com" className="text-xs text-slate-400 hover:text-teal transition-colors block leading-none font-sans">
                      build@dhayatraders.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="h-10 w-10 shrink-0 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-teal">
                    <Clock className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Operation Timelines</p>
                    <p className="text-xs text-slate-200 mt-0.5 font-sans leading-none">
                      Monday - Friday: 08:00 - 18:00 (UTC+5)
                    </p>
                    <p className="text-[10px] text-slate-400 leading-none mt-1">24 Hour Sourcing Dispatch Monitoring</p>
                  </div>
                </div>
              </div>
            </div>

            {/* LUXURIOUS MAP PLACEHOLDER BLOCK */}
            <div className="rounded-xl overflow-hidden min-h-36 relative border border-white/10 group cursor-pointer bg-slate-800">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600"
                alt="Dhaya HQ Blueprint Map Frame"
                className="w-full h-full object-cover opacity-60 group-hover:scale-103 transition-transform duration-700"
                loading="lazy"
                width={400}
                height={300}
              />
              <div className="absolute inset-0 bg-[#0D2136]/60 p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[8px] bg-teal text-white font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                    HQ Coordinates
                  </span>
                  <span className="text-[9px] text-slate-300 font-mono">23.2921° N, 72.8291° E</span>
                </div>

                <div className="flex gap-2.5 items-center">
                  <div className="h-8 w-8 rounded bg-teal/20 border border-teal flex items-center justify-center text-teal shrink-0 animate-bounce">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white tracking-wide uppercase leading-none">Dhaya Plaza Tower</p>
                    <p className="text-[9px] text-slate-300 font-sans mt-0.5">Click for Global Satellite Navigation</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* CLIENT INQUIRY FORM PANEL */}
          <div className="lg:col-span-7 glass-card rounded-2xl shadow-premium border border-silver p-8 flex flex-col justify-between bg-white">
            <div className="space-y-4 mb-6">
              <h4 className="font-serif text-lg sm:text-2xl font-bold text-navy leading-none">Docket Project Feasibility</h4>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                Connect directly with our planning partners. Form submissions update directly to our active trade registry for immediate auditing.
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-16 text-center space-y-4 flex-grow flex flex-col justify-center items-center">
                <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-400 rounded-full flex items-center justify-center text-emerald-500 shadow animate-pulse">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <div>
                  <h5 className="font-serif text-xl font-bold text-navy">Docket Authorized!</h5>
                  <p className="text-xs text-slate-500 font-sans max-w-sm mx-auto mt-1">
                    Your feasibility inquiry is registry confirmed. A planning agent from our Meridian Square offices will reach your telephone connection shortly.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 flex-grow flex flex-col justify-between">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Direct Client Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Dr. Arthur Pendelton"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full text-xs font-sans px-4 py-3 bg-silver/45 border border-silver focus:border-steel focus:outline-none rounded-lg text-navy placeholder:text-slate-400 font-medium transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Secure Contact Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +1 (555) 793-2941"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full text-xs font-sans px-4 py-3 bg-silver/45 border border-silver focus:border-steel focus:outline-none rounded-lg text-navy placeholder:text-slate-400 font-medium transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Authorized Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. governance@sterlingholdings.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full text-xs font-sans px-4 py-3 bg-silver/45 border border-silver focus:border-steel focus:outline-none rounded-lg text-navy placeholder:text-slate-400 font-medium transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Operational Scope</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full text-xs font-sans px-4 py-3 bg-silver/45 border border-silver focus:border-steel focus:outline-none rounded-lg text-navy font-medium transition-colors cursor-pointer"
                    >
                      <option value="House Construction">House Construction</option>
                      <option value="Land Sales">Land Sales &amp; Layouts</option>
                      <option value="Ready-Made House">Ready-Made Duplex/Villa</option>
                      <option value="Materials Supply">Bulk Materials Trading</option>
                      <option value="Construction Consultation">Feasibility Consulting</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Consultation Feasibility Vibe</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Provide details of your plot requirement, required raw materials specs, or expected construction timelines..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full text-xs font-sans px-4 py-3 bg-silver/45 border border-silver focus:border-steel focus:outline-none rounded-lg text-navy placeholder:text-slate-400 font-medium transition-colors resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-silver">
                  <p className="text-[10px] text-slate-400 font-sans text-center sm:text-left">
                    By submitting, you agree to dispatch our double-verified dockets.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-steel hover:bg-navy text-white font-sans text-xs uppercase tracking-widest font-extrabold py-3.5 px-8 rounded-lg shadow hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    <span>{isSubmitting ? 'Authorizing...' : 'Docket Feasibility'}</span>
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
