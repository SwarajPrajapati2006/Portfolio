import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, Play } from 'lucide-react';

export default function LeetCode() {
    return (
        <section className="section-container">
            <motion.h2
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="section-title"
            >
                Competitive <span style={{ color: '#FFA116' }}>Programming</span>
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card skill-card group relative overflow-hidden leetcode-card"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.5rem',
                    padding: '3rem 2rem',
                    textAlign: 'center',
                    maxWidth: '800px',
                    margin: '0 auto',
                    border: '1px solid rgba(255, 161, 22, 0.2)'
                }}
            >
                {/* Background Glow on Hover */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at center, #FFA116, transparent 70%)` }}
                />

                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="skill-icon relative z-10"
                    style={{ color: '#FFA116' }}
                >
                    <Award size={64} />
                </motion.div>

                <div className="leetcode-content">
                    <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                        LeetCode Profile
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '500px' }}>
                        I actively solve problems on LeetCode to sharpen my algorithmic thinking and problem-solving skills.
                    </p>

                    <motion.a
                        href="https://leetcode.com/u/Swaraj_Prajapati/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            background: '#FFA116',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.75rem 2rem',
                            border: 'none'
                        }}
                    >
                        View My Profile <ExternalLink size={18} />
                    </motion.a>
                </div>
            </motion.div>
        </section>
    );
}
