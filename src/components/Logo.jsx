import React from 'react';
import { motion } from 'framer-motion';

export default function Logo({ width = 50, height = 50, theme = 'dark' }) {
    const strokeColor = theme === 'dark' ? '#ffffff' : '#000000';

    return (
        <motion.svg
            width={width}
            height={height}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Outer hexagon */}
            <motion.path
                d="M50 5 L93 25 L93 75 L50 95 L7 75 L7 25 Z"
                stroke={strokeColor}
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
            />

            {/* Inner S letter */}
            <motion.text
                x="50"
                y="65"
                textAnchor="middle"
                fill={strokeColor}
                fontSize="45"
                fontFamily="Orbitron, sans-serif"
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                S
            </motion.text>

            {/* Decorative dots at corners */}
            <motion.circle cx="50" cy="5" r="3" fill="#8b5cf6" />
            <motion.circle cx="93" cy="25" r="3" fill="#06b6d4" />
            <motion.circle cx="93" cy="75" r="3" fill="#8b5cf6" />
            <motion.circle cx="50" cy="95" r="3" fill="#06b6d4" />
            <motion.circle cx="7" cy="75" r="3" fill="#8b5cf6" />
            <motion.circle cx="7" cy="25" r="3" fill="#06b6d4" />
        </motion.svg>
    );
}
