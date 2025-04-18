import { useEffect, useRef } from 'react';
import { useTheme } from './theme-provider';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string | CanvasGradient | CanvasPattern;
  originalX: number;
  originalY: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouseX = 0;
    let mouseY = 0;
    let mouseTimeout: ReturnType<typeof setTimeout>;

    const getParticleColor = () => {
      switch (theme) {
        case 'cyberpunk':
          return [`rgba(0, 255, 170, ${Math.random() * 0.5 + 0.3})`,
                 `rgba(255, 0, 255, ${Math.random() * 0.5 + 0.3})`];
        case 'retro':
          return [`rgba(0, 255, 0, ${Math.random() * 0.5 + 0.3})`,
                 `rgba(0, 200, 0, ${Math.random() * 0.5 + 0.3})`];
        default:
          return [`rgba(96, 165, 250, ${Math.random() * 0.5 + 0.3})`,
                 `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.3})`];
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 5000);
      
      for (let i = 0; i < numParticles; i++) {
        const colors = getParticleColor();
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          vx: (Math.random() - 0.5) * 0.1, // Reduced from 0.2
          vy: (Math.random() - 0.5) * 0.1, // Reduced from 0.2
          vz: (Math.random() - 0.5) * 1,   // Reduced from 2
          size: Math.random() * 1.5 + 0.5,  // Adjusted size range
          color: Array.isArray(colors) ? colors[Math.floor(Math.random() * colors.length)] : colors,
          originalX: Math.random() * canvas.width,
          originalY: Math.random() * canvas.height
        });
      }
    };

    const updateParticles = () => {
      const mouseInfluence = 0.00002; // Reduced from 0.0001
      
      particles.forEach(p => {
        // Mouse influence with reduced effect
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) { // Reduced from 200
          const force = (150 - distance) * mouseInfluence;
          p.vx += dx * force;
          p.vy += dy * force;
        }

        // Return to original position more gently
        p.vx += (p.originalX - p.x) * 0.001; // Reduced from 0.002
        p.vy += (p.originalY - p.y) * 0.001; // Reduced from 0.002

        // Update position
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Add very subtle natural movement
        p.vx += (Math.random() - 0.5) * 0.005; // Reduced from 0.01
        p.vy += (Math.random() - 0.5) * 0.005; // Reduced from 0.01

        // Stronger damping for smoother movement
        p.vx *= 0.95;
        p.vy *= 0.95;

        // Reset if out of bounds
        if (p.z < 1) {
          p.z = 1000;
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
        }

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -0.5;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -0.5;
      });
    };

    const isString = (value: string | CanvasGradient | CanvasPattern): value is string => {
      return typeof value === 'string';
    };

    const getColorWithOpacity = (color: string | CanvasGradient | CanvasPattern, opacity: number): string | CanvasGradient | CanvasPattern => {
      if (isString(color) && color.startsWith('rgba')) {
        return `${color.slice(0, -1)}, ${opacity})`;
      }
      if (isString(color)) {
        return `rgba(${color}, ${opacity})`;
      }
      return color;
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        const scale = Math.min(1000 / Math.max(1, 1000 - p.z), 10); // Add upper limit to scale
        const x = p.x * scale;
        const y = p.y * scale;
        const scaledSize = Math.max(0.1, p.size * scale); // Ensure minimum size

        // Only draw if within bounds and has valid radius
        if (x >= -canvas.width && x <= canvas.width * 2 && 
            y >= -canvas.height && y <= canvas.height * 2 && 
            scaledSize > 0) {
          ctx.beginPath();
          ctx.arc(x, y, scaledSize, 0, Math.PI * 2);
          ctx.fillStyle = getColorWithOpacity(p.color, 0.8);
          ctx.fill();
        }

        // Draw connections with reduced visibility
        particles.forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80 && distance > 0) { // Reduced from 100
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${getColorWithOpacity(p.color, Math.max(0, 0.1 - distance / 800))}`;
            ctx.stroke();
          }
        });
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {}, 100);
    };

    // Initialize
    resizeCanvas();
    createParticles();
    animate();

    // Event listeners
    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(mouseTimeout);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
      style={{ position: 'fixed', top: 0, left: 0 }}
    />
  );
};

export default ParticleBackground;
