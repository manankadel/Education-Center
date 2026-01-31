// src/hooks/useGyroscope.ts
"use client";
import { useState, useEffect } from 'react';
import { useMotionValue } from 'framer-motion';

export const useGyroscope = () => {
    // MotionValues update outside the React Render Cycle (Butter Smooth)
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [requiresPermission, setRequiresPermission] = useState(false);

    useEffect(() => {
        // Check if device is iOS 13+
        if (typeof window !== 'undefined' && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            setRequiresPermission(true);
        } else {
            // Android/Desktop doesn't need explicit permission usually
            setPermissionGranted(true);
        }
    }, []);

    useEffect(() => {
        if (!permissionGranted) return;

        const handleOrientation = (event: DeviceOrientationEvent) => {
            const { gamma, beta } = event; // gamma: left-right, beta: front-back
            
            if (gamma !== null && beta !== null) {
                // Normalize and Clamp (-1 to 1)
                // We use a smaller range (30 degrees) for higher sensitivity
                const normX = Math.max(-1, Math.min(1, gamma / 30));
                const normY = Math.max(-1, Math.min(1, beta / 30));
                
                // Update MotionValues directly
                x.set(normX);
                y.set(normY);
            }
        };

        window.addEventListener('deviceorientation', handleOrientation);
        return () => window.removeEventListener('deviceorientation', handleOrientation);
    }, [permissionGranted, x, y]);

    const requestPermission = async () => {
        if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            try {
                const response = await (DeviceOrientationEvent as any).requestPermission();
                if (response === 'granted') {
                    setPermissionGranted(true);
                    setRequiresPermission(false);
                }
            } catch (e) {
                console.error(e);
            }
        } else {
            setPermissionGranted(true);
        }
    };

    return { x, y, requiresPermission, requestPermission, permissionGranted };
};