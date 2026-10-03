import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { NetworkNode } from "./NetworkNode";
import { NetworkConnections } from "./NetworkConnections";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface NetworkSceneProps {
  mouse: { x: number; y: number };
  prefersReducedMotion: boolean;
}

const NetworkScene: React.FC<NetworkSceneProps> = ({
  mouse,
  prefersReducedMotion,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const baseRotationY = useRef(0);

  // 9 balanced spatial nodes representing software systems & architecture
  const nodes: [number, number, number][] = useMemo(
    () => [
      [0, 0, 0], // 0: Center node
      [-1.3, 0.9, 0.4], // 1: Top left
      [1.4, 0.8, -0.3], // 2: Top right
      [-1.5, -0.7, -0.4], // 3: Bottom left
      [1.2, -0.9, 0.5], // 4: Bottom right
      [0.2, 1.6, -0.5], // 5: Top peak
      [-0.1, -1.5, 0.3], // 6: Bottom anchor
      [1.8, 0.1, 0.2], // 7: Right wing
      [-1.9, 0.2, -0.1], // 8: Left wing
    ],
    []
  );

  // Interconnecting edges (systems architecture lattice)
  const edges: [number, number][] = useMemo(
    () => [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [1, 5],
      [2, 5],
      [1, 8],
      [3, 8],
      [2, 7],
      [4, 7],
      [3, 6],
      [4, 6],
      [1, 3],
      [2, 4],
    ],
    []
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!prefersReducedMotion) {
      // Slow continuous rotation: ~1 full turn per 30 seconds
      baseRotationY.current += delta * 0.2;

      // Floating sine motion (6-10px equivalent in world units)
      const floatY = Math.sin(state.clock.getElapsedTime() * 1.2) * 0.12;

      // Mouse response:
      // max rotX: ±4 deg (0.07 rad), max rotY: ±6 deg (0.1 rad)
      const targetRotX = mouse.y * 0.07;
      const targetRotY = baseRotationY.current + mouse.x * 0.1;
      const targetPosX = mouse.x * 0.15;
      const targetPosZ = mouse.y * 0.1;

      // Smooth physical damping
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        0.05
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        floatY,
        0.08
      );
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        targetPosX,
        0.05
      );
      groupRef.current.position.z = THREE.MathUtils.lerp(
        groupRef.current.position.z,
        targetPosZ,
        0.05
      );
    } else {
      // Reduced motion: static subtle angle, no continuous spin
      groupRef.current.rotation.set(0.1, 0.4, 0);
      groupRef.current.position.set(0, 0, 0);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central larger node */}
      <NetworkNode
        position={nodes[0]}
        isCenter={true}
        color="#005A36"
        size={0.42}
        pulseSpeed={1.2}
      />

      {/* Secondary nodes */}
      {nodes.slice(1).map((pos, idx) => (
        <NetworkNode
          key={idx + 1}
          position={pos}
          isCenter={false}
          color={idx % 2 === 0 ? "#2F7D5B" : "#111111"}
          size={0.22}
        />
      ))}

      {/* Connecting lines */}
      <NetworkConnections
        nodes={nodes}
        edges={edges}
        color="#2F7D5B"
        opacity={0.42}
      />
    </group>
  );
};

interface HeroNetworkProps {
  mouse?: { normalizedX: number; normalizedY: number };
}

export const HeroNetwork: React.FC<HeroNetworkProps> = ({ mouse }) => {
  const prefersReducedMotion = useReducedMotion();
  const currentMouse = mouse || { normalizedX: 0, normalizedY: 0 };

  return (
    <div
      className="w-full h-full min-h-[300px] sm:min-h-[380px] lg:min-h-[460px] relative select-none"
      aria-label="Interactive 3D Geometric Systems Network"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        {/* Simple restrained lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={1.1} color="#FAF9F6" />
        {/* Subtle forest green accent light */}
        <pointLight position={[-4, -3, 2]} intensity={1.2} color="#005A36" />

        <Suspense fallback={null}>
          <NetworkScene
            mouse={{ x: currentMouse.normalizedX, y: currentMouse.normalizedY }}
            prefersReducedMotion={prefersReducedMotion}
          />
        </Suspense>
      </Canvas>

      {/* Subtle bottom technical caption */}
      <div className="absolute bottom-2 right-2 font-mono text-[9px] text-[#5F5F5A]/70 uppercase tracking-widest pointer-events-none hidden sm:block">
        SYS.GEOM // 09 NODES ACTIVE
      </div>
    </div>
  );
};
