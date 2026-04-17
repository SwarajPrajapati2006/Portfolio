import { useEffect, useRef } from 'react';

export const useScrollBlur = () => {
    const sectionsRef = useRef([]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -10% 0px',
            threshold: [0.1, 0.3, 0.5, 0.7]
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                const section = entry.target;

                if (entry.isIntersecting) {
                    // Section is in view - make it sharp
                    section.classList.remove('blur-out');
                    section.classList.add('focus-in');
                } else {
                    // Section is out of view - make it blurry
                    section.classList.remove('focus-in');
                    section.classList.add('blur-out');
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sectionsRef.current = document.querySelectorAll('.section-container');
        sectionsRef.current.forEach(section => {
            // Start with blur
            section.classList.add('blur-out');
            observer.observe(section);
        });

        return () => {
            sectionsRef.current.forEach(section => observer.unobserve(section));
        };
    }, []);

    return sectionsRef;
};

export default useScrollBlur;
