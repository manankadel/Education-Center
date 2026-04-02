"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const RadialGradient = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <motion.div
            className="absolute inset-0 z-0"
            style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(191, 161, 129, 0.15), transparent 80%)`,
                transition: 'background 0.3s ease-out'
            }}
        />
    );
};