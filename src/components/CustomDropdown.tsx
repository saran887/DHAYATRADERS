import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  activeOptionClassName?: string;
  iconClassName?: string;
  name?: string;
}

export default function CustomDropdown({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  buttonClassName = 'bg-white border border-steel/40 text-navy-deep',
  dropdownClassName = 'bg-white border border-steel/20 shadow-premium',
  optionClassName = 'text-navy-deep hover:bg-silver/50',
  activeOptionClassName = 'bg-silver/30 font-semibold text-teal',
  iconClassName = 'text-teal',
  name
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Hidden select for form submission / accessibility */}
      {name && (
        <select name={name} value={value} onChange={(e) => onChange(e.target.value)} className="hidden">
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between gap-2 rounded-lg px-4 py-3 text-left text-xs sm:text-sm font-sans transition-all focus:outline-none ${buttonClassName}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="block truncate font-medium">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex-shrink-0"
        >
          <ChevronDown className={`h-4 w-4 ${iconClassName}`} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 mt-2 w-full rounded-lg py-1 ${dropdownClassName}`}
          >
            <ul
              className="max-h-60 overflow-auto py-1 outline-none scrollbar-hide"
              role="listbox"
            >
              {options.map((option) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={value === option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`relative cursor-pointer select-none py-2.5 pl-10 pr-4 text-sm transition-colors font-sans ${
                    value === option.value ? activeOptionClassName : optionClassName
                  }`}
                >
                  <span className="block truncate">{option.label}</span>
                  {value === option.value && (
                    <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${iconClassName}`}>
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
