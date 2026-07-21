import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageHero } from '../components/Section';
import { useUI } from '../context';
import { asset, restaurants, roomServiceMenu } from '../data/hotelData';

function ZoomableImage({ src, alt }) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      <div
        onClick={() => setZoomed(true)}
        style={{
          borderRadius: 20,
          overflow: 'hidden',
          cursor: 'zoom-in',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          maxWidth: '100%',
          position: 'relative',
          background: '#111'
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', display: 'block' }}
        />
        <div style={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          background: 'rgba(0,0,0,0.6)',
          color: '#fff',
          padding: '4px 10px',
          borderRadius: 8,
          fontSize: '0.7rem',
          pointerEvents: 'none'
        }}>
          🔍 کلیک کنید تا بزرگ شود
        </div>
      </div>

      {zoomed && (
        <div
          onClick={() => setZoomed(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out',
            padding: 16
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{
              maxWidth: '95vw',
              maxHeight: '95vh',
              objectFit: 'contain',
              borderRadius: 12,
              touchAction: 'pinch-zoom'
            }}
          />
          <div style={{
            position: 'fixed',
            top: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.7)',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: 12,
            fontSize: '0.85rem'
          }}>
            لمس/کلیک کنید برای بستن
          </div>
        </div>
      )}
    </>
  );
}

export default function DigitalMenu() {
  const { id } = useParams();
  const { lang } = useUI();
  const isEnGlobal = lang === 'en';
  const [menuLang, setMenuLang] = useState('fa');

  const isRoomService = id === 'room-service';
  const r = isRoomService ? roomServiceMenu : restaurants.find((res) => res.id === id);

  if (!r) {
    return <div className="container" style={{ paddingTop: 140, paddingBottom: 140 }}><h2>منو یافت نشد</h2></div>;
  }

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(window.location.href)}`;
  const interiorImage = r.image || asset('restaurants/french/french-22.jpg');
  const menuImages = r.menuImages || [];

  return (
    <>
      <PageHero eyebrow={isEnGlobal ? (r.styleEn || r.style) : r.style} title={isEnGlobal ? r.nameEn : r.name} text={r.hours} image={interiorImage} />
      <section className="section dark-section" style={{ paddingTop: 32 }}>
        <div className="container narrow">
          {/* Toggle */}
          <div className="chip-group center" style={{ marginBottom: 28 }}>
            <button className={`chip ${menuLang === 'fa' ? 'active' : ''}`} onClick={() => setMenuLang('fa')}>فارسی</button>
            <button className={`chip ${menuLang === 'en' ? 'active' : ''}`} onClick={() => setMenuLang('en')}>English</button>
          </div>

          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--gold-2)', marginBottom: 8 }}>
              {menuLang === 'fa' ? `منوی ${r.name}` : `${r.nameEn} Menu`}
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
              {menuLang === 'fa' ? 'روی منو بزنید تا بزرگ شود' : 'Tap menu to enlarge'}
            </p>
          </div>

          {/* Menu Images - Zoomable */}
          {menuImages.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 48, alignItems: 'center' }}>
              {menuImages.map((img, idx) => (
                <ZoomableImage key={idx} src={img} alt={`${r.name} Menu - Page ${idx + 1}`} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 20px', marginBottom: 48 }}>
              <p style={{ color: 'var(--muted)', fontSize: '1rem' }}>
                {menuLang === 'fa' ? 'منو موجود نیست' : 'Menu not available'}
              </p>
            </div>
          )}

          {/* QR Section */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 40, display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'flex-start', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ marginBottom: 10, fontSize: '1.1rem', color: 'var(--gold-2)', fontWeight: 700 }}>
                {menuLang === 'fa' ? 'اسکن منو' : 'Scan Menu'}
              </h3>
              <img src={qrUrl} alt="QR" style={{ width: 180, height: 180, borderRadius: 20, background: '#fff', padding: 8, boxShadow: '0 18px 50px rgba(0,0,0,0.35)' }} />
              <p style={{ marginTop: 14, fontSize: '0.82rem', maxWidth: 220, color: 'var(--muted)' }}>
                {menuLang === 'fa' ? `برای مشاهده منو ${r.name} اسکن کنید` : `Scan to view ${r.nameEn} menu`}
              </p>
            </div>
            {!isRoomService && (
              <div style={{ minWidth: 260, maxWidth: 420 }}>
                <img src={interiorImage} alt={isEnGlobal ? r.nameEn : r.name} style={{ width: '100%', borderRadius: 20, boxShadow: '0 18px 60px rgba(0,0,0,0.4)' }} />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
