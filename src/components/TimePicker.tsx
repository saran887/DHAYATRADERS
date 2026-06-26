import { useState, useRef, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimePickerProps {
  value: string; // HH:MM (24h)
  onChange: (time: string) => void;
  label?: string;
  required?: boolean;
  dark?: boolean;
}

// Business hours: 8 AM – 6 PM in 30-min slots
const TIME_SLOTS: { label: string; value: string }[] = [];
for (let h = 8; h <= 18; h++) {
  for (const m of [0, 30]) {
    if (h === 18 && m === 30) continue;
    const hh = String(h).padStart(2, '0');
    const mm = String(m).padStart(2, '0');
    const value = `${hh}:${mm}`;
    const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const label = `${String(hour12).padStart(2, '0')}:${mm} ${ampm}`;
    TIME_SLOTS.push({ label, value });
  }
}

export default function TimePicker({ value, onChange, label = 'Time', required, dark = false }: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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
        const slot = TIME_SLOTS.find(s => s.value === value);
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
        onClick={() => setOpen(o => !o)}
        className={`w-full text-xs font-sans px-4 py-3 border rounded-lg transition-colors flex items-center justify-between gap-2 ${bg} ${open ? (dark ? 'border-teal' : 'border-steel') : ''} focus:outline-none`}
      >
        <span className={value ? '' : (dark ? 'text-slate-500' : 'text-slate-400')}>
          {displayValue || 'Select time'}
        </span>
        <Clock className={`h-4 w-4 shrink-0 ${dark ? 'text-teal' : 'text-steel'}`} />
      </button>

      {/* Slots Dropdown */}
      {open && (
        <div className={`absolute top-full left-0 mt-2 z-50 w-48 rounded-2xl border shadow-2xl overflow-hidden ${popupBg}`}>
          {/* Header */}
          <div className={`px-4 py-2.5 border-b ${divider} flex items-center gap-2`}>
            <Clock className={`h-3.5 w-3.5 ${headerText}`} />
            <span className={`text-[10px] uppercase tracking-widest font-extrabold ${headerText}`}>
              Office Hours
            </span>
          </div>

          {/* Scrollable slot list */}
          <div ref={listRef} className="max-h-52 overflow-y-auto">
            {TIME_SLOTS.map(slot => {
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
            })}
          </div>

          {/* Footer note */}
          <div className={`px-4 py-2 border-t ${divider}`}>
            <p className={`text-[10px] font-sans ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
              Mon–Fri · 8:00 AM – 6:00 PM
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
