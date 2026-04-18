import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Layout, Monitor, StickyNote, Mic, Youtube, X, ChevronRight, FileText, ChevronDown } from 'lucide-react';

import bentleyImg from '../assets/bentley.png';
import joshImg from '../assets/josh app.png';
import notesImg from '../assets/sticky notes.png';
import textToSpeechImg from '../assets/text to speech convertor.png';
import worldAtlasImg from '../assets/World Atlas.png';
import foodGalaxyImg from '../assets/Food Galaxy.png';

const mainProjects = [
    {
        title: 'Bentley Clone',
        desc: 'A premium, responsive landing page clone of the Bentley Motors website, featuring luxury aesthetics and smooth transitions.',
        tags: ['HTML5', 'CSS3', 'Responsive Design'],
        github: 'https://github.com/SwarajPrajapati2006/Projects',
        link: 'https://luxury-choux-7ba7a1.netlify.app/',
        icon: <Layout size={48} />,
        image: bentleyImg,
        readme: 'https://github.com/SwarajPrajapati2006/Projects/tree/main/Bentley%20CLone',
        ytLink: 'https://www.youtube.com/embed/FrVXoVzK4Ys'
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
        ytLink: 'https://www.youtube.com/embed/HeVc8S2kHTI'
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
        ytLink: 'https://www.youtube.com/embed/Njp-wXsKDq0'
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
        ytLink: 'https://www.youtube.com/embed/sLckr0J4tCg'
    },
    {
        title: 'Notes App',
        desc: 'A powerful React-based note-taking application features intuitive UI and efficient client-side data management.',
        tags: ['React', 'Vite', 'HMR'],
        github: 'https://github.com/SwarajPrajapati2006/Projects',
        link: 'https://keepnotes56.netlify.app/',
        icon: <StickyNote size={48} />,
        image: notesImg,
        readme: 'https://github.com/SwarajPrajapati2006/Projects/tree/main/notesapp/notes'
    },
    {
        title: 'Text to Speech',
        desc: 'A sleek utility tool that converts written text into audible speech using browser synthesis APIs.',
        tags: ['JavaScript', 'Web Speech API', 'UI/UX'],
        github: 'https://github.com/SwarajPrajapati2006/Projects',
        link: 'https://speechconverter1.netlify.app/',
        icon: <Mic size={48} />,
        image: textToSpeechImg,
        readme: 'https://github.com/SwarajPrajapati2006/Projects/tree/main/text_to_speech'
    }
];

export default function Projects() {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [showAll, setShowAll] = useState(false);

    const visibleProjects = showAll ? mainProjects : mainProjects.slice(0, 3);

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

            <div className="projects-grid">
                <AnimatePresence>
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: index * 0.1
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
                    {project.image && !isHovered ? (
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
                    ) : project.ytLink && isHovered ? (
                        <iframe
                            src={project.ytLink}
                            title={`${project.title} preview`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                zIndex: 2
                            }}
                        />
                    ) : (
                        <>
                            <div className="project-icon-wrapper">{project.icon}</div>
                            <span className="project-placeholder-text">{project.title}</span>
                        </>
                    )}
                </div>
                {project.ytLink && (
                    <div className="video-hover-indicator" style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        background: 'rgba(255, 0, 0, 0.85)',
                        color: 'white',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        zIndex: 3,
                        opacity: isHovered ? 0 : 1,
                        transition: 'opacity 0.3s ease'
                    }}>
                        ▶ Preview
                    </div>
                )}
            </div>

            <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>

                <div className="project-tags">
                    {project.tags.map(tag => (
                        <span key={tag} className="project-tag">{tag}</span>
                    ))}
                </div>

                <div className="project-links">
                    <a href={project.github} className="project-link link-code" target="_blank" rel="noopener noreferrer">
                        <Github size={18} /> Code
                    </a>
                    <a href={project.link} className="project-link link-demo" target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={18} /> Live Demo
                    </a>
                    {project.readme && (
                        <a href={project.readme} className="project-link link-readme" target="_blank" rel="noopener noreferrer">
                            <FileText size={18} /> README
                        </a>
                    )}
                    {project.ytLink && onPlayVideo && (
                        <button
                            onClick={onPlayVideo}
                            className="project-link link-yt"
                            aria-label={`Watch ${project.title} demo video`}
                        >
                            <Youtube size={18} /> Watch
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
