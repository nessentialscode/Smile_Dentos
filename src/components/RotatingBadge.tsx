import React from 'react';

interface RotatingBadgeProps {
  size?: number;
  className?: string;
}

export const RotatingBadge: React.FC<RotatingBadgeProps> = ({ size = 114, className = '' }) => {
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
        flexShrink: 0,
      }}
    >
      {/* Crisp Circular Base Disc for Perfect Contrast & Fixed Baseline */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 8px 26px rgba(0, 0, 0, 0.25), 0 0 16px rgba(215, 248, 70, 0.25)',
          border: '2.5px solid rgba(255, 255, 255, 0.95)',
          zIndex: 1,
        }} 
      />

      {/* Slowly Spinning High-Resolution Smile Dentos Logo */}
      <div
        className="spin-slow"
        style={{
          position: 'relative',
          zIndex: 2,
          width: '78%',
          height: '78%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformOrigin: 'center center',
        }}
      >
        <img
          src="/images/smile_dentos_emblem.png"
          alt="Smile Dentos Logo"
          draggable={false}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
};
