import React from 'react';
import { motion } from 'framer-motion';

export default function Logo({ width = 50, height = 50, theme = 'dark' }) {
    const strokeColor = theme === 'dark' ? '#ffffff' : '#000000';
    const fillGradient = theme === 'dark' 
        ? ['url(#logoGradientDark)', 'rgba(139, 92, 246, 0.1)']
        : ['url(#logoGradientLight)', 'rgba(99, 102, 241, 0.1)'];

    return (
        <motion.svg
            width={width}
            height={height}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            whileHover={{ 
                scale: 1.15, 
                rotate: 5,
                transition: { duration: 0.3 }
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <defs>
                <linearGradient id="logoGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="50%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <linearGradient id="logoGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="50%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>

            {/* Outer hexagon with gradient stroke */}
            <motion.path
                d="M50 5 L93 25 L93 75 L50 95 L7 75 L7 25 Z"
                stroke="url(#logoGradientDark)"
                strokeWidth="3"
                fill={fillGradient[1]}
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
            />

            {/* Animated border glow */}
            <motion.path
                d="M50 5 L93 25 L93 75 L50 95 L7 75 L7 25 Z"
                stroke="url(#logoGradientDark)"
                strokeWidth="1"
                fill="none"
                initial={{ opacity: 0 }}
                animate={{ 
                    opacity: [0.3, 0.8, 0.3],
                    strokeWidth: [1, 2, 1]
                }}
                transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
            />

            {/* Inner S letter with gradient */}
            <motion.text
                x="50"
                y="68"
                textAnchor="middle"
                fill="url(#logoGradientDark)"
                fontSize="42"
                fontFamily="'Space Grotesk', sans-serif"
                fontWeight="700"
                filter="url(#glow)"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
            >
                S
            </motion.text>

            {/* Animated corner accents */}
            <motion.circle cx="50" cy="5" r="4" fill="#8b5cf6"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            />
            <motion.circle cx="93" cy="25" r="3" fill="#14b8a6"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            <motion.circle cx="93" cy="75" r="4" fill="#8b5cf6"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            />
            <motion.circle cx="50" cy="95" r="3" fill="#14b8a6"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
            />
            <motion.circle cx="7" cy="75" r="4" fill="#8b5cf6"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
            />
            <motion.circle cx="7" cy="25" r="3" fill="#14b8a6"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            />
        </motion.svg>
    );
}
