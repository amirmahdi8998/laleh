export const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;

export const hotel = {
  name: 'گروه هتل‌های بین‌المللی لاله',
  tagline: 'جایی که شما ستاره‌اید',
  phone: '02188965021',
  email: 'info@lalehhotel.com',
  address: 'تهران، بلوار کشاورز، ضلع جنوبی پارک لاله، هتل بین‌المللی لاله تهران',
  addressEn: 'Tehran, Keshavarz Blvd, south side of Laleh Park, Laleh International Hotel Tehran',
  centralOffice: 'تهران، ولنجک، خیابان امیرآبادی، خیابان یاسمن یکم، پلاک ۱۵',
  centralOfficeEn: 'Tehran, Velenjak, Amirabadi St, Yaseman 1st St, No. 15',
  founded: '۱۳۴۹',
  roomsCount: 368,
  stars: 5,
  mapText: 'همسایه پارک لاله، نزدیک موزه هنرهای معاصر، میدان ولیعصر و محورهای اداری مرکز تهران'
};

export const highlights = [
  { value: '۵★', label: 'استاندارد پنج‌ستاره', valueEn: '5★', labelEn: 'Five-Star Standard' },
  { value: '۳۶۸', label: 'اتاق و سوئیت نوسازی‌شده', valueEn: '368', labelEn: 'Renovated Rooms & Suites' },
  { value: '۴', label: 'رستوران و لانژ اختصاصی', valueEn: '4', labelEn: 'Restaurants & Private Lounges' },
  { value: '۶۰۰', label: 'ظرفیت سالن‌های رویداد', valueEn: '600', labelEn: 'Event Hall Capacity' }
];

export const benefits = [
  { icon: 'Gem', title: 'اقامت مقرون‌به‌صرفه لوکس', text: 'قیمت‌های رقابتی، پکیج‌های ویژه و ارزش بالای خدمات برای سفرهای کاری و خانوادگی.', titleEn: 'Affordable Luxury', textEn: 'Competitive rates, special packages, and high service value for business and family trips.' },
  { icon: 'Trees', title: 'موقعیت مرکزی کنار پارک', text: 'دسترسی سریع به مراکز فرهنگی، درمانی، تجاری و حمل‌ونقل عمومی در قلب تهران.', titleEn: 'Central Location by the Park', textEn: 'Quick access to cultural, medical, commercial centers and public transport in the heart of Tehran.' },
  { icon: 'ConciergeBell', title: 'خدمات رفاهی مدرن', text: 'استخر، سونا، جکوزی، ماساژ، باشگاه ورزشی، پارکینگ و لاندری برای اقامتی بی‌دغدغه.', titleEn: 'Modern Amenities', textEn: 'Pool, sauna, jacuzzi, massage, fitness center, parking and laundry for a carefree stay.' },
  { icon: 'Coffee', title: 'صبحانه و اینترنت رایگان', text: 'صبحانه متنوع با کیفیت و اینترنت پرسرعت در اتاق‌ها و فضاهای عمومی.', titleEn: 'Free Breakfast & Internet', textEn: 'Varied quality breakfast and high-speed internet in rooms and public areas.' },
  { icon: 'Sparkles', title: 'نظافت و امنیت روزانه', text: 'تأکید بر بهداشت اتاق‌ها، سرویس روزانه و تجربه‌ای آرام برای مهمانان.', titleEn: 'Daily Cleaning & Security', textEn: 'Emphasis on room hygiene, daily service and a peaceful experience for guests.' },
  { icon: 'RefreshCw', title: 'لغو رزرو منعطف', text: 'امکان تغییر یا لغو رزرو مطابق قوانین پکیج انتخابی و بدون پیچیدگی.', titleEn: 'Flexible Cancellation', textEn: 'Ability to change or cancel reservations per the selected package terms, hassle-free.' }
];

