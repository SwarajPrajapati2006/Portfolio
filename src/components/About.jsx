import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section className="section-container" id="about">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="section-title"
                style={{ fontFamily: 'var(--font-display)' }}
            >
                About <span style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 400 }}>Me</span>
            </motion.h2>

            <div className="about-content glass-card">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <p className="about-text">
                        My name is <strong>Swaraj Prajapati</strong>, a motivated Software Developer passionate about solving real-world problems. I focus on writing clean, efficient code and continuously learning new technologies to build meaningful applications.
                    </p>

                    <p className="about-highlight">
                        Available for 30–40 hours per week, and project-based work.
                    </p>

                    <p className="about-text">
                        I have hands-on experience with core programming concepts, debugging, and building applications. I enjoy breaking down complex problems and working both independently and in teams to deliver quality software.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
