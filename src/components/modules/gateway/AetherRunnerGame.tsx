// src/components/modules/gateway/AetherRunnerGame.tsx

"use client";
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useRef, useEffect } from 'react';

const SECRET_KEY = "AETHERKEY";

// ... (Keep Player, Obstacle, Fragment components exactly as they were)
const Player = ({ position }: { position: THREE.Vector3 }) => (
  <mesh position={position}>
    <icosahedronGeometry args={[0.3, 0]} />
    <meshStandardMaterial color="#fff" emissive="#0ff" emissiveIntensity={3} toneMapped={false} />
  </mesh>
);
const Obstacle = ({ position }: { position: THREE.Vector3 }) => (
  <mesh position={position} rotation={[0, Math.random() * Math.PI, 0]}>
    <boxGeometry args={[1, 4, 1]} />
    <meshStandardMaterial color="#333" roughness={0.5} />
  </mesh>
);
const Fragment = ({ position, isSpecial }: { position: THREE.Vector3; isSpecial: boolean }) => (
  <mesh position={position}>
    <octahedronGeometry args={[isSpecial ? 0.3 : 0.15, 0]} />
    <meshStandardMaterial color={isSpecial ? "#0f0" : "#fff"} emissive={isSpecial ? "#0f0" : "#0ff"} emissiveIntensity={5} toneMapped={false} />
  </mesh>
);

const GameScene = ({ setScore, setGameOver }: { setScore: any; setGameOver: any }) => {
  const { viewport } = useThree();
  const playerPos = useMemo(() => new THREE.Vector3(0, -1, 0), []);
  
  const obstacles = useMemo(() => {
    if (!viewport) return [];
    return [...Array(10)].map(() => ({
      position: new THREE.Vector3((Math.random() - 0.5) * viewport.width, -1, -(Math.random() * 50) - 10)
    }));
  }, [viewport]);

  const fragments = useMemo(() => {
    if (!viewport) return [];
    return [...Array(20)].map(() => ({
      position: new THREE.Vector3((Math.random() - 0.5) * viewport.width, -1, -(Math.random() * 50) - 10),
      isSpecial: Math.random() > 0.9
    }));
  }, [viewport]);
  
  const gameSpeed = useRef(0.1);

  useFrame((state) => {
    if (gameSpeed.current === 0) return;
    playerPos.lerp(new THREE.Vector3(state.pointer.x * (viewport.width / 2), -1, 0), 0.1);

    obstacles.forEach(obs => {
      obs.position.z += gameSpeed.current;
      if (obs.position.z > 2) obs.position.z = -50;
      if (playerPos.distanceTo(obs.position) < 0.8) {
        setGameOver(true);
        gameSpeed.current = 0;
      }
    });
    
    fragments.forEach(frag => {
      frag.position.z += gameSpeed.current;
      if (frag.position.z > 2) frag.position.z = -50;
      if (playerPos.distanceTo(frag.position) < 0.5) {
        setScore((prev: number) => prev + (frag.isSpecial ? 50 : 10));
        frag.position.z = -50;
      }
    });

    gameSpeed.current = Math.min(0.3, gameSpeed.current + 0.0001);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, -5]} intensity={1} />
      <fog attach="fog" args={['#000', 10, 30]} />
      <Player position={playerPos} />
      {obstacles.map((obs, i) => <Obstacle key={i} position={obs.position} />)}
      {fragments.map((frag, i) => <Fragment key={i} position={frag.position} isSpecial={frag.isSpecial} />)}
    </>
  );
};

export const AetherRunnerGame = ({ onWin, onBack }: { onWin: (key: string) => void; onBack: () => void; }) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'over'>('idle');
  const [score, setScore] = useState(0);

  const handleGameOver = () => {
    if (score >= 420) onWin(SECRET_KEY);
    setGameState('over');
  };

  const startGame = () => {
    setScore(0);
    setGameState('playing');
  };

  return (
    <div className="w-full h-full relative text-white bg-black rounded-2xl overflow-hidden">
      <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
        {gameState === 'playing' && <GameScene setScore={setScore} setGameOver={handleGameOver} />}
      </Canvas>
      
      <div className="absolute top-8 left-8 z-10 pointer-events-none">
        <h3 className="font-mono text-xs uppercase tracking-widest text-white/50">Score</h3>
        <p className="font-display text-5xl font-black">{score}</p>
      </div>

      <AnimatePresence>
        {gameState !== 'playing' && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <h2 className="font-display text-4xl md:text-6xl font-black">{gameState === 'over' ? "DEACTIVATED" : "AETHER RUNNER"}</h2>
            <button onClick={startGame} className="mt-8 px-10 py-3 bg-white text-black font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-200">
                {gameState === 'over' ? 'RE-INITIATE' : 'INITIATE'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FIXED BACK BUTTON */}
      <button 
        onClick={onBack} 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 border-b border-white/40 hover:text-white hover:border-white transition-colors z-[50] pointer-events-auto"
      >
        Return to Hub
      </button>
    </div>
  );
};