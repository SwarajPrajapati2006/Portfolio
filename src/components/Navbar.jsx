import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

export default function Navbar({ toggleTheme, currentTheme }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Certificates', href: '#certificates' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="nav-logo"
                    whileHover={{ scale: 1.05 }}
                >
                    <Logo width={45} height={45} theme={currentTheme} />
                </motion.div>

                {/* Desktop Nav */}
                <div className="nav-links desktop">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="nav-link">
                            {link.name}
                            <span className="nav-link-underline" />
                        </a>
                    ))}
                    <button
                        onClick={toggleTheme}
                        className="menu-btn"
                        style={{ fontSize: '1.25rem', marginLeft: '1rem' }}
                        aria-label="Toggle Theme"
                    >
                        {currentTheme === 'dark' ? '☀️' : '🌙'}
                    </button>
                </div>

                {/* Mobile Toggle */}
                <div className="mobile-toggle">
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <button
                            onClick={toggleTheme}
                            className="menu-btn"
                            style={{ fontSize: '1.25rem' }}
                        >
                            {currentTheme === 'dark' ? '☀️' : '🌙'}
                        </button>
                        <button
                            className="menu-btn"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mobile-menu"
                    >
                        <div className="mobile-links">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="mobile-nav-link"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </nav>
    );
}
