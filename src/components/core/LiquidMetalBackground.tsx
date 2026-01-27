// src/components/core/LiquidMetalBackground.tsx

"use client";
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

const MetalMaterial = shaderMaterial(
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

    // Simplex Noise
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= taylorInvSqrt(a0*a0 + h*h);
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 st = vUv;
      st.x *= 1.5; // Stretch the noise for a more fluid look
      
      // Mouse interaction
      float dist = distance(vUv, u_mouse);
      float influence = smoothstep(0.4, 0.0, dist);
      
      // Slow, heavy movement
      float time = u_time * 0.1;
      
      // Create fluid patterns
      float pattern = snoise(st + time + influence * 0.1);
      pattern = mix(pattern, snoise(st - time), 0.5);
      
      // === HIGH-CONTRAST PALETTE ===
      vec3 white = vec3(1.0, 1.0, 1.0);
      vec3 lightGrey = vec3(0.85, 0.85, 0.85);
      vec3 darkGrey = vec3(0.2, 0.2, 0.2);
      
      // Mix from light grey to dark grey based on noise
      vec3 color = mix(lightGrey, darkGrey, smoothstep(-0.2, 0.2, pattern));
      
      // Add bright highlights for the "metal" feel
      color = mix(color, white, smoothstep(0.8, 1.0, pattern));
      
      // Add grain
      float grain = fract(sin(dot(vUv, vec2(12.9898,78.233))) * 43758.5453) * 0.05;
      color -= grain;

      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ MetalMaterial });

function Scene() {
  const meshRef = useRef<any>();
  const { viewport } = useThree();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.u_time = state.clock.elapsedTime;
      meshRef.current.material.u_mouse.lerp(new THREE.Vector2((state.pointer.x + 1)/2, (state.pointer.y + 1)/2), 0.05);
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      {/* @ts-ignore */}
      <metalMaterial />
    </mesh>
  );
}

export const LiquidMetalBackground = () => (
  <div className="fixed inset-0 z-0 bg-[#EAEAEA]">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Scene />
    </Canvas>
  </div>
);