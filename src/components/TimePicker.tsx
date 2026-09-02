import { useState, useRef, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimePickerProps {
  value: string; // HH:MM (24h)
  onChange: (time: string) => void;
  selectedDate?: string; // YYYY-MM-DD
  label?: string;
  required?: boolean;
  dark?: boolean;
  error?: string;
  slots?: { label: string; value: string }[];
  loading?: boolean;
  loadingMessage?: string;
  emptyMessage?: string;
  disabled?: boolean;
}

// Default business hours fallback if slots are not explicitly passed
const DEFAULT_TIME_SLOTS: { label: string; value: string }[] = [];
for (let h = 8; h <= 18; h++) {
  for (const m of [0, 30]) {
    if (h === 18 && m === 30) continue;
    const hh = String(h).padStart(2, '0');
    const mm = String(m).padStart(2, '0');
    const value = `${hh}:${mm}`;
    const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const label = `${String(hour12).padStart(2, '0')}:${mm} ${ampm}`;
    DEFAULT_TIME_SLOTS.push({ label, value });
  }
}

export default function TimePicker({
  value,
  onChange,
  selectedDate,
  label = 'Time',
  required,
  dark = false,
  error,
  slots,
  loading = false,
  loadingMessage = 'Checking available times...',
  emptyMessage = 'No available time slots for this date.',
  disabled = false
}: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const todayObj = new Date();
  const todayStr = `${todayObj.getFullYear()}-${String(todayObj.getMonth() + 1).padStart(2, '0')}-${String(todayObj.getDate()).padStart(2, '0')}`;
  const currentHH = String(todayObj.getHours()).padStart(2, '0');
  const currentMM = String(todayObj.getMinutes()).padStart(2, '0');
  const currentTimeStr = `${currentHH}:${currentMM}`;

  const rawSlots = slots !== undefined ? slots : DEFAULT_TIME_SLOTS;

  // Filter out past time slots if selected date is today
  const activeSlots = rawSlots.filter((slot) => {
    if (selectedDate === todayStr) {
      return slot.value > currentTimeStr;
    }
    return true;
  });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Scroll selected item into view when dropdown opens
  useEffect(() => {
    if (open && value && listRef.current) {
      const selected = listRef.current.querySelector('[data-selected="true"]') as HTMLElement;
      if (selected) selected.scrollIntoView({ block: 'center' });
    }
  }, [open, value]);

  const displayValue = value
    ? (() => {
        const slot = activeSlots.find(s => s.value === value);
        return slot ? slot.label : value;
      })()
    : '';

  // Theme tokens
  const bg = dark
    ? 'bg-white/10 border-white/20 text-white'
    : 'bg-slate-50 border-silver text-navy';
  const popupBg = dark ? 'bg-[#0D2136] border-teal/30' : 'bg-white border-steel/30';
  const headerText = dark ? 'text-teal' : 'text-steel';
  const slotBase = dark
    ? 'text-slate-200 hover:bg-teal/20 hover:text-teal cursor-pointer transition-colors'
    : 'text-navy hover:bg-steel/10 hover:text-steel cursor-pointer transition-colors';
  const slotSelected = 'bg-teal text-navy-deep font-extrabold';
  const divider = dark ? 'border-white/10' : 'border-silver';

  return (
    <div className="space-y-1.5 relative" ref={wrapperRef}>
      {label && (
        <label className={`text-[11px] uppercase tracking-wider font-bold flex items-center gap-1 ${dark ? 'text-slate-300' : 'text-navy'}`}>
          <Clock className="h-3 w-3 text-teal" />
          {label}{required && ' *'}
        </label>
      )}

      {/* Trigger button */}
      <button
        type="button"
        disabled={disabled || loading}
        onClick={() => setOpen(o => !o)}
        className={`w-full text-xs font-sans px-4 py-3 border rounded-lg transition-colors flex items-center justify-between gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${
          error ? (dark ? 'border-rose-400 bg-rose-500/10 text-white' : 'border-rose-500 bg-rose-50/50 text-navy') : bg
        } ${open ? (dark ? 'border-teal' : 'border-steel') : ''} focus:outline-none`}
      >
        <span className={value ? '' : (dark ? 'text-slate-500' : 'text-slate-400')}>
          {loading ? (
            <span className="flex items-center gap-1.5 text-teal font-medium">
              <Clock className="h-3.5 w-3.5 animate-spin" />
              {loadingMessage}
            </span>
          ) : (
            displayValue || (disabled ? 'Select a date first' : 'Select time')
          )}
        </span>
        <Clock className={`h-4 w-4 shrink-0 ${loading ? 'animate-spin text-teal' : error ? (dark ? 'text-rose-400' : 'text-rose-500') : (dark ? 'text-teal' : 'text-steel')}`} />
      </button>

      {error && (
        <p className={`text-[11px] font-sans font-medium mt-1 flex items-center gap-1 ${dark ? 'text-rose-400' : 'text-rose-500'}`}>
          <span>⚠️</span> {error}
        </p>
      )}

      {/* Slots Dropdown */}
      {open && !disabled && (
        <div className={`absolute top-full left-0 mt-2 z-50 w-56 rounded-2xl border shadow-2xl overflow-hidden ${popupBg}`}>
          {/* Header */}
          <div className={`px-4 py-2.5 border-b ${divider} flex items-center gap-2`}>
            <Clock className={`h-3.5 w-3.5 ${headerText}`} />
            <span className={`text-[10px] uppercase tracking-widest font-extrabold ${headerText}`}>
              Available Slots
            </span>
          </div>

          {/* Scrollable slot list */}
          <div ref={listRef} className="max-h-52 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-xs font-sans text-teal flex items-center justify-center gap-2">
                <Clock className="h-4 w-4 animate-spin" />
                <span>{loadingMessage}</span>
              </div>
            ) : activeSlots.length === 0 ? (
              <div className="p-4 text-center text-xs font-sans text-slate-400 font-medium">
                {emptyMessage}
              </div>
            ) : (
              activeSlots.map(slot => {
                const isSelected = slot.value === value;
                return (
                  <button
                    key={slot.value}
                    type="button"
                    data-selected={isSelected}
                    onClick={() => { onChange(slot.value); setOpen(false); }}
                    className={`
                      w-full text-left px-4 py-2.5 text-xs font-sans font-medium
                      ${isSelected ? slotSelected : slotBase}
                      flex items-center justify-between
                    `}
                  >
                    <span>{slot.label}</span>
                    {isSelected && (
                      <span className="text-[10px] font-extrabold text-navy-deep bg-navy-deep/10 px-1.5 py-0.5 rounded">✓</span>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer note */}
          <div className={`px-4 py-2 border-t ${divider}`}>
            <p className={`text-[10px] font-sans ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
              Mon–Sat · 8:00 AM – 6:00 PM
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
