import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import NeuralNetwork from './NeuralNetwork';

const HeroScene = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="hero-canvas-container w-full h-full fixed inset-0 -z-10 bg-black pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10] }} data-testid="mock-canvas">
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.6} />
        <pointLight position={[-10, -10, -5]} intensity={0.3} />
        
        {/* Dynamic Persistent Neural Network */}
        <NeuralNetwork />
        
        {/* Ambient starry backdrop */}
        <Stars radius={100} depth={50} count={isMobile ? 1200 : 3500} factor={3.5} saturation={0} fade speed={0.8} />
        
        {/* Cinematic orbiting camera */}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.25} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
