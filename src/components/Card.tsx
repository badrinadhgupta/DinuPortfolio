import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'hero' | 'fadeIn' | 'none';
  isVisible?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  animationType = 'none',
  isVisible = true,
  onClick 
}) => {
  // Hero card animation (starts in center, slides to position)
  const heroAnimation = {
    initial: { 
    //   position: 'fixed' as const,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, 20%) scale(1.2)',
      zIndex: 1000
    },
    animate: { 
      position: 'static' as const,
      top: 'auto',
      left: 'auto',
      transform: [
        'translate(-50%, 20%) scale(1.0)',  // First: scale down in center
        'translate(-50%, 20%) scale(1.0)',  // Stay in center (pause)
        'translate(0%, 0%) scale(1.0)'      // Then: move to final position
      ],
      zIndex: 'auto'
    },
    transition: { 
      duration: 1.6, 
      delay: 1,
      ease: "easeInOut",
      times: [0.4, 0.7, 1.0]  // Scale down, pause, then move
    }
  };

  // Fade in animation for other cards
  const fadeInAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: isVisible ? 1 : 0 },
    transition: { 
      duration: 1.0,
      delay: 2.6,
      ease: "easeOut"
    }
  };

  // No animation
  const noAnimation = {
    initial: {},
    animate: {},
    transition: {}
  };

  const animation = 
    animationType === 'hero' ? heroAnimation :
    animationType === 'fadeIn' ? fadeInAnimation :
    noAnimation;

  return (
    <motion.div
      {...animation}
      className={`rounded-xl 2xl font-serif ${className}`}
      onClick={onClick}
    >
      {animationType === 'fadeIn' ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            delay: 2.4,
            ease: "easeOut"
          }}
          className="h-full"
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
};

export default Card; 