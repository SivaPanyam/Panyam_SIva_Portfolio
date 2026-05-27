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

const MOUSE_INFLUENCE_RADIUS = 4.0;
const MOUSE_GRAVITY = 0.05; // attraction strength

const NeuralNetwork: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { viewport } = useThree();
  const { isDevModeActive } = useUIStore();

  // Dynamic mobile viewport optimizations
  const isMobile = useMemo(() => typeof window !== 'undefined' && window.innerWidth < 768, []);
  const PARTICLE_COUNT = isMobile ? 28 : 70;
  const PROXIMITY_THRESHOLD = isMobile ? 3.8 : 3.0;
  const maxLineConnections = isMobile ? 80 : 250;

  // Pre-allocated vector references to ensure zero per-frame allocations (eliminates GC stutters)
  const mouse3D = useRef(new THREE.Vector3());
  const forceDirection = useRef(new THREE.Vector3());

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
  // Max possible lines is combination: N * (N - 1) / 2
  const linePositions = useMemo(() => new Float32Array(maxLineConnections * 2 * 3), [maxLineConnections]);

  useFrame((state) => {
    if (isDevModeActive) return;
    const { pointer } = state;
    
    // Map normalized device mouse coords (pointer.x, pointer.y) to 3D workspace
    const m3D = mouse3D.current;
    m3D.set(
      pointer.x * (viewport.width / 2),
      pointer.y * (viewport.height / 2),
      0
    );

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
      const distToMouse = node.pos.distanceTo(m3D);
      if (distToMouse < MOUSE_INFLUENCE_RADIUS) {
        const forceDir = forceDirection.current;
        forceDir.subVectors(m3D, node.pos).normalize();
        const factor = (1 - distToMouse / MOUSE_INFLUENCE_RADIUS) * MOUSE_GRAVITY;
        node.pos.addScaledVector(forceDir, factor);
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
  });

  return (
    <group>
      {/* 3D points rendering */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pointsPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ffffff"
          size={0.08}
          sizeAttenuation={true}
          transparent
          opacity={0.6}
        />
      </points>

      {/* 3D dynamic connection lines rendering */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#27272a" // delicate monochrome grey line (zinc-800)
          transparent
          opacity={0.35}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
};

export default NeuralNetwork;
