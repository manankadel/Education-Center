// src/components/core/InteractiveLiquidBackground.tsx

"use client";
import * as THREE from 'three';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { shaderMaterial } from '@react-three/drei';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float u_time;
  uniform vec2 u_mouse;
  
  float random (vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); }
  float noise (vec2 st) {
      vec2 i = floor(st); vec2 f = fract(st);
      float a = random(i); float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0)); float d = random(i + vec2(1.0, 1.0));
      vec2 u = f*f*(3.0-2.0*f);
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 st = vUv;
    float dist = distance(st, u_mouse);
    float influence = smoothstep(0.5, 0.0, dist);
    
    vec2 pos = st * 2.0; 
    float t = u_time * 0.2;
    pos.x += t;
    pos.y += sin(t + pos.x) * 0.5;
    
    float n = noise(pos);
    float ripple = sin(dist * 40.0 - u_time * 5.0) * influence * 0.02;
    float pattern = n + ripple;
    
    // === THE CORRECT WHITE/GREY PALETTE ===
    vec3 colorA = vec3(0.98, 0.98, 0.98); // White
    vec3 colorB = vec3(0.90, 0.90, 0.90); // Light Grey
    
    vec3 color = mix(colorA, colorB, smoothstep(0.2, 0.8, pattern));
    color += vec3(influence * 0.05);

    gl_FragColor = vec4(color, 1.0);
  }
`;

const LiquidMaterial = shaderMaterial(
  { u_time: 0, u_mouse: new THREE.Vector2(0.5, 0.5) },
  vertexShader,
  fragmentShader
);

extend({ LiquidMaterial });

function Scene() {
  const materialRef = useRef<any>(null);
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value += delta;
      const target = new THREE.Vector2((state.pointer.x + 1) / 2, (-state.pointer.y + 1) / 2);
      materialRef.current.uniforms.u_mouse.value.lerp(target, 0.1);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      {/* @ts-ignore */}
      <liquidMaterial ref={materialRef} />
    </mesh>
  );
}

export const InteractiveLiquidBackground = () => {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, background: '#ffffff' }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Scene />
      </Canvas>
    </div>
  );
};