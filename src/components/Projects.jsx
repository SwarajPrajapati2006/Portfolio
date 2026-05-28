import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Layout, Monitor, StickyNote, Mic, Youtube, X, ChevronRight, FileText, ChevronDown, Database, Terminal } from 'lucide-react';

import bentleyImg from '../assets/bentley.png';
import joshImg from '../assets/josh app.png';
import notesImg from '../assets/sticky notes.png';
import textToSpeechImg from '../assets/text to speech convertor.png';
import worldAtlasImg from '../assets/World Atlas.png';
import foodGalaxyImg from '../assets/Food Galaxy.png';
import gapGraphImg from '../assets/GapGraph.png';
import flowTrackImg from '../assets/Flow-Track.png';
import orderPulseImg from '../assets/Order_pulse.png';

const mainProjects = [
    {
        title: 'Flow-Track',
        desc: 'A robust, enterprise-grade project management and issue tracking system. Features interactive Kanban boards, sprint planners, workflow automation, and deep analytics.',
        tags: ['React', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS'],
        github: 'https://github.com/SwarajPrajapati2006/flowTrack',
        link: 'https://flow-track-tawny.vercel.app',
        icon: <Terminal size={48} />,
        image: flowTrackImg,
        readme: 'https://github.com/SwarajPrajapati2006/flowTrack/blob/main/README.md',
        ytLink: 'https://www.youtube.com/embed/KwExE6OuBHU',
        postman: 'https://documenter.getpostman.com/view/50840877/2sBXqKnewR',
        category: 'fullstack'
    },
    {
        title: 'OrderPulse',
        desc: 'A high-performance full-stack inventory and order tracking dashboard designed for scale. Featuring authentication, real-time analytics, status pipelines, and deep telemetry.',
        tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Vite'],
        github: 'https://github.com/SwarajPrajapati2006/amazon_orders_swaraj_prajapati',
        link: 'https://order-pulse-swaraj.vercel.app/login',
        icon: <Database size={48} />,
        image: orderPulseImg,
        readme: 'https://github.com/SwarajPrajapati2006/amazon_orders_swaraj_prajapati/blob/main/README.md',
        category: 'fullstack'
    },
    {
        title: 'GapGraph AI',
        desc: 'AI-powered career gap analysis tool that helps users identify skill gaps and generate personalized learning roadmaps.',
        tags: ['React', 'Generative AI', 'Analysis'],
        github: 'https://github.com/SwarajPrajapati2006/GapGraph',
        link: 'https://gap-graph.vercel.app/upload',
        icon: <Monitor size={48} />,
        image: gapGraphImg,
        readme: 'https://github.com/SwarajPrajapati2006/GapGraph#readme',
        category: 'fullstack'
    },
    {
        title: 'Bentley Clone',
        desc: 'A premium, responsive landing page clone of the Bentley Motors website, featuring luxury aesthetics and smooth transitions.',
        tags: ['HTML5', 'CSS3', 'Responsive Design'],
        github: 'https://github.com/SwarajPrajapati2006/Projects',
        link: 'https://luxury-choux-7ba7a1.netlify.app/',
        icon: <Layout size={48} />,
        image: bentleyImg,
        readme: 'https://github.com/SwarajPrajapati2006/Projects/tree/main/Bentley%20clone',
        ytLink: 'https://www.youtube.com/embed/FrVXoVzK4Ys',
        category: 'frontend'
    },
    {
        title: 'World Atlas',
        desc: 'Explore the world with an interactive atlas application displaying country data, flags, and more.',
        tags: ['React', 'TailwindCSS', 'API'],
        github: 'https://github.com/SwarajPrajapati2006/World-Atlas',
        link: 'https://world-atlas-bay.vercel.app',
        icon: <Layout size={48} />,
        image: worldAtlasImg,
        readme: 'https://github.com/SwarajPrajapati2006/World-Atlas#readme',
        ytLink: 'https://www.youtube.com/embed/HeVc8S2kHTI',
        category: 'frontend'
    },
    {
        title: 'Food Galaxy',
        desc: 'A vibrant food discovery platform showcasing various cuisines and recipes with an engaging user interface.',
        tags: ['React', 'CSS', 'Vite'],
        github: 'https://github.com/SwarajPrajapati2006/Food-Galaxy',
        link: 'https://food-galaxy.vercel.app',
        icon: <Layout size={48} />,
        image: foodGalaxyImg,
        readme: 'https://github.com/SwarajPrajapati2006/Food-Galaxy#readme',
        ytLink: 'https://www.youtube.com/embed/Njp-wXsKDq0',
        category: 'frontend'
    },
    {
        title: 'Josh Talks Clone',
        desc: 'A comprehensive clone of the Josh Talks platform, focusing on video presentation and inspiring content layout.',
        tags: ['HTML5', 'CSS3', 'Layout Design'],
        github: 'https://github.com/SwarajPrajapati2006/Projects',
        link: 'https://joshtalks.netlify.app/',
        icon: <Monitor size={48} />,
        image: joshImg,
        readme: 'https://github.com/SwarajPrajapati2006/Projects/tree/main/Josh%20Talks%20clone',
        ytLink: 'https://www.youtube.com/embed/sLckr0J4tCg',
        category: 'frontend'
    },
    {
        title: 'Notes App',
        desc: 'A powerful React-based note-taking application features intuitive UI and efficient client-side data management.',
        tags: ['React', 'Vite', 'HMR'],
        github: 'https://github.com/SwarajPrajapati2006/Projects',
        link: 'https://keepnotes56.netlify.app/',
        icon: <StickyNote size={48} />,
        image: notesImg,
        readme: 'https://github.com/SwarajPrajapati2006/Projects/tree/main/notesapp/notes',
        category: 'frontend'
    },
    {
        title: 'Text to Speech',
        desc: 'A sleek utility tool that converts written text into audible speech using browser synthesis APIs.',
        tags: ['JavaScript', 'Web Speech API', 'UI/UX'],
        github: 'https://github.com/SwarajPrajapati2006/Projects',
        link: 'https://speechconverter1.netlify.app/',
        icon: <Mic size={48} />,
        image: textToSpeechImg,
        readme: 'https://github.com/SwarajPrajapati2006/Projects/tree/main/text_to_speech',
        category: 'frontend'
    }
];

export default function Projects() {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [activeTab, setActiveTab] = useState('all');

    const filteredProjects = activeTab === 'all'
        ? mainProjects
        : mainProjects.filter(project => project.category === activeTab);

    const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);

    return (
        <section id="projects" className="section-container">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="section-title"
                style={{ fontFamily: 'var(--font-display)' }}
            >
                Featured <span style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', color: 'var(--accent-purple)' }}>Projects</span>
            </motion.h2>

            {/* Premium Category Filter Tabs */}
            <div className="projects-filter-container" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
                <div className="projects-tabs-bar" style={{
                    display: 'flex',
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '30px',
                    padding: '6px',
                    gap: '4px',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)'
                }}>
                    {['all', 'fullstack', 'frontend'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => {
                                setActiveTab(tab);
                                setShowAll(false); // Reset view limit on tab switch
                            }}
                            style={{
                                position: 'relative',
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                padding: '8px 24px',
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                textTransform: 'capitalize',
                                cursor: 'pointer',
                                color: activeTab === tab ? '#fff' : 'rgba(255, 255, 255, 0.6)',
                                transition: 'color 0.3s ease',
                                borderRadius: '25px',
                            }}
                        >
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="activeProjectTab"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-teal))',
                                        borderRadius: '25px',
                                        zIndex: -1,
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                            {tab === 'fullstack' ? 'Full Stack' : tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="projects-grid">
                <AnimatePresence mode="popLayout">
                    {visibleProjects.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            index={index}
                            onPlayVideo={() => setSelectedVideo(project.ytLink)}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* View More / View Less Button */}
            {filteredProjects.length > 3 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="view-more-container"
                >
                    <motion.button
                        className="view-more-btn"
                        onClick={() => setShowAll(!showAll)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {showAll ? (
                            <>
                                <ChevronDown size={20} style={{ transform: 'rotate(180deg)' }} />
                                Show Less
                            </>
                        ) : (
                            <>
                                <ChevronRight size={20} />
                                View More Projects
                            </>
                        )}
                    </motion.button>
                </motion.div>
            )}

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="video-modal-overlay"
                        onClick={() => setSelectedVideo(null)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0,0,0,0.85)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1000
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                position: 'relative',
                                width: '80%',
                                maxWidth: '800px',
                                aspectRatio: '16/9',
                                backgroundColor: '#000',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                boxShadow: '0 0 60px rgba(139, 92, 246, 0.5)'
                            }}
                        >
                            <button
                                onClick={() => setSelectedVideo(null)}
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    background: 'rgba(0,0,0,0.5)',
                                    border: 'none',
                                    color: 'white',
                                    cursor: 'pointer',
                                    padding: '8px',
                                    borderRadius: '50%',
                                    zIndex: 10,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                aria-label="Close video player"
                            >
                                <X size={24} />
                            </button>
                            <iframe
                                src={selectedVideo}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                style={{ width: '100%', height: '100%' }}
                            ></iframe>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export function ProjectCard({ project, index, onPlayVideo }) {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            viewport={{ once: true }}
            transition={{
                type: 'spring',
                stiffness: 260,
                damping: 25,
                delay: index * 0.05
            }}
            className="project-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="project-image"
                style={{ position: 'relative', overflow: 'hidden' }}
            >
                <div className="project-image-overlay" />
                <div className="project-placeholder-content">
                    {project.image ? (
                        <img
                            src={project.image}
                            alt={`${project.title} - Project Screenshot`}
                            loading="lazy"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center top',
                                transition: 'transform 0.5s ease'
                            }}
                        />
                    ) : (
                        <>
                            <div className="project-icon-wrapper">{project.icon}</div>
                            <span className="project-placeholder-text">{project.title}</span>
                        </>
                    )}
                </div>
                <AnimatePresence>
                    {project.ytLink && isHovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                zIndex: 2,
                                pointerEvents: 'none'
                            }}
                        >
                            <iframe
                                src={`${project.ytLink}?autoplay=1&mute=1&controls=0&loop=1&playlist=${project.ytLink.split('/embed/')[1]}`}
                                title={`${project.title} Video Preview`}
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    border: 'none'
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                {project.ytLink && (
                    <div className="video-hover-indicator" style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        background: 'rgba(3, 4, 7, 0.78)',
                        color: 'var(--text-primary)',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        zIndex: 3,
                        opacity: isHovered ? 0 : 1,
                        transition: 'opacity 0.3s ease'
                    }}>
                        Video demo
                    </div>
                )}
            </div>

            <div className="project-content">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h3 className="project-title" style={{ margin: 0 }}>{project.title}</h3>
                    {project.category && (
                        <span className="project-category-badge" style={{
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            padding: '2px 8px',
                            borderRadius: '12px',
                            background: project.category === 'fullstack' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(20, 184, 166, 0.15)',
                            color: project.category === 'fullstack' ? '#a78bfa' : '#2dd4bf',
                            border: `1px solid ${project.category === 'fullstack' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(20, 184, 166, 0.3)'}`,
                            textTransform: 'uppercase'
                        }}>
                            {project.category === 'fullstack' ? 'Full Stack' : 'Frontend'}
                        </span>
                    )}
                </div>
                <p className="project-desc">{project.desc}</p>

                <div className="project-tags">
                    {project.tags.map(tag => (
                        <span key={tag} className="project-tag">{tag}</span>
                    ))}
                </div>

                <div className="project-links" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <a href={project.github} className="project-link link-code" target="_blank" rel="noopener noreferrer">
                        <Github size={16} /> Code
                    </a>
                    <a href={project.link} className="project-link link-demo" target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} /> Live
                    </a>
                    {project.readme && (
                        <a href={project.readme} className="project-link link-readme" target="_blank" rel="noopener noreferrer">
                            <FileText size={16} /> Docs
                        </a>
                    )}
                    {project.postman && (
                        <a href={project.postman} className="project-link link-postman" target="_blank" rel="noopener noreferrer" style={{
                            borderColor: 'rgba(255, 108, 55, 0.4)',
                            color: '#ff6c37',
                            background: 'rgba(255, 108, 55, 0.05)'
                        }}>
                            <Database size={16} /> Postman
                        </a>
                    )}
                    {project.ytLink && onPlayVideo && (
                        <button
                            onClick={onPlayVideo}
                            className="project-link link-yt"
                            aria-label={`Watch ${project.title} demo video`}
                        >
                            <Youtube size={16} /> Video
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
