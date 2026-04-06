import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import profilePhoto from '../assets/my photo.png';


export default function Hero() {
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    const words = ["Swaraj Prajapati", "Software Developer"];
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, typingSpeed);

        return () => clearInterval(ticker);
    }, [displayText, typingSpeed]);

    const tick = () => {
        let i = loopNum % words.length;
        let fullWord = words[i];
        let updatedText = isDeleting
            ? fullWord.substring(0, displayText.length - 1)
            : fullWord.substring(0, displayText.length + 1);

        setDisplayText(updatedText);

        if (isDeleting) {
            setTypingSpeed(prevSpeed => prevSpeed / 1.5);
        }

        if (!isDeleting && updatedText === fullWord) {
            setIsDeleting(true);
            setTypingSpeed(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setTypingSpeed(150);
        }
    };

    return (
        <section id="hero" className="hero-section">
            <div className="hero-content">
                <motion.div
                    className="avatar-container"
                    initial={{ opacity: 0, scale: 0.5, y: -50 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 1,
                        ease: "easeOut"
                    }}
                >
                    <motion.div className="avatar-image-wrapper">
                        <img
                            src={profilePhoto}
                            alt="Swaraj Prajapati"
                            className="avatar-img"
                        />
                    </motion.div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="hero-title"
                >
                    <div className="hero-name-container">
                        <span className="gradient-text">
                            {displayText}
                        </span>
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="cursor"
                        >
                            |
                        </motion.span>
                    </div>
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="hero-subtitle"
                >
                    CS Engineering Student & Developer
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                    className="hero-desc"
                >
                    Crafting digital experiences that defy gravity. Specialized in building exceptional
                    digital products with modern technologies.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 }}
                    className="hero-buttons"
                >
                    <motion.a
                        href="/Resume2 (3).pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px var(--accent-purple)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View Resume
                    </motion.a>
                    <motion.a
                        href="#contact"
                        className="btn-secondary"
                        whileHover={{ scale: 1.05, background: "rgba(255, 255, 255, 0.1)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Contact Me
                    </motion.a>
                </motion.div>
            </div>

            {/* Floating Geometric Shapes acting as background depth */}
            <FloatingShape delay={0} duration={8} top="20%" left="10%" size="60px" colorClass="shape-purple" />
            <FloatingShape delay={2} duration={10} top="60%" right="15%" size="100px" colorClass="shape-teal" />
            <FloatingShape delay={1} duration={12} bottom="10%" left="20%" size="40px" colorClass="shape-white" />
        </section>
    );
}

function FloatingShape({ delay, duration, top, left, right, bottom, size, colorClass }) {
    return (
        <motion.div
            animate={{
                y: [0, -40, 0],
                rotate: [0, 360],
                opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
            }}
            className={`floating-shape ${colorClass}`}
            style={{ top, left, right, bottom, width: size, height: size }}
        />
    );
}
