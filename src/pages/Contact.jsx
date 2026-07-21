import { useState } from 'react';
import { PageHero, Reveal, SectionTitle } from '../components/Section';
import HotelMap from '../components/HotelMap';
import { useUI } from '../context';
import { asset, hotel } from '../data/hotelData';
import { saveLead } from '../utils';

export default function ContactPage() {
  const { t, lang } = useUI();
  const isEn = lang === 'en';
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    saveLead('lalehContactMessages', Object.fromEntries(fd.entries()));
    setSent(true);
    window.dispatchEvent(new CustomEvent('laleh-toast', { detail: t.contact.successText }));
    e.currentTarget.reset();
  };
  return (
    <>
      <PageHero eyebrow={t.nav.contact} title={t.contact.title} text={t.contact.text} image={asset('all/all-Paziresh-1.jpg')} />
      <section className="section">
        <div className="container contact-grid">
          <Reveal className="contact-info">
            <SectionTitle align="right" eyebrow={t.contact.infoTitle} title={t.contact.infoTitle} />
            <div className="info-card"><span>📍</span><div><strong>{t.contact.addressLabel}</strong><p>{isEn ? hotel.addressEn : hotel.address}</p></div></div>
            <div className="info-card"><span>☎️</span><div><strong>{t.contact.phoneLabel}</strong><a href={`tel:${hotel.phone}`}>{hotel.phone}</a></div></div>
            <div className="info-card"><span>✉️</span><div><strong>{t.contact.emailLabel}</strong><a href={`mailto:${hotel.email}`}>{hotel.email}</a></div></div>
            <div className="info-card"><span>🏢</span><div><strong>{t.contact.centralLabel}</strong><p>{isEn ? hotel.centralOfficeEn : hotel.centralOffice}</p></div></div>
          </Reveal>
          <Reveal delay={0.1}>
            <form className="contact-form elevated" onSubmit={submit}>
              <label><span>{t.contact.subjectLabel}</span><select name="subject">{t.contact.subjectOptions.map((o) => <option key={o}>{o}</option>)}</select></label>
              <label><span>{t.contact.nameLabel}</span><input name="name" required /></label>
              <label><span>{t.contact.phoneInput}</span><input name="phone" required /></label>
              <label><span>{t.contact.emailInput}</span><input name="email" type="email" /></label>
              <label className="wide"><span>{t.contact.messageLabel}</span><textarea name="message" rows="5" required /></label>
              <button className="gold-btn full">{t.contact.submit}</button>
              {sent && <div className="success-line">{t.contact.successText}</div>}
            </form>
          </Reveal>
        </div>
      </section>
      <section className="section dark-section">
        <div className="container">
          <SectionTitle eyebrow={t.contact.mapTitle} title={t.contact.mapTitle} />
          <HotelMap />
        </div>
      </section>
    </>
  );
}
