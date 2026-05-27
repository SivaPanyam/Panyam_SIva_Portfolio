// frontend/src/components/MatrixRain.tsx
import { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Matrix characters: Katakana, Numbers, Uppercase English
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
    const charArr = chars.split('');

    let fontSize = window.innerWidth < 768 ? 20 : 14;
    let columns = Math.floor(window.innerWidth / fontSize) + 1;
    
    // Y-coordinate drops tracker with random offsets so they start asynchronously
    let drops: number[] = Array(columns).fill(0).map(() => Math.floor(Math.random() * -15));

    // Dynamic resize handler to re-allocate drops array cleanly during orientation changes
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const newFontSize = window.innerWidth < 768 ? 20 : 14;
      fontSize = newFontSize;
      
      const newColumns = Math.floor(canvas.width / fontSize) + 1;
      
      if (newColumns > columns) {
        // Preserving existing columns, adding new ones trailing from above screen space
        const extraDrops = Array(newColumns - columns).fill(0).map(() => Math.floor(Math.random() * -20));
        drops = [...drops, ...extraDrops];
      } else if (newColumns < columns) {
        drops = drops.slice(0, newColumns);
      }
      
      columns = newColumns;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationFrameId: number;

    const draw = () => {
      // Semi-transparent canvas refresh to create the fading trail effect
      ctx.fillStyle = 'rgba(2, 10, 4, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArr[Math.floor(Math.random() * charArr.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Draw the leading glyph of each drop in pure white for dynamic high-contrast glow
        const isLead = Math.random() > 0.96;
        if (isLead) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#39ff14';
        } else {
          ctx.fillStyle = '#39ff14';
          ctx.shadowBlur = 0;
        }

        ctx.fillText(text, x, y);

        // Reset drops if they pass screen heights or random factors match
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // Begin render ticker loop
    draw();

    // Clean up event listeners and animation frames on unmount
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-25" 
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
