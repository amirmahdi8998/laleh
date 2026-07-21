import { useMemo, useState } from 'react';
import { PageHero, Reveal, SectionTitle } from '../components/Section';
import { useUI } from '../context';
import { asset, restaurants, rooms } from '../data/hotelData';

const staticImages = [
  asset('all/all-111.jpg'), asset('all/all-116.jpg'), asset('all/all-114.jpg'), asset('all/all-115.jpg'), asset('all/all-S1.jpg'), asset('all/all-S2.jpg'),
  asset('all/all-113.jpg'),
];

const roomEditIndices = [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24];
const roomEditImages = roomEditIndices.map((i) => asset(`room-edit/R${i}.jpg`));

const cafeNames = [
  'آفوگاتو', 'آی سی لیمو', 'آیس امریکانو', 'آیس لاته', 'آی‌سی هلو', 'اسپرسو مارتی', 'اسپرسو ماکیاتو', 'اسپرسو', 'امریکانو', 'بخارا',
  'بستنی توت فرنگی', 'بستنی شکلاتی', 'بستنی مخلوط', 'بستنی موزی', 'بستنی والینی', 'بلو هاوایی آناناس و پرتغال', 'دابل اسپرسو', 'رولت', 'سرخه باغ', 'سمرقند',
  'شکلات گلاسه', 'شیرکاکائو', 'شیک توت فرنگی', 'شیک شکلات موز', 'شیک شکلات وانیل', 'شیک شکلات', 'شیک قهوه', 'شیک وانیل', 'قهوه ترک', 'قهوه فرانسه',
  'لاته', 'لیموناد', 'مسیرسبز', 'موس شکلات', 'موهیتو', 'موکاچینو', 'هات چاکلت', 'پای سیب', 'پای سیب و بستنی', 'پلمبیر',
  'چای', 'کارامل ماکیاتو', 'کافه گلاسه', 'کاپوچینو بزرگ', 'کاپوچینو متوسط', 'کرم کارامل', 'کورتادو', 'کیک انگلیسی', 'کیک شکلاتی',
];
const cafeImages = cafeNames.map((name) => asset(`cafe/${name}.jpg`));

const catIds = ['rooms', 'dining', 'hotel', 'events', 'tehran'];

export default function GalleryPage() {
  const { t, lang } = useUI();
  const isEn = lang === 'en';
  const [filter, setFilter] = useState(catIds[0]);
  const [lightbox, setLightbox] = useState(null);

  const staticCats = ['hotel', 'hotel', 'events', 'tehran', 'hotel', 'hotel', 'events'];

  const extraItems = useMemo(() => [
    ...roomEditImages.map((img, i) => ({ title: isEn ? `Room Design ${i + 1}` : `طرح اتاق ${i + 1}`, category: 'rooms', image: img })),
    ...cafeImages.map((img, i) => ({ title: cafeNames[i], category: 'dining', image: img })),
    ...Array.from({ length: 7 }, (_, i) => ({ title: isEn ? `Breakfast ${i + 1}` : `صبحانه ${i + 1}`, category: 'dining', image: asset(`breakfast/0${i + 1}.jpg`) })),
    { title: isEn ? 'Breakfast Buffet' : 'بوفه صبحانه', category: 'dining', image: asset('breakfast/breakfast-design-1.jpg') },
    { title: isEn ? 'Breakfast Setup' : 'چیدمان صبحانه', category: 'dining', image: asset('breakfast/breakfast-design-2.jpg') },
    ...Array.from({ length: 9 }, (_, i) => ({ title: isEn ? `Dish ${i + 11}` : `غذا ${i + 11}`, category: 'dining', image: asset(`food/food-${i + 11}.jpg`) })),
  ], [isEn]);

  const gallery = useMemo(() => [
    ...rooms.map((r) => ({ title: isEn ? r.nameEn : r.name, category: 'rooms', image: r.image })),
    ...restaurants.flatMap((r) => [
      { title: isEn ? r.nameEn : r.name, category: 'dining', image: r.image },
      ...(r.gallery || []).map((img) => ({ title: isEn ? r.nameEn : r.name, category: 'dining', image: img })),
    ]),
    ...extraItems,
    ...t.gallery.items.map((item, i) => ({ title: item.title, category: staticCats[i] || 'hotel', image: staticImages[i] })),
  ], [t, isEn, extraItems]);

  const items = useMemo(() => gallery.filter((g) => g.category === filter), [filter, gallery]);

  return (
    <>
      <PageHero eyebrow={t.nav.gallery} title={t.gallery.title} text={t.gallery.text} image={asset('lobby/lobby-01_16_09.jpg')} />
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow={t.gallery.altTitle} title={t.gallery.altTitle} />
          <div className="chip-group center">
            {catIds.map((id) => {
              const labels = [t.gallery.categories[0], t.gallery.categories[1], t.gallery.categories[2], t.gallery.categories[3], t.gallery.categories[4]];
              const idx = catIds.indexOf(id);
              return <button key={id} className={filter === id ? 'chip active' : 'chip'} onClick={() => setFilter(id)}>{labels[idx]}</button>;
            })}
          </div>
          <div className="masonry">
            {items.map((item, i) => <Reveal key={`${item.title}-${i}`} delay={(i % 6) * 0.03} className="gallery-item"><button onClick={() => setLightbox(item)}><img src={item.image} alt={item.title} /></button></Reveal>)}
          </div>
        </div>
      </section>
      {lightbox && <div className="lightbox" onClick={() => setLightbox(null)}><button>×</button><img src={lightbox.image} alt={lightbox.title} /></div>}
    </>
  );
}
