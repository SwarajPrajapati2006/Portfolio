import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Github, Linkedin, Code2 } from 'lucide-react';

export default function Contact() {
    const [status, setStatus] = React.useState('');
    const [showPopup, setShowPopup] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');

        const form = e.target;
        const formData = new FormData(form);

        try {
            // Formspree form connected - messages sent to swaraj.prajapati.cg@gmail.com
            const response = await fetch('https://formspree.io/f/mlgpagel', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus('');
                setShowPopup(true);
                form.reset();
                setTimeout(() => setShowPopup(false), 5000);
            } else {
                const data = await response.json();
                setStatus(data.errors ? data.errors.map(err => err.message).join(', ') : 'Oops! Something went wrong.');
            }
        } catch (error) {
            setStatus('Connection error. Please try again.');
        }
    };

    return (
        <section id="contact" className="section-container contact-container">
            {/* Success Popup */}
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="success-popup"
                        style={{
                            position: 'fixed',
                            bottom: '2rem',
                            right: '2rem',
                            zIndex: 1000,
                            padding: '1.5rem 2.5rem',
                            background: 'var(--accent-teal)',
                            color: 'white',
                            borderRadius: '1rem',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}
                    >
                        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: '50%' }}>
                            <Send size={24} />
                        </div>
                        <div>
                            <h4 style={{ margin: 0 }}>Message Sent!</h4>
                            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>I'll get back to you soon.</p>
                        </div>
                        <button
                            onClick={() => setShowPopup(false)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                marginLeft: '1rem',
                                fontSize: '1.2rem'
                            }}
                        >
                            &times;
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="section-title"
            >
                Let's <span style={{ color: 'var(--accent-purple)' }}>Connect</span>
            </motion.h2>

            <div className="contact-grid">
                {/* Contact Info */}
                <div className="contact-info">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="contact-card"
                    >
                        <div className="contact-icon-wrapper icon-teal">
                            <Mail />
                        </div>
                        <div>
                            <h3 className="contact-label">Email</h3>
                            <a href="mailto:swaraj.prajapati.cg@gmail.com" className="contact-value">
                                swaraj.prajapati.cg@gmail.com
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="contact-card"
                    >
                        <div className="contact-icon-wrapper icon-purple">
                            <MapPin />
                        </div>
                        <div>
                            <h3 className="contact-label">Location</h3>
                            <p className="contact-value">Ahmedabad, Gujarat</p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="contact-card"
                    >
                        <div className="contact-icon-wrapper icon-teal">
                            <Github />
                        </div>
                        <div>
                            <h3 className="contact-label">GitHub</h3>
                            <a href="https://github.com/SwarajPrajapati2006" target="_blank" rel="noopener noreferrer" className="contact-value">
                                SwarajPrajapati2006
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="contact-card"
                    >
                        <div className="contact-icon-wrapper icon-purple">
                            <Linkedin />
                        </div>
                        <div>
                            <h3 className="contact-label">LinkedIn</h3>
                            <a href="https://www.linkedin.com/in/swaraj-prajapati-435410369/" target="_blank" rel="noopener noreferrer" className="contact-value">
                                Swaraj Prajapati
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="contact-card"
                    >
                        <div className="contact-icon-wrapper icon-teal">
                            <Code2 />
                        </div>
                        <div>
                            <h3 className="contact-label">LeetCode</h3>
                            <a href="https://leetcode.com/SwarajPrajapati2006" target="_blank" rel="noopener noreferrer" className="contact-value">
                                SwarajPrajapati2006
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Form */}
                <motion.form
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="contact-form"
                    onSubmit={handleSubmit}
                >
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-input"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            placeholder="Your email address"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Message</label>
                        <textarea
                            name="message"
                            rows={4}
                            className="form-textarea"
                            placeholder="Your message..."
                            required
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-submit"
                        type="submit"
                        disabled={status === 'Sending...'}
                    >
                        <Send size={20} /> {status === 'Sending...' ? 'Sending...' : 'Send Message'}
                    </motion.button>

                    {status && status !== 'Sending...' && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{
                                marginTop: '1rem',
                                textAlign: 'center',
                                color: '#ef4444',
                                fontWeight: '500'
                            }}
                        >
                            {status}
                        </motion.p>
                    )}
                </motion.form>
            </div>
        </section>
    );
}
