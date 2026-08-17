"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

type Props = {
  finish: "sunburst" | "obsidian" | "gold" | "emerald" | "crimson";
  wood: "maple" | "mahogany" | "ebony";
  pickups: "hss" | "hh" | "p90";
  hardware: "gold" | "chrome" | "black";
  engravingText?: string;
};

const FINISH_COLORS = {
  sunburst: { base: "#e8a448", rim: "#7a3b10", clearcoat: 1 },
  obsidian: { base: "#1e1e24", rim: "#08080a", clearcoat: 0.9 },
  gold: { base: "#d4af37", rim: "#8a6c22", clearcoat: 1 },
  emerald: { base: "#2d7a52", rim: "#0e331f", clearcoat: 1 },
  crimson: { base: "#9e2a2b", rim: "#3b0c0d", clearcoat: 1 },
};

const HARDWARE_COLORS = {
  gold: "#c9a86b",
  chrome: "#e0e0e0",
  black: "#222225",
};

function CustomGuitarModel({ finish, wood, pickups, hardware }: Props) {
  const groupRef = useRef<THREE.Group>(null);

  const bodyGeom = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 1.05);
    s.bezierCurveTo(-0.85, 1.05, -1.05, 0.55, -1.0, 0.05);
    s.bezierCurveTo(-0.95, -0.55, -0.72, -1.1, 0, -1.1);
    s.bezierCurveTo(0.78, -1.1, 1.02, -0.5, 0.98, 0.1);
    s.bezierCurveTo(0.95, 0.6, 0.6, 0.75, 0.35, 0.8);
    s.bezierCurveTo(0.18, 0.84, 0.12, 1.05, 0, 1.05);
    const g = new THREE.ExtrudeGeometry(s, {
      depth: 0.28,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.06,
      bevelSegments: 6,
      curveSegments: 48,
    });
    g.center();
    return g;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
  });

  const finishTheme = FINISH_COLORS[finish];
  const hwColor = HARDWARE_COLORS[hardware];

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={1.1}>
      {/* Guitar Body Base */}
      <mesh geometry={bodyGeom} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={finishTheme.base}
          metalness={finish === "gold" ? 0.6 : 0.2}
          roughness={0.15}
          clearcoat={finishTheme.clearcoat}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Sunburst / Rim Burst Overlay */}
      <mesh geometry={bodyGeom} position={[0, 0, 0.012]} scale={[0.95, 0.95, 1]}>
        <meshPhysicalMaterial
          color={finishTheme.rim}
          metalness={0.1}
          roughness={0.2}
          transparent
          opacity={finish === "sunburst" || finish === "emerald" || finish === "crimson" ? 0.6 : 0.2}
        />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.85, 0]} castShadow>
        <boxGeometry args={[0.3, 2.4, 0.14]} />
        <meshStandardMaterial color={wood === "mahogany" ? "#3d2415" : wood === "ebony" ? "#1a1614" : "#6e5238"} roughness={0.4} />
      </mesh>

      {/* Fingerboard */}
      <mesh position={[0, 1.85, 0.085]}>
        <boxGeometry args={[0.32, 2.4, 0.035]} />
        <meshPhysicalMaterial color={wood === "ebony" ? "#0f0e0d" : "#2e1e12"} roughness={0.25} />
      </mesh>

      {/* Frets */}
      {Array.from({ length: 14 }).map((_, i) => (
        <mesh key={i} position={[0, 0.78 + i * 0.16, 0.105]}>
          <boxGeometry args={[0.32, 0.012, 0.012]} />
          <meshStandardMaterial color={hwColor} metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Pickups */}
      {pickups === "hh" ? (
        [0.28, -0.22].map((y) => (
          <mesh key={y} position={[0, y, 0.19]}>
            <boxGeometry args={[0.62, 0.22, 0.06]} />
            <meshStandardMaterial color="#0c0a08" metalness={0.6} roughness={0.35} />
          </mesh>
        ))
      ) : pickups === "p90" ? (
        [0.3, -0.2].map((y) => (
          <mesh key={y} position={[0, y, 0.19]}>
            <boxGeometry args={[0.66, 0.26, 0.05]} />
            <meshStandardMaterial color="#181716" metalness={0.4} roughness={0.3} />
          </mesh>
        ))
      ) : (
        <>
          <mesh position={[0, 0.35, 0.19]}>
            <boxGeometry args={[0.55, 0.12, 0.05]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.1, 0.19]}>
            <boxGeometry args={[0.55, 0.12, 0.05]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.22, 0.19]}>
            <boxGeometry args={[0.62, 0.22, 0.06]} />
            <meshStandardMaterial color="#0c0a08" metalness={0.8} />
          </mesh>
        </>
      )}

      {/* Bridge */}
      <mesh position={[0, -0.62, 0.19]}>
        <boxGeometry args={[0.6, 0.12, 0.07]} />
        <meshStandardMaterial color={hwColor} metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Knobs */}
      {[
        [0.55, -0.75],
        [0.75, -0.55],
      ].map(([x, y]) => (
        <mesh key={`${x}${y}`} position={[x, y, 0.19]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.08, 0.08, 24]} />
          <meshStandardMaterial color={hwColor} metalness={0.95} roughness={0.2} />
        </mesh>
      ))}

      {/* Strings */}
      {Array.from({ length: 6 }).map((_, i) => {
        const x = -0.115 + i * 0.046;
        return (
          <mesh key={i} position={[x, 1.45, 0.145]}>
            <cylinderGeometry args={[0.0035, 0.0035, 4.1, 6]} />
            <meshStandardMaterial color="#e8e4d8" metalness={1} roughness={0.2} />
          </mesh>
        );
      })}
    </group>
  );
}

export function CustomShop3D(props: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 5.8], fov: 40 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      className="w-full h-full"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <spotLight position={[-4, 6, 5]} angle={0.5} penumbra={1} intensity={35} color="#fff2df" castShadow />
        <pointLight position={[3, 2, 4]} intensity={12} color="#ffd9a0" />
        <pointLight position={[-3, -2, -3]} intensity={8} color="#c9a86b" />

        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
          <CustomGuitarModel {...props} />
        </Float>

        <ContactShadows position={[0, -2.4, 0]} opacity={0.6} scale={10} blur={2.5} far={4} color="#000000" />
        <Environment preset="city" />
        <OrbitControls enableZoom={true} minDistance={3.5} maxDistance={8} maxPolarAngle={Math.PI / 1.8} />
      </Suspense>
    </Canvas>
  );
}
