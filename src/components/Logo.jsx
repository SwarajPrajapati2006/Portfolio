import React from 'react';
import { motion } from 'framer-motion';
import logoImage from '../assets/logo.png';

export default function Logo({ width = 50, height = 50, className = '' }) {
    return (
        <motion.img
            src={logoImage}
            alt="SP Logo"
            width={width}
            height={height}
            className={className}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            style={{ objectFit: 'contain' }}
        />
    );
}
