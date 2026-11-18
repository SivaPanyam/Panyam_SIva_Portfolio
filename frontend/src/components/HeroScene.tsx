import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import NeuralNetwork from './NeuralNetwork';
import { useUIStore, THEME_CONFIGS } from '../store/uiStore';

const HeroScene = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  const { activeTheme } = useUIStore();
  const themeConfig = THEME_CONFIGS[activeTheme] || THEME_CONFIGS.default;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Throttle rendering when tab is unfocused (saves battery/GPU)
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Throttle particle density when scrolled past hero section
    const handleScroll = () => {
      setIsScrolledPast(window.scrollY > window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const particleCount = isMobile || isScrolledPast ? 800 : 2500;

  if (!isTabVisible) {
    return <div className="hero-canvas-container w-full h-full fixed inset-0 -z-10 bg-black" />;
  }

  return (
    <div className="hero-canvas-container w-full h-full fixed inset-0 -z-10 bg-black pointer-events-none transition-colors duration-700">
      <Canvas 
        camera={{ position: [0, 0, 10] }} 
        data-testid="mock-canvas"
        gl={{ powerPreference: 'high-performance', antialias: false }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.6} />
        <pointLight position={[-10, -10, -5]} intensity={0.3} />
        
        {/* Dynamic Persistent Neural Network reflecting Global Theme */}
        <NeuralNetwork 
          pointColor={themeConfig.pointColor}
          lineColor={themeConfig.lineColor}
          pulseColor={themeConfig.pulseColor}
        />
        
        {/* Optimized ambient starry backdrop with auto-throttled count */}
        <Stars radius={100} depth={50} count={particleCount} factor={3} saturation={0} fade speed={isScrolledPast ? 0.3 : 0.8} />
        
        {/* Cinematic orbiting camera */}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={isScrolledPast ? 0.1 : 0.25} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
