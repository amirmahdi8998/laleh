import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './BounceCards.css';

export default function BounceCards({
  items,
  className = '',
  cardClass = '',
  renderCard,
  spread = 220,
  rotateRange = [-18, 18],
  delayStagger = 0.06,
  bounceDuration = 1.2,
}) {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      {
        y: 120,
        scale: 0.7,
        opacity: 0,
        rotate: (i) => rotateRange[0] + Math.random() * (rotateRange[1] - rotateRange[0]),
      },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: bounceDuration,
        stagger: delayStagger,
        ease: 'back.out(1.7)',
      }
    );
  }, [items, delayStagger, bounceDuration, rotateRange]);

  return (
    <div ref={containerRef} className={`bounce-cards ${className}`}>
      {items.map((item, i) => (
        <div
          key={item.id ?? i}
          ref={(el) => (cardsRef.current[i] = el)}
          className={`bounce-card ${cardClass}`}
          style={{ '--i': i, '--spread': `${spread}px` }}
        >
          {renderCard ? renderCard(item, i) : (
            <div className="bounce-card-default">
              {item.image && <img src={item.image} alt={item.title ?? ''} />}
              {item.title && <span>{item.title}</span>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
