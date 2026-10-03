import React, { useMemo } from "react";
import * as THREE from "three";

interface ConnectionProps {
  nodes: [number, number, number][];
  edges: [number, number][];
  color?: string;
  opacity?: number;
}

export const NetworkConnections: React.FC<ConnectionProps> = ({
  nodes,
  edges,
  color = "#2F7D5B",
  opacity = 0.38,
}) => {
  const lineGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (const [startIdx, endIdx] of edges) {
      if (nodes[startIdx] && nodes[endIdx]) {
        points.push(new THREE.Vector3(...nodes[startIdx]));
        points.push(new THREE.Vector3(...nodes[endIdx]));
      }
    }
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    return geom;
  }, [nodes, edges]);

  return (
    <lineSegments geometry={lineGeometry}>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </lineSegments>
  );
};
