import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Trophy, Zap, Youtube, X, FileText } from 'lucide-react';
import gapgraphImg from '../assets/GapGraph.png';
import irctcImg from '../assets/IRctc hackathon.png';

const hackathonProjects = [
    {
        title: 'GapGraph AI',
        badge: '🏆 Featured Hackathon Project',
        badgeColor: '#f59e0b',
        desc: 'AI-powered career gap analysis tool that helps users identify skill gaps and generate personalized learning roadmaps based on their resume and target job descriptions.',
        tags: ['React', 'AI/ML', 'TailwindCSS', 'Vercel'],
        github: 'https://github.com/SwarajPrajapati2006/GapGraph',
        link: 'https://gap-graph.vercel.app/upload',
        image: gapgraphImg,
        readme: 'https://github.com/SwarajPrajapati2006/GapGraph#readme',
        highlight: 'Built in 24hrs · AI/ML Integration',
        icon: <Zap size={20} />,
    },
    {
        title: 'IRCTC Re-Design',
        badge: '🚀 Hackathon Project',
        badgeColor: '#8b5cf6',
        desc: 'A modern, user-friendly redesign of the IRCTC railway booking platform with improved UI/UX, faster navigation, and enhanced accessibility features. Built during a hackathon.',
        tags: ['React', 'Hackathon', 'UI/UX', 'Vercel'],
        github: 'https://github.com/SwarajPrajapati2006/IRCTC-Re-Design',
        link: 'https://irctc-re-design.vercel.app',
        image: irctcImg,
        readme: 'https://github.com/SwarajPrajapati2006/IRCTC-Re-Design/blob/main/README.md',
        ytLink: 'https://www.youtube.com/embed/I-nk-hxC4sA',
        highlight: 'UI/UX Redesign · Railway Booking',
        icon: <Trophy size={20} />,
    },
];

export default function Hackathon() {
    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <section id="hackathon" className="section-container">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="section-title"
                style={{ fontFamily: 'var(--font-display)' }}
            >
                Hackathon <span style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', color: 'var(--accent-teal)' }}>Projects</span>
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                style={{
                    textAlign: 'center',
                    color: 'var(--text-secondary)',
                    fontSize: '1.1rem',
                    marginBottom: '3rem',
                    maxWidth: '600px',
                    margin: '0 auto 3rem',
                }}
            >
                Projects built under pressure — from idea to deployment in hours.
            </motion.p>

            <div className="hackathon-grid">
                {hackathonProjects.map((project, index) => (
                    <HackathonCard
                        key={project.title}
                        project={project}
                        index={index}
                        onPlayVideo={project.ytLink ? () => setSelectedVideo(project.ytLink) : null}
                    />
                ))}
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedVideo(null)}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0,
                            width: '100%', height: '100%',
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
                                boxShadow: '0 0 60px rgba(20, 184, 166, 0.5)'
                            }}
                        >
                            <button
                                onClick={() => setSelectedVideo(null)}
                                style={{
                                    position: 'absolute',
                                    top: '10px', right: '10px',
                                    background: 'rgba(0,0,0,0.6)',
                                    border: 'none', color: 'white',
                                    cursor: 'pointer', padding: '8px',
                                    borderRadius: '50%', zIndex: 10,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}
                                aria-label="Close video"
                            >
                                <X size={24} />
                            </button>
                            <iframe
                                src={selectedVideo}
                                title="Hackathon project demo"
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

function HackathonCard({ project, index, onPlayVideo }) {
    const [imgHovered, setImgHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: index * 0.15 }}
            className="hackathon-card"
        >
            {/* Badge */}
            <div className="hackathon-badge" style={{ background: `${project.badgeColor}22`, color: project.badgeColor, borderColor: `${project.badgeColor}44` }}>
                {project.icon}
                <span>{project.badge}</span>
            </div>

            {/* Image */}
            <div
                className="hackathon-image"
                onMouseEnter={() => project.ytLink && setImgHovered(true)}
                onMouseLeave={() => setImgHovered(false)}
            >
                {project.image && !imgHovered ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', transition: 'transform 0.5s ease' }}
                    />
                ) : project.ytLink && imgHovered ? (
                    <iframe
                        src={project.ytLink}
                        title={`${project.title} preview`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 2 }}
                    />
                ) : (
                    <div className="hackathon-img-placeholder">
                        <Trophy size={48} color="var(--accent-teal)" />
                    </div>
                )}
                {project.ytLink && (
                    <div className="video-hover-indicator" style={{
                        position: 'absolute', bottom: '10px', right: '10px',
                        background: 'rgba(255,0,0,0.85)', color: 'white',
                        padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem',
                        fontWeight: 600, zIndex: 3,
                        opacity: imgHovered ? 0 : 1, transition: 'opacity 0.3s ease'
                    }}>▶ Preview</div>
                )}
            </div>

            {/* Content */}
            <div className="hackathon-content">
                <div className="hackathon-highlight">
                    <span>{project.highlight}</span>
                </div>
                <h3 className="hackathon-title">{project.title}</h3>
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
                        <button onClick={onPlayVideo} className="project-link link-yt" aria-label={`Watch ${project.title}`}>
                            <Youtube size={18} /> Watch
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
