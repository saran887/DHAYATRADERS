import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, User, Mail, CheckCircle2 } from 'lucide-react';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    propertyType: 'Land',
    consultationType: 'Physical Consultation',
    date: '',
    time: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

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
          propertyType: 'Land',
          consultationType: 'Physical Consultation',
          date: '',
          time: '',
          message: ''
        });
      }, 4000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
          role="dialog"
          aria-modal="true"
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
                Dear <span className="font-semibold text-white">{formData.name}</span>, your consultation request regarding <span className="font-semibold text-white">{formData.propertyType}</span> ({formData.consultationType}) has been received successfully.
              </p>
              <p className="text-[10px] text-slate-400 pt-2 block">
                A senior coordinator will contact you shortly via email at {formData.email} to schedule your session.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Modal Title */}
            <div>
              <span className="text-[10px] text-teal uppercase tracking-widest font-extrabold block flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Professional Consultation Request
              </span>
              <h3 className="font-serif text-xl md:text-3xl font-bold leading-tight mt-1">Book Consultation</h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed mt-1">
                Align with senior partners for your property, building construction, or materials requirement. Fill out this brief form to proceed.
              </p>
            </div>

            {/* Scheduling Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1">
                  <User className="h-3 w-3 text-teal" /> Full Name *
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

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1">
                  <Mail className="h-3 w-3 text-teal" /> Email Address *
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1">
                    Property Type *
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full text-xs font-sans px-4 py-3 bg-white/10 border border-white/20 focus:border-teal focus:outline-none rounded-lg text-white font-medium cursor-pointer"
                  >
                    <option value="Land" className="bg-[#0d2136] text-white">Land</option>
                    <option value="House" className="bg-[#0d2136] text-white">House</option>
                    <option value="Villa" className="bg-[#0d2136] text-white">Villa</option>
                    <option value="Commercial" className="bg-[#0d2136] text-white">Commercial</option>
                    <option value="Materials" className="bg-[#0d2136] text-white">Materials</option>
                    <option value="General Consultation" className="bg-[#0d2136] text-white">General Consultation</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1">
                    Consultation Type *
                  </label>
                  <select
                    name="consultationType"
                    value={formData.consultationType}
                    onChange={handleChange}
                    className="w-full text-xs font-sans px-4 py-3 bg-white/10 border border-white/20 focus:border-teal focus:outline-none rounded-lg text-white font-medium cursor-pointer"
                  >
                    <option value="Physical Consultation" className="bg-[#0d2136] text-white">Physical Consultation</option>
                    <option value="Online Consultation" className="bg-[#0d2136] text-white">Online Consultation</option>
                    <option value="Property Discussion" className="bg-[#0d2136] text-white">Property Discussion</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DatePicker
                  value={formData.date}
                  onChange={(d) => setFormData(prev => ({ ...prev, date: d }))}
                  label="Date"
                  required
                  dark
                />
                <TimePicker
                  value={formData.time}
                  onChange={(t) => setFormData(prev => ({ ...prev, time: t }))}
                  label="Time"
                  required
                  dark
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-slate-300 font-bold">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={3}
                  placeholder="Specify details about your requirement..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full text-xs font-sans px-4 py-3 bg-white/10 border border-white/20 focus:border-teal focus:outline-none rounded-lg text-white placeholder:text-slate-500 resize-none transition-colors"
                />
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
                  {submitting ? 'Registering...' : 'Book Consultation'}
                </button>
              </div>

            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