export const rooms = [
  {
    id: 'royal-suite',
    name: 'رویال سوئیت',
    nameEn: 'Royal Suite',
    type: 'suite',
    image: asset('rooms/room-01.jpg'),
    gallery: [asset('rooms/room-01.jpg'), asset('rooms/room-02.jpg'), asset('rooms/room-03.jpg'), asset('rooms/room-04.jpg'), asset('rooms/room-05.jpg'), asset('rooms/room-06.jpg')],
    short: 'باشکوه‌ترین تجربه اقامت در پایتخت با فضای پذیرایی، ناهارخوری، خواب و کار مجزا.',
    shortEn: 'The most magnificent stay in the capital with separate living, dining, sleeping and work areas.',
    description: 'سوئیت رویال هتل لاله تهران نماد اقامت لوکس و باشکوه در مرکز پایتخت است؛ فضایی بسیار وسیع با طراحی کلاسیک مجلل، چشم‌انداز پانوراما و خدمات اختصاصی برای شخصیت‌های برجسته، مقامات و مهمانان ویژه.',
    descriptionEn: 'The Royal Suite at Laleh Hotel Tehran is the pinnacle of luxury in the heart of the capital; a vast space with lavish classic design, panoramic views and exclusive services for dignitaries and VIP guests.',
    size: '۱۲۰ متر',
    sizeEn: '120 m²',
    capacity: 4,
    beds: '۱ تخت کینگ + نشیمن مجزا',
    bedsEn: '1 King bed + separate living area',
    view: 'شهر، پارک لاله و البرز',
    viewEn: 'City, Laleh Park and Alborz',
    price: 28500000,
    amenities: ['باتلر اختصاصی', 'ناهارخوری خصوصی', 'میز کار مدیریتی', 'جکوزی', 'مینی‌بار ممتاز', 'صبحانه VIP'],
    amenitiesEn: ['Personal butler', 'Private dining', 'Executive desk', 'Jacuzzi', 'Premium minibar', 'VIP breakfast']
  },
  {
    id: 'normal-suite',
    name: 'نرمال سوئیت',
    nameEn: 'Normal Suite',
    type: 'suite',
    image: asset('rooms/room-07.jpg'),
    gallery: [asset('rooms/room-07.jpg'), asset('rooms/room-08.jpg'), asset('rooms/room-09.jpg'), asset('rooms/room-10.jpg'), asset('rooms/room-11.jpg'), asset('rooms/room-12.jpg')],
    short: 'سوئیت وسیع با بخش‌های مجزای خواب و نشیمن؛ مناسب اقامت طولانی‌مدت و خانوادگی.',
    shortEn: 'Spacious suite with separate sleeping and living areas; ideal for long-term and family stays.',
    description: 'سوئیت‌های هتل لاله تهران با فضای دل‌باز، بخش خواب و نشیمن مجزا و امکانات کامل، گزینه‌ای ایده‌آل برای خانواده‌ها، مدیران و مهمانانی هستند که در مرکز تهران به آرامش و فضای بیشتر نیاز دارند.',
    descriptionEn: 'Laleh Hotel Tehran suites, with their open layout, separate sleeping and living areas and full amenities, are ideal for families, executives and guests seeking extra space and tranquility in central Tehran.',
    size: '۷۰ متر',
    sizeEn: '70 m²',
    capacity: 3,
    beds: '۱ تخت دبل + کاناپه تخت‌شو',
    bedsEn: '1 Double bed + sofa bed',
    view: 'پارک لاله یا شمال تهران',
    viewEn: 'Laleh Park or north Tehran',
    price: 16800000,
    amenities: ['نشیمن خصوصی', 'چای‌ساز', 'اینترنت پرسرعت', 'صبحانه رایگان', 'حمام لوکس', 'سرویس ۲۴ ساعته'],
    amenitiesEn: ['Private living area', 'Tea maker', 'High-speed internet', 'Free breakfast', 'Luxury bathroom', '24-hour service']
  },
  {
    id: 'twin-room',
    name: 'اتاق دو تخته توئین',
    nameEn: 'Twin Room',
    type: 'room',
    image: asset('rooms/room-13.jpg'),
    gallery: [asset('rooms/room-13.jpg'), asset('rooms/room-14.jpg'), asset('rooms/room-15.jpg'), asset('rooms/room-16.jpg'), asset('rooms/room-17.jpg'), asset('rooms/room-18.jpg')],
    short: 'دو تخت مجزا، طراحی مدرن و چشم‌انداز شهری؛ مناسب همکاران، دوستان و خانواده‌ها.',
    shortEn: 'Two separate beds, modern design and city view; suitable for colleagues, friends and families.',
    description: 'اتاق‌های توئین هتل لاله تهران با دو تخت مجزا، چیدمان کاربردی و امکانات کامل، بهترین انتخاب برای سفرهای کاری یا اقامت دوستانه در مرکز شهر هستند.',
    descriptionEn: 'Laleh Hotel twin rooms with two separate beds, practical layout and full amenities are the best choice for business trips or friendly stays in the city center.',
    size: '۳۲ متر',
    sizeEn: '32 m²',
    capacity: 2,
    beds: '۲ تخت سینگل',
    bedsEn: '2 Single beds',
    view: 'شهر یا پارک',
    viewEn: 'City or park',
    price: 9800000,
    amenities: ['صبحانه رایگان', 'میز کار', 'تلویزیون هوشمند', 'گاوصندوق', 'لاندری', 'اینترنت رایگان'],
    amenitiesEn: ['Free breakfast', 'Work desk', 'Smart TV', 'Safe', 'Laundry', 'Free internet']
  },
  {
    id: 'double-room',
    name: 'اتاق دو تخته دبل',
    nameEn: 'Double Room',
    type: 'room',
    image: asset('rooms/room-19.jpg'),
    gallery: [asset('rooms/room-19.jpg'), asset('rooms/room-20.jpg'), asset('rooms/room-21.jpg'), asset('rooms/room-22.jpg'), asset('rooms/room-23.jpg'), asset('rooms/room-24.jpg')],
    short: 'تخت کینگ، فضای آرام و نورپردازی لطیف برای اقامتی دل‌نشین و شهری.',
    shortEn: 'King bed, quiet space and soft lighting for a comfortable urban stay.',
    description: 'اتاق دبل هتل لاله تهران با تخت کینگ، طراحی نوین و امکانات لوکس، برای مسافرانی طراحی شده که به دنبال اقامتی آرام، دل‌نشین و استاندارد در مرکز پایتخت هستند.',
    descriptionEn: 'The Double Room at Laleh Hotel Tehran, with a king bed, modern design and luxury amenities, is designed for travelers seeking a quiet, comfortable and high-standard stay in the heart of the capital.',
    size: '۳۲ متر',
    sizeEn: '32 m²',
    capacity: 2,
    beds: '۱ تخت کینگ',
    bedsEn: '1 King bed',
    view: 'پارک لاله یا خیابان‌های تهران',
    viewEn: 'Laleh Park or Tehran streets',
    price: 10400000,
    amenities: ['صبحانه رایگان', 'مینی‌بار', 'سرویس اتاق', 'نورپردازی هوشمند', 'حمام مجهز', 'اینترنت رایگان'],
    amenitiesEn: ['Free breakfast', 'Mini bar', 'Room service', 'Smart lighting', 'Well-equipped bathroom', 'Free internet']
  }
];

