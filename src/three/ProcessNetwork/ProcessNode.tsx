import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface ProcessNodeProps {
  position: [number, number, number];
  isActive: boolean;
  isPast: boolean;
  label: string;
  stageNumber: string;
  isDark?: boolean;
}

export const ProcessNode: React.FC<ProcessNodeProps> = ({
  position,
  isActive,
  isPast,
  isDark = false,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const targetScale = isActive ? 1.3 : isPast ? 1.05 : 0.9;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );

    if (ringRef.current && isActive) {
      ringRef.current.rotation.z += 0.02;
      const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 3) * 0.08;
      ringRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  const nodeColor = isActive
    ? isDark
      ? "#00A865"
      : "#005A36"
    : isPast
    ? isDark
      ? "#34B37D"
      : "#2F7D5B"
    : isDark
    ? "#384238"
    : "#5F5F5A";

  const ringColor = isDark ? "#00A865" : "#005A36";

  return (
    <group position={position}>
      {/* Node Sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshStandardMaterial
          color={nodeColor}
          roughness={0.3}
          metalness={0.2}
          emissive={isActive ? (isDark ? "#00683E" : "#003822") : "#000000"}
          emissiveIntensity={isActive ? (isDark ? 0.6 : 0.4) : 0}
        />
      </mesh>

      {/* Active Indicator Ring */}
      {isActive && (
        <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.42, 0.02, 16, 32]} />
          <meshBasicMaterial color={ringColor} transparent opacity={isDark ? 0.85 : 0.7} />
        </mesh>
      )}

      {/* Orbiting tiny satellite for active node */}
      {isActive && (
        <mesh position={[0.45, 0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color={isDark ? "#34B37D" : "#2F7D5B"} />
        </mesh>
      )}
    </group>
  );
};
