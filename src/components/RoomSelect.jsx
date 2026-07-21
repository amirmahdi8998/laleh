import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toman, toFa } from '../utils';
import { useUI } from '../context';

export default function RoomSelect({ rooms, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { t, lang, currency } = useUI();
  const isEn = lang === 'en';
  const selected = rooms.find((r) => r.id === value);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="room-select" ref={ref}>
      <button type="button" className="room-select-trigger" onClick={() => setOpen((v) => !v)}>
        <span className="rs-trigger-info">
          <span className="rs-trigger-name">{isEn ? selected?.nameEn : selected?.name}</span>
          <span className="rs-trigger-price">{toman(selected?.price || 0, lang, currency)} <small>{t.booking.perNight}</small></span>
        </span>
        <span className={`rs-arrow ${open ? 'open' : ''}`}>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="room-select-dropdown"
            initial={{ opacity: 0, y: -6, scaleY: 0.96 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -4, scaleY: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top' }}
          >
            {rooms.map((room) => (
              <button
                key={room.id}
                type="button"
                className={`room-select-option ${room.id === value ? 'active' : ''}`}
                onClick={() => { onChange(room.id); setOpen(false); }}
              >
                <div className="rso-info">
                  <strong>{isEn ? room.nameEn : room.name}</strong>
                  <small>{isEn ? room.shortEn : room.short}</small>
                </div>
                <span className="rso-price">{toman(room.price, lang, currency)}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
