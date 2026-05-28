import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ScrollTunnel({ theme }) {
    const group = useRef();
    const rings = useMemo(() => Array.from({ length: 16 }, (_, i) => i), []);
    const dark = theme === 'dark';

    useFrame(({ clock, mouse }) => {
        if (!group.current) return;
        const scroll = window.scrollY || 0;
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.y * 0.11, 0.035);
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.x * 0.14 + scroll * 0.00008, 0.035);
        group.current.position.z = -4 + Math.sin(clock.elapsedTime * 0.35) * 0.2 + scroll * 0.0012;
    });

    return (
        <group ref={group} rotation={[0.25, -0.2, 0]}>
            {rings.map((ring) => {
                const depth = -ring * 0.62;
                const scale = 1 + ring * 0.105;
                const opacity = Math.max(0.04, 0.36 - ring * 0.011);

                return (
                    <mesh key={ring} position={[0, 0, depth]} scale={[scale, scale, scale]}>
                        <torusGeometry args={[2.4, 0.006, 6, 56]} />
                        <meshBasicMaterial
                            color={dark ? '#35f1d0' : '#1f6feb'}
                            transparent
                            opacity={opacity}
                            blending={THREE.AdditiveBlending}
                            depthWrite={false}
                        />
                    </mesh>
                );
            })}
        </group>
    );
}

function DataConstellation({ theme }) {
    const points = useRef();
    const lineGroup = useRef();
    const dark = theme === 'dark';
    const count = 420;

    const { positions, colors } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const palette = dark
            ? ['#35f1d0', '#9d7cff', '#e8f8ff', '#ff5fa2']
            : ['#0f766e', '#4338ca', '#0f172a', '#dc2626'];

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const radius = 2 + Math.random() * 8;
            const angle = Math.random() * Math.PI * 2;
            const layer = (Math.random() - 0.5) * 8;
            positions[i3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 1.5;
            positions[i3 + 1] = (Math.random() - 0.5) * 7;
            positions[i3 + 2] = Math.sin(angle) * radius + layer;

            const color = new THREE.Color(palette[Math.floor(Math.random() * palette.length)]);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }

        return { positions, colors };
    }, [dark]);

    useFrame(({ clock, mouse }) => {
        if (points.current) {
            points.current.rotation.y = clock.elapsedTime * 0.025 + mouse.x * 0.05;
            points.current.rotation.x = mouse.y * 0.04;
            points.current.position.z = window.scrollY * 0.0008;
        }

        if (lineGroup.current) {
            lineGroup.current.rotation.y = -clock.elapsedTime * 0.018;
            lineGroup.current.position.z = window.scrollY * 0.0005;
        }
    });

    return (
        <>
            <points ref={points}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
                    <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial
                    size={0.035}
                    vertexColors
                    transparent
                    opacity={dark ? 0.82 : 0.46}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>

            <group ref={lineGroup}>
                {[-2.2, 0, 2.2].map((y, index) => (
                    <mesh key={y} position={[0, y, -4 - index * 1.4]} rotation={[Math.PI / 2, 0, index * 0.5]}>
                        <torusGeometry args={[3.3 + index * 0.8, 0.003, 4, 64]} />
                        <meshBasicMaterial
                            color={dark ? '#9d7cff' : '#2563eb'}
                            transparent
                            opacity={dark ? 0.18 : 0.12}
                            blending={THREE.AdditiveBlending}
                            depthWrite={false}
                        />
                    </mesh>
                ))}
            </group>
        </>
    );
}

function PrismCore({ theme }) {
    const mesh = useRef();
    const dark = theme === 'dark';

    useFrame(({ clock, mouse }) => {
        if (!mesh.current) return;
        mesh.current.rotation.x = clock.elapsedTime * 0.14 + mouse.y * 0.12;
        mesh.current.rotation.y = clock.elapsedTime * 0.2 + mouse.x * 0.16;
        mesh.current.position.y = Math.sin(clock.elapsedTime * 0.7) * 0.18;
        mesh.current.scale.setScalar(1 + Math.min(window.scrollY * 0.00008, 0.22));
    });

    return (
        <mesh ref={mesh} position={[3.5, 0.3, -3.8]}>
            <icosahedronGeometry args={[1.25, 1]} />
            <meshBasicMaterial
                color={dark ? '#ffffff' : '#111827'}
                wireframe
                transparent
                opacity={dark ? 0.2 : 0.13}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}

export default function Background({ theme }) {
    const dark = theme === 'dark';

    return (
        <div className="background-container">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 58 }}
                gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
                dpr={[1, 1.15]}
            >
                <color attach="background" args={[dark ? '#030407' : '#f6f8ff']} />
                <fog attach="fog" args={[dark ? '#030407' : '#f6f8ff', 7, 22]} />
                <ScrollTunnel theme={theme} />
                <DataConstellation theme={theme} />
                <PrismCore theme={theme} />
            </Canvas>
        </div>
    );
}
