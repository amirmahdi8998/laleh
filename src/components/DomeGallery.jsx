import { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import { useSpring, animated, to } from '@react-spring/web';
import './DomeGallery.css';

const R = 420;
const GAP = 0.42;

function sphericalCoords(theta, phi) {
  const x = R * Math.sin(phi) * Math.cos(theta);
  const y = R * Math.cos(phi);
  const z = R * Math.sin(phi) * Math.sin(theta);
  return { x, y, z };
}

export default function DomeGallery({
  images = [],
  className = '',
  spread = 1.2,
  onClickImage,
}) {
  const containerRef = useRef(null);
  const [zoomed, setZoomed] = useState(null);
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, rotX: 0, rotY: 0 });

  const items = useMemo(() => {
    const n = images.length;
    if (!n) return [];
    return images.map((src, i) => {
      const theta = (i / n) * Math.PI * 2 * spread;
      const phi = GAP + (i / (n - 1 || 1)) * (Math.PI - 2 * GAP);
      const { x, y, z } = sphericalCoords(theta, phi);
      const scale = 0.5 + (z + R) / (2 * R) * 0.5;
      return { src, x, y, z, scale, theta, phi };
    });
  }, [images, spread]);

  const [{ rotX, rotY }, api] = useSpring(() => ({ rotX: 0, rotY: 0, config: { mass: 2, tension: 180, friction: 28 } }));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const d = dragRef.current;

    const onDown = (e) => {
      d.dragging = true;
      d.startX = e.clientX;
      d.startY = e.clientY;
      d.rotX = rotX.get();
      d.rotY = rotY.get();
    };
    const onMove = (e) => {
      if (!d.dragging) return;
      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;
      api.start({ rotY: d.rotY + dx * 0.008, rotX: d.rotX - dy * 0.008 });
    };
    const onUp = () => { d.dragging = false; };

    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [api, rotX, rotY]);

  const handleClick = useCallback(
    (i) => {
      if (onClickImage) onClickImage(images[i], i);
    },
    [images, onClickImage]
  );

  return (
    <div ref={containerRef} className={`dome-gallery ${className}`}>
      <animated.div
        className="dome-gallery-sphere"
        style={{
          transform: to([rotX, rotY], (rx, ry) => `rotateX(${rx}rad) rotateY(${ry}rad)`),
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className={`dome-gallery-item${zoomed === i ? ' zoomed' : ''}`}
            style={{
              '--x': `${item.x}px`,
              '--y': `${item.y}px`,
              '--z': `${item.z}px`,
              '--s': item.scale,
              zIndex: Math.round(item.z + R),
            }}
            onClick={() => {
              if (zoomed === i) {
                setZoomed(null);
              } else {
                setZoomed(i);
                handleClick(i);
              }
            }}
          >
            <img src={item.src} alt="" draggable={false} />
          </div>
        ))}
      </animated.div>
      {zoomed !== null && (
        <div className="dome-gallery-close" onClick={() => setZoomed(null)}>
          ✕
        </div>
      )}
    </div>
  );
}
