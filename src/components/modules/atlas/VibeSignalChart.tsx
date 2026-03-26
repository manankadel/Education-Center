// src/components/modules/atlas/VibeSignalChart.tsx
"use client";
import { VibeSignal } from '@/types/atlas';

const VibeSignalChart = ({ signal }: { signal: VibeSignal }) => {
  const points = Object.values(signal).map((value, i, arr) => {
    const angle = (i / arr.length) * 2 * Math.PI - Math.PI / 2;
    const radius = 50 * (value / 10);
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  const labels = Object.keys(signal).map((key, i, arr) => {
    const angle = (i / arr.length) * 2 * Math.PI - Math.PI / 2;
    const radius = 58;
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    return { key, x, y };
  });

  return (
    <div className="w-full aspect-square relative">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Radar grid */}
        {[1, 2, 3, 4, 5].map(i => (
          <circle key={i} cx="50" cy="50" r={i * 10} fill="none" stroke="#1a1a1a" strokeWidth="0.5" />
        ))}
        {/* Radar spokes */}
        {[0, 1, 2, 3, 4].map(i => {
            const angle = (i / 5) * 2 * Math.PI;
            return <line key={i} x1="50" y1="50" x2={50 + 50 * Math.cos(angle)} y2={50 + 50 * Math.sin(angle)} stroke="#1a1a1a" strokeWidth="0.5" />
        })}

        {/* Vibe data shape */}
        <polygon points={points} fill="rgba(255,176,0,0.2)" stroke="#FFB000" strokeWidth="1" />
      </svg>
      
      {/* Labels */}
      {labels.map(label => (
        <div key={label.key} className="absolute font-system text-[7px] text-text-secondary uppercase" style={{
          left: `${label.x}%`,
          top: `${label.y}%`,
          transform: `translate(-50%, -50%)`,
        }}>
          {label.key.substring(0,3)}
        </div>
      ))}
    </div>
  );
};

export default VibeSignalChart;