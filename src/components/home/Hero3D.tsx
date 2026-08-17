"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

/** Stylized electric guitar built from procedural geometry. */
function GuitarModel({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);

  const bodyGeom = useMemo(() => {
    // Single-cut body outline (in metres-ish units)
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
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const mx = mouse.current?.x ?? 0;
    const my = mouse.current?.y ?? 0;
    // Idle rotation + mouse parallax, softly damped
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y, Math.sin(t * 0.25) * 0.35 + mx * 0.45, 2, 0.016
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x, my * -0.25 + 0.05, 2, 0.016
    );
    group.current.rotation.z = -0.35;
  });

  const gold = "#c9a86b";
  const dark = "#14100c";

  return (
    <group ref={group} position={[0, -0.2, 0]} scale={1.05}>
      {/* Body */}
      <mesh geometry={bodyGeom} castShadow>
        <meshPhysicalMaterial
          color="#8a4413"
          metalness={0.25}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.08}
          sheen={0.4}
          sheenColor="#ffbb66"
        />
      </mesh>
      {/* Burst top overlay */}
      <mesh geometry={bodyGeom} position={[0, 0, 0.012]} scale={[0.94, 0.94, 1]}>
        <meshPhysicalMaterial
          color="#e2a34c"
          metalness={0.15}
          roughness={0.25}
          clearcoat={1}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.85, 0]} castShadow>
        <boxGeometry args={[0.3, 2.4, 0.14]} />
        <meshStandardMaterial color="#3d2b18" roughness={0.5} />
      </mesh>
      {/* Fingerboard */}
      <mesh position={[0, 1.85, 0.085]}>
        <boxGeometry args={[0.32, 2.4, 0.035]} />
        <meshPhysicalMaterial color={dark} roughness={0.3} clearcoat={0.6} />
      </mesh>
      {/* Frets */}
      {Array.from({ length: 14 }).map((_, i) => (
        <mesh key={i} position={[0, 0.78 + i * 0.16, 0.105]}>
          <boxGeometry args={[0.32, 0.012, 0.012]} />
          <meshStandardMaterial color={gold} metalness={0.9} roughness={0.25} />
        </mesh>
      ))}
      {/* Headstock */}
      <mesh position={[0, 3.25, 0]} rotation={[0.12, 0, 0]} castShadow>
        <boxGeometry args={[0.42, 0.75, 0.1]} />
        <meshPhysicalMaterial color={dark} roughness={0.25} clearcoat={0.8} />
      </mesh>
      {/* Tuners */}
      {[-1, 1].map((side) =>
        [0, 1, 2].map((i) => (
          <mesh key={`${side}-${i}`} position={[side * 0.26, 3.05 + i * 0.2, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.12, 16]} />
            <meshStandardMaterial color={gold} metalness={1} roughness={0.15} />
          </mesh>
        ))
      )}

      {/* Pickups */}
      {[0.28, -0.22].map((y) => (
        <mesh key={y} position={[0, y, 0.19]}>
          <boxGeometry args={[0.62, 0.22, 0.06]} />
          <meshStandardMaterial color="#0c0a08" metalness={0.6} roughness={0.35} />
        </mesh>
      ))}
      {/* Bridge */}
      <mesh position={[0, -0.62, 0.19]}>
        <boxGeometry args={[0.6, 0.12, 0.07]} />
        <meshStandardMaterial color={gold} metalness={1} roughness={0.2} />
      </mesh>
      {/* Knobs */}
      {[
        [0.55, -0.75], [0.75, -0.55],
      ].map(([x, y]) => (
        <mesh key={`${x}${y}`} position={[x, y, 0.19]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.08, 0.08, 24]} />
          <meshStandardMaterial color={gold} metalness={0.95} roughness={0.2} />
        </mesh>
      ))}

      {/* Strings */}
      {Array.from({ length: 6 }).map((_, i) => {
        const x = -0.115 + i * 0.046;
        return (
          <mesh key={i} position={[x, 1.45, 0.145]}>
            <cylinderGeometry args={[0.0035, 0.0035, 4.1, 6]} />
            <meshStandardMaterial
              color="#e8e4d8"
              metalness={1}
              roughness={0.3}
              emissive="#c9a86b"
              emissiveIntensity={0.08}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/** Gold dust particles drifting upward. */
function Particles({ count = 220 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) + 0.0035;
      if (y > 5) y = -5;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#e8c98a"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function MovingLight() {
  const ref = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.x = Math.sin(t * 0.4) * 4;
    ref.current.position.y = 2 + Math.cos(t * 0.3) * 1.5;
    ref.current.intensity = 14 + Math.sin(t * 1.2) * 4;
  });
  return <pointLight ref={ref} position={[3, 2, 3]} color="#ffd9a0" intensity={14} distance={20} />;
}

export function Hero3D({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 6.2], fov: 38 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
      aria-hidden
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.25} />
        <spotLight position={[-5, 6, 4]} angle={0.5} penumbra={1} intensity={40} color="#f4e8d0" castShadow />
        <MovingLight />
        <pointLight position={[-4, -2, -3]} intensity={6} color="#c96b4a" />

        <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.5}>
          <GuitarModel mouse={mouse} />
        </Float>

        <Particles />
        <ContactShadows position={[0, -2.6, 0]} opacity={0.55} scale={12} blur={2.8} far={4} color="#000000" />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
