import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
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
    <div className="hero-canvas-container w-full h-full fixed inset-0 -z-10 bg-black pointer-events-none transition-colors duration-700">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 60 }} 
        data-testid="mock-canvas"
        gl={{ powerPreference: 'high-performance', antialias: true, alpha: true }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        {/* Dynamic Persistent Neural Network reflecting Global Theme */}
        <NeuralNetwork 
          pointColor={themeConfig.pointColor}
          lineColor={themeConfig.lineColor}
          pulseColor={themeConfig.pulseColor}
          particleCount={isMobile ? 50 : 120}
        />
        
        {/* Ambient starry backdrop */}
        <Stars radius={100} depth={50} count={isMobile ? 1500 : 3500} factor={4} saturation={0} fade speed={1.2} />
        
        {/* Cinematic orbiting camera */}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
