// src/hooks/useGyroscope.ts
"use client";
import { useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';

export const useGyroscope = () => {
    const [needsPermission, setNeedsPermission] = useState(false);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [smoothedGyroData, setSmoothedGyroData] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Detect if iOS (requires permission)
        if (typeof window !== 'undefined' && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            setNeedsPermission(true);
        } else {
            setPermissionGranted(true);
        }
    }, []);

    useEffect(() => {
        if (!permissionGranted) return;

        const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
            const { beta, gamma } = event;
            if (gamma !== null && beta !== null) {
                // Normalize: -1 to 1
                const rawX = THREE.MathUtils.clamp(gamma / 45, -1, 1);
                const rawY = THREE.MathUtils.clamp(beta / 45, -1, 1);

                setSmoothedGyroData(prev => ({
                    x: THREE.MathUtils.lerp(prev.x, rawX, 0.1), // Smooth factor
                    y: THREE.MathUtils.lerp(prev.y, rawY, 0.1)
                }));
            }
        };

        window.addEventListener('deviceorientation', handleDeviceOrientation);
        return () => window.removeEventListener('deviceorientation', handleDeviceOrientation);
    }, [permissionGranted]);

    const requestPermission = useCallback(async () => {
        if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            try {
                const response = await (DeviceOrientationEvent as any).requestPermission();
                if (response === 'granted') {
                    setPermissionGranted(true);
                    setNeedsPermission(false);
                }
            } catch (e) {
                console.error("Gyro permission error", e);
            }
        } else {
            setPermissionGranted(true);
        }
    }, []);

    return { smoothedGyroData, needsPermission, requestPermission };
};