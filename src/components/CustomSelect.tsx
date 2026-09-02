import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: (string | SelectOption)[];
  label?: string;
  required?: boolean;
  dark?: boolean;
  error?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  name?: string;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  label,
  required,
  dark = false,
  error,
  placeholder = 'Select option',
  icon
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const formattedOptions: SelectOption[] = options.map((opt) =>
    typeof opt === 'string' ? { label: opt, value: opt } : opt
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectedOption = formattedOptions.find((opt) => opt.value === value);

  // Theme tokens
  const bg = dark
    ? 'bg-white/10 border-white/20 text-white'
    : 'bg-slate-50 border-silver text-navy';
  const popupBg = dark ? 'bg-[#0D2136] border-teal/30' : 'bg-white border-steel/30';
  const optionBase = dark
    ? 'text-slate-200 hover:bg-teal/20 hover:text-teal cursor-pointer transition-colors'
    : 'text-navy hover:bg-steel/10 hover:text-steel cursor-pointer transition-colors';
  const optionSelected = 'bg-teal text-navy-deep font-extrabold';

  return (
    <div className="space-y-1.5 relative w-full" ref={wrapperRef}>
      {label && (
        <label className={`text-[11px] uppercase tracking-wider font-bold flex items-center gap-1 ${dark ? 'text-slate-300' : 'text-navy'}`}>
          {icon}
          {label}{required && ' *'}
        </label>
      )}

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full text-xs font-sans px-4 py-3 border rounded-lg transition-all flex items-center justify-between gap-2 text-left ${
          error ? (dark ? 'border-rose-400 bg-rose-500/10 text-white' : 'border-rose-500 bg-rose-50/50 text-navy') : bg
        } ${open ? (dark ? 'border-teal ring-1 ring-teal/50' : 'border-steel ring-1 ring-steel/30') : ''} focus:outline-none cursor-pointer`}
      >
        <span className={`truncate font-medium ${selectedOption ? '' : (dark ? 'text-slate-500' : 'text-slate-400')}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${open ? 'rotate-180 text-teal' : (dark ? 'text-teal' : 'text-steel')}`} />
      </button>

      {error && (
        <p className={`text-[11px] font-sans font-medium mt-1 flex items-center gap-1 ${dark ? 'text-rose-400' : 'text-rose-500'}`}>
          <span>⚠️</span> {error}
        </p>
      )}

      {/* Options Dropdown */}
      {open && (
        <div className={`absolute top-full left-0 mt-1.5 z-50 w-full rounded-xl border shadow-2xl overflow-hidden py-1 ${popupBg}`}>
          <div className="max-h-56 overflow-y-auto">
            {formattedOptions.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-sans font-medium flex items-center justify-between transition-colors ${
                    isSelected ? optionSelected : optionBase
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && (
                    <Check className="h-3.5 w-3.5 text-navy-deep shrink-0 font-bold" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
