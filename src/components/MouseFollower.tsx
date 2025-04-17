import { useEffect, useRef } from 'react';
import { useTheme } from './theme-provider';

const MouseFollower = () => {
  const followerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const follower = followerRef.current;
    if (!follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame: number;

    const getColor = () => {
      switch (theme) {
        case 'cyberpunk':
          return 'rgba(0, 255, 170, 0.15)';
        case 'retro':
          return 'rgba(0, 255, 0, 0.15)';
        default:
          return 'rgba(96, 165, 250, 0.15)';
      }
    };

    const animate = () => {
      // Slower following with stronger easing
      const dx = mouseX - currentX;
      const dy = mouseY - currentY;
      currentX += dx * 0.05; // Reduced from 0.1 to 0.05
      currentY += dy * 0.05; // Reduced from 0.1 to 0.05

      follower.style.transform = `translate(${currentX}px, ${currentY}px)`;
      follower.style.background = getColor();
      frame = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX - follower.offsetWidth / 2;
      mouseY = e.clientY - follower.offsetHeight / 2;
    };

    window.addEventListener('mousemove', handleMouseMove);
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, [theme]);

  return (
    <div 
      ref={followerRef}
      className="fixed pointer-events-none z-10 w-16 h-16 -translate-x-1/2 -translate-y-1/2
                 mix-blend-screen will-change-transform backdrop-blur-[50px] rounded-full
                 before:content-[''] before:absolute before:inset-0 
                 before:border before:border-primary/10 before:rounded-full
                 after:content-[''] after:absolute after:inset-1.5
                 after:border after:border-primary/5 after:rounded-full"
      style={{
        opacity: 0.4,
        filter: 'blur(4px)',
        transition: 'opacity 0.3s ease'
      }}
    />
  );
};

export default MouseFollower;
