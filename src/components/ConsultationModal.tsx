import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, User, Mail, CheckCircle2 } from 'lucide-react';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import CustomDropdown from './CustomDropdown';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  // Lock body & html scroll when consultation modal is open
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'Land',
    consultationType: 'Physical Consultation',
    date: '',
    time: '',
    message: ''
  });

  const [availableSlots, setAvailableSlots] = useState<{ label: string; value: string }[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotError, setSlotError] = useState('');
  const [bookingDetails, setBookingDetails] = useState<{ bookingId?: string; meetLink?: string }>({});

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbw4kRYqwuXp3-3zAEw-TY95eOPqusmARznNPiXceqiS-74iIHr7G2EsFwjASmkHj7LJ/exec';

  const fetchAvailability = async (selectedDate: string) => {
    if (!selectedDate) {
      setAvailableSlots([]);
      setSlotError('');
      return;
    }

    const dateObj = new Date(selectedDate + 'T00:00:00');
    if (dateObj.getDay() === 0) {
      setAvailableSlots([]);
      setSlotError('Sundays are closed for consultations. Please select a Monday–Saturday date.');
      return;
    }

    setLoadingSlots(true);
    setSlotError('');
    setAvailableSlots([]);

    try {
      const url = `${GOOGLE_SCRIPT_URL}?action=availability&date=${encodeURIComponent(selectedDate)}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);

      const data = await response.json();
      if (data && data.success === true && Array.isArray(data.slots)) {
        setAvailableSlots(data.slots);
        if (data.slots.length === 0) {
          setSlotError('No available time slots for this date.');
        }
      } else {
        throw new Error(data?.message || 'Failed to load time slots');
      }
    } catch (err) {
      console.error('Error loading available times:', err);
      setSlotError('Unable to load available times. Please try again.');
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleDateChange = (newDate: string) => {
    setFormData((prev) => ({
      ...prev,
      date: newDate,
      time: '' // Clear time when date changes
    }));
    if (errors.date) setErrors((prev) => ({ ...prev, date: '' }));
    if (errors.time) setErrors((prev) => ({ ...prev, time: '' }));

    fetchAvailability(newDate);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone.trim()) {
      const phoneRegex = /^[\d\s+\-()]{7,15}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date for consultation';
    } else {
      const dateObj = new Date(formData.date + 'T00:00:00');
      if (dateObj.getDay() === 0) {
        newErrors.date = 'Sundays are closed for consultations';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Please select an available time slot';
    } else if (slotError && availableSlots.length === 0) {
      newErrors.time = slotError;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Requirement message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message details must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          propertyType: formData.propertyType,
          consultationType: formData.consultationType,
          preferredDate: formData.date,
          preferredTime: formData.time,
          message: formData.message
        })
      });

      const result = await response.json();

      if (result && (result.code === 'SLOT_BOOKED' || result.error === 'SLOT_BOOKED')) {
        setSubmitting(false);
        setFormData((prev) => ({ ...prev, time: '' }));
        setErrors((prev) => ({
          ...prev,
          time: 'This time slot was just booked. Please select another available time.'
        }));
        if (formData.date) {
          fetchAvailability(formData.date);
        }
        return;
      }

      if (result && (result.success === true || result.result === 'success' || result.status === 'success')) {
        setSubmitting(false);
        setSuccess(true);
        setBookingDetails({
          bookingId: result.bookingId,
          meetLink: result.meetLink
        });
        setErrors({});
        setTimeout(() => {
          setSuccess(false);
          setBookingDetails({});
          setAvailableSlots([]);
          setSlotError('');
          onClose();
          setFormData({
            name: '',
            email: '',
            phone: '',
            propertyType: 'Land',
            consultationType: 'Physical Consultation',
            date: '',
            time: '',
            message: ''
          });
        }, 4000);
      } else {
        throw new Error(result?.message || result?.error || 'Failed to submit consultation booking');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitting(false);
      setErrors((prev) => ({
        ...prev,
        submit: 'Failed to book consultation. Please check your connection and try again.'
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overscroll-contain overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-navy-deep/80 backdrop-blur-md touch-none" 
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="glass-card-dark max-w-lg w-full rounded-2xl shadow-2xl border border-teal/25 text-white p-4 sm:p-6 relative z-10 my-auto max-h-[85vh] overflow-y-auto font-sans touch-pan-y"
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
            <div className="space-y-2 font-sans">
              <h4 className="font-serif text-2xl font-bold">Consultation Confirmed!</h4>
              {bookingDetails.bookingId && (
                <p className="text-xs text-teal uppercase tracking-widest font-extrabold">Docket Ref: #{bookingDetails.bookingId}</p>
              )}
              <p className="text-xs text-slate-300 font-sans max-w-sm mx-auto leading-relaxed pt-2">
                Dear <span className="font-semibold text-white">{formData.name}</span>, your consultation request regarding <span className="font-semibold text-white">{formData.propertyType}</span> ({formData.consultationType}) has been received successfully.
              </p>
              {bookingDetails.meetLink && (
                <div className="pt-3">
                  <a
                    href={bookingDetails.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal text-navy-deep font-sans text-xs font-bold rounded-lg shadow hover:bg-white transition-colors"
                  >
                    <span>📹 Join Google Meet Consultation</span>
                  </a>
                </div>
              )}
              <p className="text-[10px] text-slate-400 pt-2 block">
                A senior coordinator will contact you shortly via email at {formData.email} to confirm your session.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
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
            <form onSubmit={handleSubmit} noValidate className="space-y-3 sm:space-y-4">
              
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1">
                  <User className="h-3 w-3 text-teal" /> Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Rajesh Kumar"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full text-sm sm:text-xs font-sans px-3.5 py-2.5 sm:px-4 sm:py-3 border focus:outline-none rounded-lg text-white transition-colors ${
                    errors.name
                      ? 'bg-rose-500/10 border-rose-400 ring-1 ring-rose-400 placeholder:text-rose-300'
                      : 'bg-white/10 border-white/20 focus:border-teal placeholder:text-slate-500'
                  }`}
                />
                {errors.name && (
                  <p className="text-[11px] text-rose-400 font-sans font-medium mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.name}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1">
                    <Mail className="h-3 w-3 text-teal" /> Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. rajesh@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full text-sm sm:text-xs font-sans px-3.5 py-2.5 sm:px-4 sm:py-3 border focus:outline-none rounded-lg text-white transition-colors ${
                      errors.email
                        ? 'bg-rose-500/10 border-rose-400 ring-1 ring-rose-400 placeholder:text-rose-300'
                        : 'bg-white/10 border-white/20 focus:border-teal placeholder:text-slate-500'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-400 font-sans font-medium mt-1 flex items-center gap-1">
                      <span>⚠️</span> {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="e.g. +91 98450 12345"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full text-sm sm:text-xs font-sans px-3.5 py-2.5 sm:px-4 sm:py-3 border focus:outline-none rounded-lg text-white transition-colors ${
                      errors.phone
                        ? 'bg-rose-500/10 border-rose-400 ring-1 ring-rose-400 placeholder:text-rose-300'
                        : 'bg-white/10 border-white/20 focus:border-teal placeholder:text-slate-500'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-rose-400 font-sans font-medium mt-1 flex items-center gap-1">
                      <span>⚠️</span> {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1 z-20">
                  <label className="text-[10px] uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1">
                    Property Type *
                  </label>
                  <CustomDropdown
                    name="propertyType"
                    options={[
                      { value: 'Land', label: 'Land' },
                      { value: 'House', label: 'House' },
                      { value: 'Villa', label: 'Villa' },
                      { value: 'Commercial', label: 'Commercial' },
                      { value: 'Materials', label: 'Materials' },
                      { value: 'General Consultation', label: 'General Consultation' }
                    ]}
                    value={formData.propertyType}
                    onChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))}
                    buttonClassName="bg-white/10 border border-white/20 text-white font-medium py-3 backdrop-blur-sm focus:border-teal"
                    dropdownClassName="bg-[#0d2136] border border-white/20 shadow-premium"
                    optionClassName="text-slate-300 hover:bg-white/10"
                    activeOptionClassName="bg-teal/20 font-bold text-teal"
                  />
                </div>

                <div className="space-y-1 z-20">
                  <label className="text-[10px] uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1">
                    Consultation Type *
                  </label>
                  <CustomDropdown
                    name="consultationType"
                    options={[
                      { value: 'Physical Consultation', label: 'Physical Consultation' },
                      { value: 'Online Consultation', label: 'Online Consultation' },
                      { value: 'Property Discussion', label: 'Property Discussion' }
                    ]}
                    value={formData.consultationType}
                    onChange={(value) => setFormData(prev => ({ ...prev, consultationType: value }))}
                    buttonClassName="bg-white/10 border border-white/20 text-white font-medium py-3 backdrop-blur-sm focus:border-teal"
                    dropdownClassName="bg-[#0d2136] border border-white/20 shadow-premium"
                    optionClassName="text-slate-300 hover:bg-white/10"
                    activeOptionClassName="bg-teal/20 font-bold text-teal"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <DatePicker
                    value={formData.date}
                    onChange={handleDateChange}
                    label="Date"
                    required
                    error={errors.date}
                    dark
                  />
                  <TimePicker
                    value={formData.time}
                    onChange={(t) => {
                      setFormData(prev => ({ ...prev, time: t }));
                      if (errors.time) setErrors(prev => ({ ...prev, time: '' }));
                    }}
                    label="Time"
                    required
                    error={errors.time || (slotError && !loadingSlots ? slotError : undefined)}
                    slots={availableSlots}
                    loading={loadingSlots}
                    disabled={!formData.date}
                    emptyMessage={slotError || 'No available time slots for this date.'}
                    dark
                  />
                </div>
                <p className="text-[10px] text-teal font-sans font-semibold">
                  ⚡ Note: Each slot is reserved for a single person (Individual Consultation) to guarantee focused attention.
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-slate-300 font-bold">
                  Message *
                </label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Specify details about your requirement..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full text-sm sm:text-xs font-sans px-3.5 py-2.5 sm:px-4 sm:py-3 border focus:outline-none rounded-lg text-white resize-none transition-colors ${
                    errors.message
                      ? 'bg-rose-500/10 border-rose-400 ring-1 ring-rose-400 placeholder:text-rose-300'
                      : 'bg-white/10 border-white/20 focus:border-teal placeholder:text-slate-500'
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] text-rose-400 font-sans font-medium mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.message}
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-2 sm:pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 text-center bg-white/10 hover:bg-white/15 text-slate-300 font-sans text-xs uppercase tracking-widest font-bold py-3 sm:py-3.5 rounded-lg border border-white/10 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-1/2 text-center bg-teal hover:bg-white text-navy-deep font-sans text-xs uppercase tracking-widest font-extrabold py-3 sm:py-3.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
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
