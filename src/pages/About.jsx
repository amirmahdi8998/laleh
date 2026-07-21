import { PageHero, Reveal, SectionTitle } from '../components/Section';
import { asset, hotel, highlights } from '../data/hotelData';
import { useUI } from '../context';

export default function AboutPage() {
  const { t, lang } = useUI();
  const isEn = lang === 'en';
  return (
    <>
      <PageHero eyebrow={t.about.snapshotTitle} title={t.about.title} text={t.about.text} image={asset('lobby/lobby-01_16_09.jpg')} />
      <section className="section">
        <div className="container split-grid">
          <Reveal className="rich-text">
            <span className="eyebrow">{isEn ? 'Since 1970' : 'از سال ' + hotel.founded}</span>
            <h2>{t.about.headline}</h2>
            <p>{t.about.paragraph1}</p>
            <p>{t.about.paragraph2}</p>
          </Reveal>
          <Reveal delay={0.1} className="cinema-card"><img src={asset('all/all-Paziresh-1.jpg')} alt={t.about.alt} /><div className="floating-badge">{hotel.roomsCount} {t.about.roomsLabel}</div></Reveal>
        </div>
      </section>
      <section className="section dark-section">
        <div className="container">
          <SectionTitle eyebrow={t.about.snapshotTitle} title={t.about.snapshotTitle} />
          <div className="stats-wide">{highlights.map((h) => <div key={h.label}><strong>{isEn ? h.valueEn : h.value}</strong><span>{isEn ? h.labelEn : h.label}</span></div>)}</div>
        </div>
      </section>
    </>
  );
}
