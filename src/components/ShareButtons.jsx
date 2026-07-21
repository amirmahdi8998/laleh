import { useUI } from '../context';

export default function ShareButtons({ title = '' }) {
  const { t, lang } = useUI();
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(title || document.title);
  return (
    <div className="share-bar">
      <span>{t.blog.share}</span>
      <a className="share-btn whatsapp" href={`https://wa.me/?text=${text}%20${url}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">📱</a>
      <a className="share-btn telegram" href={`https://t.me/share/url?url=${url}&text=${text}`} target="_blank" rel="noopener noreferrer" aria-label="Telegram">✈️</a>
    </div>
  );
}
