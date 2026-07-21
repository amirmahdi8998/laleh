import { useUI } from '../context';

const currencies = [
  { id: 'toman', label: 'IRR' },
  { id: 'usd', label: 'USD' },
  { id: 'eur', label: 'EUR' },
];

export default function CurrencyToggle() {
  const { currency, setCurrency } = useUI();
  return (
    <div className="currency-toggle">
      {currencies.map((c) => (
        <button key={c.id} className={`currency-btn${currency === c.id ? ' active' : ''}`} onClick={() => setCurrency(c.id)}>
          {c.label}
        </button>
      ))}
    </div>
  );
}
