import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

interface DatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (date: string) => void;
  label?: string;
  required?: boolean;
  dark?: boolean; // true = dark modal theme, false = light contact theme
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

function toLocal(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}

export default function DatePicker({ value, onChange, label = 'Date', required, dark = false }: DatePickerProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = toLocal(today);

  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() => {
    if (value) return parseInt(value.split('-')[0]);
    return today.getFullYear();
  });
  const [viewMonth, setViewMonth] = useState(() => {
    if (value) return parseInt(value.split('-')[1]) - 1;
    return today.getMonth();
  });

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const selectDate = (day: number) => {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (dateStr < todayStr) return;
    onChange(dateStr);
    setOpen(false);
  };

  const displayValue = value
    ? new Date(value + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  // Theme tokens
  const bg = dark ? 'bg-white/10 border-white/20 text-white placeholder:text-slate-500' : 'bg-slate-50 border-silver text-navy placeholder:text-slate-400';
  const focusBorder = 'focus:border-teal focus:outline-none';
  const popupBg = dark ? 'bg-[#0D2136] border-teal/30' : 'bg-white border-steel/30';
  const headerText = dark ? 'text-white' : 'text-navy';
  const headerBtn = dark ? 'hover:bg-white/10 text-slate-300 hover:text-teal' : 'hover:bg-steel/10 text-steel hover:text-navy';
  const dayLabel = dark ? 'text-slate-400' : 'text-slate-400';
  const todayRing = dark ? 'ring-1 ring-teal text-teal font-bold' : 'ring-1 ring-steel text-steel font-bold';
  const selectedCls = 'bg-teal text-navy-deep font-extrabold rounded-lg';
  const disabledCls = dark ? 'text-slate-600 cursor-not-allowed' : 'text-slate-300 cursor-not-allowed';
  const enabledCls = dark
    ? 'text-slate-200 hover:bg-teal/20 hover:text-teal rounded-lg cursor-pointer transition-colors'
    : 'text-navy hover:bg-steel/15 hover:text-steel rounded-lg cursor-pointer transition-colors';

  return (
    <div className="space-y-1.5 relative" ref={wrapperRef}>
      {label && (
        <label className={`text-[11px] uppercase tracking-wider font-bold flex items-center gap-1 ${dark ? 'text-slate-300' : 'text-navy'}`}>
          <CalendarDays className="h-3 w-3 text-teal" />
          {label}{required && ' *'}
        </label>
      )}

      {/* Trigger input */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`w-full text-xs font-sans px-4 py-3 border rounded-lg transition-colors flex items-center justify-between gap-2 ${bg} ${focusBorder} ${open ? (dark ? 'border-teal' : 'border-steel') : ''}`}
      >
        <span className={value ? '' : (dark ? 'text-slate-500' : 'text-slate-400')}>
          {displayValue || 'Select a date'}
        </span>
        <CalendarDays className={`h-4 w-4 shrink-0 ${dark ? 'text-teal' : 'text-steel'}`} />
      </button>

      {/* Calendar Popup */}
      {open && (
        <div className={`absolute top-full left-0 mt-2 z-50 w-72 rounded-2xl border shadow-2xl p-4 ${popupBg}`} style={{ minWidth: '288px' }}>

          {/* Month / Year Header */}
          <div className="flex items-center justify-between mb-3">
            <button type="button" onClick={prevMonth} className={`p-1.5 rounded-lg transition-colors ${headerBtn}`}>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className={`text-sm font-bold font-serif tracking-wide ${headerText}`}>
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button type="button" onClick={nextMonth} className={`p-1.5 rounded-lg transition-colors ${headerBtn}`}>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map(d => (
              <div key={d} className={`text-center text-[10px] uppercase font-extrabold tracking-wider py-1 ${dayLabel}`}>{d}</div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-0.5">
            {/* Empty cells for first day offset */}
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isPast = dateStr < todayStr;
              const isToday = dateStr === todayStr;
              const isSelected = dateStr === value;

              return (
                <button
                  key={day}
                  type="button"
                  disabled={isPast}
                  onClick={() => selectDate(day)}
                  className={`
                    w-full aspect-square flex items-center justify-center text-xs font-medium
                    ${isSelected ? selectedCls : ''}
                    ${!isSelected && isToday ? todayRing + ' rounded-lg' : ''}
                    ${!isSelected && !isPast ? enabledCls : ''}
                    ${isPast ? disabledCls : ''}
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className={`flex items-center gap-4 mt-3 pt-3 border-t text-[10px] font-sans ${dark ? 'border-white/10 text-slate-400' : 'border-silver text-slate-400'}`}>
            <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded-sm bg-teal" /> Selected</span>
            <span className="flex items-center gap-1"><span className={`inline-block w-2.5 h-2.5 rounded-sm ring-1 ${dark ? 'ring-teal' : 'ring-steel'}`} /> Today</span>
            <span className="flex items-center gap-1"><span className={`inline-block w-2.5 h-2.5 rounded-sm ${dark ? 'bg-slate-700' : 'bg-slate-200'}`} /> Unavailable</span>
          </div>
        </div>
      )}
    </div>
  );
}
