// src/components/core/InteractiveLiquidBackground.tsx

"use client";
import * as THREE from 'three';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { shaderMaterial } from '@react-three/drei';

const LiquidMaterial = shaderMaterial(
  { u_time: 0, u_mouse: new THREE.Vector2(0.5, 0.5), u_resolution: new THREE.Vector2(1, 1) },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader (The "Crazy" B&W Liquid)
  `
    varying vec2 vUv;
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec2 u_resolution;

    void main() {
        vec2 st = vUv;
        
        // Correct aspect ratio
        float aspect = u_resolution.x / u_resolution.y;
        st.x *= aspect;
        vec2 mouse = u_mouse;
        mouse.x *= aspect;

        // Interaction
        float dist = distance(st, mouse);
        float interact = smoothstep(0.5, 0.0, dist);
        
        // === HIGH SPEED FLOW ===
        float t = u_time * 0.8; // Fast movement
        
        // Create warping coordinates
        vec2 p = st * 8.0; // Scale up (More ripples)
        
        // Complex wave math for "Liquid" feel
        float a = sin(p.x + t);
        float b = sin(p.y + t);
        float c = sin(p.x + p.y + t);
        float d = sin(length(p) + t);
        
        // Combine waves
        float v = a + b + c + d;
        
        // Distort with mouse
        v += interact * 2.0;

        // === BLACK & WHITE THRESHOLD ===
        // This creates the sharp "Oil" look
        
        vec3 col = vec3(0.0); // Start Black
        
        // Add White ripples based on wave height
        // smoothstep creates the soft-but-defined edges
        col = mix(vec3(0.05), vec3(0.95), smoothstep(-2.0, 2.0, v));
        
        // Add "Chrome" highlights at peaks
        col += smoothstep(2.5, 3.0, v) * 0.5;

        // Dark Vignette to focus center
        float vig = 1.0 - length(vUv - 0.5);
        col *= smoothstep(0.0, 0.8, vig);

        gl_FragColor = vec4(col, 1.0);
    }
  `
);

extend({ LiquidMaterial });

function Scene() {
  const materialRef = useRef<any>(null);
  const { viewport, size } = useThree();

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value += delta;
      
      const targetMouse = new THREE.Vector2(
        (state.pointer.x + 1) / 2,
        (state.pointer.y + 1) / 2
      );
      materialRef.current.uniforms.u_mouse.value.lerp(targetMouse, 0.1);
      materialRef.current.uniforms.u_resolution.value.set(size.width, size.height);
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      {/* @ts-ignore */}
      <liquidMaterial ref={materialRef} />
    </mesh>
  );
}

export const InteractiveLiquidBackground = () => {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, background: '#000000' }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Scene />
      </Canvas>
    </div>
  );
};