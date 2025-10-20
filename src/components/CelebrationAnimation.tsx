import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface CelebrationAnimationProps {
  type?: 'confetti' | 'fireworks' | 'particles';
  autoplay?: boolean;
}

export const CelebrationAnimation: React.FC<CelebrationAnimationProps> = ({
  type = 'confetti',
  autoplay = true,
}) => {
  useEffect(() => {
    if (!autoplay) return;

    const triggerAnimation = async () => {
      switch (type) {
        case 'confetti':
          // General confetti - falling pieces
          await confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            duration: 2000,
          });
          break;

        case 'fireworks':
          // Explosive fireworks - multiple bursts
          const duration = 3000;
          const animationEnd = Date.now() + duration;
          const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

          const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
          };

          const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
              clearInterval(interval);
              return;
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(
              Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
              })
            );
          }, 250);

          break;

        case 'particles':
          // Gentle particles - floating effect
          await confetti({
            particleCount: 50,
            spread: 45,
            origin: { y: 0.5 },
            gravity: 0.5,
            scalar: 0.8,
            duration: 2000,
          });
          break;
      }
    };

    triggerAnimation();
  }, [type, autoplay]);

  return null;
};
