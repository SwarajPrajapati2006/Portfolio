import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const routeTitles = {
    '/': 'Swaraj Prajapati | Full Stack Developer',
    '/about': 'About | Swaraj Prajapati',
    '/skills': 'Skills & Expertise | Swaraj Prajapati',
    '/projects': 'Projects | Swaraj Prajapati',
    '/certificates': 'Certificates | Swaraj Prajapati',
    '/contact': 'Contact | Swaraj Prajapati'
};

export function usePageTitle() {
    const location = useLocation();

    useEffect(() => {
        const pathname = location.pathname;
        const newTitle = routeTitles[pathname] || routeTitles['/'];
        document.title = newTitle;
    }, [location]);
}

export default usePageTitle;
