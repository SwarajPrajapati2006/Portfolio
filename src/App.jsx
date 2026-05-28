import React, { Suspense, useState, useEffect, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import useScrollBlur from './hooks/useScrollBlur';
import usePageTitle from './hooks/usePageTitle';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';
import Background from './components/Background';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import SEO from './components/SEO';
// Verified deployment trigger
const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Certificate = lazy(() => import('./components/Certificate'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [theme, setTheme] = useState('dark');
    const location = useLocation();

    // Initialize page title updater
    usePageTitle();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setLoadingProgress(prev => {
                    const next = prev + Math.floor(Math.random() * 5) + 2;
                    if (next >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return next;
                });
            }, 10);
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
        <ScrollToTop />
        <SEO title="Swaraj Prajapati | Full Stack Developer" description="Swaraj Prajapati is a Full Stack Developer skilled in React, Node.js, and modern web technologies. Explore my projects, skills, and achievements." />
        <div className="app-container" data-theme={theme}>
            <div className="spotlight" />
            <div className="premium-noise" />
            <div className="interface-grid" />
            <CustomCursor />
            {isLoading && (
                <LoadingScreen
                    progress={loadingProgress}
                    theme={theme}
                    onComplete={() => setTimeout(() => setIsLoading(false), 50)}
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
                    <Suspense fallback={
                        <div className="loading-placeholder" style={{
                            minHeight: '60vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <div className="loader-ring" style={{
                                width: '40px',
                                height: '40px',
                                border: '3px solid rgba(255,255,255,0.1)',
                                borderTopColor: 'var(--accent-purple)',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite'
                            }} />
                        </div>
                    }>
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/skills" element={<Skills />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/certificates" element={<Certificate />} />
                            <Route path="/contact" element={<Contact />} />
                        </Routes>
                    </Suspense>
                </main>
                <Footer />
            </motion.div>
        </div>
        </HelmetProvider>
    );
}

export default App;
