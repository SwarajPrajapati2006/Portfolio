import React from 'react';
import { motion } from 'framer-motion';

export default function Logo({ width = 50, height = 50, className = '', theme = 'dark' }) {
    const isDark = theme === 'dark';

    // Refined color palette
    const colors = {
        primary: isDark ? '#6366f1' : '#4f46e5', // Indigo
        secondary: isDark ? '#ec4899' : '#db2777', // Rose
    };

    return (
        <motion.svg
            width={width}
            height={height}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            initial="initial"
            animate="animate"
            whileHover="hover"
        >
            <defs>
                <linearGradient id={`logo-gradient-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={colors.primary} />
                    <stop offset="100%" stopColor={colors.secondary} />
                </linearGradient>
                <filter id={`glow-${theme}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Hexagon Container */}
            <motion.path
                d="M 50 5 L 90 27.5 V 72.5 L 50 95 L 10 72.5 V 27.5 Z"
                stroke={`url(#logo-gradient-${theme})`}
                strokeWidth="4"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* Sharp, Bold Text "SP" */}
            <text
                x="50"
                y="50"
                dominantBaseline="central"
                textAnchor="middle"
                fontSize="45"
                fontWeight="900"
                fontFamily="'Inter', sans-serif"
                fill={`url(#logo-gradient-${theme})`}
                filter={`url(#glow-${theme})`}
                letterSpacing="-2"
                style={{ userSelect: 'none' }}
            >
                SP
            </text>
        </motion.svg>
    );
}