export const restaurants = [
  { id: 'ivan', name: 'رستوران ایوان', nameEn: 'Ivan Restaurant', image: asset('restaurants/ivan/9R7A7701.JPG'), gallery: [asset('restaurants/ivan/ivan-design.jpg')], style: 'ایرانی معاصر', styleEn: 'Contemporary Persian', hours: '۱۲:۳۰ تا ۲۳:۳۰', desc: 'طعم‌های اصیل ایرانی با اجرای مدرن، مناسب ضیافت‌های خانوادگی و مهمانی‌های رسمی.', descEn: 'Authentic Iranian flavors with a modern twist, perfect for family feasts and formal gatherings.', menu: ['شیشلیک مخصوص لاله', 'زرشک‌پلو با مرغ زعفرانی', 'ته‌چین مجلسی', 'دسر زعفرانی'], menuEn: ['Laleh special shishlik', 'Barberry rice with saffron chicken', 'Persian rice cake (Tahchin)', 'Saffron dessert'], menuImages: [asset('menus/ivan-menu-1.png'), asset('menus/ivan-menu-2.png')] },
  { id: 'hafeziyeh', name: 'رستوران حافظیه', nameEn: 'Hafeziyeh Restaurant', image: asset('restaurants/hafeziyeh/hafeziyeh-R27.jpg'), gallery: [asset('restaurants/hafeziyeh/hafeziyeh-R28.jpg'), asset('restaurants/hafeziyeh/hafeziyeh-R29.jpg'), asset('restaurants/hafeziyeh/hafeziyeh-27.jpg')], style: 'غذاهای سنتی', styleEn: 'Traditional Cuisine', hours: '۱۲:۰۰ تا ۲۲:۳۰', desc: 'فضایی گرم برای تجربه غذاهای ایرانی، خورش‌های خانگی و پیش‌غذاهای نوستالژیک.', descEn: 'A warm space to experience Iranian dishes, homemade stews and nostalgic appetizers.', menu: ['دیزی سنگی', 'کباب لقمه', 'خورش فسنجان', 'کشک بادمجان'], menuEn: ['Stone pot Dizi', 'Lofteh kebab', 'Fesenjan stew', 'Kashk-e Bademjan'], menuImages: [asset('menus/hafezieh-menu-1.png'), asset('menus/hafezieh-menu-2.png')] },
  { id: 'french', name: 'رستوران فرانسوی', nameEn: 'French Restaurant', image: asset('restaurants/french/french-R22.jpg'), gallery: [asset('restaurants/french/french-R23.jpg'), asset('restaurants/french/french-R24.jpg'), asset('restaurants/french/french-R26.jpg'), asset('restaurants/french/french-22.jpg'), asset('restaurants/french/french-23.jpg')], style: 'فرنگی و گریل', styleEn: 'International & Grill', hours: '۱۳:۰۰ تا ۲۳:۰۰', desc: 'رستوران فرنگی با فضای شیک، گریل حرفه‌ای و سرویس کلاسیک هتل‌های بین‌المللی.', descEn: 'An elegant international restaurant with professional grilling and classic hotel service.', menu: ['استیک ریب‌آی', 'مرغ روتیسری', 'پاستا آلفردو', 'سالاد سزار'], menuEn: ['Rib-eye steak', 'Rotisserie chicken', 'Fettuccine Alfredo', 'Caesar salad'], menuImages: [] },
  { id: 'tiareh', name: 'رستوران تیاره', nameEn: 'Tiyareh Restaurant', image: asset('restaurants/french/french-R26.jpg'), gallery: [asset('restaurants/french/french-25.jpg'), asset('restaurants/french/french-26.jpg'), asset('food/food-01.jpg'), asset('food/food-02.jpg')], style: 'بین‌المللی', styleEn: 'International', hours: '۱۸:۰۰ تا ۲۴:۰۰', desc: 'رستورانی آرام با منوی بین‌المللی، مناسب شام‌های کاری و قرارهای خاص.', descEn: 'A quiet restaurant with an international menu, perfect for business dinners and special occasions.', menu: ['سالمون گریل', 'ریزوتو قارچ', 'سوپ روز', 'چیزکیک'], menuEn: ['Grilled salmon', 'Mushroom risotto', 'Soup of the day', 'Cheesecake'], menuImages: [] }
];

