import { useState } from 'react';
import { PageHero, Reveal, SectionTitle } from '../components/Section';
import { useUI } from '../context';
import { asset, restaurants } from '../data/hotelData';
import { saveLead } from '../utils';

export default function DiningPage() {
  const { t, lang } = useUI();
  const isEn = lang === 'en';
  const [active, setActive] = useState(restaurants[0]);
  const [reserved, setReserved] = useState(false);

  const reserveTable = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    saveLead('lalehRestaurantReservations', Object.fromEntries(fd.entries()));
    setReserved(true);
    window.dispatchEvent(new CustomEvent('laleh-toast', { detail: t.dining.successText }));
    e.currentTarget.reset();
  };

  return (
    <>
      <PageHero eyebrow={t.nav.dining} title={t.dining.title} text={t.dining.text} image={asset('restaurants/hafeziyeh/hafeziyeh-R27.jpg')} />
      <section className="section">
        <div className="container dining-grid">
          <div className="restaurant-tabs">
            {restaurants.map((r) => (
              <a href={`#/menu/${r.id}`} key={r.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <button className={active.id === r.id ? 'active' : ''} onClick={() => setActive(r)}>
                  <img src={r.image} alt={isEn ? r.nameEn : r.name} />
                  <span>{isEn ? r.nameEn : r.name}</span>
                  <small>{isEn ? r.styleEn : r.style}</small>
                </button>
              </a>
            ))}
          </div>
          <Reveal className="restaurant-detail">
            <img src={active.image} alt={isEn ? active.nameEn : active.name} />
            <div>
              <span className="eyebrow">{active.hours}</span>
              <h2>{isEn ? active.nameEn : active.name}</h2>
              <p>{isEn ? active.descEn : active.desc}</p>
              <h3>{t.dining.menuPreview}</h3>
              <div className="menu-list">{(isEn ? active.menuEn : active.menu).map((m) => <span key={m}>{m}</span>)}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
                <a href={`#/menu/${active.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderRadius: 999, background: 'linear-gradient(135deg, var(--gold-2), var(--gold))', color: '#1a1200', fontWeight: 800, textDecoration: 'none', fontSize: '0.9rem', boxShadow: '0 6px 20px rgba(214,174,93,0.3)' }}>
                  <span>📱</span>
                  <span>{isEn ? 'View Menu' : 'مشاهده منو'}</span>
                </a>
                <a href="#/menu/room-service" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--ink)', fontWeight: 800, textDecoration: 'none', fontSize: '0.9rem' }}>
                  <span>🛎️</span>
                  <span>{isEn ? 'Room Service Menu' : 'منوی روم سرویس'}</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section booking-section">
        <div className="container split-grid">
          <Reveal className="rich-text">
            <span className="eyebrow">{t.dining.reservationTitle}</span>
            <h2>{t.dining.reservationTitle}</h2>
            <p>{t.dining.reservationText}</p>
            {reserved && <div className="success-line">{t.dining.successText}</div>}
          </Reveal>
          <Reveal delay={0.1}>
            <form className="contact-form" onSubmit={reserveTable}>
              <label><span>{t.dining.restaurantLabel}</span><select name="restaurant" defaultValue={isEn ? active.nameEn : active.name}>{restaurants.map((r) => <option key={r.id}>{isEn ? r.nameEn : r.name}</option>)}</select></label>
              <label><span>{t.dining.dateLabel}</span><input type="date" name="date" required /></label>
              <label><span>{t.dining.timeLabel}</span><input type="time" name="time" required /></label>
              <label><span>{t.dining.guestsLabel}</span><input type="number" name="guests" min="1" max="20" defaultValue="2" required /></label>
              <label><span>{t.dining.nameLabel}</span><input name="name" required placeholder={t.dining.namePlaceholder} /></label>
              <label><span>{t.dining.phoneLabel}</span><input name="phone" required placeholder={t.dining.phonePlaceholder} /></label>
              <button className="gold-btn full">{t.dining.submit}</button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
