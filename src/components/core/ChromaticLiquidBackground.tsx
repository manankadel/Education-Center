"use client";
import * as THREE from 'three';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { shaderMaterial } from '@react-three/drei';

const LivelyMaterial = shaderMaterial(
  { u_time: 0, u_mouse: new THREE.Vector2(0.5, 0.5) },
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

    // Background color palette
    vec3 palette(float t) {
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.263, 0.416, 0.557);
        return a + b * cos(6.28318 * (c * t + d));
    }

    void main() {
        vec2 uv = vUv * 2.0 - 1.0;
        vec2 uv0 = uv;
        vec3 finalColor = vec3(0.0);

        // Interaction distortion
        float d_mouse = length(uv - (u_mouse * 2.0 - 1.0));
        uv *= 1.0 + (exp(-d_mouse * 3.0) * 0.2);

        for (float i = 0.0; i < 3.0; i++) {
            uv = fract(uv * 1.5) - 0.5;

            float d = length(uv) * exp(-length(uv0));
            vec3 col = palette(length(uv0) + i * 0.4 + u_time * 0.4);

            d = sin(d * 8.0 + u_time) / 8.0;
            d = abs(d);
            d = pow(0.01 / d, 1.2);

            finalColor += col * d;
        }

        // Add a subtle dark vignette
        float vignette = 1.0 - length(uv0 * 0.7);
        gl_FragColor = vec4(finalColor * vignette, 1.0);
    }
  `
);

extend({ LivelyMaterial });

function Scene() {
  const materialRef = useRef<any>(null);
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value += delta * 0.5;
      const targetMouse = new THREE.Vector2(
        (state.pointer.x + 1) / 2,
        (state.pointer.y + 1) / 2
      );
      materialRef.current.uniforms.u_mouse.value.lerp(targetMouse, 0.05);
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      {/* @ts-ignore */}
      <livelyMaterial ref={materialRef} />
    </mesh>
  );
}

export const ChromaticLiquidBackground = () => {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#000' }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Scene />
      </Canvas>
    </div>
  );
};