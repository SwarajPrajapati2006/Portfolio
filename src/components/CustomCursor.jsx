import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 300 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    // Trail state
    const [trail, setTrail] = useState(Array(8).fill({ x: 0, y: 0 }));

    useEffect(() => {
        const moveCursor = (e) => {
            const { clientX, clientY } = e;
            mouseX.set(clientX);
            mouseY.set(clientY);

            // Update trail less frequently or with different logic if needed
            setTrail(prev => {
                const newTrail = [...prev];
                newTrail.shift();
                newTrail.push({ x: clientX, y: clientY });
                return newTrail;
            });
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('.group');
            setIsHovering(!!isClickable);
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="cursor-container">
            {/* Main Cursor Head */}
            <motion.div
                className="cursor-head"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
                animate={{
                    scale: isClicked ? 0.8 : (isHovering ? 2.5 : 1),
                    backgroundColor: isHovering ? "var(--accent-purple)" : "var(--accent-teal)"
                }}
            >
                {isHovering && <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="cursor-inner-dot"
                />}
            </motion.div>

            {/* Trail / Comet Tail */}
            {trail.map((pos, index) => (
                <div
                    key={index}
                    className="cursor-trail-dot"
                    style={{
                        left: pos.x,
                        top: pos.y,
                        opacity: (index + 1) / trail.length * 0.5,
                        transform: `scale(${(index + 1) / trail.length}) translate(-50%, -50%)`,
                        backgroundColor: index % 2 === 0 ? "var(--accent-teal)" : "var(--accent-purple)"
                    }}
                />
            ))}
        </div>
    );
}
