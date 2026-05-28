import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const sections = [
    { id: 'hero', label: 'Intro' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Work' },
    { id: 'hackathon', label: 'Builds' },
    { id: 'certificates', label: 'Proof' },
    { id: 'contact', label: 'Contact' },
];

export default function ScrollExperience() {
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.2 });
    const railRotate = useTransform(progress, [0, 1], [-10, 10]);
    const thumbTop = useTransform(progress, [0, 1], ['0%', '100%']);
    const [active, setActive] = useState('hero');
    const [percent, setPercent] = useState(0);
    const [availableSections, setAvailableSections] = useState(sections);
    const location = useLocation();

    useEffect(() => {
        let ticking = false;

        const updateActiveSection = () => {
            const existingSections = sections.filter((section) => document.getElementById(section.id));
            setAvailableSections(existingSections.length ? existingSections : sections);

            const midpoint = window.innerHeight * 0.45;
            const current = [...existingSections].reverse().find((section) => {
                const el = document.getElementById(section.id);
                if (!el) return false;
                return el.getBoundingClientRect().top <= midpoint;
            });

            setActive(current?.id || existingSections[0]?.id || 'hero');
            const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
            setPercent(Math.round((window.scrollY / maxScroll) * 100));
            ticking = false;
        };

        const requestUpdate = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(updateActiveSection);
        };

        const handleResize = () => {
            ticking = false;
            updateActiveSection();
        };

        updateActiveSection();
        window.addEventListener('scroll', requestUpdate, { passive: true });
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', requestUpdate);
            window.removeEventListener('resize', handleResize);
        };
    }, [location.pathname]);

    return (
        <aside className="scroll-experience" aria-hidden="true">
            <motion.div className="scroll-rail-3d" style={{ rotateY: railRotate }}>
                <div className="scroll-rail-track">
                    <motion.div className="scroll-rail-fill" style={{ scaleY: progress }} />
                    <motion.div className="scroll-rail-thumb" style={{ top: thumbTop }} />
                </div>
                <div className="scroll-percent">{percent}%</div>
            </motion.div>

            <div className="scroll-section-dots">
                {availableSections.map((section) => (
                    <a
                        key={section.id}
                        href={`#${section.id}`}
                        className={`scroll-section-dot ${active === section.id ? 'active' : ''}`}
                        tabIndex={-1}
                    >
                        <span />
                        <em>{section.label}</em>
                    </a>
                ))}
            </div>
        </aside>
    );
}
