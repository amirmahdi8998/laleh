import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PersianDatePicker from './PersianDatePicker';
import RoomSelect from './RoomSelect';
import { extras, rooms } from '../data/hotelData';
import { addDaysISO, bookingCode, diffNights, saveLead, todayISO, toman, toFa } from '../utils';
import { supabase } from '../supabase';
import { useUI } from '../context';

const initialState = {
  checkin: todayISO(),
  checkout: addDaysISO(1),
  adults: 2,
  children: 0,
  roomId: rooms[2].id,
  name: '',
  phone: '',
  email: '',
  extras: []
};

export default function BookingEngine({ compact = false, preselectedRoom, externalCheckin, externalCheckout, calTrigger }) {
  const { t, lang, currency } = useUI();
  const isEn = lang === 'en';
  const navigate = useNavigate();
  const [form, setForm] = useState({ ...initialState, roomId: preselectedRoom || initialState.roomId });
  const [step, setStep] = useState(compact ? 1 : 2);
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (externalCheckin) setForm((prev) => ({
      ...prev,
      checkin: externalCheckin,
      ...(externalCheckout ? { checkout: externalCheckout } : {})
    }));
  }, [calTrigger, externalCheckin, externalCheckout]);

  const selectedRoom = rooms.find((r) => r.id === form.roomId) || rooms[0];
  const nights = diffNights(form.checkin, form.checkout);
  const extrasTotal = useMemo(() => form.extras.reduce((sum, id) => sum + (extras.find((e) => e.id === id)?.price || 0), 0), [form.extras]);
  const service = Math.round(selectedRoom.price * nights * 0.09);
  const subtotal = selectedRoom.price * nights + extrasTotal;
  const total = subtotal + service;

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const toggleExtra = (id) => setForm((prev) => ({ ...prev, extras: prev.extras.includes(id) ? prev.extras.filter((x) => x !== id) : [...prev.extras, id] }));

  const checkAvailability = (e) => {
    e?.preventDefault();
    setError('');
    if (!nights) return setError(t.booking.errorDate);
    const guests = Number(form.adults) + Number(form.children);
    if (guests > selectedRoom.capacity + 1) return setError(t.booking.errorCapacity);
    setStep(2);
    if (compact) navigate('/booking', { state: form });
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    setError('');
    if (!nights) return setError(t.booking.errorInvalid);
    if (!form.name.trim() || !form.phone.trim()) return setError(t.booking.errorRequired);
    setSaving(true);
    try {
      const code = bookingCode();
      const record = saveLead('lalehBookings', {
        ...form,
        code,
        roomName: isEn ? selectedRoom.nameEn : selectedRoom.name,
        nights,
        extrasTitle: form.extras.map((id) => { const e = extras.find((x) => x.id === id); return e ? (isEn ? e.titleEn : e.title) : ''; }).filter(Boolean),
        total
      });
      try {
        await supabase.from('bookings').insert([{
          ...record,
          room_name: isEn ? selectedRoom.nameEn : selectedRoom.name,
          extras_title: form.extras.map((id) => { const e = extras.find((x) => x.id === id); return e ? (isEn ? e.titleEn : e.title) : ''; }).filter(Boolean),
        }]).select();
      } catch {}
      setConfirmation(record);
      window.dispatchEvent(new CustomEvent('laleh-toast', { detail: `${t.booking.confirmTitle} / ${t.booking.confirmCode}: ${code}` }));
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      className={`booking-engine ${compact ? 'compact' : ''}`}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65 }}
    >
      <AnimatePresence mode="wait">
        {confirmation ? (
          <motion.div key="confirm" className="confirmation-card" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}>
            <div className="success-icon-wrap">
              <span className="success-icon">✓</span>
            </div>
            <h3>{t.booking.confirmTitle}</h3>
            <p className="code-label">{t.booking.confirmCode}</p>
            <p className="code-value">{confirmation.code}</p>
            <div className="mini-receipt">
              <div><span>{t.booking.room}</span><strong>{isEn ? selectedRoom.nameEn : selectedRoom.name}</strong></div>
              <div><span>{t.booking.duration}</span><strong>{toFa(nights, lang)} {t.booking.nights}</strong></div>
              <div><span>{t.booking.amount}</span><strong>{toman(total, lang, currency)}</strong></div>
            </div>
            <p className="muted">{t.booking.confirmSave}</p>
            <button className="gold-btn" onClick={() => { setConfirmation(null); setForm(initialState); setStep(compact ? 1 : 2); }}>
              {t.booking.newBooking}
            </button>
          </motion.div>
        ) : (
          <form key="form" onSubmit={step === 1 ? checkAvailability : submitBooking}>
            <div className="booking-topline">
              <div>
                <span className="booking-title">{t.booking.title}</span>
                <small>{t.booking.bestRate}</small>
              </div>
              <div className="booking-steps">
                <span className={step >= 1 ? 'active' : ''}>۱</span>
                <span className="sep" />
                <span className={step >= 2 ? 'active' : ''}>۲</span>
              </div>
            </div>

            <div className="booking-grid">
              <label>
                <span className="label-icon">📅</span>
                <span>{t.booking.checkin}</span>
                <PersianDatePicker
                  value={form.checkin}
                  onChange={(v) => update('checkin', v)}
                  min={todayISO()}
                />
              </label>
              <label>
                <span className="label-icon">📅</span>
                <span>{t.booking.checkout}</span>
                <PersianDatePicker
                  value={form.checkout}
                  onChange={(v) => update('checkout', v)}
                  min={form.checkin || todayISO()}
                />
              </label>
              <label>
                <span className="label-icon">👤</span>
                <span>{t.booking.adult}</span>
                <div className="guest-stepper">
                  <button type="button" className="step-btn" onClick={() => update('adults', Math.max(1, form.adults - 1))} disabled={form.adults <= 1}>−</button>
                  <span className="step-value">{toFa(form.adults, lang)}</span>
                  <button type="button" className="step-btn" onClick={() => update('adults', Math.min(4, form.adults + 1))} disabled={form.adults >= 4}>+</button>
                </div>
              </label>
              <label>
                <span className="label-icon">🧒</span>
                <span>{t.booking.child}</span>
                <div className="guest-stepper">
                  <button type="button" className="step-btn" onClick={() => update('children', Math.max(0, form.children - 1))} disabled={form.children <= 0}>−</button>
                  <span className="step-value">{toFa(form.children, lang)}</span>
                  <button type="button" className="step-btn" onClick={() => update('children', Math.min(3, form.children + 1))} disabled={form.children >= 3}>+</button>
                </div>
              </label>
              <label className="wide">
                <span className="label-icon">🛏️</span>
                <span>{t.booking.roomType}</span>
                <RoomSelect rooms={rooms} value={form.roomId} onChange={(v) => update('roomId', v)} />
              </label>
            </div>

            <AnimatePresence>
              {!compact && step >= 2 && (
                <motion.div key="step2" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
                  <div className="extras-box">
                    <strong className="extras-title">{t.booking.extras}</strong>
                    <div className="extras-grid">
                      {extras.map((extra) => (
                        <label key={extra.id} className={`extra ${form.extras.includes(extra.id) ? 'selected' : ''}`}>
                          <input type="checkbox" checked={form.extras.includes(extra.id)} onChange={() => toggleExtra(extra.id)} />
                          <span className="extra-name">{isEn ? extra.titleEn : extra.title}</span>
                          <small className="extra-price">{toman(extra.price, lang, currency)}</small>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="guest-grid">
                    <label>
                      <span>{t.booking.fullName}</span>
                      <input type="text" placeholder={t.booking.fullNamePlaceholder} value={form.name} onChange={(e) => update('name', e.target.value)} />
                    </label>
                    <label>
                      <span>{t.booking.phone}</span>
                      <input type="tel" placeholder={t.booking.phonePlaceholder} value={form.phone} onChange={(e) => update('phone', e.target.value)} />
                    </label>
                    <label className="wide">
                      <span>{t.booking.email}</span>
                      <input type="email" placeholder="example@email.com" value={form.email} onChange={(e) => update('email', e.target.value)} />
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {error && <div className="form-error">{error}</div>}

            <div className={`booking-summary ${compact ? 'compact-summary' : ''}`}>
              <div className="summary-item">
                <small>{t.booking.room}</small>
                <strong>{isEn ? selectedRoom.nameEn : selectedRoom.name}</strong>
              </div>
              <div className="summary-item">
                <small>{t.booking.duration}</small>
                <strong>{toFa(nights || 0, lang)} {t.booking.nights}</strong>
              </div>
              {!compact && (
                <div className="summary-item">
                  <small>{t.booking.extrasTotal}</small>
                  <strong>{toman(extrasTotal, lang, currency)}</strong>
                </div>
              )}
              {!compact && (
                <div className="summary-item">
                  <small>{t.booking.tax}</small>
                  <strong>{toman(service, lang, currency)}</strong>
                </div>
              )}
              <div className="summary-item total">
                <small>{t.booking.total}</small>
                <strong>{toman(total || selectedRoom.price, lang, currency)}</strong>
              </div>
            </div>

            <motion.button
              className="gold-btn full"
              type="submit"
              disabled={saving}
              whileTap={{ scale: 0.98 }}
            >
              {saving ? t.booking.saving : compact ? t.booking.searchText : t.booking.submitText}
            </motion.button>
          </form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
