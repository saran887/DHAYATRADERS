import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, MessageCircle } from 'lucide-react';

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
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-steel font-extrabold block">CONTACT US</span>
          <h2 className="font-serif text-3xl md:text-5xl text-navy tracking-tight font-medium">
            Get In Touch
          </h2>
          <div className="w-16 h-1 bg-steel mx-auto rounded-full" />
          <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
            Have a project in mind or need premium building materials? Send us a message or call our team today for a free consultation and estimate.
          </p>
        </div>

        {/* Dual Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* CLIENT INQUIRY FORM PANEL - LEFT LARGE */}
          <div className="lg:col-span-8 bg-white rounded-3xl shadow-2xl border-2 border-[#2E6B9E]/30 p-8 sm:p-10 flex flex-col justify-between transition-all hover:border-[#2E6B9E]/50">
            <div className="space-y-3 mb-6 border-b border-silver pb-4 text-left">
              <span className="text-[9px] uppercase tracking-widest text-[#2E6B9E] font-extrabold px-2 py-1 bg-[#2E6B9E]/10 rounded inline-block">Direct Inquiry Desk</span>
              <h4 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1B3A5C] leading-tight mt-1">Start Your Build Journey</h4>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                Select your service, fill in your coordinates, and get a professional response from our coordinator within 24 hours.
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-16 text-center space-y-4 flex-grow flex flex-col justify-center items-center">
                <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-400 rounded-full flex items-center justify-center text-emerald-500 shadow animate-pulse">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <div>
                  <h5 className="font-serif text-xl font-bold text-navy">Inquiry Received Successfully!</h5>
                  <p className="text-xs text-slate-500 font-sans max-w-sm mx-auto mt-1">
                    Thank you for reaching out. One of our project managers will contact you shortly on your provided phone number.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5 flex-grow flex flex-col justify-between">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-navy font-bold">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full text-xs font-sans px-4 py-3 bg-slate-50 border border-silver focus:border-steel focus:ring-1 focus:ring-steel focus:outline-none rounded-lg text-navy placeholder:text-slate-400 font-medium transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-navy font-bold">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +91 98450 12345"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full text-xs font-sans px-4 py-3 bg-slate-50 border border-silver focus:border-steel focus:ring-1 focus:ring-steel focus:outline-none rounded-lg text-navy placeholder:text-slate-400 font-medium transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-navy font-bold">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. rajesh@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full text-xs font-sans px-4 py-3 bg-slate-50 border border-silver focus:border-steel focus:ring-1 focus:ring-steel focus:outline-none rounded-lg text-navy placeholder:text-slate-400 font-medium transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-navy font-bold">Service Required</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full text-xs font-sans px-4 py-3 bg-slate-50 border border-silver focus:border-steel focus:outline-none rounded-lg text-navy font-medium transition-colors cursor-pointer"
                    >
                      <option value="House Construction">House Construction</option>
                      <option value="Land Sales">Land Sales &amp; Plots</option>
                      <option value="Ready-Made House">Ready-Made House / Villa</option>
                      <option value="Materials Supply">Building Materials (Steel, Bricks, Sand)</option>
                      <option value="Construction Consultation">Free Consultation</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-navy font-bold">Message / Requirements</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Provide details about your project size, location, required building materials, or preferred schedule..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full text-xs font-sans px-4 py-3 bg-slate-50 border border-silver focus:border-steel focus:ring-1 focus:ring-steel focus:outline-none rounded-lg text-navy placeholder:text-slate-400 font-medium transition-colors resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-silver space-y-4">
                  <p className="text-xs text-[#2E6B9E] font-sans font-bold text-center sm:text-right">
                    ⚡ Our team will contact you within 24 hours
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[10px] text-slate-400 font-sans text-center sm:text-left">
                      By submitting, you agree to our team contacting you via call or WhatsApp.
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-[#2E6B9E] hover:bg-[#1B3A5C] text-white font-sans text-xs uppercase tracking-widest font-extrabold py-4 px-8 rounded-lg shadow-lg hover:shadow-[#2E6B9E]/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" />
                      <span>{isSubmitting ? 'Sending...' : 'Submit Inquiry'}</span>
                    </button>
                  </div>

                  {/* Trust Indicators below button */}
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-silver/50 text-[9px] uppercase tracking-wider text-slate-500 font-extrabold text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="text-teal text-[11px]">✓</span> Trusted Service
                    </div>
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="text-teal text-[11px]">✓</span> Verified Support
                    </div>
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="text-teal text-[11px]">✓</span> Professional Consultation
                    </div>
                  </div>
                </div>

              </form>
            )}

          </div>

          {/* CONTACT INFO & SMALL MAP - RIGHT SMALL */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6 bg-navy-deep text-white rounded-2xl shadow-xl border border-teal/20 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6">
              <div>
                <span className="text-[9px] text-teal uppercase tracking-widest font-bold block">OFFICE HEADQUARTERS</span>
                <h4 className="font-serif text-lg font-bold text-white">DHAYATRADERS Office</h4>
                <p className="text-[11px] text-slate-400 font-sans mt-0.5">Builders &amp; Sourcing Logistics Hub</p>
              </div>

              {/* Direct Coordinate Links */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex gap-3.5 items-start">
                  <div className="h-9 w-9 shrink-0 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-teal">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Office Address</p>
                    <p className="text-[11px] text-slate-200 mt-0.5 font-sans leading-relaxed">
                      Dhaya Plaza, Perundurai Road Junction, Erode, Tamil Nadu, 638011
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="h-9 w-9 shrink-0 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-teal">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Helpline</p>
                    <a href="tel:+918005553429" className="text-[11px] text-slate-200 hover:text-teal transition-colors block mt-0.5 font-sans">
                      +91 800 555 3429
                    </a>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="h-9 w-9 shrink-0 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-teal">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Email Channels</p>
                    <a href="mailto:trade@dhayatraders.com" className="text-[11px] text-slate-200 hover:text-teal transition-colors block mt-0.5 font-sans">
                      trade@dhayatraders.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="space-y-2 pt-4 border-t border-white/10">
              <span className="text-[9px] text-teal uppercase tracking-widest font-bold block mb-1">Quick Contact Actions</span>
              <div className="grid grid-cols-1 gap-2">
                <a
                  href="https://wa.me/918005553429?text=Hello%20DHAYATRADERS,%20I%20am%20interested%20in%20a%20construction%20project/materials."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-2.5 px-4 rounded-lg text-xs font-bold transition-all shadow"
                >
                  <MessageCircle className="h-4 w-4 fill-white text-[#25D366]" />
                  <span>WhatsApp Chat</span>
                </a>
                <a
                  href="tel:+918005553429"
                  className="flex items-center justify-center gap-2 bg-steel hover:bg-navy text-white py-2.5 px-4 rounded-lg text-xs font-bold transition-all shadow"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call Now</span>
                </a>
                <a
                  href="mailto:trade@dhayatraders.com"
                  className="flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 text-slate-300 hover:text-white border border-white/20 py-2.5 px-4 rounded-lg text-xs font-bold transition-all"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email Team</span>
                </a>
              </div>
            </div>

            {/* SMALL MAP EMBED - INTERACTIVE GOOGLE MAP */}
            <div className="rounded-xl overflow-hidden h-36 relative border border-white/10 group bg-slate-800">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.9729864273!2d77.717208!3d11.341036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f4e1f721ab9%3A0x86e680d922fb68!2sErode%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1718183200000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DHAYATRADERS Erode Map Location"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
