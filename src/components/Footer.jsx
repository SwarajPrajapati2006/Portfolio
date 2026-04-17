import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Youtube, Mail, Heart } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Github, href: 'https://github.com/SwarajPrajapati2006', label: 'GitHub' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/swaraj-prajapati-435410369/', label: 'LinkedIn' },
        { icon: Youtube, href: 'https://www.youtube.com/@77Ff77', label: 'YouTube' },
        { icon: Mail, href: 'mailto:swaraj.prajapati.cg@gmail.com', label: 'Email' },
    ];

    return (
        <footer className="footer-container">
            {/* 3D Animated Name */}
            <div className="footer-3d-name">
                <motion.div
                    className="name-3d-wrapper"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.span
                        className="name-3d"
                        animate={{
                            rotateY: [0, 10, 0, -10, 0],
                            rotateX: [0, 5, 0, -5, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <span className="name-letter">S</span>
                        <span className="name-letter">W</span>
                        <span className="name-letter">A</span>
                        <span className="name-letter">R</span>
                        <span className="name-letter">A</span>
                        <span className="name-letter">J</span>
                    </motion.span>
                </motion.div>
            </div>

            {/* Social Links */}
            <div className="footer-social">
                {socialLinks.map((social, index) => (
                    <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={social.label}
                    >
                        <social.icon size={24} />
                    </motion.a>
                ))}
            </div>

            {/* Copyright */}
            <motion.div
                className="footer-copyright"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
            >
                <p className="copyright-text">
                    Made with <Heart size={16} className="heart-icon" fill="#ef4444" /> by Swaraj Prajapati
                </p>
                <p className="copyright-year">© {currentYear} All Rights Reserved</p>
            </motion.div>
        </footer>
    );
};

export default Footer;