export const roomServiceMenu = {
  id: 'room-service',
  name: 'روم سرویس',
  nameEn: 'Room Service',
  style: 'سرویس اتاق',
  styleEn: 'In-Room Dining',
  hours: '۲۴ ساعته',
  menuImages: [
    asset('menus/roomservice-menu-1.png'),
    asset('menus/roomservice-menu-2.png'),
    asset('menus/roomservice-menu-3.png'),
    asset('menus/roomservice-menu-4.png'),
    asset('menus/roomservice-menu-5.png'),
    asset('menus/roomservice-menu-6.png')
  ]
};

export const halls = [
  {
    id: 'golzar',
    name: 'سالن همایش گلزار',
    nameEn: 'Golzar Hall',
    image: asset('all/all-111.jpg'),
    capacity: '۳۸۰ تا ۶۰۰ نفر',
    area: '۷۰۰ متر مربع',
    areaEn: '700 m²',
    desc: 'بزرگ‌ترین سالن هتل با سقف بلند، فضای بدون ستون و دیوار مکانیکی؛ مناسب همایش، کنسرت، جشن و مراسم عروسی.',
    descEn: 'The hotel\'s largest hall with a high ceiling, column-free space and movable wall; suitable for conferences, concerts, celebrations and weddings.',
    features: ['ویدئو پروژکتور', 'نورپردازی صحنه', 'سیستم صوتی حرفه‌ای', 'پارکینگ ۱۵۰ خودرو'],
    featuresEn: ['Video projector', 'Stage lighting', 'Professional sound system', '150-car parking']
  },
  {
    id: 'sonbol',
    name: 'سالن سنبل',
    nameEn: 'Sonbol Hall',
    image: asset('all/all-112.jpg'),
    capacity: '۲۵ تا ۶۰ نفر',
    area: '۹۰ متر مربع',
    areaEn: '90 m²',
    desc: 'فضایی خصوصی برای جلسات کاری، ورکشاپ، مراسم عقد کوچک و رویدادهای مدیریتی.',
    descEn: 'A private space for business meetings, workshops, small wedding ceremonies and management events.',
    features: ['چیدمان منعطف', 'اینترنت وای‌فای', 'پشتیبانی تشریفات', 'پذیرایی اختصاصی'],
    featuresEn: ['Flexible layout', 'Wi-Fi internet', 'Catering support', 'Exclusive hospitality']
  }
];

