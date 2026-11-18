import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import NeuralNetwork from './NeuralNetwork';
import { useUIStore, THEME_CONFIGS } from '../store/uiStore';

const HeroScene = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { activeTheme } = useUIStore();
  const themeConfig = THEME_CONFIGS[activeTheme] || THEME_CONFIGS.default;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="hero-canvas-container w-full h-full fixed inset-0 z-0 pointer-events-none transition-colors duration-700">
      <Canvas camera={{ position: [0, 0, 7.5], fov: 60 }} data-testid="mock-canvas">
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        {/* Dynamic Persistent Neural Network reflecting Global Theme */}
        <NeuralNetwork 
          pointColor={themeConfig.pointColor}
          lineColor={themeConfig.lineColor}
          pulseColor={themeConfig.pulseColor}
        />
        
        {/* Ambient starry backdrop */}
        <Stars radius={100} depth={50} count={isMobile ? 1400 : 4000} factor={4} saturation={1} fade speed={1.2} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
