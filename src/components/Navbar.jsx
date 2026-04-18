import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
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
        { name: 'Home', to: '/' },
        { name: 'About', to: '/about' },
        { name: 'Skills', to: '/skills' },
        { name: 'Projects', to: '/projects' },
        { name: 'Certificates', to: '/certificates' },
        { name: 'Contact', to: '/contact' },
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
                        <Link key={link.name} to={link.to} className="nav-link">
                            {link.name}
                            <span className="nav-link-underline" />
                        </Link>
                    ))}
                    <button
                        onClick={toggleTheme}
                        className="menu-btn"
                        style={{ marginLeft: '1rem' }}
                        aria-label="Toggle Theme"
                    >
                        {currentTheme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                    </button>
                </div>

                {/* Mobile Toggle */}
                <div className="mobile-toggle">
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <button
                            onClick={toggleTheme}
                            className="menu-btn"
                            aria-label={currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {currentTheme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                        </button>
                        <button
                            className="menu-btn"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        >
                            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
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
                                <Link
                                    key={link.name}
                                    to={link.to}
                                    className="mobile-nav-link"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </nav>
    );
}
