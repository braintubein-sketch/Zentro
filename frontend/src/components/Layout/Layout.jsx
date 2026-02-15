import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const location = useLocation();

    // Pages where sidebar should be mini (collapsed)
    const miniSidebarPages = ['/watch', '/shorts'];
    const noSidebarPages = ['/auth'];
    const isMini = miniSidebarPages.some(p => location.pathname.startsWith(p));
    const noSidebar = noSidebarPages.some(p => location.pathname.startsWith(p));

    // Track window resize
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) setSidebarOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close sidebar on route change (mobile)
    useEffect(() => {
        if (isMobile) setSidebarOpen(false);
    }, [location.pathname, isMobile]);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    const getMainClass = () => {
        if (noSidebar) return 'mt-14';
        if (isMobile) return 'mt-14';
        if (isMini) return 'mt-14 md:ml-[72px]';
        if (sidebarOpen) return 'mt-14 md:ml-[240px]';
        return 'mt-14 md:ml-[72px]';
    };

    return (
        <div className="min-h-screen bg-z-bg">
            <Navbar onToggleSidebar={toggleSidebar} />

            {!noSidebar && (
                <Sidebar
                    isOpen={sidebarOpen}
                    isMini={!isMobile && (isMini || !sidebarOpen)}
                    isMobile={isMobile}
                    onClose={closeSidebar}
                />
            )}

            <main className={`${getMainClass()} transition-all duration-300 ease-out`}>
                <div className={`${isMini || noSidebar ? '' : 'p-3 sm:p-4 md:p-6'} ${isMini ? 'p-0' : ''}`}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
