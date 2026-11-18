// frontend/src/components/NeuralNetwork.tsx
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface Node {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  originalPos: THREE.Vector3;
}

interface PulseSignal {
  start: number;
  end: number;
  progress: number;
  speed: number;
}

interface NeuralNetworkProps {
  particleCount?: number;
  proximityThreshold?: number;
  pointColor?: string;
  lineColor?: string;
  pulseColor?: string;
  pulseCount?: number;
  interactive?: boolean;
}

const MOUSE_INFLUENCE_RADIUS = 4.5;
const MOUSE_GRAVITY = 0.04;

export const NeuralNetwork: React.FC<NeuralNetworkProps> = ({
  particleCount,
  proximityThreshold,
  pointColor = '#ffffff',
  lineColor = '#3f3f46', // zinc-700 for clear persistent visibility
  pulseColor = '#22d3ee', // bright cyan pulse
  pulseCount,
  interactive = true,
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const pulsesRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const isMobile = useMemo(() => typeof window !== 'undefined' && window.innerWidth < 768, []);
  
  const PARTICLE_COUNT = useMemo(() => particleCount || (isMobile ? 36 : 90), [particleCount, isMobile]);
  const PROXIMITY_THRESHOLD = useMemo(() => proximityThreshold || (isMobile ? 3.8 : 3.4), [proximityThreshold, isMobile]);
  const maxLineConnections = useMemo(() => (isMobile ? 120 : 320), [isMobile]);
  const PULSE_COUNT = useMemo(() => pulseCount || (isMobile ? 12 : 28), [pulseCount, isMobile]);

  const mouse3D = useRef(new THREE.Vector3());
  const forceDirection = useRef(new THREE.Vector3());
  const tempPulseVector = useRef(new THREE.Vector3());

  // Create persistent nodes with bounded floating physics
  const nodes = useMemo(() => {
    const temp: Node[] = [];
    const boundaryX = viewport.width * 0.85;
    const boundaryY = viewport.height * 0.85;
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * boundaryX,
        (Math.random() - 0.5) * boundaryY,
        (Math.random() - 0.5) * 5
      );
      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.006
      );
      temp.push({
        pos,
        vel,
        originalPos: pos.clone()
      });
    }
    return temp;
  }, [viewport, PARTICLE_COUNT]);

  const pointsPositions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    nodes.forEach((n, idx) => {
      arr[idx * 3] = n.pos.x;
      arr[idx * 3 + 1] = n.pos.y;
      arr[idx * 3 + 2] = n.pos.z;
    });
    return arr;
  }, [nodes, PARTICLE_COUNT]);

  const linePositions = useMemo(() => new Float32Array(maxLineConnections * 2 * 3), [maxLineConnections]);
  const pulsePositions = useMemo(() => new Float32Array(PULSE_COUNT * 3), [PULSE_COUNT]);

  const activePulses = useMemo(() => {
    const temp: PulseSignal[] = [];
    for (let i = 0; i < PULSE_COUNT; i++) {
      const start = Math.floor(Math.random() * PARTICLE_COUNT);
      temp.push({
        start,
        end: Math.floor(Math.random() * PARTICLE_COUNT),
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.01,
      });
    }
    return temp;
  }, [PULSE_COUNT, PARTICLE_COUNT]);

  useFrame((state) => {
    const { pointer } = state;
    
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = time * 0.01;
      groupRef.current.rotation.x = Math.sin(time * 0.04) * 0.012;
    }
    
    const m3D = mouse3D.current;
    if (interactive) {
      m3D.set(
        pointer.x * (viewport.width / 2),
        pointer.y * (viewport.height / 2),
        0
      );
    } else {
      m3D.set(9999, 9999, 9999);
    }

    const boundaryX = viewport.width * 0.9;
    const boundaryY = viewport.height * 0.9;

    // 1. Continuous smooth particle motion (never vanishes)
    nodes.forEach((node) => {
      node.pos.add(node.vel);

      const time = state.clock.getElapsedTime();
      node.pos.x += Math.sin(time * 0.8 + node.originalPos.y) * 0.0015;
      node.pos.y += Math.cos(time * 0.8 + node.originalPos.x) * 0.0015;

      if (interactive) {
        const distToMouse = node.pos.distanceTo(m3D);
        if (distToMouse < MOUSE_INFLUENCE_RADIUS) {
          const forceDir = forceDirection.current;
          forceDir.subVectors(m3D, node.pos).normalize();
          const factor = (1 - distToMouse / MOUSE_INFLUENCE_RADIUS) * MOUSE_GRAVITY;
          node.pos.addScaledVector(forceDir, factor);
        }
      }

      // Smooth bounce inside viewport boundary
      if (Math.abs(node.pos.x) > boundaryX) {
        node.vel.x *= -1;
        node.pos.x = Math.sign(node.pos.x) * boundaryX;
      }
      if (Math.abs(node.pos.y) > boundaryY) {
        node.vel.y *= -1;
        node.pos.y = Math.sign(node.pos.y) * boundaryY;
      }
      if (Math.abs(node.pos.z) > 4) {
        node.vel.z *= -1;
        node.pos.z = Math.sign(node.pos.z) * 4;
      }
    });

    // 2. Update Points attributes
    if (pointsRef.current) {
      const positionAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      nodes.forEach((node, idx) => {
        positionAttr.setXYZ(idx, node.pos.x, node.pos.y, node.pos.z);
      });
      positionAttr.needsUpdate = true;
    }

    // 3. Update dynamic connection lines
    let lineIdx = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        if (lineIdx >= maxLineConnections) break;

        const n1 = nodes[i];
        const n2 = nodes[j];
        const dist = n1.pos.distanceTo(n2.pos);

        if (dist < PROXIMITY_THRESHOLD) {
          linePositions[lineIdx * 6] = n1.pos.x;
          linePositions[lineIdx * 6 + 1] = n1.pos.y;
          linePositions[lineIdx * 6 + 2] = n1.pos.z;

          linePositions[lineIdx * 6 + 3] = n2.pos.x;
          linePositions[lineIdx * 6 + 4] = n2.pos.y;
          linePositions[lineIdx * 6 + 5] = n2.pos.z;

          lineIdx++;
        }
      }
    }

    for (let i = lineIdx; i < maxLineConnections; i++) {
      for (let offset = 0; offset < 6; offset++) {
        linePositions[i * 6 + offset] = 0;
      }
    }

    if (linesRef.current) {
      const linePosAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      linePosAttr.needsUpdate = true;
    }

    // 4. Update dynamic signal pulses
    activePulses.forEach((pulse, idx) => {
      pulse.progress += pulse.speed;
      
      if (pulse.progress >= 1) {
        pulse.progress = 0;
        pulse.start = Math.floor(Math.random() * PARTICLE_COUNT);
        
        let found = false;
        const startNode = nodes[pulse.start];
        for (let k = 0; k < 6; k++) {
          const candidate = Math.floor(Math.random() * PARTICLE_COUNT);
          if (candidate !== pulse.start && startNode.pos.distanceTo(nodes[candidate].pos) < PROXIMITY_THRESHOLD) {
            pulse.end = candidate;
            found = true;
            break;
          }
        }
        if (!found) {
          pulse.end = Math.floor(Math.random() * PARTICLE_COUNT);
        }
      }

      const startNode = nodes[pulse.start];
      const endNode = nodes[pulse.end];
      const vec = tempPulseVector.current;
      vec.lerpVectors(startNode.pos, endNode.pos, pulse.progress);
      
      pulsePositions[idx * 3] = vec.x;
      pulsePositions[idx * 3 + 1] = vec.y;
      pulsePositions[idx * 3 + 2] = vec.z;
    });

    if (pulsesRef.current) {
      const pulsePosAttr = pulsesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      pulsePosAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 3D Node points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pointsPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={pointColor}
          size={isMobile ? 0.12 : 0.1}
          sizeAttenuation={true}
          transparent
          opacity={0.75}
        />
      </points>

      {/* 3D dynamic connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={lineColor}
          transparent
          opacity={0.45}
          linewidth={1}
        />
      </lineSegments>

      {/* Energetic pulses flowing through the network */}
      <points ref={pulsesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pulsePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={pulseColor}
          size={isMobile ? 0.22 : 0.18}
          sizeAttenuation={true}
          transparent
          opacity={0.95}
        />
      </points>
    </group>
  );
};

export default NeuralNetwork;
