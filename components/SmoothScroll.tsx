"use client";

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

export const SmoothScroll = ({ children }: { children: ReactNode }) => {
  return (
    <ReactLenis root options={{ 
      duration: 1.5, // Duração do deslize (mais longo = mais luxuoso)
      lerp: 0.05,     // Intensidade da inércia (menor = mais suave)
      smoothWheel: true,
      wheelMultiplier: 1,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      touchMultiplier: 2,
    }}>
      {children}
    </ReactLenis>
  );
};