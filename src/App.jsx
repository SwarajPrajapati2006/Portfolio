import React, { Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import useScrollBlur from './hooks/useScrollBlur';
import usePageTitle from './hooks/usePageTitle';
import LoadingScreen from './components/LoadingScreen';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificate from './components/Certificate';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import SEO from './components/SEO';

function App() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [theme, setTheme] = useState('light');

    // Initialize page title updater
    usePageTitle();

    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setLoadingProgress(prev => {
                    const next = prev + Math.floor(Math.random() * 5) + 2; // Faster increment
                    if (next >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return next;
                });
            }, 30); // Much faster interval (was 150)
            return () => clearInterval(interval);
        }
    }, [isLoading]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
            document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    // Initialize scroll blur animation
    useScrollBlur();

    return (
        <HelmetProvider>
        <SEO title="Swaraj Prajapati | Full Stack Developer" description="Swaraj Prajapati is a Full Stack Developer skilled in React, Node.js, and modern web technologies. Explore my projects, skills, and achievements." />
        <div className="app-container" data-theme={theme}>
            <div className="spotlight" />
            <div className="aurora-container">
                <div className="aurora-orb orb-1" />
                <div className="aurora-orb orb-2" />
                <div className="aurora-orb orb-3" />
            </div>
            <CustomCursor />
            {isLoading && (
                <LoadingScreen
                    progress={loadingProgress}
                    theme={theme}
                    onComplete={() => setTimeout(() => setIsLoading(false), 1000)}
                />
            )}

            <Suspense fallback={null}>
                <Background theme={theme} />
            </Suspense>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ duration: 1 }}
                className="main-wrapper"
            >
                <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
                <main className="main-content">
                    <Hero />
                    <About />
                    <Skills />
                    <Projects />
                    <Certificate />
                    <Contact />
                </main>
                <Footer />
            </motion.div>
        </div>
        </HelmetProvider>
    );
}

export default App;
