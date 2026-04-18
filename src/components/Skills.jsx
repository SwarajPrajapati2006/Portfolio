import React from 'react';
import { motion } from 'framer-motion';

const skills = [
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', percent: 80 },
    { name: 'ReactJS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', percent: 75 },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', percent: 82 },
    { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', percent: 78 },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', percent: 92 },
    { name: 'C Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', percent: 85 },
    { name: 'C++ Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', percent: 82 },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', percent: 90 },
    { name: 'Figma UI/UX', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', percent: 99 },
    { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', percent: 99 },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', percent: 88 },
    { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', percent: 100 },
    { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', percent: 95 },
];

export default function Skills() {
    return (
        <section id="skills" className="section-container">
            <motion.h2
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="section-title"
                style={{ fontFamily: 'var(--font-display)' }}
            >
                Technical <span style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', color: 'var(--accent-teal)' }}>Arsenal</span>
            </motion.h2>

            <div className="skills-grid">
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card skill-card"
                        whileHover={{ scale: 1.05, y: -5 }}
                    >
                        <div className="skill-icon">
                            <img src={skill.icon} alt={skill.name} loading="lazy" decoding="async" width="48" height="48" />
                        </div>
                        <h3 className="skill-name" style={{ fontFamily: 'var(--font-main)', fontWeight: 500 }}>{skill.name}</h3>
                        <div className="skill-progress-container">
                            <div className="skill-percent-text">{skill.percent}%</div>
                            <div className="skill-progress-bar-bg">
                                <motion.div
                                    className="skill-progress-bar-fill"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.percent}%` }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                                    style={{
                                        background: `linear-gradient(90deg, var(--accent-purple), var(--accent-teal))`
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
