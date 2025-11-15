import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card = ({ children, className = '', hover = false, onClick }: CardProps) => {
  const Component = hover || onClick ? motion.div : 'div';
  
  return (
    <Component
      className={`bg-white rounded-2xl shadow-card p-4 ${hover ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      {...(hover && {
        whileHover: { scale: 1.02, boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)' },
        transition: { duration: 0.2 }
      })}
    >
      {children}
    </Component>
  );
};



