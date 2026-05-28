import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import profileImage from '../assets/profile-hero.webp';

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
            <div className="hero-kicker">Full Stack Developer / CS Engineering Student</div>
            <div className="hero-content">
                <div className="hero-copy">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="hero-status"
                    >
                        <span className="status-pulse" />
                        Available for project-based work
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="hero-title"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 0 }}
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
                        style={{ 
                            fontFamily: 'var(--font-accent)', 
                            fontStyle: 'italic', 
                            fontWeight: 400, 
                            letterSpacing: 0,
                            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                        }}
                    >
                        CS Engineering Student & Developer
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 }}
                        className="hero-desc"
                        style={{ fontFamily: 'var(--font-main)', fontWeight: 300, fontSize: '1.15rem', lineHeight: 1.8 }}
                    >
                        Crafting digital experiences that defy gravity. Specialized in building exceptional
                        digital products with modern technologies.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.75 }}
                        className="hero-stack-row"
                    >
                        {['React', 'Node.js', 'MongoDB', 'UI Motion'].map((item) => (
                            <span key={item}>{item}</span>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 }}
                        className="hero-metrics"
                    >
                        <div>
                            <strong>13+</strong>
                            <span>Core Skills</span>
                        </div>
                        <div>
                            <strong>9</strong>
                            <span>Featured Projects</span>
                        </div>
                        <div>
                            <strong>7</strong>
                            <span>Certificates</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.9 }}
                        className="hero-buttons"
                    >
                        <motion.a
                            href="/Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                        >
                            View Resume
                        </motion.a>
                        <motion.a
                            href="#contact"
                            className="btn-secondary"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                        >
                            Contact Me
                        </motion.a>
                    </motion.div>
                </div>

                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.92, rotateY: -12 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <motion.div
                        className="avatar-container"
                        animate={{ y: [0, -14, 0], rotateZ: [0, 1.5, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="avatar-image-wrapper">
                            <img
                                src={profileImage}
                                alt="Swaraj Prajapati - Full Stack Developer"
                                className="avatar-img"
                                loading="eager"
                                fetchPriority="high"
                                decoding="async"
                                width="260"
                                height="260"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        className="hero-orbit-card orbit-card-one"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        React / Node
                    </motion.div>
                    <motion.div
                        className="hero-orbit-card orbit-card-two"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                        UI / Motion
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
