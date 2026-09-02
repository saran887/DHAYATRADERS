import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import CustomSelect from './CustomSelect';

export default function ContactSection() {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

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
      console.log(`[fetchAvailability] Fetching: ${url}`);

      const response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errBody = await response.text();
        console.error(`[fetchAvailability] HTTP error ${response.status}:`, errBody);
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      console.log('[fetchAvailability] Received response data:', data);

      if (data.date && data.date !== selectedDate) {
        console.warn(`[fetchAvailability] Date mismatch: requested ${selectedDate}, received ${data.date}`);
      }

      const rawSlots = data.availableSlots || data.slots;

      if (data && (data.success === true || Array.isArray(rawSlots)) && Array.isArray(rawSlots)) {
        const normalizedSlots: { label: string; value: string }[] = rawSlots.map((slotItem: any) => {
          if (typeof slotItem === 'object' && slotItem !== null && slotItem.label && slotItem.value) {
            return slotItem;
          }
          if (typeof slotItem === 'string') {
            if (slotItem.includes('T')) {
              const d = new Date(slotItem);
              if (!isNaN(d.getTime())) {
                const h = d.getHours();
                const m = d.getMinutes();
                const hh = String(h).padStart(2, '0');
                const mm = String(m).padStart(2, '0');
                const hour12 = h % 12 || 12;
                const ampm = h >= 12 ? 'PM' : 'AM';
                return {
                  label: `${String(hour12).padStart(2, '0')}:${mm} ${ampm}`,
                  value: `${hh}:${mm}`
                };
              }
            }
            const parts = slotItem.split(':');
            if (parts.length >= 2) {
              const h = parseInt(parts[0], 10);
              const m = parseInt(parts[1], 10);
              if (!isNaN(h) && !isNaN(m)) {
                const hh = String(h).padStart(2, '0');
                const mm = String(m).padStart(2, '0');
                const hour12 = h % 12 || 12;
                const ampm = h >= 12 ? 'PM' : 'AM';
                return {
                  label: `${String(hour12).padStart(2, '0')}:${mm} ${ampm}`,
                  value: `${hh}:${mm}`
                };
              }
            }
            return { label: slotItem, value: slotItem };
          }
          return { label: String(slotItem), value: String(slotItem) };
        });

        const todayObj = new Date();
        const todayStr = `${todayObj.getFullYear()}-${String(todayObj.getMonth() + 1).padStart(2, '0')}-${String(todayObj.getDate()).padStart(2, '0')}`;
        const currentHH = String(todayObj.getHours()).padStart(2, '0');
        const currentMM = String(todayObj.getMinutes()).padStart(2, '0');
        const currentTimeStr = `${currentHH}:${currentMM}`;

        let validSlots = normalizedSlots;
        if (selectedDate === todayStr) {
          validSlots = normalizedSlots.filter((s) => s.value > currentTimeStr);
        }

        setAvailableSlots(validSlots);
        if (validSlots.length === 0) {
          setSlotError(selectedDate === todayStr ? 'No remaining slots available for today. Please select tomorrow or a future date.' : 'No available time slots for this date.');
        }
      } else {
        console.error('[fetchAvailability] Missing availableSlots or slots array in response:', data);
        throw new Error(data?.message || 'Failed to load time slots: invalid format');
      }
    } catch (err) {
      console.error('[fetchAvailability] Error loading available times:', err);
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
      newErrors.email = 'Please enter a valid email address (e.g. name@example.com)';
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
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Requirement details must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
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
        setIsSubmitting(false);
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
        setIsSubmitting(false);
        setIsSubmitted(true);
        setBookingDetails({
          bookingId: result.bookingId,
          meetLink: result.meetLink || result.meetUrl || result.googleMeetLink || ''
        });
        setErrors({});
        // Keep the confirmation visible so the customer has time to
        // read/click the Google Meet button on mobile.
        // The form can be reset with the button below.
      } else {
        throw new Error(result?.message || result?.error || 'Failed to submit enquiry to server');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitting(false);
      setErrors((prev) => ({
        ...prev,
        submit: 'Failed to send enquiry. Please check your connection or try again.'
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="py-6 sm:py-8 md:py-14 bg-gradient-to-b from-white to-gray-light relative">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-gray-light to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-10 relative z-10">

        {/* Title Unit */}
        <div className="text-center md:max-w-3xl md:mx-auto space-y-4 mb-8">
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-steel font-extrabold block">ENQUIRY</span>
          <h2 className="font-serif text-3xl md:text-5xl text-navy tracking-tight font-medium">
            Let's Discuss Your Requirement
          </h2>
          <div className="w-16 h-1 bg-steel mx-auto rounded-full" />
          <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
            Have a project in mind or need premium building materials? Send us a message or call our team today for a free consultation and estimate.
          </p>
        </div>

        {/* Dual Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* CLIENT ENQUIRY FORM PANEL - RIGHT LARGE */}
          <div className="order-1 lg:order-2 lg:col-span-8 bg-white rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-[#2E6B9E]/30 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-between transition-all hover:border-[#2E6B9E]/50">
            <div className="space-y-3 mb-6 border-b border-silver pb-4 text-left">
              <span className="text-[9px] uppercase tracking-widest text-[#2E6B9E] font-extrabold px-2 py-1 bg-[#2E6B9E]/10 rounded inline-block">Direct Enquiry Desk</span>
              <h4 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1B3A5C] leading-tight mt-1">Enquiry Form</h4>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                Fill in your coordinates and requirements, and get a professional response from our coordinator within 24 hours.
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-10 sm:py-14 md:py-16 px-1 text-center space-y-4 flex-grow flex flex-col justify-center items-center font-sans">
                <div className="h-14 w-14 sm:h-16 sm:w-16 bg-emerald-500/10 border border-emerald-400 rounded-full flex items-center justify-center text-emerald-500 shadow animate-pulse">
                  <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
                <div className="space-y-1.5">
                  <h5 className="font-serif text-xl font-bold text-navy">Enquiry Received Successfully!</h5>
                  {bookingDetails.bookingId && (
                    <p className="text-xs text-[#2E6B9E] uppercase tracking-widest font-extrabold">
                      Booking Ref: #{bookingDetails.bookingId}
                    </p>
                  )}
                  <p className="text-xs text-slate-500 font-sans max-w-sm mx-auto mt-1 leading-relaxed">
                    Thank you for reaching out. One of our project managers will contact you shortly via email or phone callback.
                  </p>


                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setBookingDetails({});
                      setAvailableSlots([]);
                      setSlotError('');
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
                    }}
                    className="mt-4 text-xs font-bold text-[#2E6B9E] hover:text-[#1B3A5C] underline underline-offset-4"
                  >
                    Submit another enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} noValidate className="space-y-5 flex-grow flex flex-col justify-between">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-navy font-bold">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full text-xs font-sans px-4 py-3 border focus:outline-none rounded-lg text-navy font-medium transition-colors ${
                        errors.name
                          ? 'bg-rose-50/50 border-rose-500 ring-1 ring-rose-500 placeholder:text-rose-300'
                          : 'bg-slate-50 border-silver focus:border-steel focus:ring-1 focus:ring-steel placeholder:text-slate-400'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-rose-500 font-sans font-medium mt-1 flex items-center gap-1">
                        <span>⚠️</span> {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-navy font-bold">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. rajesh@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full text-xs font-sans px-4 py-3 border focus:outline-none rounded-lg text-navy font-medium transition-colors ${
                        errors.email
                          ? 'bg-rose-50/50 border-rose-500 ring-1 ring-rose-500 placeholder:text-rose-300'
                          : 'bg-slate-50 border-silver focus:border-steel focus:ring-1 focus:ring-steel placeholder:text-slate-400'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-500 font-sans font-medium mt-1 flex items-center gap-1">
                        <span>⚠️</span> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5 md:col-span-1">
                    <label className="text-[11px] uppercase tracking-wider text-navy font-bold">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="e.g. +91 98450 12345"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full text-xs font-sans px-4 py-3 border focus:outline-none rounded-lg text-navy font-medium transition-colors ${
                        errors.phone
                          ? 'bg-rose-50/50 border-rose-500 ring-1 ring-rose-500 placeholder:text-rose-300'
                          : 'bg-slate-50 border-silver focus:border-steel focus:ring-1 focus:ring-steel placeholder:text-slate-400'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-rose-500 font-sans font-medium mt-1 flex items-center gap-1">
                        <span>⚠️</span> {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5 sm:col-span-1">
                    <CustomSelect
                      label="Property Type"
                      required
                      value={formData.propertyType}
                      onChange={(val) => setFormData((prev) => ({ ...prev, propertyType: val }))}
                      options={['Land', 'House', 'Villa', 'Commercial', 'Materials', 'General Consultation']}
                      dark={false}
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-1">
                    <CustomSelect
                      label="Consultation Type"
                      required
                      value={formData.consultationType}
                      onChange={(val) => setFormData((prev) => ({ ...prev, consultationType: val }))}
                      options={['Physical Consultation', 'Online Consultation', 'Property Discussion']}
                      dark={false}
                    />
                  </div>
                </div>

                {/* Preferred Date & Time row */}
                <div className="space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DatePicker
                      value={formData.date}
                      onChange={handleDateChange}
                      label="Preferred Date"
                      error={errors.date}
                      dark={false}
                    />
                    <TimePicker
                      value={formData.time}
                      onChange={(t) => {
                        setFormData(prev => ({ ...prev, time: t }));
                        if (errors.time) setErrors(prev => ({ ...prev, time: '' }));
                      }}
                      selectedDate={formData.date}
                      label="Preferred Time"
                      error={errors.time || (slotError && !loadingSlots ? slotError : undefined)}
                      slots={availableSlots}
                      loading={loadingSlots}
                      disabled={!formData.date}
                      emptyMessage={slotError || 'No available time slots for this date.'}
                      dark={false}
                    />
                  </div>
                  <p className="text-[10px] text-steel font-sans font-semibold">
                    ⚡ Note: Each date &amp; time slot is reserved for a single person (Individual Consultation).
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-navy font-bold">Message / Requirements *</label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Provide details about your project size, location, required building materials, or preferred schedule..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full text-xs font-sans px-4 py-3 border focus:outline-none rounded-lg text-navy font-medium transition-colors resize-none ${
                      errors.message
                        ? 'bg-rose-50/50 border-rose-500 ring-1 ring-rose-500 placeholder:text-rose-300'
                        : 'bg-slate-50 border-silver focus:border-steel focus:ring-1 focus:ring-steel placeholder:text-slate-400'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-500 font-sans font-medium mt-1 flex items-center gap-1">
                      <span>⚠️</span> {errors.message}
                    </p>
                  )}
                </div>

                {errors.submit && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-600 font-sans font-medium flex items-center gap-2">
                    <span>⚠️</span>
                    <span>{errors.submit}</span>
                  </div>
                )}

                <div className="pt-4 border-t border-silver space-y-4">
                  <p className="text-xs text-[#2E6B9E] font-sans font-bold text-center sm:text-right">
                    ⚡ Our team will contact you within 24 hours
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <p className="text-[10px] text-slate-400 font-sans text-center sm:text-left">
                      By submitting, you agree to our team contacting you via email or callback.
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto min-h-12 bg-[#2E6B9E] hover:bg-[#1B3A5C] text-white font-sans text-xs uppercase tracking-widest font-extrabold py-4 px-8 rounded-lg shadow-lg hover:shadow-[#2E6B9E]/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" />
                      <span>{isSubmitting ? 'Sending...' : 'Submit Enquiry'}</span>
                    </button>
                  </div>

                  {/* Trust Indicators below button */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3 border-t border-silver/50 text-[9px] uppercase tracking-wider text-slate-500 font-extrabold text-center">
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

          {/* CONTACT INFO & SMALL MAP - LEFT SMALL */}
          <div className="order-2 lg:order-1 lg:col-span-4 flex flex-col justify-between space-y-6 bg-navy-deep text-white rounded-2xl shadow-xl border border-teal/20 p-4 sm:p-6 relative overflow-hidden">
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
                    <a
                      href="https://maps.app.goo.gl/zUyoruHg22jnVFGt7?g_st=aw"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-slate-200 hover:text-teal transition-colors mt-0.5 font-sans leading-relaxed block group"
                    >
                      Dhaya Plaza, Perundurai Road Junction, Erode, Tamil Nadu, 638011
                      <span className="text-[10px] text-teal block font-semibold underline mt-0.5">📍 Open in Google Maps</span>
                    </a>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="h-9 w-9 shrink-0 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-teal">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Helpline</p>
                    <a href={`tel:+${import.meta.env.VITE_WHATSAPP_NUMBER || '918005553429'}`} className="text-[11px] text-slate-200 hover:text-teal transition-colors block mt-0.5 font-sans">
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
                  href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '918005553429'}?text=Hello%20DHAYATRADERS,%20I%20am%20interested%20in%20a%20construction%20project/materials.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-2.5 px-4 rounded-lg text-xs font-bold transition-all shadow"
                >
                  <MessageCircle className="h-4 w-4 fill-white text-[#25D366]" />
                  <span>WhatsApp Chat</span>
                </a>
                <a
                  href={`tel:+${import.meta.env.VITE_WHATSAPP_NUMBER || '918005553429'}`}
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
            <div className="rounded-xl overflow-hidden relative border border-white/10 group bg-slate-800 flex flex-col">
              <div className="h-32 w-full relative">
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
              <a
                href="https://maps.app.goo.gl/zUyoruHg22jnVFGt7?g_st=aw"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#1B3A5C] hover:bg-teal text-white hover:text-navy text-[11px] font-bold py-2 text-center transition-colors flex items-center justify-center gap-1.5"
              >
                <MapPin className="h-3.5 w-3.5" />
                <span>Open Location in Google Maps</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
