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
    <div className="hero-canvas-container w-full h-screen absolute inset-0 -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 10] }} data-testid="mock-canvas">
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        <pointLight position={[-10, -10, -5]} intensity={0.2} />
        
        {/* Dynamic Interactive Neural Network */}
        <NeuralNetwork />
        
        {/* Ambient starry backdrop */}
        <Stars radius={100} depth={50} count={isMobile ? 900 : 3000} factor={3} saturation={0} fade speed={0.8} />
        
        {/* Cinematic orbiting camera */}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
