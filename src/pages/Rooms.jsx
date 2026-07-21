import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BookingEngine from '../components/BookingEngine';
import ShareButtons from '../components/ShareButtons';
import { PageHero, Reveal, SectionTitle } from '../components/Section';
import { useUI } from '../context';
import { asset, rooms } from '../data/hotelData';
import { toman, toFa } from '../utils';

export function RoomsPage() {
  const { t, lang, currency } = useUI();
  const isEn = lang === 'en';
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('featured');
  const list = useMemo(() => {
    let items = filter === 'all' ? rooms : rooms.filter((r) => r.type === filter);
    if (sort === 'price') items = [...items].sort((a, b) => a.price - b.price);
    if (sort === 'capacity') items = [...items].sort((a, b) => b.capacity - a.capacity);
    return items;
  }, [filter, sort]);

  return (
    <>
      <PageHero eyebrow={t.nav.rooms} title={t.rooms.title} text={t.rooms.text} image={asset('rooms/room-05.jpg')} />
      <section className="section">
        <div className="container">
          <div className="toolbar">
            <div className="chip-group">
              {[['all', t.rooms.all], ['room', t.rooms.rooms], ['suite', t.rooms.suites]].map(([id, label]) => <button key={id} className={filter === id ? 'chip active' : 'chip'} onClick={() => setFilter(id)}>{label}</button>)}
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">{t.rooms.sortFeatured}</option>
              <option value="price">{t.rooms.sortPrice}</option>
              <option value="capacity">{t.rooms.sortCapacity}</option>
            </select>
          </div>
          <div className="rooms-grid-page">
            {list.map((room, index) => (
              <Reveal delay={index * 0.05} className="room-line-card" key={room.id}>
                <img src={room.image} alt={isEn ? room.nameEn : room.name} />
                <div>
                  <span className="eyebrow">{room.type === 'suite' ? (isEn ? 'Suite' : 'سوئیت') : (isEn ? 'Room' : 'اتاق')}</span>
                  <h3>{isEn ? room.nameEn : room.name}</h3>
                  <p>{isEn ? room.descriptionEn : room.description}</p>
                  <div className="meta-pills"><span>{isEn ? room.sizeEn : room.size}</span><span>{t.rooms.capacity} {toFa(room.capacity, lang)} {t.rooms.persons}</span><span>{isEn ? room.viewEn : room.view}</span></div>
                </div>
                <aside>
                  <small>{t.rooms.fromPrice}</small>
                  <strong>{toman(room.price, lang, currency)}</strong>
                  <Link className="gold-btn small" to={`/rooms/${room.id}`}>{t.rooms.details}</Link>
                  <Link className="ghost-btn dark small" to={`/booking?room=${room.id}`}>{t.rooms.reserve}</Link>
                </aside>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function RoomDetailPage() {
  const { t, lang, currency } = useUI();
  const isEn = lang === 'en';
  const { id } = useParams();
  const room = rooms.find((r) => r.id === id) || rooms[0];

  return (
    <>
      <PageHero eyebrow={t.rooms.details} title={isEn ? room.nameEn : room.name} text={isEn ? room.shortEn : room.short} image={room.image} />
      <section className="section">
        <div className="container detail-grid">
          <Reveal className="room-gallery">
            <img className="main-img" src={room.gallery[0]} alt={isEn ? room.nameEn : room.name} />
            <div>{room.gallery.slice(1).map((img) => <img key={img} src={img} alt={isEn ? room.nameEn : room.name} />)}</div>
          </Reveal>
          <Reveal delay={0.1} className="detail-panel">
            <span className="eyebrow">{room.type === 'suite' ? (isEn ? 'Signature Suite' : 'سوئیت ویژه') : (isEn ? 'Signature Room' : 'اتاق ویژه')}</span>
            <h2>{isEn ? room.nameEn : room.name}</h2>
            <p>{isEn ? room.descriptionEn : room.description}</p>
            <div className="detail-metrics">
              <div><small>{t.rooms.size}</small><strong>{isEn ? room.sizeEn : room.size}</strong></div>
              <div><small>{t.rooms.capacity}</small><strong>{toFa(room.capacity, lang)} {t.rooms.persons}</strong></div>
              <div><small>{t.rooms.bed}</small><strong>{isEn ? room.bedsEn : room.beds}</strong></div>
              <div><small>{t.rooms.view}</small><strong>{isEn ? room.viewEn : room.view}</strong></div>
            </div>
            <h3>{t.rooms.amenities}</h3>
            <div className="amenities-list">{(isEn ? room.amenitiesEn : room.amenities).map((x) => <span key={x}>✓ {x}</span>)}</div>
            <div className="price-strip"><span>{t.rooms.pricePerNight}</span><strong>{toman(room.price, lang, currency)}</strong></div>
            <ShareButtons title={isEn ? room.nameEn : room.name} />
          </Reveal>
        </div>
      </section>
      <section className="section booking-section">
        <div className="container narrow">
          <SectionTitle eyebrow={t.rooms.reserve} title={t.rooms.bookingTitle} />
          <BookingEngine preselectedRoom={room.id} />
        </div>
      </section>
    </>
  );
}
