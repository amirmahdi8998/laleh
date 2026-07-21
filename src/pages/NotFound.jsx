import { Link } from 'react-router-dom';
import { useUI } from '../context';

export default function NotFound() {
  const { t } = useUI();
  return (
    <section className="not-found container">
      <span className="eyebrow">404</span>
      <h1>{t.notFound.title}</h1>
      <p>{t.notFound.text}</p>
      <Link className="gold-btn" to="/">{t.notFound.cta}</Link>
    </section>
  );
}
