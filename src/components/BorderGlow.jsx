import { useRef, useCallback } from 'react';
import './BorderGlow.css';

export default function BorderGlow({ children, className = '', intensity = 0.35, size = 300, ...props }) {
  const containerRef = useRef(null);
  const glowRef = useRef(null);

  const handleMove = useCallback((e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (glowRef.current) {
      glowRef.current.style.setProperty('--mx', `${x}px`);
      glowRef.current.style.setProperty('--my', `${y}px`);
    }
  }, []);

  const handleLeave = useCallback(() => {
    if (glowRef.current) {
      glowRef.current.style.setProperty('--mx', '50%');
      glowRef.current.style.setProperty('--my', '50%');
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`border-glow-wrap ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...props}
    >
      <svg className="border-glow-svg" aria-hidden>
        <defs>
          <filter id="glowDisp">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.06" numOctaves="2" seed="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G">
              <animate attributeName="scale" values="0;6;0" dur="2s" begin="hover" fill="freeze" />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>
      <div
        ref={glowRef}
        className="border-glow-overlay"
        style={{
          background: `radial-gradient(${size}px circle at var(--mx, 50%) var(--my, 50%), rgba(214,174,93,${intensity}), transparent)`,
        }}
      />
      {children}
    </div>
  );
}
