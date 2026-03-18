import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Stars } from '@react-three/drei';

function Galaxy({ theme }) {
    const pointsRef = useRef();

    // Milky Way parameters
    const count = 6000; // Even cleaner look
    const size = 0.012;
    const radius = 9;
    const branches = 6;
    const spin = 1.3;
    const randomness = 0.35;
    const randomnessPower = 3;

    // Realistic Star Colors
    // O (Blue), B (Blue-white), A (White), F (Yellow-white), G (Yellow), K (Orange), M (Red)
    const starColors = useMemo(() => [
        new THREE.Color('#9bb0ff'), // Blue
        new THREE.Color('#aabfff'), // Blue-white
        new THREE.Color('#cad7ff'), // White
        new THREE.Color('#f8f7ff'), // Yellow-white
        new THREE.Color('#fff4ea'), // Yellow (Sun-like)
        new THREE.Color('#ffd2a1'), // Orange
        new THREE.Color('#ffcc6f'), // Red-Orange
    ], []);

    const [positions, colors] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            // Radius
            const r = Math.random() * radius;

            // Spiral Arm logic
            const spinAngle = r * spin;
            const branchAngle = ((i % branches) / branches) * Math.PI * 2;

            // Randomness variations
            const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
            const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * (randomness * r * 0.5); // Flatter disk
            const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;

            positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
            positions[i3 + 1] = randomY;
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

            // Pick a random realistic star color
            const baseColor = starColors[Math.floor(Math.random() * starColors.length)];
            const color = baseColor.clone();

            // Mix with core color for inner stars
            if (r < 2.5) {
                color.lerp(new THREE.Color('#ffaa00'), 1 - (r / 2.5)); // Glowing Gold Core
            } else {
                // Slight purple tint for outer distinct style
                color.lerp(new THREE.Color('#4c1d95'), 0.15);
            }

            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }
        return [positions, colors];
    }, [count, radius, branches, spin, randomness, randomnessPower, starColors]);

    useFrame((state, delta) => {
        if (pointsRef.current) {
            // Constant rotation
            pointsRef.current.rotation.y += delta * 0.03;

            // Scroll based "Fly Through" effect
            const scrollY = window.scrollY;
            pointsRef.current.position.z = scrollY * 0.005;
            pointsRef.current.rotation.x = scrollY * 0.0002;

            // Mouse Parallax
            const mouseX = state.mouse.x * 0.5;
            const mouseY = state.mouse.y * 0.5;
            pointsRef.current.rotation.x += (mouseY * 0.1 - pointsRef.current.rotation.x) * 0.05;
            pointsRef.current.rotation.y += (mouseX * 0.1) * 0.05;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={size}
                vertexColors
                transparent
                opacity={0.8}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

const Dust = () => {
    const count = 1000; // Reduced dust further
    const [positions, colors] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const color = new THREE.Color('#1a0b2e'); // Dark purple/blackish

        for (let i = 0; i < count; i++) {
            const r = Math.random() * 8 + 1; // Avoid center slightly
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = (Math.random() - 0.5) * 2; // Flat distribution
            positions[i * 3 + 2] = r * Math.cos(phi);

            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }
        return [positions, colors];
    }, []);

    const ref = useRef();
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                vertexColors
                transparent
                opacity={0.1}
                depthWrite={false}
                blending={THREE.NormalBlending}
            />
        </points>
    );
};

