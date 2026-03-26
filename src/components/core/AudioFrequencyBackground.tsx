"use client";

import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

const FrequencyMaterial = shaderMaterial(
  { u_time: 0, u_mouse: new THREE.Vector2(0, 0), u_color: new THREE.Color('#FFB000') },
  // Vertex
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment - Oscilloscope Effect
  `
    varying vec2 vUv;
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec3 u_color;

    void main() {
      vec2 st = vUv * 2.0 - 1.0;
      
      // Interaction
      float dist = distance(st, u_mouse * 2.0 - 1.0);
      float agitation = smoothstep(0.5, 0.0, dist) * 2.0;

      // Create multiple sine waves (Strings)
      float brightness = 0.0;
      for (float i = 1.0; i <= 6.0; i++) {
        float speed = u_time * (i * 0.5);
        float y = sin(st.x * (3.0 + i) + speed + agitation) * (0.1 + agitation * 0.1);
        
        // Thickness of the "String"
        float thickness = 0.005 + (agitation * 0.01);
        brightness += thickness / abs(st.y + y * 2.0 - (i * 0.3 - 1.0));
      }

      vec3 color = u_color * brightness;
      
      // Add noise/grain for "Analog" feel
      float grain = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453) * 0.1;
      
      gl_FragColor = vec4(color - grain, 1.0);
    }
  `
);

extend({ FrequencyMaterial });

const Scene = () => {
  const ref = useRef<any>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (ref.current) {
      ref.current.u_time = state.clock.elapsedTime;
      ref.current.u_mouse.lerp(state.pointer.addScalar(1).multiplyScalar(0.5), 0.1);
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      {/* @ts-ignore */}
      <frequencyMaterial ref={ref} transparent />
    </mesh>
  );
};

export const AudioFrequencyBackground = () => (
  <div className="fixed inset-0 z-0 bg-[#050505]">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Scene />
    </Canvas>
  </div>
);