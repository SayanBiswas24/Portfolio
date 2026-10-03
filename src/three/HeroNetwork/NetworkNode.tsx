import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface NetworkNodeProps {
  position: [number, number, number];
  isCenter?: boolean;
  color?: string;
  size?: number;
  pulseSpeed?: number;
}

export const NetworkNode: React.FC<NetworkNodeProps> = ({
  position,
  isCenter = false,
  color,
  size,
  pulseSpeed = 1,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const baseSize = size || (isCenter ? 0.38 : 0.22);
  const nodeColor = color || (isCenter ? "#005A36" : "#2F7D5B");

  useFrame((state) => {
    if (!meshRef.current) return;
    // Very subtle breathing pulse for center node
    if (isCenter) {
      const t = state.clock.getElapsedTime() * pulseSpeed;
      const scale = 1 + Math.sin(t * 1.5) * 0.04;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[baseSize, 32, 32]} />
      <meshStandardMaterial
        color={nodeColor}
        roughness={0.4}
        metalness={0.15}
        emissive={isCenter ? "#003822" : "#000000"}
        emissiveIntensity={isCenter ? 0.3 : 0}
      />
      {/* Outer subtle halo ring for central node */}
      {isCenter && (
        <mesh>
          <ringGeometry args={[baseSize * 1.35, baseSize * 1.45, 32]} />
          <meshBasicMaterial
            color="#005A36"
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </mesh>
  );
};