const ShootingStar = () => {
    const ref = useRef();
    const [active, setActive] = React.useState(false);

    // Reset star to random position
    const reset = () => {
        if (!ref.current) return;
        const x = (Math.random() - 0.5) * 20;
        const y = (Math.random() - 0.5) * 20 + 5; // Start higher up
        const z = (Math.random() - 0.5) * 10;
        ref.current.position.set(x, y, z);
        setActive(true);
    };

    useFrame((state, delta) => {
        if (!ref.current) return;

        if (active) {
            // Move fast diagonally
            ref.current.position.x -= delta * 15;
            ref.current.position.y -= delta * 8;

            // Check if out of bounds
            if (ref.current.position.y < -10 || ref.current.position.x < -20) {
                setActive(false);
                // Random delay before respawning
                setTimeout(reset, Math.random() * 3000 + 1000);
            }
        } else {
            // Initial start check
            if (Math.random() < 0.01) reset();
        }
    });

    return (
        <mesh ref={ref} visible={active}>
            <coneGeometry args={[0.05, 1.5, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
    );
};

function MovingStars() {
    const ref = useRef();

    useFrame(({ clock }) => {
        if (ref.current) {
            // Constant slow rotation
            ref.current.rotation.y = clock.getElapsedTime() * 0.05;
            // Scroll based rotation addition (simple approximation without adding scroll listener logic inside 3D context, 
            // can use window.scrollY directly here as it is client side)
            const scrollY = window.scrollY;
            ref.current.rotation.x = scrollY * 0.0005;
            ref.current.position.z = scrollY * 0.002; // Move forward slightly
        }
    });

    return <Stars ref={ref} radius={300} depth={60} count={500} factor={2} saturation={0} fade speed={0.3} />;
}

function DayParticles() {
    const count = 500;
    const [positions, colors] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const colorPalette = [
            new THREE.Color('#8b5cf6'), // Purple
            new THREE.Color('#14b8a6'), // Teal
            new THREE.Color('#3b82f6'), // Blue
            new THREE.Color('#ec4899'), // Pink
        ];

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }
        return [positions, colors];
    }, []);

    const pointsRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (pointsRef.current) {
            pointsRef.current.rotation.y = time * 0.05;
            pointsRef.current.rotation.x = time * 0.02;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

const Nebula = () => {
    const count = 500; // Minimalist nebula
    const [positions, colors] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const r = Math.random() * 12 + 5; // Farther out
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);

            // Nebula colors: Purple/Blue mix
            const c = new THREE.Color();
            c.setHSL(Math.random() * 0.2 + 0.5, 0.8, 0.5);
            colors[i * 3] = c.r;
            colors[i * 3 + 1] = c.g;
            colors[i * 3 + 2] = c.b;
        }
        return [positions, colors];
    }, []);

    const ref = useRef();

    useFrame((state) => {
        const { clock, mouse } = state;
        if (ref.current) {
            // Slow background rotation
            ref.current.rotation.y = clock.getElapsedTime() * 0.02;

            // Mouse Parallax
            const targetX = mouse.x * 0.2;
            const targetY = mouse.y * 0.2;
            ref.current.rotation.x += (targetY - ref.current.rotation.x) * 0.02;
            ref.current.rotation.z += (targetX - ref.current.rotation.z) * 0.02;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                vertexColors
                transparent
                opacity={0.2}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

const CoreGlow = () => {
    const spriteRef = useRef();

    // Create a soft glow texture
    const glowTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        gradient.addColorStop(0, 'rgba(100, 200, 255, 1)'); // Bright Cyan/Blue Center
        gradient.addColorStop(0.4, 'rgba(120, 50, 255, 0.4)'); // Purple Mid
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 128, 128);
        return new THREE.CanvasTexture(canvas);
    }, []);

    useFrame(({ clock }) => {
        if (!spriteRef.current) return;

        const scrollY = window.scrollY;

        // Scale increases with scroll
        // Base size 10, grows to 25
        const scale = 10 + scrollY * 0.015;
        spriteRef.current.scale.set(scale, scale, 1);

        // Opacity increases with scroll
        // Starts at 0.3, maxes at 0.8
        const opacity = Math.min(0.3 + scrollY * 0.0005, 0.8);
        spriteRef.current.material.opacity = opacity;

        // Subtle pulse
        const pulse = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.05;
        spriteRef.current.scale.multiplyScalar(pulse);
    });

    return (
        <sprite ref={spriteRef} position={[0, 0, -2]}>
            <spriteMaterial
                map={glowTexture}
                transparent
                opacity={0.3}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </sprite>
    );
};

export default function Background({ theme }) {
    return (
        <div className="background-container">
            <Canvas camera={{ position: [0, 0, 10] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                {theme === 'dark' ? (
                    <>
                        {/* Fog for depth */}
                        <fog attach="fog" args={['#000', 5, 25]} />
                        <CoreGlow />
                        <MovingStars />
                        <Galaxy theme={theme} />
                        <Dust />
                        <Nebula />
                        <ShootingStar />
                    </>
                ) : (
                    <DayParticles />
                )}
            </Canvas>
        </div>
    );
}
