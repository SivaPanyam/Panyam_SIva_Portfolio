// frontend/src/components/NeuralNetwork.tsx
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useUIStore } from '../store/uiStore';

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

const MOUSE_INFLUENCE_RADIUS = 4.0;
const MOUSE_GRAVITY = 0.05; // attraction strength

export const NeuralNetwork: React.FC<NeuralNetworkProps> = ({
  particleCount,
  proximityThreshold,
  pointColor = '#ffffff',
  lineColor = '#27272a', // delicate zinc-800
  pulseColor = '#ffffff',
  pulseCount,
  interactive = true,
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const pulsesRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const { isDevModeActive } = useUIStore();

  // Dynamic mobile viewport optimizations
  const isMobile = useMemo(() => typeof window !== 'undefined' && window.innerWidth < 768, []);
  
  const PARTICLE_COUNT = useMemo(() => particleCount || (isMobile ? 28 : 70), [particleCount, isMobile]);
  const PROXIMITY_THRESHOLD = useMemo(() => proximityThreshold || (isMobile ? 3.8 : 3.0), [proximityThreshold, isMobile]);
  const maxLineConnections = useMemo(() => (isMobile ? 80 : 250), [isMobile]);
  const PULSE_COUNT = useMemo(() => pulseCount || (isMobile ? 8 : 22), [pulseCount, isMobile]);

  // Pre-allocated vector references to guarantee zero per-frame allocations (GC protection)
  const mouse3D = useRef(new THREE.Vector3());
  const forceDirection = useRef(new THREE.Vector3());
  const tempPulseVector = useRef(new THREE.Vector3());

  // Create nodes with stable floating parameters
  const nodes = useMemo(() => {
    const temp: Node[] = [];
    const boundaryX = viewport.width * 0.7;
    const boundaryY = viewport.height * 0.7;
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * boundaryX,
        (Math.random() - 0.5) * boundaryY,
        (Math.random() - 0.5) * 6
      );
      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.01
      );
      temp.push({
        pos,
        vel,
        originalPos: pos.clone()
      });
    }
    return temp;
  }, [viewport, PARTICLE_COUNT]);

  // Positions array for points
  const pointsPositions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    nodes.forEach((n, idx) => {
      arr[idx * 3] = n.pos.x;
      arr[idx * 3 + 1] = n.pos.y;
      arr[idx * 3 + 2] = n.pos.z;
    });
    return arr;
  }, [nodes, PARTICLE_COUNT]);

  // Buffer geometries references for lines
  const linePositions = useMemo(() => new Float32Array(maxLineConnections * 2 * 3), [maxLineConnections]);

  // Positions array for moving synapse signals (pulses)
  const pulsePositions = useMemo(() => new Float32Array(PULSE_COUNT * 3), [PULSE_COUNT]);

  // Instantiated pulse signals
  const activePulses = useMemo(() => {
    const temp: PulseSignal[] = [];
    for (let i = 0; i < PULSE_COUNT; i++) {
      const start = Math.floor(Math.random() * PARTICLE_COUNT);
      temp.push({
        start,
        end: Math.floor(Math.random() * PARTICLE_COUNT),
        progress: Math.random(), // Distribute starting offsets
        speed: 0.006 + Math.random() * 0.012,
      });
    }
    return temp;
  }, [PULSE_COUNT, PARTICLE_COUNT]);

  useFrame((state) => {
    if (isDevModeActive) return;
    const { pointer } = state;
    
    // Ambient multi-axis slow drift rotation for depth immersion
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = time * 0.012;
      groupRef.current.rotation.x = Math.sin(time * 0.06) * 0.015;
    }
    
    // Map normalized device mouse coords (pointer.x, pointer.y) to 3D workspace
    const m3D = mouse3D.current;
    if (interactive) {
      m3D.set(
        pointer.x * (viewport.width / 2),
        pointer.y * (viewport.height / 2),
        0
      );
    } else {
      m3D.set(9999, 9999, 9999); // Bypass interaction
    }

    const boundaryX = viewport.width * 0.8;
    const boundaryY = viewport.height * 0.8;

    // 1. Update node physics
    nodes.forEach((node) => {
      // Add standard flow velocity
      node.pos.add(node.vel);

      // Subtle float oscillation around original position
      const time = state.clock.getElapsedTime();
      node.pos.x += Math.sin(time + node.originalPos.y) * 0.002;
      node.pos.y += Math.cos(time + node.originalPos.x) * 0.002;

      // Mouse interactive pull
      if (interactive) {
        const distToMouse = node.pos.distanceTo(m3D);
        if (distToMouse < MOUSE_INFLUENCE_RADIUS) {
          const forceDir = forceDirection.current;
          forceDir.subVectors(m3D, node.pos).normalize();
          const factor = (1 - distToMouse / MOUSE_INFLUENCE_RADIUS) * MOUSE_GRAVITY;
          node.pos.addScaledVector(forceDir, factor);
        }
      }

      // Boundary bounds check
      if (Math.abs(node.pos.x) > boundaryX) node.vel.x *= -1;
      if (Math.abs(node.pos.y) > boundaryY) node.vel.y *= -1;
      if (Math.abs(node.pos.z) > 4) node.vel.z *= -1;
    });

    // 2. Update Points rendering attributes
    if (pointsRef.current) {
      const positionAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      nodes.forEach((node, idx) => {
        positionAttr.setXYZ(idx, node.pos.x, node.pos.y, node.pos.z);
      });
      positionAttr.needsUpdate = true;
    }

    // 3. Connect close nodes dynamically to build network line coordinates
    let lineIdx = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        if (lineIdx >= maxLineConnections) break;

        const n1 = nodes[i];
        const n2 = nodes[j];
        const dist = n1.pos.distanceTo(n2.pos);

        if (dist < PROXIMITY_THRESHOLD) {
          // Write coordinates for node 1
          linePositions[lineIdx * 6] = n1.pos.x;
          linePositions[lineIdx * 6 + 1] = n1.pos.y;
          linePositions[lineIdx * 6 + 2] = n1.pos.z;

          // Write coordinates for node 2
          linePositions[lineIdx * 6 + 3] = n2.pos.x;
          linePositions[lineIdx * 6 + 4] = n2.pos.y;
          linePositions[lineIdx * 6 + 5] = n2.pos.z;

          lineIdx++;
        }
      }
    }

    // Clear unused segments by zeroing them out
    for (let i = lineIdx; i < maxLineConnections; i++) {
      for (let offset = 0; offset < 6; offset++) {
        linePositions[i * 6 + offset] = 0;
      }
    }

    if (linesRef.current) {
      const linePosAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      linePosAttr.needsUpdate = true;
    }

    // 4. Update dynamic synapse signal pulses
    activePulses.forEach((pulse, idx) => {
      pulse.progress += pulse.speed;
      
      if (pulse.progress >= 1) {
        pulse.progress = 0;
        pulse.start = Math.floor(Math.random() * PARTICLE_COUNT);
        
        // Find a connected candidate target index
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

      // Linear interpolation to find current signal position between start and end node
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
      {/* 3D static node points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pointsPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={pointColor}
          size={isMobile ? 0.09 : 0.08}
          sizeAttenuation={true}
          transparent
          opacity={0.5}
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
          opacity={0.3}
          linewidth={1}
        />
      </lineSegments>

      {/* Brighter energetic synapse pulses moving along lines */}
      <points ref={pulsesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pulsePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={pulseColor}
          size={isMobile ? 0.16 : 0.14}
          sizeAttenuation={true}
          transparent
          opacity={0.9}
        />
      </points>
    </group>
  );
};

export default NeuralNetwork;
