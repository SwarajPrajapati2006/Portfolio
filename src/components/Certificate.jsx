import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import workshopScreenshot from '../assets/Screenshot 2026-01-18 145502.png';
import certificate2Img from '../assets/certificate2.png';
import hackCruxImg from '../assets/hackcrux-certificate.png';
import artParkImg from '../assets/ArtPark Partcipation Certificate.png';

const Certificate = () => {
    const certificates = [
        {
            title: "AI Tools Workshop",
            issuer: "be10x",
            date: "January 18th, 2026",
            issuerLogo: "be10x",
            type: "standard",
            recipient: "SWARAJ PRAJAPATI",
            description: "on successful completion of AI tools and ChatGPT workshop",
            image: workshopScreenshot,
            verified: true,
            link: "#"
        },
        {
            title: "Advanced Web Development",
            issuer: "Meta",
            date: "February 2026",
            issuerLogo: "meta",
            type: "standard",
            recipient: "SWARAJ PRAJAPATI",
            description: "on successful completion of Advanced React and Web Architecture",
            image: certificate2Img,
            verified: true,
            link: "#"
        },
        {
            title: "HackCrux Hackathon",
            issuer: "HackCrux",
            date: "2026",
            issuerLogo: "hackcrux",
            type: "standard",
            recipient: "SWARAJ PRAJAPATI",
            description: "Certificate of participation/achievement in HackCrux Hackathon",
            image: hackCruxImg,
            verified: true,
            link: "#"
        },
        {
            title: "ArtPark Participation",
            issuer: "ArtPark",
            date: "2026",
            issuerLogo: "artpark",
            type: "standard",
            recipient: "SWARAJ PRAJAPATI",
            description: "Certificate of participation in ArtPark",
            image: artParkImg,
            verified: true,
            link: "#"
        }
    ];

    const handleOpenPdf = (link) => {
        if (link && link !== "#") {
            window.open(link, '_blank');
        }
    };

    return (
        <section className="section-container" id="certificates">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="section-title"
            >
                Certifications
            </motion.h2>

            <div className="certificate-grid">
                {certificates.map((cert, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        whileHover={{
                            y: -10,
                            rotateX: 2,
                            rotateY: 2,
                            scale: 1.01,
                            transition: { duration: 0.2 }
                        }}
                        viewport={{ once: true }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: index * 0.1
                        }}
                        className={`certificate-card ${cert.type === 'premium' ? 'premium-certificate-card' : 'glass-card'}`}
                        onClick={() => cert.type !== 'premium' && handleOpenPdf(cert.link)}
                        style={{
                            cursor: cert.type !== 'premium' ? 'pointer' : 'default',
                            perspective: 1000
                        }}
                    >
                        {cert.type === 'premium' ? (
                            <div className="certificate-inner">
                                <div className="cert-left-panel">
                                    <div className="cert-logo">
                                        <span className="logo-be">be</span>
                                        <span className="logo-10x">10x</span>
                                    </div>
                                    <h2 className="cert-main-title">Certificate</h2>
                                    <p className="cert-small-text">of Completion Awarded to</p>
                                    <h3 className="cert-recipient-name">{cert.recipient}</h3>
                                    <p className="cert-description">{cert.description}</p>
                                    <p className="cert-holder-text">Holder of this certificate can</p>
                                    <ul className="cert-benefits-list">
                                        {cert.benefits.map((benefit, i) => (
                                            <li key={i}>{benefit}</li>
                                        ))}
                                    </ul>
                                    <div className="cert-footer">
                                        {cert.issuers.map((issuer, i) => (
                                            <div key={i} className="cert-signature-box">
                                                <div className="cert-signature-line"></div>
                                                <p className="cert-issuer-name">{issuer.name}</p>
                                                <p className="cert-issuer-role">{issuer.role}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="cert-right-panel">
                                    <div className="cert-screenshot-container">
                                        <img src={cert.image} alt={cert.title} className="cert-screenshot" loading="lazy" />
                                    </div>
                                    <div className="cert-side-ribbon">
                                        <div className="cert-ribbon-content">
                                            <div className="cert-category">AI TOOLS WORKSHOP</div>
                                            <div className="cert-badge">
                                                <div className="badge-outer">
                                                    <div className="badge-inner">
                                                        <div className="badge-logo">
                                                            <span className="b-logo">be</span>
                                                            <span className="x-logo">10x</span>
                                                        </div>
                                                        <div className="badge-verified">Verified</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="cert-issue-info">
                                                <p className="issue-label">Issued on:</p>
                                                <p className="issue-value">{cert.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {cert.image && (
                                    <div 
                                        className="certificate-image-container" 
                                        style={{ marginBottom: '1rem', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer' }}
                                        onClick={() => window.open(cert.image, '_blank')}
                                    >
                                        <img 
                                            src={cert.image} 
                                            alt={cert.title}
                                            loading="lazy"
                                            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                                        />
                                    </div>
                                )}
                                <div className="certificate-header">
                                    <h3 className="certificate-title">{cert.title}</h3>
                                    <span className="certificate-date">{cert.date}</span>
                                </div>
                                <p className="certificate-issuer">{cert.issuer}</p>
                                <p className="certificate-desc">{cert.description}</p>
                                {cert.link && cert.link !== "#" && (
                                    <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="certificate-link"
                                        style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}
                                    >
                                        <ExternalLink size={14} /> View Certificate
                                    </a>
                                )}
                            </>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Certificate;
