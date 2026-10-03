import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ProcessNode } from "./ProcessNode";
import { ProcessConnections } from "./ProcessConnections";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ProcessSceneProps {
  activeStage: number; // 0 to 4
  progress: number; // 0 to 1
  prefersReducedMotion: boolean;
}

const STAGES = ["IDEA", "DESIGN", "CODE", "TEST", "DEPLOY"];

const ProcessScene: React.FC<ProcessSceneProps> = ({
  activeStage,
  progress,
  prefersReducedMotion,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 0));

  // 5 nodes spanning an architectural diagonal spiral in 3D space
  const nodes: [number, number, number][] = useMemo(
    () => [
      [-1.3, 1.4, 0.2], // 0: IDEA
      [-0.4, 0.7, -0.4], // 1: DESIGN
      [0.6, 0.0, 0.3], // 2: CODE
      [-0.3, -0.7, -0.3], // 3: TEST
      [1.2, -1.4, 0.2], // 4: DEPLOY
    ],
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;

    if (!prefersReducedMotion) {
      // Subtle continuous slow rotation around Y
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
      groupRef.current.rotation.x = Math.cos(t * 0.2) * 0.08;

      // Focus camera target toward the active node subtly
      const activeNodePos = nodes[activeStage] || nodes[0];
      const targetVec = new THREE.Vector3(
        activeNodePos[0] * 0.4,
        activeNodePos[1] * 0.4,
        activeNodePos[2] * 0.4
      );

      cameraTarget.current.lerp(targetVec, 0.06);
      state.camera.lookAt(cameraTarget.current);

      // Camera position moves subtly along with scroll progress
      // total camera move: ~0.8 units Y and ~0.4 units Z
      const targetCamY = 0.5 - progress * 1.0;
      const targetCamZ = 4.8 + Math.sin(progress * Math.PI) * 0.5;
      state.camera.position.y = THREE.MathUtils.lerp(
        state.camera.position.y,
        targetCamY,
        0.05
      );
      state.camera.position.z = THREE.MathUtils.lerp(
        state.camera.position.z,
        targetCamZ,
        0.05
      );
    } else {
      // Reduced motion: static camera
      state.camera.position.set(0, 0, 5);
      state.camera.lookAt(0, 0, 0);
      groupRef.current.rotation.set(0, 0, 0);
    }
  });

  return (
    <group ref={groupRef}>
      {/* 5 Process Nodes */}
      {nodes.map((pos, idx) => (
        <ProcessNode
          key={STAGES[idx]}
          position={pos}
          isActive={idx === activeStage}
          isPast={idx < activeStage}
          label={STAGES[idx]}
          stageNumber={`0${idx + 1}`}
        />
      ))}

      {/* Progressing Connections */}
      <ProcessConnections nodes={nodes} activeStage={activeStage} />
    </group>
  );
};

interface ProcessNetworkProps {
  activeStage: number; // 0 to 4
  progress: number; // 0 to 1
}

export const ProcessNetwork: React.FC<ProcessNetworkProps> = ({
  activeStage,
  progress,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="w-full h-[400px] sm:h-[480px] lg:h-[520px] relative select-none"
      aria-label="3D Workflow Process Visualization"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.85} />
        <directionalLight position={[6, 8, 4]} intensity={1.1} color="#FAF9F6" />
        <pointLight position={[-3, -4, 2]} intensity={1.2} color="#005A36" />

        <Suspense fallback={null}>
          <ProcessScene
            activeStage={activeStage}
            progress={progress}
            prefersReducedMotion={prefersReducedMotion}
          />
        </Suspense>
      </Canvas>

      {/* Technical coordinate frame watermark */}
      <div className="absolute bottom-2 left-2 font-mono text-[9px] text-[#5F5F5A]/60 uppercase tracking-widest pointer-events-none">
        PIPELINE // STAGE: {STAGES[activeStage]} (0{activeStage + 1}/05)
      </div>
    </div>
  );
};
