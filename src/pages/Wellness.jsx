import React from 'react';
import { PageHero, Reveal, SectionTitle } from '../components/Section';
import { useUI } from '../context';
import { asset, facilities } from '../data/hotelData';
import * as Lucide from 'lucide-react';

export default function WellnessPage() {
  const { t, lang } = useUI();
  const isEn = lang === 'en';
  return (
    <>
      <PageHero eyebrow={t.wellness.sectionTitle} title={t.wellness.title} text={t.wellness.text} image={asset('terrace/terrace-Rt1.jpg')} />
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow={t.wellness.sectionTitle} title={t.wellness.headline} />
          <div className="benefit-grid facilities">
            {facilities.map((f, i) => <Reveal key={i} delay={i * 0.04} className="benefit-card"><span className="benefit-icon">{React.createElement(Lucide[f.icon], { size: 22, strokeWidth: 1.5 })}</span><h3>{isEn ? f.titleEn : f.title}</h3><p>{isEn ? f.textEn : f.text}</p></Reveal>)}
          </div>
        </div>
      </section>
      <section className="section immersive-section">
        <div className="container split-grid">
          <Reveal className="cinema-card"><img src={asset('terrace/terrace-Rt2.jpg')} alt={t.wellness.alt} /><div className="floating-badge">{isEn ? 'Wellness Club' : 'باشگاه سلامت'}</div></Reveal>
          <Reveal delay={0.1} className="rich-text light">
            <span className="eyebrow">{t.wellness.headline}</span>
            <h2>{t.wellness.headline}</h2>
            <p>{t.wellness.description}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
