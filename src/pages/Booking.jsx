import React, { useMemo, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import BookingEngine from '../components/BookingEngine';
import AvailabilityCalendar from '../components/AvailabilityCalendar';
import { PageHero, Reveal, SectionTitle } from '../components/Section';
import { asset, rooms } from '../data/hotelData';
import { toman } from '../utils';
import { useUI } from '../context';
import * as Lucide from 'lucide-react';

export default function BookingPage() {
  const { t, lang, currency } = useUI();
  const isEn = lang === 'en';
  const location = useLocation();
  const queryRoom = useMemo(() => new URLSearchParams(location.search).get('room'), [location.search]);
  const validRoom = rooms.some((r) => r.id === queryRoom) ? queryRoom : undefined;
  const [calCheckin, setCalCheckin] = useState('');
  const [calCheckout, setCalCheckout] = useState('');
  const [calTrigger, setCalTrigger] = useState(0);

  const handleCalendarSelect = useCallback(({ checkin, checkout }) => {
    setCalCheckin(checkin);
    setCalCheckout(checkout);
    setCalTrigger((n) => n + 1);
  }, []);

  return (
    <>
      <PageHero
        eyebrow={t.booking.title}
        title={t.booking.title}
        text={t.booking.text}
        image={asset('rooms/room-01.jpg')}
      />

      <section className="section booking-section">
        <div className="container booking-layout">
          <Reveal className="booking-main">
            <BookingEngine preselectedRoom={validRoom} externalCheckin={calCheckin} externalCheckout={calCheckout} calTrigger={calTrigger} />
          </Reveal>
          <Reveal delay={0.1} className="booking-side">
            <div className="booking-side-card">
              <h3>{isEn ? 'Availability' : 'وضعیت رزرو'}</h3>
              <AvailabilityCalendar checkin={calCheckin} checkout={calCheckout} onSelect={handleCalendarSelect} />
            </div>
            <div className="booking-side-card">
              <h3>{t.booking.whyTitle}</h3>
              <div className="booking-highlights">
                {t.booking.highlights.map((h, i) => (
                  <div key={i} className="booking-highlight">
                    <span className="bh-icon">{React.createElement(Lucide[h.icon], { size: 20, strokeWidth: 1.5 })}</span>
                    <div>
                      <strong>{h.title}</strong>
                      <p>{h.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="booking-side-card">
              <h3>{t.booking.roomPrices}</h3>
              <div className="booking-room-list">
                {rooms.slice(0, 4).map((room) => (
                  <div key={room.id} className="booking-room-item">
                    <div className="bri-info">
                      <strong>{isEn ? room.nameEn : room.name}</strong>
                      <small>{isEn ? room.shortEn : room.short}</small>
                    </div>
                    <span className="bri-price">{toman(room.price, lang, currency)} <small>{t.booking.perNight}</small></span>
                  </div>
                ))}
              </div>
            </div>
            <div className="booking-side-card booking-side-contact">
              <h3>{t.booking.phoneTitle}</h3>
              <p>{t.booking.phoneText}</p>
              <a href="tel:+982188900000" className="booking-phone">021-88900000</a>
              <small>{t.booking.phoneSupport}</small>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section dark-section">
        <div className="container">
          <SectionTitle eyebrow={t.booking.pricesTitle} title={t.booking.pricesTitle} text={t.booking.pricesText} />
          <div className="price-table">
            {rooms.map((room) => (
              <div key={room.id} className="price-card">
                {room.image && <img src={room.image} alt={isEn ? room.nameEn : room.name} className="price-card-img" />}
                <div className="price-card-body">
                  <span className="price-card-name">{isEn ? room.nameEn : room.name}</span>
                  <small className="price-card-desc">{isEn ? room.shortEn : room.short}</small>
                  <strong className="price-card-amount">{toman(room.price, lang, currency)} <small>{t.booking.perNight}</small></strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
