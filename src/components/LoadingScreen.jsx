import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoProfileTrans from '../assets/logoProfile-transparent.png';

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
                    <div className="quantum-loader earthquake-rumble">
                        <div className="ring ring-1"></div>
                        <div className="ring ring-2"></div>
                        <div className="ring ring-3"></div>
                        
                        <div className="logo logo-shake">
                            <img src={logoProfileTrans} alt="Loading Logo" />
                        </div>

                        {/* Debris / Cracking Dots */}
                        {[...Array(12)].map((_, i) => (
                            <div 
                                key={i} 
                                className="debris-dot"
                                style={{
                                    '--tx': `${(Math.random() - 0.5) * 300}px`,
                                    '--ty': `${(Math.random() - 0.5) * 300}px`,
                                    animationDelay: `${Math.random() * 0.5}s`
                                }}
                            ></div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
