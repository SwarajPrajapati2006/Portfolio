import { useEffect } from 'react';

const sectionTitles = {
    hero: 'Swaraj Prajapati | Full Stack Developer',
    about: 'About | Swaraj Prajapati',
    skills: 'Skills & Expertise | Swaraj Prajapati',
    projects: 'Projects | Swaraj Prajapati',
    certificates: 'Certificates | Swaraj Prajapati',
    contact: 'Contact | Swaraj Prajapati'
};

export function usePageTitle() {
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    const newTitle = sectionTitles[sectionId] || sectionTitles.hero;
                    document.title = newTitle;
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all sections
        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
            observer.disconnect();
        };
    }, []);
}

export default usePageTitle;