export const facilities = [
  { title: 'استخر، سونا و جکوزی', icon: 'Waves', text: 'فضایی آرام برای ریکاوری بعد از یک روز کاری یا تهران‌گردی.', titleEn: 'Pool, Sauna & Jacuzzi', textEn: 'A relaxing space for recovery after a workday or exploring Tehran.', image: asset('terrace/terrace-Rt1.jpg') },
  { title: 'باشگاه ورزشی', icon: 'Dumbbell', text: 'تجهیزات کامل تمرین هوازی و قدرتی برای حفظ روتین سلامتی.', titleEn: 'Fitness Center', textEn: 'Complete cardio and strength training equipment to maintain your fitness routine.', image: asset('terrace/terrace-Rt2.jpg') },
  { title: 'ماساژ و تندرستی', icon: 'Flower2', text: 'پکیج‌های آرامش‌بخش و درمانی با رزرو قبلی.', titleEn: 'Massage & Wellness', textEn: 'Relaxing and therapeutic packages with advance reservation.', image: asset('terrace/terrace-1.jpg') },
  { title: 'پارکینگ اختصاصی', icon: 'Car', text: 'دسترسی آسان و امن برای مهمانان هتل و رویدادها.', titleEn: 'Private Parking', textEn: 'Easy and secure access for hotel guests and events.' },
  { title: 'لاندری و خانه‌داری', icon: 'Shirt', text: 'سرویس روزانه اتاق، شست‌وشو و اتوکشی حرفه‌ای.', titleEn: 'Laundry & Housekeeping', textEn: 'Daily room service, washing and professional ironing.' },
  { title: 'کلینیک و خدمات اضطراری', icon: 'Hospital', text: 'پشتیبانی اولیه و هماهنگی خدمات پزشکی در صورت نیاز.', titleEn: 'Clinic & Emergency Services', textEn: 'Basic support and coordination of medical services when needed.' }
];

export const attractions = [
  { name: 'پارک لاله', nameEn: 'Laleh Park', time: '۲ دقیقه پیاده', desc: 'فضای سبز آرام در همسایگی هتل برای پیاده‌روی صبحگاهی.', descEn: 'A peaceful green space next to the hotel for morning walks.' },
  { name: 'موزه هنرهای معاصر تهران', nameEn: 'Tehran Museum of Contemporary Art', time: '۵ دقیقه پیاده', desc: 'یکی از مهم‌ترین گالری‌های هنر مدرن در ایران.', descEn: 'One of the most important modern art galleries in Iran.' },
  { name: 'موزه فرش ایران', nameEn: 'Iran Carpet Museum', time: '۶ دقیقه پیاده', desc: 'نمایشگاهی از تاریخ، طرح و هنر فرش ایرانی.', descEn: 'An exhibition of the history, design and art of Persian carpets.' },
  { name: 'میدان ولیعصر', nameEn: 'Valiasr Square', time: '۱۰ دقیقه با خودرو', desc: 'دسترسی شهری، خرید و کافه‌های پرتردد مرکز تهران.', descEn: 'Urban access, shopping and bustling cafés in central Tehran.' },
  { name: 'برج میلاد', nameEn: 'Milad Tower', time: '۲۰ دقیقه با خودرو', desc: 'چشم‌انداز ۳۶۰ درجه تهران و مجموعه تفریحی-گردشگری.', descEn: '360-degree view of Tehran and an entertainment-tourist complex.' },
  { name: 'بازار بزرگ تهران', nameEn: 'Grand Bazaar of Tehran', time: '۲۵ دقیقه با خودرو', desc: 'تجربه تهران تاریخی، خرید و غذاهای سنتی.', descEn: 'Experience historic Tehran, shopping and traditional cuisine.' }
];

