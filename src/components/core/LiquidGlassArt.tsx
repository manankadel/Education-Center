"use client";
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

const GlassArtMaterial = shaderMaterial(
  { u_time: 0, u_mouse: new THREE.Vector2(0, 0) },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    varying vec2 vUv;
    uniform float u_time;
    uniform vec2 u_mouse;

    void main() {
      vec2 p = vUv;
      float t = u_time * 0.15;
      
      // Create soft liquid displacement
      for(float i = 1.0; i < 4.0; i++) {
        p.x += 0.3 / i * sin(i * 3.0 * p.y + t + u_mouse.x * 0.5);
        p.y += 0.3 / i * cos(i * 3.0 * p.x + t + u_mouse.y * 0.5);
      }

      // Greyscale Gradient Logic
      float color = 0.5 + 0.5 * sin(p.x + p.y + t);
      vec3 finalColor = mix(vec3(0.98), vec3(0.85), color); // Soft Off-whites to Light Greys
      
      // Subtle shadow depth
      float shadow = smoothstep(0.4, 0.7, color);
      finalColor = mix(finalColor, vec3(0.7), shadow * 0.2);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

extend({ GlassArtMaterial });

function Scene() {
  const meshRef = useRef<any>();
  const { viewport } = useThree();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.u_time = state.clock.elapsedTime;
      meshRef.current.material.u_mouse.lerp(state.pointer, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      {/* @ts-ignore */}
      <glassArtMaterial />
    </mesh>
  );
}

export const LiquidGlassArt = () => (
  <div className="fixed inset-0 z-0 bg-[#f9f9f9]">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Scene />
    </Canvas>
  </div>
);