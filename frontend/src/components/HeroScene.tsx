// frontend/src/components/HeroScene.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

const HeroScene = () => {
  return (
    <div className="hero-canvas-container w-full h-screen absolute inset-0 -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 10] }} data-testid="mock-canvas">
        <ambientLight intensity={0.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls enableZoom={false} autoRotate speed={0.5} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
