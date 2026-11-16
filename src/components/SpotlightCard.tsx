import React, { useRef, useState } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  maxTilt?: number;
  as?: 'div' | 'article';
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(0, 245, 160, 0.16)',
  maxTilt = 4.5,
  as: Tag = 'div',
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [spot, setSpot] = useState({ x: 50, y: 50, opacity: 0 });
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / Math.max(rect.width, 1)) * 100;
    const py = (y / Math.max(rect.height, 1)) * 100;

    setSpot({ x: px, y: py, opacity: 1 });

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && maxTilt > 0) {
      const rx = ((py - 50) / 50) * -maxTilt;
      const ry = ((px - 50) / 50) * maxTilt;
      setTiltStyle({
        transform: `perspective(1100px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(4px)`,
      });
    }
  };

  const handlePointerLeave = () => {
    setSpot((prev) => ({ ...prev, opacity: 0 }));
    setTiltStyle({
      transform: 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
    });
  };

  return (
    <Tag
      ref={cardRef as React.RefObject<HTMLDivElement>}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={tiltStyle}
      className={`spotlight-card group relative overflow-hidden transition-transform duration-300 ease-out ${className}`}
    >
      {/* Dynamic Mouse-Tracking Radial Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px z-0 transition-opacity duration-300"
        style={{
          opacity: spot.opacity,
          background: `radial-gradient(520px circle at ${spot.x}% ${spot.y}%, ${glowColor}, transparent 45%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </Tag>
  );
};
