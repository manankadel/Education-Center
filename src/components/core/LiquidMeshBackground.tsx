// src/components/core/LiquidMeshBackground.tsx

"use client";

import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

const SilkMaterial = shaderMaterial(
  { 
    u_time: 0, 
    u_mouse: new THREE.Vector2(0.5, 0.5),
    u_resolution: new THREE.Vector2(1, 1)
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec2 u_resolution;
    varying vec2 vUv;

    // Soft Noise
    float random (in vec2 _st) {
        return fract(sin(dot(_st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    float noise (in vec2 _st) {
        vec2 i = floor(_st);
        vec2 f = fract(_st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
        vec2 st = vUv;
        
        // Correct Aspect Ratio for circular interaction
        float aspect = u_resolution.x / u_resolution.y;
        vec2 mouse_corrected = u_mouse;
        mouse_corrected.x *= aspect;
        vec2 st_corrected = st;
        st_corrected.x *= aspect;

        // Mouse Interaction: Subtle "Pressure" field
        float dist = distance(st_corrected, mouse_corrected);
        float interaction = smoothstep(0.6, 0.0, dist); // Large, soft radius
        
        // Warp the coordinates based on time and mouse
        vec2 warp = st;
        warp += noise(vec2(st.x * 2.0 + u_time * 0.1, st.y * 2.0)) * 0.1; // Base flow
        warp += interaction * 0.05; // Mouse displaces the flow slightly

        // Generate the Silk Pattern
        float n1 = noise(warp * 3.0 + u_time * 0.05);
        float n2 = noise(warp * 6.0 - u_time * 0.05);
        
        // Combine noise layers
        float fluid = mix(n1, n2, 0.5);
        
        // Create the "Ridge" (The shiny part of the silk)
        float pattern = sin(fluid * 15.0 + st.x * 5.0);
        
        // === COLORS (Premium White/Silver) ===
        vec3 white = vec3(1.0, 1.0, 1.0);
        vec3 silver = vec3(0.93, 0.93, 0.95); // Very subtle grey
        vec3 platinum = vec3(0.85, 0.85, 0.88); // Slightly darker for depth
        
        // Mix colors based on the pattern
        vec3 color = mix(silver, white, smoothstep(-0.5, 0.5, pattern));
        
        // Add subtle shadows from mouse interaction (The reactiveness)
        color = mix(color, platinum, interaction * 0.2);

        gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ SilkMaterial });

const Scene = () => {
  const materialRef = useRef<any>(null);
  const { size } = useThree();

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value += delta;
      
      // Ultra-smooth mouse tracking (Lag = Luxury)
      const targetMouse = new THREE.Vector2(
        (state.pointer.x + 1) / 2,
        (state.pointer.y + 1) / 2
      );
      materialRef.current.uniforms.u_mouse.value.lerp(targetMouse, 0.03); 
      materialRef.current.uniforms.u_resolution.value.set(size.width, size.height);
    }
  });

  return (
    <mesh scale={[2, 2, 1]}>
      <planeGeometry args={[1, 1]} />
      {/* @ts-ignore */}
      <silkMaterial ref={materialRef} />
    </mesh>
  );
};

export const LiquidMeshBackground = () => {
  return (
    <div className="fixed inset-0 z-0 bg-[#f5f5f5]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Scene />
      </Canvas>
    </div>
  );
};