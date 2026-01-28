"use client";
import * as THREE from 'three';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { shaderMaterial } from '@react-three/drei';

const FlowMaterial = shaderMaterial(
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

    // Simplex Noise for organic patterns
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute( permute( permute( i.z + vec4(0.0, i1.z, i2.z, 1.0 )) + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
        vec2 st = vUv;
        
        // Mouse Interaction: Warps the coordinate space
        float dist = distance(st, u_mouse);
        float influence = smoothstep(0.4, 0.0, dist) * 0.5;
        
        // Create rotation matrix based on mouse
        float angle = influence * 2.0;
        mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
        vec2 center = vec2(0.5);
        st = rot * (st - center) + center;

        // Create the flowing pattern
        float t = u_time * 0.4; // SPEED CONTROL
        float noise = snoise(vec3(st * 3.0, t));
        
        // Distort the noise with itself for a liquid feel
        float pattern = snoise(vec3(st * 3.0 + noise, t));
        
        // === COLOR PALETTE: DIGITAL SILK ===
        
        // Base: Deep Indigo/Void
        vec3 base = vec3(0.05, 0.0, 0.1);
        
        // Mid: Saturated Teal
        vec3 mid = vec3(0.0, 0.8, 0.6);
        
        // High: Electric Violet
        vec3 high = vec3(0.6, 0.2, 1.0);
        
        // Mix colors to create ribbons with spaces
        vec3 color = mix(base, mid, smoothstep(0.2, 0.3, pattern));
        color = mix(color, high, smoothstep(0.6, 0.65, pattern));
        
        // Vignette for depth
        float vig = 1.0 - length(vUv - vec2(0.5));
        color *= smoothstep(0.0, 1.0, vig);

        gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ FlowMaterial });

function Scene() {
  const materialRef = useRef<any>(null);
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value += delta;
      const targetMouse = new THREE.Vector2(state.pointer.x * 0.5 + 0.5, state.pointer.y * 0.5 + 0.5);
      materialRef.current.uniforms.u_mouse.value.lerp(targetMouse, 0.05);
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      {/* @ts-ignore */}
      <flowMaterial ref={materialRef} />
    </mesh>
  );
}

export const ChromaticLiquidBackground = () => {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, background: '#080010' }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Scene />
      </Canvas>
    </div>
  );
};