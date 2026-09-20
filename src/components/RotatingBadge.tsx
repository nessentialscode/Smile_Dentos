import React from 'react';
import { motion } from 'framer-motion';

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
        perspective: '1000px',
        background: 'transparent',
      }}
    >
      {/* Background-free Smile Dentos Emblem Spinning Like a Coin in 3D Slowly */}
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{
          repeat: Infinity,
          duration: 9,
          ease: 'linear',
        }}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
          filter: 'drop-shadow(0 6px 18px rgba(0, 0, 0, 0.45)) drop-shadow(0 0 16px rgba(2, 132, 199, 0.35))',
        }}
      >
        <img
          src="/images/smile_dentos_emblem.png"
          alt="Smile Dentos Emblem"
          draggable={false}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            pointerEvents: 'none',
          }}
        />
      </motion.div>
    </div>
  );
};
