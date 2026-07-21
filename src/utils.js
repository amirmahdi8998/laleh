export const toman = (value, lang = 'fa', currency = 'toman') => {
  const locale = lang === 'en' ? 'en-US' : 'fa-IR';
  const rates = { toman: 1, usd: 715000, eur: 780000 };
  const labels = {
    toman: lang === 'en' ? ' Toman' : ' تومان',
    usd: lang === 'en' ? ' USD' : ' دلار',
    eur: lang === 'en' ? ' EUR' : ' یورو',
  };
  const converted = value / rates[currency];
  const rounded = currency === 'toman' ? Math.round(converted) : Number(converted.toFixed(2));
  const suffix = labels[currency] || labels.toman;
  const formatted = currency === 'toman'
    ? new Intl.NumberFormat(locale).format(rounded)
    : new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'fa-IR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(rounded);
  return `${formatted}${suffix}`;
};

export const convertPrice = (value, currency) => {
  const rates = { toman: 1, usd: 715000, eur: 780000 };
  return value / (rates[currency] || 1);
};

export const toFa = (value, lang = 'fa') => {
  const locale = lang === 'en' ? 'en-US' : 'fa-IR';
  return new Intl.NumberFormat(locale).format(value);
};

export const diffNights = (checkin, checkout) => {
  if (!checkin || !checkout) return 0;
  const start = new Date(`${checkin}T12:00:00`);
  const end = new Date(`${checkout}T12:00:00`);
  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return Number.isFinite(diff) && diff > 0 ? diff : 0;
};

export const todayISO = () => new Date().toISOString().slice(0, 10);

export const addDaysISO = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

export const bookingCode = () => `LA-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

export const stripHtml = (html) => {
  const d = document.createElement('div');
  d.innerHTML = html || '';
  return d.textContent || '';
};

export const saveLead = (key, payload) => {
  const current = JSON.parse(localStorage.getItem(key) || '[]');
  const record = { ...payload, createdAt: new Date().toISOString() };
  localStorage.setItem(key, JSON.stringify([record, ...current].slice(0, 50)));
  return record;
};
