import React, { lazy, Suspense } from 'react';

const Hero = lazy(() => import('./Hero'));
const About = lazy(() => import('./About'));
const Skills = lazy(() => import('./Skills'));
const Projects = lazy(() => import('./Projects'));
const Hackathon = lazy(() => import('./Hackathon'));
const Certificate = lazy(() => import('./Certificate'));
const Contact = lazy(() => import('./Contact'));

const SectionLoader = () => (
    <div style={{
        height: '150px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255, 255, 255, 0.15)',
        fontSize: '0.9rem'
    }}>
        Loading section...
    </div>
);

export default function Home() {
    return (
        <>
            <Suspense fallback={<SectionLoader />}>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Hackathon />
                <Certificate />
                <Contact />
            </Suspense>
        </>
    );
}
