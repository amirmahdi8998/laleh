import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageHero, Reveal, SectionTitle } from '../components/Section';
import { asset, branches, benefits } from '../data/hotelData';
import { useUI } from '../context';

export default function BranchesPage() {
  const { lang, t } = useUI();
  const isEn = lang === 'en';
  return (
    <>
      <PageHero
        eyebrow={t.branches.eyebrow}
        title={t.branches.title}
        text={t.branches.text}
        image={asset('all/all-116.jpg')}
      />
      <section className="section branches-page-section">
        <div className="container">
          <SectionTitle eyebrow={t.branches.eyebrow} title={t.branches.title} text={t.branches.text} />
          <div className="branches-map-grid">
            {branches.map((branch, index) => (
              <Reveal key={branch.id} delay={index * 0.04} className="branch-large-card">
                <Link to={`/branches/${branch.id}`}>
                  <div className="branch-image-wrap"><img src={branch.image} alt={isEn ? branch.nameEn : branch.name} /></div>
                  <div className="branch-large-content">
                    <span className="eyebrow">{isEn ? branch.cityEn : branch.city} · {isEn ? branch.gradeEn : branch.grade}</span>
                    <h3>{isEn ? branch.nameEn : branch.name}</h3>
                    <p>{isEn ? branch.descriptionEn : branch.description}</p>
                    <div className="branch-tags">{(isEn ? branch.tagsEn : branch.tags).map((tag) => <small key={tag}>{tag}</small>)}</div>
                    <strong>{t.common.details} ↗</strong>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function BranchDetailPage() {
  const { id } = useParams();
  const { lang, t } = useUI();
  const isEn = lang === 'en';
  const branch = branches.find((b) => b.id === id) || branches[0];
  const otherBranches = branches.filter((b) => b.id !== branch.id).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={isEn ? branch.cityEn : branch.city}
        title={isEn ? branch.nameEn : branch.name}
        text={isEn ? branch.descriptionEn : branch.description}
        image={branch.image}
      />
      <section className="section branch-detail-section">
        <div className="container branch-detail-layout">
          <Reveal className="branch-story-card">
            <span className="eyebrow">{isEn ? branch.gradeEn : branch.grade}</span>
            <h2>{t.branches.detailTitle}</h2>
            <p>{isEn ? branch.descriptionEn : branch.description}</p>
            <div className="feature-row">
              <span>{isEn ? branch.locationEn : branch.location}</span>
              {(isEn ? branch.tagsEn : branch.tags).map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="branch-actions">
              <Link className="gold-btn" to={`/booking?hotel=${branch.id}`}>{t.nav.booking}</Link>
              <Link className="ghost-btn dark" to="/contact">{t.nav.contact}</Link>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="branch-floating-gallery">
            <motion.img whileHover={{ scale: 1.04, rotate: -1 }} src={branch.image} alt={isEn ? branch.nameEn : branch.name} />
            <motion.div whileHover={{ y: -8 }} className="glass-note">
              <strong>{isEn ? branch.cityEn : branch.city}</strong>
              <span>{isEn ? branch.shortEn : branch.short}</span>
            </motion.div>
          </Reveal>
        </div>
      </section>
      <section className="section dark-section">
        <div className="container">
          <SectionTitle eyebrow={t.branches.otherTitle} title={t.branches.otherTitle} />
          <div className="room-showcase">
            {otherBranches.map((b, i) => (
              <Reveal className="room-card branch-mini" delay={i * 0.05} key={b.id}>
                <img src={b.image} alt={isEn ? b.nameEn : b.name} />
                <div className="room-card-body">
                  <span>{isEn ? b.cityEn : b.city}</span>
                  <h3>{isEn ? b.nameEn : b.name}</h3>
                  <p>{isEn ? b.shortEn : b.short}</p>
                  <div className="card-bottom"><Link to={`/branches/${b.id}`}>{t.common.details}</Link></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
