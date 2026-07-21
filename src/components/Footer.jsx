import { Link } from 'react-router-dom';
import { useState } from 'react';
import { asset, hotel } from '../data/hotelData';
import { useUI } from '../context';
import { saveLead } from '../utils';

export default function Footer() {
  const { t, lang } = useUI();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  const submitNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    saveLead('lalehNewsletter', { email: newsletterEmail });
    setNewsletterSent(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSent(false), 4000);
  };

  return (
    <footer className="footer">
      <div className="footer-gold-line" />
      <div className="footer-grid container">
        <div className="footer-brand-col">
          <div className="footer-brand">
            <img src={asset('laleh-logo-monogram.png')} alt={t.siteName} style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'contain' }} />
            <div>
              <strong>{t.siteName}</strong>
              <small>{t.footer.since}</small>
            </div>
          </div>
          <p>{t.footer.aboutText}</p>
          <div className="footer-social">
            <span className="footer-social-item">📷</span>
            <span className="footer-social-item">📘</span>
            <span className="footer-social-item">🐦</span>
            <span className="footer-social-item">📺</span>
          </div>
          <h4 style={{ margin: '18px 0 8px' }}>{lang === 'en' ? 'Newsletter' : 'خبرنامه'}</h4>
          <form className="newsletter-form" onSubmit={submitNewsletter}>
            <input type="email" placeholder={lang === 'en' ? 'Your email' : 'ایمیل خود را وارد کنید'} value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} required />
            <button type="submit">{lang === 'en' ? 'Subscribe' : 'عضویت'}</button>
          </form>
          {newsletterSent && <div className="newsletter-success">{lang === 'en' ? 'Subscribed successfully ✓' : 'با موفقیت عضو شدید ✓'}</div>}
        </div>
        <div>
          <h4>{t.footer.explore}</h4>
          <Link to="/rooms">{t.nav.rooms}</Link>
          <Link to="/booking">{t.nav.booking}</Link>
          <Link to="/dining">{t.nav.dining}</Link>
          <Link to="/branches">{t.nav.branches}</Link>
        </div>
        <div>
          <h4>{t.footer.experience}</h4>
          <Link to="/wellness">{t.nav.wellness}</Link>
          <Link to="/gallery">{t.nav.gallery}</Link>
          <Link to="/blog">{t.nav.blog}</Link>
          <Link to="/about">{t.nav.about}</Link>
        </div>
        <div className="footer-contact-col">
          <h4>{t.footer.contact}</h4>
          <div className="footer-contact-item">
            <span>📍</span>
            <span>{lang === 'en' ? hotel.addressEn : hotel.address}</span>
          </div>
          <div className="footer-contact-item">
            <span>📞</span>
            <a href={`tel:${hotel.phone}`}>{hotel.phone}</a>
          </div>
          <div className="footer-contact-item">
            <span>✉️</span>
            <a href={`mailto:${hotel.email}`}>{hotel.email}</a>
          </div>
        </div>
      </div>
      <div className="sub-footer container">
        <span>© {new Date().getFullYear()} — {t.siteName}</span>
        <span>{t.allRights}</span>
      </div>
    </footer>
  );
}