export const events = [
  { title: 'شب همدلی در هتل لاله تهران', titleEn: 'Solidarity Night at Laleh Hotel Tehran', date: '۶ اردیبهشت ۱۴۰۵', tag: 'مسئولیت اجتماعی', tagEn: 'Social Responsibility', text: 'مراسمی صمیمانه با حضور جمعی از هنرمندان سینما، تئاتر و موسیقی در فضای فرهنگی هتل.', textEn: 'An intimate gathering with a group of film, theater and music artists in the cultural atmosphere of the hotel.' },
  { title: 'پکیج همایش‌های تابستانی', titleEn: 'Summer Conference Package', date: 'تابستان ۱۴۰۵', tag: 'رویداد', tagEn: 'Event', text: 'پیشنهاد ویژه برای شرکت‌ها شامل سالن، پذیرایی، اقامت و خدمات تشریفات.', textEn: 'Special offer for companies including hall, catering, accommodation and hospitality services.' },
  { title: 'هفته طعم‌های ایرانی', titleEn: 'Persian Flavors Week', date: 'هر پنجشنبه', tag: 'غذا و نوشیدنی', tagEn: 'Food & Beverage', text: 'منوی ویژه رستوران حافظیه با اجرای مدرن از غذاهای اصیل ایرانی.', textEn: 'A special menu at Hafeziyeh Restaurant featuring modern takes on authentic Iranian dishes.' }
];

export const testimonials = [
  { name: 'هانیه مهرآبادی', nameEn: 'Hanieh Mehrabadi', role: 'مهمان هتل لاله تهران', roleEn: 'Laleh Hotel Guest', text: 'یکی از بهترین اقامت‌هایی بود که داشتم؛ هتل کنار پارک لاله بود و دسترسی عالی به دیدنی‌های تهران داشت.', textEn: 'One of the best stays I have ever had; the hotel was next to Laleh Park with great access to Tehran\'s attractions.', rate: 5 },
  { name: 'کامران صادقی', nameEn: 'Kamran Sadeghi', role: 'سفر کاری', roleEn: 'Business Traveler', text: 'لابی و اتاق‌ها پس از بازسازی حس هتل بین‌المللی واقعی دارند. رزرو، پذیرش و سرویس اتاق بسیار سریع بود.', textEn: 'The lobby and rooms feel like a real international hotel after the renovation. Booking, check-in and room service were very fast.', rate: 5 },
  { name: 'مریم احمدی‌فرد', nameEn: 'Maryam Ahmadi-Fard', role: 'مهمان خانوادگی', roleEn: 'Family Guest', text: 'صبحانه متنوع، برخورد محترمانه پرسنل و نزدیکی به موزه‌ها باعث شد دوباره انتخابش کنیم.', textEn: 'The varied breakfast, respectful staff and proximity to museums made us choose it again.', rate: 5 }
];

export const offers = [
  { id: 'business', title: 'پکیج سفر کاری', titleEn: 'Business Travel Package', price: 'از ۹.۸ میلیون تومان', items: ['اتاق دبل یا توئین', 'صبحانه و اینترنت رایگان', 'ترانسفر فرودگاهی با درخواست قبلی', 'دسترسی به سالن جلسه ۲ ساعته'], itemsEn: ['Double or Twin Room', 'Free breakfast & internet', 'Airport transfer on request', '2-hour meeting room access'] },
  { id: 'event', title: 'رویداد و اقامت', titleEn: 'Event & Stay Package', price: 'قیمت اختصاصی', items: ['رزرو سالن', 'پذیرایی میان‌وعده', 'اقامت مهمانان ویژه', 'هماهنگ‌کننده تشریفات'], itemsEn: ['Hall reservation', 'Refreshment service', 'VIP guest accommodation', 'Event coordinator'] }
];

