import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, Clock, Sparkles, User, Mail, Phone, IndianRupee, CheckCircle2 } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    concept: 'House Construction',
    budget: '₹25 Lakhs - ₹1 Crore',
    date: '',
    time: '10:00'
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.date) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setFormData({
          name: '',
          email: '',
          phone: '',
          concept: 'House Construction',
          budget: '₹25 Lakhs - ₹1 Crore',
          date: '',
          time: '10:00'
        });
      }, 4500);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-navy-deep/80 backdrop-blur-md" 
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="glass-card-dark max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl border border-teal/25 text-white p-6 relative z-10"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-steel hover:bg-navy border border-white/10 rounded-full p-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Close scheduler"
        >
          <X className="h-5 w-5" />
        </button>

        {success ? (
          <div className="py-12 text-center space-y-6">
            <div className="h-20 w-20 bg-emerald-500/10 border border-emerald-400 rounded-full flex items-center justify-center text-emerald-400 mx-auto animate-pulse">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <div className="space-y-2">
              <h4 className="font-serif text-2xl font-bold">Consultation Confirmed!</h4>
              <p className="text-xs text-teal uppercase tracking-widest font-extrabold">Docket Ref: #DH-{(Math.floor(Math.random() * 90000) + 10000)}</p>
              <p className="text-xs text-slate-300 font-sans max-w-sm mx-auto leading-relaxed pt-2">
                Dear <span className="font-semibold text-white">{formData.name}</span>, your digital brief matching category <span className="font-semibold text-white">{formData.concept}</span> for <span className="font-semibold text-white">{formData.date}</span> at <span className="font-semibold text-white">{formData.time}</span> is officially processed.
              </p>
              <p className="text-[10px] text-slate-400 pt-2 block">
                A senior planning partner will contact your voice registry directly. Check secure invitations routed to {formData.email}.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Modal Title */}
            <div>
              <span className="text-[10px] text-teal uppercase tracking-widest font-extrabold block flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> SOVEREIGN PLANNING SCHEDULER
              </span>
              <h3 className="font-serif text-xl md:text-3xl font-bold leading-tight mt-1">Book Custom Consultation</h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed mt-1">
                Align with senior partners inside our Meridian plaza offices. Direct integration with calendar databases ensures slots reservation.
              </p>
            </div>

            {/* Scheduling Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1">
                  <User className="h-3 w-3 text-teal" /> Client Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Rajesh Kumar"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full text-xs font-sans px-4 py-3 bg-white/10 border border-white/20 focus:border-teal focus:outline-none rounded-lg text-white placeholder:text-slate-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1">
                    <Mail className="h-3 w-3 text-teal" /> Secure Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. rajesh@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full text-xs font-sans px-4 py-3 bg-white/10 border border-white/20 focus:border-teal focus:outline-none rounded-lg text-white placeholder:text-slate-500 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1">
                    <Phone className="h-3 w-3 text-teal" /> Mobile Helpline
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. +91 98450 12345"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full text-xs font-sans px-4 py-3 bg-white/10 border border-white/20 focus:border-teal focus:outline-none rounded-lg text-white placeholder:text-slate-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1">
                    Concept Scope
                  </label>
                  <select
                    name="concept"
                    value={formData.concept}
                    onChange={handleChange}
                    className="w-full text-xs font-sans px-4 py-3 bg-white/10 border border-white/20 focus:border-teal focus:outline-none rounded-lg text-white font-medium cursor-pointer"
                  >
                    <option value="House Construction" className="bg-navy-deep text-white">House Construction</option>
                    <option value="Land Sales" className="bg-navy-deep text-white">Land Acquisition</option>
                    <option value="Ready-Made House" className="bg-navy-deep text-white">Ready-Made Duplex</option>
                    <option value="Materials Supply" className="bg-navy-deep text-white">Materials Sourcing</option>
                    <option value="Consultation" className="bg-navy-deep text-white">Feasibility consulting</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1">
                    <IndianRupee className="h-3 w-3 text-teal" /> Estimated Budget
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full text-xs font-sans px-4 py-3 bg-white/10 border border-white/20 focus:border-teal focus:outline-none rounded-lg text-white font-medium cursor-pointer"
                  >
                    <option value="Under ₹25 Lakhs" className="bg-navy-deep text-white">Under ₹25 Lakhs</option>
                    <option value="₹25 Lakhs - ₹1 Crore" className="bg-navy-deep text-white">₹25 Lakhs - ₹1 Crore</option>
                    <option value="Over ₹1 Crore" className="bg-navy-deep text-white">Over ₹1 Crore</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-teal" /> Select Date Target
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full text-xs font-sans px-4 py-3 bg-white/10 border border-white/20 focus:border-teal focus:outline-none rounded-lg text-white cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1">
                    <Clock className="h-3 w-3 text-teal" /> Select Time Slot
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full text-xs font-sans px-4 py-3 bg-white/10 border border-white/20 focus:border-teal focus:outline-none rounded-lg text-white font-medium cursor-pointer"
                  >
                    <option value="09:00" className="bg-navy-deep text-white">09:00 AM</option>
                    <option value="11:00" className="bg-navy-deep text-white">11:00 AM</option>
                    <option value="13:00" className="bg-navy-deep text-white">01:00 PM</option>
                    <option value="15:00" className="bg-navy-deep text-white">03:00 PM</option>
                    <option value="17:00" className="bg-navy-deep text-white">05:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 text-center bg-white/10 hover:bg-white/15 text-slate-300 font-sans text-xs uppercase tracking-widest font-bold py-3.5 rounded-lg border border-white/10 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-1/2 text-center bg-teal hover:bg-white text-navy-deep font-sans text-xs uppercase tracking-widest font-extrabold py-3.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Registering...' : 'Reserve Slot'}
                </button>
              </div>

            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
