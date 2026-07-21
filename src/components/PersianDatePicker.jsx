import { useMemo, useState, useRef, useEffect } from 'react';
import { toJalaali, toGregorian, isLeapJalaaliYear } from 'jalaali-js';
import { motion, AnimatePresence } from 'framer-motion';

const MONTHS = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
];

function toJal(iso) {
  if (!iso) return { jy: 0, jm: 1, jd: 1 };
  const d = new Date(iso + 'T12:00:00');
  return toJalaali(d.getFullYear(), d.getMonth() + 1, d.getDate());
}

function fromJal(jy, jm, jd) {
  const g = toGregorian(jy, jm, jd);
  const d = new Date(g.gy, g.gm - 1, g.gd);
  return d.toISOString().slice(0, 10);
}

function daysInMonth(jy, jm) {
  if (jm <= 6) return 31;
  if (jm <= 11) return 30;
  return isLeapJalaaliYear(jy) ? 30 : 29;
}

function Select({ value, onChange, options, format }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="dp-select" ref={ref}>
      <button type="button" className="dp-select-trigger" onClick={() => setOpen((v) => !v)}>
        <span>{selected ? format(selected) : value}</span>
        <span className={`dp-arrow ${open ? 'open' : ''}`}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="dp-select-dropdown"
            initial={{ opacity: 0, y: -4, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -3, scaleY: 0.95 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top' }}
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`dp-select-option ${opt.value === value ? 'active' : ''} ${opt.disabled ? 'disabled' : ''}`}
                disabled={opt.disabled}
                onClick={() => { if (!opt.disabled) { onChange(opt.value); setOpen(false); } }}
              >
                {format(opt)}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PersianDatePicker({ value, onChange, min }) {
  const { jy, jm, jd } = useMemo(() => toJal(value), [value]);
  const minJ = useMemo(() => min ? toJal(min) : null, [min]);

  const years = useMemo(() => {
    const cur = toJalaali(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
    return Array.from({ length: 12 }, (_, i) => cur.jy + i);
  }, []);

  const days = useMemo(() => daysInMonth(jy, jm), [jy, jm]);

  const isBeforeMin = (y, m, d) => {
    if (!minJ) return false;
    if (y < minJ.jy) return true;
    if (y === minJ.jy && m < minJ.jm) return true;
    if (y === minJ.jy && m === minJ.jm && d < minJ.jd) return true;
    return false;
  };

  const handleChange = (field, val) => {
    const y = field === 'y' ? val : jy;
    const m = field === 'm' ? val : jm;
    const d = field === 'd' ? val : jd;
    const maxDay = daysInMonth(y, m);
    const nd = Math.min(d, maxDay);
    onChange(fromJal(y, m, nd));
  };

  const yearOpts = years.map((y) => ({ value: y, disabled: minJ && y < minJ.jy }));
  const monthOpts = MONTHS.map((name, i) => ({ value: i + 1, label: name, disabled: isBeforeMin(jy, i + 1, 1) }));
  const dayOpts = Array.from({ length: days }, (_, i) => ({ value: i + 1, disabled: isBeforeMin(jy, jm, i + 1) }));

  return (
    <div className="persian-date-picker">
      <Select value={jy} onChange={(v) => handleChange('y', v)} options={yearOpts} format={(o) => o.value} />
      <Select value={jm} onChange={(v) => handleChange('m', v)} options={monthOpts} format={(o) => o.label || o.value} />
      <Select value={Math.min(jd, days)} onChange={(v) => handleChange('d', v)} options={dayOpts} format={(o) => o.value} />
    </div>
  );
}
