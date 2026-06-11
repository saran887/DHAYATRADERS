import React, { ReactNode } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

interface RevealCardProps {
  children: ReactNode;
  delay?: number;
  key?: React.Key;
}

export default function RevealCard({ children, delay = 0 }: RevealCardProps) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
