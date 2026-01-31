// src/hooks/useGyroscope.ts
"use client";
import { useState, useEffect, useCallback } from 'react';
import { useMotionValue } from 'framer-motion';

export const useGyroscope = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    const [needsPermission, setNeedsPermission] = useState(false);
    const [permissionGranted, setPermissionGranted] = useState(false);

    useEffect(() => {
        // iOS requires explicit permission
        if (typeof window !== 'undefined' && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            setNeedsPermission(true);
        } else {
            setPermissionGranted(true);
        }
    }, []);

    useEffect(() => {
        if (!permissionGranted) return;

        const handleOrientation = (event: DeviceOrientationEvent) => {
            const { gamma, beta } = event; 
            if (gamma !== null && beta !== null) {
                // Normalize Gamma (-45 to 45 degrees) to (-1 to 1)
                const normX = Math.max(-1, Math.min(1, gamma / 45));
                const normY = Math.max(-1, Math.min(1, beta / 45));
                
                x.set(normX);
                y.set(normY);
            }
        };

        window.addEventListener('deviceorientation', handleOrientation);
        return () => window.removeEventListener('deviceorientation', handleOrientation);
    }, [permissionGranted, x, y]);

    const requestPermission = useCallback(async () => {
        if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            try {
                const response = await (DeviceOrientationEvent as any).requestPermission();
                if (response === 'granted') {
                    setPermissionGranted(true);
                    setNeedsPermission(false);
                }
            } catch (e) {
                console.error(e);
            }
        } else {
            setPermissionGranted(true);
        }
    }, []);

    return { x, y, needsPermission, requestPermission };
};