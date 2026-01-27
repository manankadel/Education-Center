// src/components/core/MagneticFluxBackground.tsx

"use client";

import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

const FluxMaterial = shaderMaterial(
  { 
    u_time: 0, 
    u_mouse: new THREE.Vector2(0, 0),
    u_resolution: new THREE.Vector2(1, 1),
    u_pixelRatio: 1
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader (The Magnetic Flow)
  `
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec2 u_resolution;
    varying vec2 vUv;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 st = vUv;
      
      // Aspect ratio correction
      st.x *= u_resolution.x / u_resolution.y;
      
      // Mouse Interaction (Magnetic Pull)
      vec2 mouse = u_mouse;
      mouse.x *= u_resolution.x / u_resolution.y;
      float dist = distance(st, mouse);
      
      // Create a "Gravity Well" effect around mouse
      float pull = smoothstep(0.5, 0.0, dist); 
      vec2 dir = normalize(st - mouse);
      
      // Distort the coordinate space based on mouse
      st += dir * pull * 0.1;

      // Create Flow Lines (Lively Movement)
      float time = u_time * 0.15;
      
      // Large organic flow
      float n = snoise(vec2(st.x * 2.0 + time, st.y * 2.0 - time));
      
      // Detailed flow
      float n2 = snoise(vec2(st.x * 8.0 - time, st.y * 8.0 + time));
      
      // Combine for abstract "liquid silk" look
      float pattern = sin((st.y + n * 0.5 + n2 * 0.2) * 20.0);
      
      // Soften edges
      float lines = smoothstep(0.1, 0.2, pattern) - smoothstep(0.8, 0.9, pattern);
      
      // === COLORS ===
      // Background: Deep Black/Grey
      vec3 bg = vec3(0.05, 0.05, 0.05);
      
      // Lines: White/Silver
      vec3 fg = vec3(0.9, 0.9, 0.95);
      
      // Glow near mouse
      fg += vec3(0.2) * pull;

      vec3 color = mix(bg, fg, lines * 0.5); // 0.5 opacity for subtle look
      
      // Add a vignette
      float vig = 1.0 - length(vUv - 0.5);
      color *= smoothstep(0.0, 0.8, vig);

      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ FluxMaterial });

const FluxScene = () => {
  const materialRef = useRef<any>(null);
  const { size, viewport } = useThree();

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value += delta;
      
      // Smooth mouse follow
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
      <fluxMaterial ref={materialRef} />
    </mesh>
  );
};

export const MagneticFluxBackground = () => {
  return (
    <div className="fixed inset-0 z-0 bg-black">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <FluxScene />
      </Canvas>
    </div>
  );
};