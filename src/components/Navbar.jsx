import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { asset } from '../data/hotelData';
import { useUI } from '../context';
import CurrencyToggle from './CurrencyToggle';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, theme, toggleTheme, toggleLang, lang } = useUI();

  const navItems = [
    { to: '/', label: t.nav.home },
    { to: '/rooms', label: t.nav.rooms },
    { to: '/dining', label: t.nav.dining },
    { to: '/branches', label: t.nav.branches },
    { to: '/wellness', label: t.nav.wellness },
    { to: '/blog', label: t.nav.blog },
    { to: '/gallery', label: t.nav.gallery },
    { to: '/about', label: t.nav.about },
    { to: '/contact', label: t.nav.contact }
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-shell">
        <Link className="brand" to="/" onClick={close}>
          <img className="brand-logo-img" src={asset('laleh-logo-monogram.png')} alt={t.siteNameShort} />
          <span className="brand-text">
            <strong>{t.siteName}</strong>
            <small>{lang === 'en' ? 'LALEH INTERNATIONAL HOTELS GROUP' : 'گروه هتل‌های بین‌المللی لاله'}</small>
          </span>
        </Link>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {navItems.map((item, i) => (
            <motion.div
              key={item.to}
              initial={false}
              animate={open ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: open ? i * 0.04 : 0 }}
            >
              <NavLink to={item.to} onClick={close} className={({ isActive }) => (isActive ? 'active' : '')}>
                {item.label}
              </NavLink>
            </motion.div>
          ))}
          <div className="mobile-only">
            <Link className="mobile-book-btn" to="/booking" onClick={close}>{t.bookOnline}</Link>
            <div className="mobile-actions">
              <button className="mobile-action-btn" onClick={toggleLang}>{t.langName}</button>
              <button className="mobile-action-btn" onClick={toggleTheme}>{theme === 'light' ? t.darkMode : t.lightMode}</button>
            </div>
          </div>
        </nav>

        <div className="nav-actions">
          <CurrencyToggle />
          <button className="nav-icon-btn" onClick={toggleTheme} aria-label="Theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button className="nav-icon-btn lang-toggle" onClick={toggleLang} aria-label="Language">
            {t.langName === 'English' ? 'FA' : 'EN'}
          </button>
          <Link className="book-now-btn" to="/booking">{t.bookNow}</Link>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={`menu-btn ${open ? 'open' : ''}`}
            onClick={() => setOpen(v => !v)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
