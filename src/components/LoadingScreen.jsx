import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

export default function LoadingScreen({ onComplete, progress = 0, theme = 'dark' }) {
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
                    transition={{ duration: 1, ease: "easeInOut" }}
                >
                    <div className="loading-content">
                        {/* Glowing Pulse Effect */}
                        <motion.div
                            className="loading-pulse"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative z-10"
                        >
                            <div className="loading-logo-wrapper">
                                <Logo width={80} height={80} theme={theme} />
                            </div>
                        </motion.div>

                        <motion.div
                            className="loading-bar-container"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <motion.div
                                className="loading-bar-fill"
                                initial={{ width: "0%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.2 }}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="loading-percentage"
                        >
                            {progress}%
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
