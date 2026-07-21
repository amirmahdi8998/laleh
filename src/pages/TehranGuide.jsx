import { PageHero, Reveal, SectionTitle } from '../components/Section';
import HotelMap from '../components/HotelMap';
import { useUI } from '../context';
import { asset, attractions, hotel } from '../data/hotelData';

export default function TehranGuidePage() {
  const { t, lang } = useUI();
  const isEn = lang === 'en';
  return (
    <>
      <PageHero eyebrow={t.tehran.sectionTitle} title={t.tehran.title} text={t.tehran.heroText} image={asset('all/all-113.jpg')} />
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow={t.tehran.sectionTitle} title={t.tehran.sectionTitle} />
          <div className="timeline-grid">
            {attractions.map((a, i) => <Reveal key={isEn ? a.nameEn : a.name} delay={i * 0.04} className="timeline-card"><span>{a.time}</span><h3>{isEn ? a.nameEn : a.name}</h3><p>{isEn ? a.descEn : a.desc}</p></Reveal>)}
          </div>
        </div>
      </section>
      <section className="section dark-section">
        <div className="container split-grid">
          <Reveal className="rich-text light"><span className="eyebrow">{t.tehran.headline}</span><h2>{t.tehran.headline}</h2><p>{t.tehran.text}</p></Reveal>
          <Reveal delay={0.1}><HotelMap /></Reveal>
        </div>
      </section>
    </>
  );
}
