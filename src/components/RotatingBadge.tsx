import React from 'react';

interface RotatingBadgeProps {
  size?: number;
  className?: string;
}

export const RotatingBadge: React.FC<RotatingBadgeProps> = ({ size = 110, className = '' }) => {
  return (
    <div 
      className={`rotating-badge-wrap ${className}`}
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}
    >
      {/* Background circle */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          backgroundColor: 'var(--color-lime)',
          boxShadow: '0 8px 24px rgba(215, 248, 70, 0.25)',
          zIndex: 1
        }} 
      />

      {/* Rotating SVG with curved circular text */}
      <svg
        viewBox="0 0 100 100"
        className="spin-slow"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          overflow: 'visible'
        }}
      >
        <defs>
          <path
            id="badgeCirclePath"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>
        <text
          fill="var(--color-rust-dark)"
          fontSize="9"
          fontWeight="700"
          letterSpacing="1.2"
          style={{ textTransform: 'uppercase' }}
        >
          <textPath href="#badgeCirclePath" startOffset="0%">
            YOUR DENTAL HEALTH IS OUR TOP PRIORITY •
          </textPath>
        </text>
      </svg>

      {/* Center Tooth Line Icon */}
      <div 
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-rust-dark)'
        }}
      >
        <svg 
          width={size * 0.28} 
          height={size * 0.28} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 2C8.5 2 7 4.5 7 7c0 3 1.5 6 2 9 .3 1.8 1 4 3 4s2.7-2.2 3-4c.5-3 2-6 2-9 0-2.5-1.5-5-5-5z" />
          <path d="M10 8c.5-1 1.5-1.5 2-1.5s1.5.5 2 1.5" />
        </svg>
      </div>
    </div>
  );
};
