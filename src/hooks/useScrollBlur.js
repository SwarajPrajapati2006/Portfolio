import { useEffect, useRef } from 'react';

export const useScrollBlur = () => {
    const sectionsRef = useRef([]);

    useEffect(() => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const lowPowerDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;

        if (reduceMotion || lowPowerDevice) {
            document.querySelectorAll('.section-container').forEach(section => {
                section.classList.remove('blur-out');
                section.classList.add('focus-in');
            });
            return undefined;
        }

        const observerOptions = {
            root: null,
            rootMargin: '-8% 0px -8% 0px',
            threshold: 0.16
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                const section = entry.target;

                section.classList.toggle('focus-in', entry.isIntersecting);
                section.classList.toggle('blur-out', !entry.isIntersecting);
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
