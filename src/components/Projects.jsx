import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Layout, Monitor, StickyNote, Mic } from 'lucide-react';

import bentleyImg from '../assets/bentley.png';
import joshImg from '../assets/josh app.png';
import notesImg from '../assets/sticky notes.png';
import textToSpeechImg from '../assets/text to speech convertor.png';
import gapgraphImg from '../assets/gapgraph.png';

const projects = [
    {
        title: 'GapGraph AI',
        desc: 'AI-powered career gap analysis tool that helps users identify skill gaps and generate personalized learning roadmaps based on their resume and target job descriptions.',
        tags: ['React', 'AI/ML', 'TailwindCSS', 'Vercel'],
        github: 'https://github.com/SwarajPrajapati2006/GapGraph',
        link: 'https://gap-graph.vercel.app/upload',
        icon: <Layout size={48} />,
        image: gapgraphImg,
        readme: 'https://github.com/SwarajPrajapati2006/GapGraph#readme'
    },
    {
        title: 'Bentley Clone',
        desc: 'A premium, responsive landing page clone of the Bentley Motors website, featuring luxury aesthetics and smooth transitions.',
        tags: ['HTML5', 'CSS3', 'Responsive Design'],
        github: 'https://github.com/SwarajPrajapati2006/Projects',
        link: 'https://luxury-choux-7ba7a1.netlify.app/',
        icon: <Layout size={48} />,
        image: bentleyImg,
        readme: 'https://github.com/SwarajPrajapati2006/Projects/tree/main/Bentley%20CLone'
    },
    {
        title: 'Josh Talks Clone',
        desc: 'A comprehensive clone of the Josh Talks platform, focusing on video presentation and inspiring content layout.',
        tags: ['HTML5', 'CSS3', 'Layout Design'],
        github: 'https://github.com/SwarajPrajapati2006/Projects',
        link: 'https://joshtalks.netlify.app/',
        icon: <Monitor size={48} />,
        image: joshImg,
        readme: 'https://github.com/SwarajPrajapati2006/Projects/tree/main/Josh%20Talks%20clone'
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
    return (
        <section id="projects" className="section-container">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="section-title"
            >
                Featured <span className="highlight-purple" style={{ color: 'var(--accent-purple)' }}>Projects</span>
            </motion.h2>

            <div className="projects-grid">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} />
                ))}
            </div>
        </section>
    );
}

function ProjectCard({ project, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{
                y: -10,
                rotateX: 5,
                rotateY: 5,
                scale: 1.02,
                transition: { duration: 0.2 }
            }}
            viewport={{ once: true }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: index * 0.1
            }}
            className="project-card group"
            style={{ perspective: 1000 }}
        >
            <div className="project-image">
                <div className="project-image-overlay" />
                <div className="project-placeholder-content">
                    {project.image ? (
                        <img
                            src={project.image}
                            alt={project.title}
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
            </div>

            <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>

                <div className="project-tags">
                    {project.tags.map(tag => (
                        <span key={tag} className="project-tag">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="project-links">
                    <a href={project.github} className="project-link link-code" target="_blank" rel="noopener noreferrer">
                        <Github size={18} /> Code
                    </a>
                    <a href={project.link} className="project-link link-demo" target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={18} /> Live Demo
                    </a>
                    <a href={project.readme} className="project-link link-code" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.7 }}>
                        README
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
