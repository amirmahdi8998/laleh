import { useMemo, useState, useCallback } from 'react';
import { toJalaali, toGregorian, isLeapJalaaliYear } from 'jalaali-js';
import { useUI } from '../context';

const MONTHS = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
const DAYS = ['ش','ی','د','س','چ','پ','ج'];

function jDays(jy, jm) {
  if (jm <= 6) return 31;
  if (jm <= 11) return 30;
  return isLeapJalaaliYear(jy) ? 30 : 29;
}

function isoFromJal(jy, jm, jd) {
  const g = toGregorian(jy, jm, jd);
  return `${g.gy}-${String(g.gm).padStart(2,'0')}-${String(g.gd).padStart(2,'0')}`;
}

function jDayOfWeek(jy, jm) {
  const g = toGregorian(jy, jm, 1);
  const d = new Date(g.gy, g.gm - 1, g.gd);
  return (d.getDay() + 1) % 7;
}

export default function AvailabilityCalendar({ checkin, checkout, onSelect }) {
  const { lang } = useUI();

  const todayJ = useMemo(() => toJalaali(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()), []);
  const [jy, setJy] = useState(todayJ.jy);
  const [jm, setJm] = useState(todayJ.jm);

  const weeks = useMemo(() => {
    const totalDays = jDays(jy, jm);
    const pad = jDayOfWeek(jy, jm);
    const rows = [];
    let day = 1;
    for (let r = 0; r < 6; r++) {
      const row = [];
      for (let c = 0; c < 7; c++) {
        if ((r === 0 && c < pad) || day > totalDays) {
          row.push(null);
        } else {
          row.push(day++);
        }
      }
      rows.push(row);
      if (day > totalDays) break;
    }
    return rows;
  }, [jy, jm]);

  const bookedSet = useMemo(() => {
    const s = new Set();
    const records = JSON.parse(localStorage.getItem('lalehBookings') || '[]');
    records.forEach((r) => {
      if (r.checkin && r.checkout) {
        let cur = new Date(r.checkin + 'T12:00:00');
        const end = new Date(r.checkout + 'T12:00:00');
        while (cur < end) {
          s.add(cur.toISOString().slice(0, 10));
          cur.setDate(cur.getDate() + 1);
        }
      }
    });
    return s;
  }, []);

  const nav = (dir) => {
    let ny = jy, nm = jm + dir;
    if (nm < 1) { nm = 12; ny--; }
    if (nm > 12) { nm = 1; ny++; }
    setJy(ny);
    setJm(nm);
  };

  const isoDay = (d) => isoFromJal(jy, jm, d);

  const handleClick = useCallback((d) => {
    const iso = isoDay(d);
    const g = new Date(iso + 'T12:00:00');
    const t = new Date(); t.setHours(0,0,0,0);
    if (bookedSet.has(iso) || g < t) return;

    if (!checkin) {
      onSelect?.({ checkin: iso, checkout: '' });
    } else if (!checkout) {
      if (iso < checkin) {
        onSelect?.({ checkin: iso, checkout: checkin });
      } else if (iso === checkin) {
        return;
      } else {
        onSelect?.({ checkin: checkin, checkout: iso });
      }
    } else {
      onSelect?.({ checkin: iso, checkout: '' });
    }
  }, [checkin, checkout, bookedSet, isoDay, onSelect]);

  const isToday = (d) => d === todayJ.jd && jy === todayJ.jy && jm === todayJ.jm;
  const isBooked = (d) => bookedSet.has(isoDay(d));
  const isSelected = (d) => isoDay(d) === checkin || isoDay(d) === checkout;
  const isPast = (d) => { const g = new Date(isoDay(d) + 'T12:00:00'); const t = new Date(); t.setHours(0,0,0,0); return g < t; };
  const isInRange = (d) => {
    if (!checkin || !checkout) return false;
    const iso = isoDay(d);
    return iso > checkin && iso < checkout;
  };

  const isFirstMonth = jy === todayJ.jy && jm === todayJ.jm;

  return (
    <div className="avail-calendar">
      <div className="avail-nav">
        <button className="avail-nav-btn" onClick={() => nav(-1)} disabled={isFirstMonth}>‹</button>
        <span className="avail-nav-label">{MONTHS[jm - 1]} {jy}</span>
        <button className="avail-nav-btn" onClick={() => nav(1)}>›</button>
      </div>
      <div className="avail-header">
        {DAYS.map((d) => <span key={d}>{d}</span>)}
      </div>
      {weeks.map((row, ri) => (
        <div className="avail-week" key={ri}>
          {row.map((d, ci) => {
            const cls = d
              ? isSelected(d) ? ' selected'
                : isInRange(d) ? ' in-range'
                : isBooked(d) ? ' booked'
                : isPast(d) ? ' past'
                : ' available'
              : ' empty';
            return (
              <div
                key={ci}
                className={`avail-day${cls}${d && isToday(d) ? ' today' : ''}`}
                onClick={() => d && handleClick(d)}
              >
                {d || ''}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
