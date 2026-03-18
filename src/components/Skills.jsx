import React from 'react';
import { motion } from 'framer-motion';

const skills = [
    { name: 'ReactJS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61DAFB' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#F7DF1E' },
    { name: 'C Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', color: '#A8B9CC' },
    { name: 'C++ Language', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', color: '#00599C' },
    { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', color: '#E34F26' },
    { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', color: '#1572B6' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#3776AB' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#47A248' },
    { name: 'Figma UI/UX', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', color: '#F24E1E' },
    { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', color: '#FF6C37' },
];

export default function Skills() {
    return (
        <section id="skills" className="section-container">
            <motion.h2
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="section-title"
            >
                Technical <span className="highlight-teal">Arsenal</span>
            </motion.h2>

            <div className="skills-grid">
                {skills.map((skill, index) => (
                    <SkillCard key={index} skill={skill} index={index} />
                ))}
            </div>
        </section>
    );
}

function SkillCard({ skill, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card skill-card group relative overflow-hidden"
        >
            {/* Background Glow on Hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at center, ${skill.color}, transparent 70%)` }}
            />

            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                }}
                className="skill-icon relative z-10"
                style={{
                    width: '3.5rem',
                    height: '3.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                }}
            >
                <img
                    src={skill.icon}
                    alt={skill.name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.3))'
                    }}
                />
            </motion.div>

            <h3 className="skill-name relative z-10 group-hover:text-white transition-colors">
                {skill.name}
            </h3>

            {/* Particle effect simulation (simple dots) */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/20 group-hover:scale-[10] group-hover:opacity-0 transition-all duration-700" />
        </motion.div>
    );
}