export const extras = [
  { id: 'airport', title: 'ترانسفر فرودگاهی', titleEn: 'Airport Transfer', price: 1850000 },
  { id: 'spa', title: 'ماساژ و اسپا ۶۰ دقیقه', titleEn: '60-min Massage & Spa', price: 2100000 },
  { id: 'late', title: 'خروج دیرهنگام', titleEn: 'Late Checkout', price: 1750000 }
];

export const branches = [
  {
    id: 'tehran',
    city: 'تهران',
    cityEn: 'Tehran',
    name: 'هتل لاله تهران',
    nameEn: 'Laleh International Hotel Tehran',
    grade: '۵ ستاره',
    gradeEn: '5-star',
    image: asset('branches/tehran-hotel.jpg'),
    location: 'کنار پارک لاله، بلوار کشاورز',
    locationEn: 'Beside Laleh Park, Keshavarz Blvd.',
    short: 'هتل پنج‌ستاره تاریخی و نوسازی‌شده در قلب پایتخت با ۳۶۸ اتاق و سوئیت.',
    shortEn: 'A renovated five-star landmark in the heart of Tehran with 368 rooms and suites.',
    description: 'هتل بین‌المللی لاله تهران با اصالت اینترکنتیننتال سابق، موقعیتی ممتاز کنار پارک لاله، رستوران‌های متنوع، سالن‌های همایش و خدمات رفاهی کامل، انتخابی ایده‌آل برای سفرهای کاری و خانوادگی است.',
    descriptionEn: 'Formerly part of the InterContinental legacy, Laleh Tehran offers a privileged location beside Laleh Park, diverse restaurants, event halls and full leisure facilities for business and family stays.',
    tags: ['پارک لاله', '۳۶۸ اتاق', 'مرکز تهران'],
    tagsEn: ['Laleh Park', '368 rooms', 'Central Tehran']
  },
  {
    id: 'kandovan',
    city: 'کندوان تبریز',
    cityEn: 'Kandovan, Tabriz',
    name: 'هتل صخره‌ای لاله کندوان',
    nameEn: 'Laleh Kandovan Rocky Hotel',
    grade: '۵ ستاره بوتیک',
    gradeEn: '5-star boutique',
    image: asset('branches/tabriz.webp'),
    location: 'روستای تاریخی کندوان، ۶۰ کیلومتری تبریز',
    locationEn: 'Historic Kandovan village, 60 km from Tabriz',
    short: 'اقامتی متفاوت در دل صخره‌های طبیعی و یکی از خاص‌ترین هتل بوتیک‌های ایران.',
    shortEn: 'A unique stay inside natural rock formations; one of Iran\'s most distinctive boutique hotels.',
    description: 'هتل لاله کندوان در میان صخره‌های طبیعی روستای تاریخی کندوان قرار گرفته و تجربه‌ای کم‌نظیر از آرامش، طبیعت و معماری بومی را برای مهمانان رقم می‌زند.',
    descriptionEn: 'Laleh Kandovan is carved into the natural rocks of the historic village, offering a rare combination of silence, nature and vernacular architecture.',
    tags: ['صخره‌ای', 'بوتیک', 'طبیعت'],
    tagsEn: ['rocky', 'boutique', 'nature']
  },
  {
    id: 'sareyn',
    city: 'سرعین',
    cityEn: 'Sareyn',
    name: 'هتل لاله سرعین',
    nameEn: 'Laleh Sareyn Hotel',
    grade: '۴ ستاره',
    gradeEn: '4-star',
    image: asset('branches/sarein.webp'),
    location: 'شهر آب‌درمانی سرعین، اردبیل',
    locationEn: 'Wellness city of Sareyn, Ardabil',
    short: 'هتل چهارستاره با دسترسی عالی به چشمه‌های آب‌گرم و امکانات اقامتی کامل.',
    shortEn: 'A four-star hotel with easy access to Sareyn\'s hot springs and complete accommodation services.',
    description: 'هتل لاله سرعین با ۹۷ اتاق و سوئیت، نزدیکی به مراکز آب‌درمانی و فضای آرام کوهستانی، مقصدی مناسب برای سفرهای سلامت، خانوادگی و تفریحی است.',
    descriptionEn: 'With 97 rooms and suites near the hot spring centers, Laleh Sareyn is a calm mountain destination for wellness, family and leisure trips.',
    tags: ['آب‌درمانی', 'کوهستان', 'خانوادگی'],
    tagsEn: ['hot spring', 'mountain', 'family']
  },
  {
    id: 'bistoon',
    city: 'بیستون کرمانشاه',
    cityEn: 'Bistoon, Kermanshah',
    name: 'هتل کاروانسرای لاله بیستون',
    nameEn: 'Laleh Bistoon Caravanserai Hotel',
    grade: 'اقامت تاریخی',
    gradeEn: 'Historic stay',
    image: asset('branches/bistoon.jpg'),
    location: 'پایگاه جهانی بیستون، دامنه کوه بیستون',
    locationEn: 'Bistoon World Heritage site',
    short: 'اقامت در کاروانسرای صفوی روبه‌روی فرهادتراش و در قلب تاریخ ایران.',
    shortEn: 'A Safavid caravanserai stay facing Farhad Tarash in the heart of Iranian history.',
    description: 'کاروانسرای لاله بیستون تجربه‌ای شاعرانه از اقامت تاریخی ارائه می‌دهد؛ بنایی باشکوه در دامنه کوه بیستون که برای سفرهای فرهنگی و رویدادهای خاص مناسب است.',
    descriptionEn: 'Laleh Bistoon offers a poetic historic stay in a majestic caravanserai at the foot of Mount Bistoon, ideal for cultural trips and special events.',
    tags: ['تاریخی', 'صفوی', 'میراث جهانی'],
    tagsEn: ['historical', 'Safavid', 'world heritage']
  },
  {
    id: 'chabahar',
    city: 'چابهار',
    cityEn: 'Chabahar',
    name: 'هتل لاله چابهار',
    nameEn: 'Laleh Chabahar Hotel',
    grade: 'ساحلی',
    gradeEn: 'Seaside',
    image: asset('branches/chabahar.webp'),
    location: 'کرانه دریای عمان، منطقه آزاد چابهار',
    locationEn: 'Oman Sea coast, Chabahar Free Zone',
    short: 'اقامت ساحلی در یکی از جنوبی‌ترین نقاط ایران با دسترسی تجاری و گردشگری.',
    shortEn: 'A seaside stay in southern Iran with access to business and leisure attractions.',
    description: 'هتل لاله چابهار در مجاورت منطقه آزاد و ساحل دریای عمان قرار دارد و برای سفرهای تجاری، گردشگری و تجربه طبیعت جنوب ایران انتخابی جذاب است.',
    descriptionEn: 'Located near the free zone and the Oman Sea coast, Laleh Chabahar is ideal for business travel, leisure and exploring southern Iran.',
    tags: ['ساحل', 'منطقه آزاد', 'جنوب ایران'],
    tagsEn: ['beach', 'free zone', 'south Iran']
  },
  {
    id: 'sabalan',
    city: 'سبلان',
    cityEn: 'Sabalan',
    name: 'مجتمع آب‌درمانی سبلان',
    nameEn: 'Sabalan Wellness Complex',
    grade: 'تندرستی',
    gradeEn: 'Wellness',
    image: asset('branches/sabalan.jpg'),
    location: 'منطقه گردشگری سرعین',
    locationEn: 'Sareyn tourism area',
    short: 'مرکزی برای آرامش، آب‌درمانی و بازیابی انرژی در دل طبیعت.',
    shortEn: 'A center for relaxation, thermal wellness and energy renewal in nature.',
    description: 'مجتمع آب‌درمانی سبلان با تمرکز بر سلامت، آرامش و خدمات تندرستی، مکمل تجربه اقامت در منطقه سرعین و اردبیل است.',
    descriptionEn: 'Sabalan Wellness Complex focuses on health, relaxation and thermal services, complementing stays in Sareyn and Ardabil.',
    tags: ['اسپا', 'سلامت', 'آرامش'],
    tagsEn: ['spa', 'health', 'relaxation']
  }
];
