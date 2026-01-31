// src/components/core/FloatingParticlesBackground.tsx

"use client";

import React, { useMemo, useRef } from "react"; 
import { Canvas, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { MotionValue } from "framer-motion";

const PARTICLE_CONTROLS = {
    quantity: 1500,
    size: 0.04,
    glowPercentage: 0.8,
    blinkPercentage: 0.2,
    direction: -1, 
    speed: 0.2,
    gyroIntensity: 2.0, // Increased intensity for better mobile feel
};

const CustomParticleMaterial = shaderMaterial(
  { u_time: 0.0 },
  ` uniform float u_time;
    attribute vec3 a_color;
    attribute float a_blinkSpeed;
    varying vec3 v_color;
    varying float v_blinkSpeed;
    void main() {
      v_color = a_color;
      v_blinkSpeed = a_blinkSpeed;
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      gl_PointSize = ${PARTICLE_CONTROLS.size} * (300.0 / -viewPosition.z);
      gl_Position = projectionMatrix * viewPosition;
    }`,
  ` uniform float u_time;
    varying vec3 v_color;
    varying float v_blinkSpeed;
    void main() {
      float dist = distance(gl_PointCoord, vec2(0.5));
      if (dist > 0.5) { discard; }
      float alpha = 1.0;
      if (v_blinkSpeed > 0.0) { alpha = (sin(u_time * v_blinkSpeed) + 1.0) / 2.0; }
      gl_FragColor = vec4(v_color, alpha);
    }`
);
extend({ CustomParticleMaterial });

// New Prop Interface using MotionValues
interface ParticlesProps {
    mousePosition: { x: number, y: number };
    gyroX?: MotionValue<number>;
    gyroY?: MotionValue<number>;
}

const Particles = ({ mousePosition, gyroX, gyroY }: ParticlesProps) => {
  const meshRef = useRef<THREE.Points>(null!);
  
  const particleData = useMemo(() => {
    const positions = new Float32Array(PARTICLE_CONTROLS.quantity * 3);
    const colors = new Float32Array(PARTICLE_CONTROLS.quantity * 3);
    const blinkSpeeds = new Float32Array(PARTICLE_CONTROLS.quantity);
    const distance = 10;
    
    for (let i = 0; i < PARTICLE_CONTROLS.quantity; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * distance;
      positions[i * 3 + 1] = (Math.random() - 0.5) * distance;
      positions[i * 3 + 2] = (Math.random() - 0.5) * distance;
      
      let particleColor = new THREE.Color();
      blinkSpeeds[i] = 0.0;
      
      if (Math.random() < PARTICLE_CONTROLS.blinkPercentage) {
        particleColor.setHSL(0, 0, 1.0); 
        blinkSpeeds[i] = Math.random() * 3 + 1;
      } else if (Math.random() < PARTICLE_CONTROLS.glowPercentage) {
        particleColor.setHSL(0, 0, 1.0);
      } else {
        const shade = 0.4 + Math.random() * 0.2;
        particleColor.setHSL(0, 0, shade);
      }
      colors.set([particleColor.r, particleColor.g, particleColor.b], i * 3);
    }
    return { positions, colors, blinkSpeeds };
  }, []);

  useFrame((state, delta) => {
    // Read directly from MotionValues (if available) to avoid React re-renders
    const gx = gyroX ? gyroX.get() : 0;
    const gy = gyroY ? gyroY.get() : 0;
    
    const hasGyro = gx !== 0 || gy !== 0;
    
    // Smooth Lerp Targets
    const targetX = hasGyro ? gx * PARTICLE_CONTROLS.gyroIntensity : mousePosition.x * 0.5;
    const targetY = hasGyro ? gy * PARTICLE_CONTROLS.gyroIntensity : mousePosition.y * 0.5;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += delta * PARTICLE_CONTROLS.speed * PARTICLE_CONTROLS.direction;
        if (PARTICLE_CONTROLS.direction === 1 && positions[i + 2] > 5) {
            positions[i + 2] = -5;
            positions[i] = (Math.random() - 0.5) * 10;
            positions[i + 1] = (Math.random() - 0.5) * 10;
        } else if (PARTICLE_CONTROLS.direction === -1 && positions[i + 2] < -5) {
            positions[i + 2] = 5;
            positions[i] = (Math.random() - 0.5) * 10;
            positions[i + 1] = (Math.random() - 0.5) * 10;
        }
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.u_time.value = state.clock.getElapsedTime();
    }
  });

  return (
    <points ref={meshRef}>
        <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={particleData.positions.length / 3} array={particleData.positions} itemSize={3} />
            <bufferAttribute attach="attributes-a_color" count={particleData.colors.length / 3} array={particleData.colors} itemSize={3} />
            <bufferAttribute attach="attributes-a_blinkSpeed" count={particleData.blinkSpeeds.length} array={particleData.blinkSpeeds} itemSize={1} />
        </bufferGeometry>
        {/* @ts-ignore */}
        <customParticleMaterial 
            attach="material"
            blending={THREE.AdditiveBlending}
            transparent={true}
            depthWrite={false}
            vertexColors={true}
        />
    </points>
  );
};

export const FloatingParticlesBackground = (props: ParticlesProps) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 1.5]}>
        <Particles {...props} />
      </Canvas>
    </div>
  );
};