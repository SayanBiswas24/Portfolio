import React, { useMemo } from "react";
import * as THREE from "three";

interface ProcessConnectionsProps {
  nodes: [number, number, number][];
  activeStage: number; // 0 to 4
}

export const ProcessConnections: React.FC<ProcessConnectionsProps> = ({
  nodes,
  activeStage,
}) => {
  // Segments between adjacent nodes
  const segments = useMemo(() => {
    const list: {
      points: [THREE.Vector3, THREE.Vector3];
      status: "active" | "past" | "upcoming";
    }[] = [];

    for (let i = 0; i < nodes.length - 1; i++) {
      const p1 = new THREE.Vector3(...nodes[i]);
      const p2 = new THREE.Vector3(...nodes[i + 1]);
      let status: "active" | "past" | "upcoming" = "upcoming";
      if (i < activeStage) {
        status = "past";
      } else if (i === activeStage) {
        status = "active";
      }
      list.push({ points: [p1, p2], status });
    }
    return list;
  }, [nodes, activeStage]);

  return (
    <group>
      {segments.map((seg, idx) => {
        const geom = new THREE.BufferGeometry().setFromPoints(seg.points);
        const color =
          seg.status === "past"
            ? "#2F7D5B"
            : seg.status === "active"
            ? "#005A36"
            : "#D8D5CE";
        const opacity = seg.status === "upcoming" ? 0.35 : 0.85;

        return (
          <lineSegments key={idx} geometry={geom}>
            <lineBasicMaterial
              color={color}
              transparent
              opacity={opacity}
              linewidth={seg.status === "active" ? 2 : 1}
              depthWrite={false}
            />
          </lineSegments>
        );
      })}
    </group>
  );
};
