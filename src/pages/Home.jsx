import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, SectionTitle } from '../components/Section';
import { asset, benefits, branches, events, highlights, hotel, offers, restaurants, rooms, testimonials } from '../data/hotelData';
import { useUI } from '../context';
import { toman } from '../utils';
import BorderGlow from '../components/BorderGlow';
import BounceCards from '../components/BounceCards';
import * as Lucide from 'lucide-react';

const heroSlides = [
  'lobby/lobby-01_16_09.jpg',
  'all/all-111.jpg',
  'all/all-113.jpg',
  'all/all-Paziresh-1.jpg',
  'all/all-115.jpg',
];

export default function Home() {
  const { t, lang, currency } = useUI();
  const isEn = lang === 'en';
  const [slide, setSlide] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setSlide((i) => (i + 1) % heroSlides.length), 5500);
    return () => clearInterval(timer);
  }, []);

  const heroImg = asset(heroSlides[slide]);
  return (
    <>
      <section className="hero" ref={heroRef}>
        <div className="hero-bg-layer">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              className="hero-bg-image"
              style={{ backgroundImage: `url(${heroImg})` }}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </AnimatePresence>
        </div>
        <div className="hero-vignette" />
        <div className="hero-pattern" />

        <div className="container hero-body">
          <motion.div
            className="hero-card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero-badge">{t.hero.badge}</span>
            <div className="hero-rule" />
            <h1 className="hero-title">{t.hero.titleA} <em>{t.hero.titleB}</em></h1>
            <p className="hero-desc">{t.hero.desc}</p>
            <Link to="/booking" className="gold-btn hero-cta">{t.hero.reserve}</Link>
          </motion.div>
        </div>

        <motion.div
          className="hero-footer"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="container hero-footer-inner">
            <div className="hero-time">
              <span className="hero-time-label">{t.booking.checkin}</span>
              <span className="hero-time-value">۱۴:۰۰</span>
            </div>
            <span className="hero-footer-dot" />
            <div className="hero-time">
              <span className="hero-time-label">{t.booking.checkout}</span>
              <span className="hero-time-value">۱۲:۰۰</span>
            </div>
            <Link to="/booking" className="hero-footer-link">
              {t.hero.reserve}
              <Lucide.ArrowLeft size={14} strokeWidth={1.5} />
            </Link>
          </div>
        </motion.div>

        <div className="hero-scroll"><span /></div>
      </section>

      <section className="section intro-section after-reference">
        <div className="container split-grid">
          <Reveal className="cinema-card">
            <img src={asset('lobby/lobby-01_52_03.jpg')} alt={t.about.alt} />
            <div className="floating-badge">{lang === 'en' ? 'Since' : 'از سال'} {hotel.founded}</div>
          </Reveal>
          <Reveal delay={0.1} className="rich-text">
            <span className="eyebrow">{t.home.aboutEyebrow}</span>
            <h2>{t.home.aboutTitle}</h2>
            <p>{t.home.aboutText}</p>
            <div className="feature-row">
              {t.home.features.map((f,i) => <span key={i}>{f}</span>)}
            </div>
            <Link to="/about" className="text-link">{t.home.aboutCta}</Link>
          </Reveal>
        </div>
      </section>

      <section className="section branches-section">
        <div className="container">
          <SectionTitle eyebrow={t.branches.eyebrow} title={t.branches.title} text={t.branches.text} />
          <div className="branch-marquee">
            {branches.map((branch, index) => (
              <Reveal delay={index * 0.04} className="branch-card" key={branch.id}>
                <Link to={`/branches/${branch.id}`}>
                  <img src={branch.image} alt={isEn ? branch.nameEn : branch.name} />
                  <div className="branch-card-body">
                    <span>{isEn ? branch.gradeEn : branch.grade}</span>
                    <h3>{isEn ? branch.nameEn : branch.name}</h3>
                    <p>{isEn ? branch.shortEn : branch.short}</p>
                    <div className="branch-tags">{(isEn ? branch.tagsEn : branch.tags).map((tag) => <small key={tag}>{tag}</small>)}</div>
                    <strong>{t.branches.cta} ↗</strong>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-section">
        <div className="container">
          <SectionTitle eyebrow={t.home.benefitsHeadline} title={t.home.benefitsTitle} text={t.home.benefitsText} />
          <div className="benefit-grid">
            {benefits.map((item, index) => (
              <Reveal delay={index * 0.04} key={index}>
                <BorderGlow className="benefit-card">
                  <span className="benefit-icon">{React.createElement(Lucide[item.icon], { size: 22, strokeWidth: 1.5 })}</span>
                  <h3>{isEn ? item.titleEn : item.title}</h3>
                  <p>{isEn ? item.textEn : item.text}</p>
                </BorderGlow>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow={t.nav.rooms} title={t.home.roomsTitle} text={t.home.roomsText} />
          <div className="room-showcase">
            {rooms.map((room, index) => (
              <Reveal delay={index * 0.06} key={room.id}>
                <BorderGlow className="room-card">
                  <img src={room.image} alt={isEn ? room.nameEn : room.name} />
                  <div className="room-card-body">
                    <span>{isEn ? room.sizeEn : room.size} · {t.rooms.capacity} {room.capacity} {t.rooms.persons}</span>
                    <h3>{isEn ? room.nameEn : room.name}</h3>
                    <p>{isEn ? room.shortEn : room.short}</p>
                    <div className="card-bottom"><div className="price-line"><strong className="price-main">{toman(room.price, lang, currency)}</strong></div><span>{t.booking.perNight}</span><Link to={`/rooms/${room.id}`}>{t.home.roomDetail}</Link></div>
                  </div>
                </BorderGlow>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section immersive-section">
        <div className="container immersive-grid">
          <Reveal className="rich-text light">
            <span className="eyebrow">{t.home.diningTitle}</span>
            <h2>{t.home.diningTitle}</h2>
            <p>{t.home.diningText}</p>
            <Link className="gold-btn" to="/dining">{t.home.diningCta}</Link>
          </Reveal>
          <BounceCards
            items={restaurants}
            renderCard={(r) => (
              <Link to="/dining" className="bounce-restaurant-card">
                <img src={r.image} alt={isEn ? r.nameEn : r.name} />
                <span>{isEn ? r.nameEn : r.name}</span>
              </Link>
            )}
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow={t.home.packagesTitle} title={t.home.packagesTitle} />
          <div className="offer-grid">
            {offers.map((offer, i) => (
              <Reveal delay={i * 0.06} key={offer.id}>
                <BorderGlow className="offer-card">
                  <h3>{isEn ? offer.titleEn : offer.title}</h3>
                  <strong>{offer.price}</strong>
                  <ul>{(isEn ? offer.itemsEn : offer.items).map((x) => <li key={x}>{x}</li>)}</ul>
                  <Link className="ghost-btn dark" to={`/booking?offer=${offer.id}`}>{t.home.packagesCta}</Link>
                </BorderGlow>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-section">
        <div className="container split-grid reverse">
          <Reveal className="testimonial-stack">
            {testimonials.map((item) => (
              <div className="testimonial" key={item.name}><span>{'★★★★★'}</span><p>{isEn ? item.textEn : item.text}</p><strong>{isEn ? item.nameEn : item.name}</strong><small>{isEn ? item.roleEn : item.role}</small></div>
            ))}
          </Reveal>
          <Reveal delay={0.12} className="rich-text light">
            <span className="eyebrow">{t.home.testimonialsEyebrow}</span>
            <h2>{t.home.testimonialsTitle}</h2>
            <p>{t.home.testimonialsText}</p>
            <Link to="/contact" className="text-link light">{t.home.testimonialsCta}</Link>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow={t.events.newsTitle} title={t.home.eventsTitle} />
          <div className="event-list">
            {events.map((event, i) => (
              <Reveal delay={i * 0.05} className="event-row" key={isEn ? event.titleEn : event.title}>
                <span>{event.date}</span>
                <div><small>{isEn ? event.tagEn : event.tag}</small><h3>{isEn ? event.titleEn : event.title}</h3><p>{isEn ? event.textEn : event.text}</p></div>
                <Link to="/events">{t.home.eventsMore}</Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
