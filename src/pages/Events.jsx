import { useState } from 'react';
import { PageHero, Reveal, SectionTitle } from '../components/Section';
import { useUI } from '../context';
import { asset, events, halls } from '../data/hotelData';
import { saveLead } from '../utils';

export default function EventsPage() {
  const { t, lang } = useUI();
  const isEn = lang === 'en';
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    saveLead('lalehEventLeads', Object.fromEntries(fd.entries()));
    setSent(true);
    window.dispatchEvent(new CustomEvent('laleh-toast', { detail: t.events.successText }));
    e.currentTarget.reset();
  };

  return (
    <>
      <PageHero eyebrow={t.events.newsTitle} title={t.events.title} text={t.events.text} image={asset('all/all-111.jpg')} />
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow={t.events.title} title={t.events.title} />
          <div className="hall-grid">
            {halls.map((hall, i) => (
              <Reveal delay={i * 0.08} className="hall-card" key={hall.id}>
                <img src={hall.image} alt={isEn ? hall.nameEn : hall.name} />
                <div>
                  <span className="eyebrow">{isEn ? hall.areaEn : hall.area}</span>
                  <h3>{isEn ? hall.nameEn : hall.name}</h3>
                  <p>{isEn ? hall.descEn : hall.desc}</p>
                  <div className="meta-pills"><span>{t.rooms.capacity} {hall.capacity}</span>{hall.featuresEn ? (isEn ? hall.featuresEn : hall.features).map((f) => <span key={f}>{f}</span>) : hall.features.map((f) => <span key={f}>{f}</span>)}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section booking-section">
        <div className="container split-grid reverse">
          <Reveal className="contact-form-panel">
            <form className="contact-form" onSubmit={submit}>
              <label><span>{t.events.typeLabel}</span><select name="eventType">{t.events.options.map((o) => <option key={o}>{o}</option>)}</select></label>
              <label><span>{t.events.hallLabel}</span><select name="hall">{halls.map((h) => <option key={h.id}>{isEn ? h.nameEn : h.name}</option>)}</select></label>
              <label><span>{t.events.dateLabel}</span><input type="date" name="date" required /></label>
              <label><span>{t.events.guestsLabel}</span><input type="number" min="10" max="700" name="guests" required /></label>
              <label><span>{t.events.nameLabel}</span><input name="name" required /></label>
              <label><span>{t.events.phoneLabel}</span><input name="phone" required /></label>
              <label className="wide"><span>{t.events.descLabel}</span><textarea name="message" rows="4" placeholder={t.events.descPlaceholder} /></label>
              <button className="gold-btn full">{t.events.submit}</button>
              {sent && <div className="success-line">{t.events.successText}</div>}
            </form>
          </Reveal>
          <Reveal delay={0.1} className="rich-text">
            <span className="eyebrow">{t.events.perksTitle}</span>
            <h2>{t.events.perksTitle}</h2>
            <p>{t.events.perksText}</p>
          </Reveal>
        </div>
      </section>
      <section className="section dark-section">
        <div className="container">
          <SectionTitle eyebrow={t.events.newsTitle} title={t.events.newsTitle} />
          <div className="event-list">
            {events.map((event, i) => <Reveal key={isEn ? event.titleEn : event.title} delay={i * 0.04} className="event-row"><span>{event.date}</span><div><small>{isEn ? event.tagEn : event.tag}</small><h3>{isEn ? event.titleEn : event.title}</h3><p>{isEn ? event.textEn : event.text}</p></div><button>{t.events.share}</button></Reveal>)}
          </div>
        </div>
      </section>
    </>
  );
}
