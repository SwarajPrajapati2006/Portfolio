import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

export default function LoadingScreen({ onComplete }) {
    const [isPresent, setIsPresent] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsPresent(false);
            if (onComplete) onComplete();
        }, 2500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isPresent && (
                <motion.div
                    className="loading-overlay"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <div className="loading-content">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="loading-logo-wrapper"
                        >
                            <Logo width={100} height={100} />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="loading-spinner"
                            style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            {/* Main spinner ring */}
                            <div className="spinner-ring"></div>
                            
                            {/* Floating dots */}
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        y: [-30, -60, -30],
                                        x: [0, (i - 2) * 20, 0],
                                        opacity: [0, 1, 0],
                                        scale: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: "easeInOut"
                                    }}
                                    style={{
                                        position: 'absolute',
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        background: i % 2 === 0 ? '#8b5cf6' : '#14b8a6',
                                        boxShadow: i % 2 === 0 
                                            ? '0 0 10px #8b5cf6, 0 0 20px #8b5cf6' 
                                            : '0 0 10px #14b8a6, 0 0 20px #14b8a6'
                                    }}
                                />
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
