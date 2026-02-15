import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
    HiOutlineSearch, HiOutlineBell, HiOutlinePlus,
    HiOutlineVideoCamera, HiOutlineMicrophone,
    HiOutlineMenu, HiOutlineX, HiOutlineCog,
    HiOutlineLogout, HiOutlineUser, HiOutlineViewGrid,
    HiOutlineMoon, HiOutlineSun, HiOutlineUpload,
    HiOutlineFilm, HiOutlinePencilAlt, HiOutlineChartBar
} from 'react-icons/hi';

const Navbar = ({ onToggleSidebar }) => {
    const { user, isAuthenticated, logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showCreateMenu, setShowCreateMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const userMenuRef = useRef(null);
    const createMenuRef = useRef(null);
    const notifRef = useRef(null);

    const notificationCount = 3;

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setShowUserMenu(false);
            if (createMenuRef.current && !createMenuRef.current.contains(e.target)) setShowCreateMenu(false);
            if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        setShowUserMenu(false);
        setShowCreateMenu(false);
        setShowNotifications(false);
        setShowMobileSearch(false);
    }, [location.pathname]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b" style={{ backgroundColor: 'var(--z-bg)', borderColor: 'var(--z-border)' }}>
            <div className="flex items-center justify-between h-full px-4">
                {/* Left: Menu + Logo */}
                <div className="flex items-center gap-2 shrink-0">
                    <button onClick={onToggleSidebar} className="btn-icon" id="menu-toggle" aria-label="Toggle menu">
                        <HiOutlineMenu className="w-6 h-6" />
                    </button>
                    <Link to="/" className="flex items-center gap-0.5 group" id="logo-link">
                        <img
                            src="/zentube-logo.svg"
                            alt="Zentube"
                            className="w-8 h-8 rounded-lg"
                        />
                        <span className="text-xl font-bold tracking-tight hidden sm:block ml-0.5">
                            <span className="text-z-text">Zen</span>
                            <span className="gradient-text">tube</span>
                        </span>
                    </Link>
                </div>

                {/* Center: Search Bar (YouTube-style) */}
                <div className={`flex-1 max-w-[600px] mx-4 ${showMobileSearch ? 'flex' : 'hidden md:flex'} items-center gap-2`}>
                    <form onSubmit={handleSearch} className="flex flex-1 items-center">
                        <div className={`flex flex-1 items-center rounded-l-full border overflow-hidden transition-all duration-200
              ${searchFocused ? 'border-[#065fd4] ml-0' : 'border-z-border'}`}>
                            {searchFocused && (
                                <div className="pl-4">
                                    <HiOutlineSearch className="w-4 h-4 text-z-text-muted" />
                                </div>
                            )}
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setSearchFocused(false)}
                                className="flex-1 bg-transparent text-base px-4 py-2 outline-none placeholder:text-z-text-muted"
                                style={{ color: 'var(--z-text)' }}
                                id="search-input"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-5 py-[9px] rounded-r-full border border-l-0 transition-colors"
                            style={{ backgroundColor: 'var(--z-surface)', borderColor: 'var(--z-border)' }}
                            aria-label="Search"
                        >
                            <HiOutlineSearch className="w-5 h-5" style={{ color: 'var(--z-text)' }} />
                        </button>
                    </form>
                    <button className="btn-icon rounded-full hidden lg:flex" style={{ backgroundColor: 'var(--z-surface)' }} aria-label="Voice search">
                        <HiOutlineMicrophone className="w-5 h-5" />
                    </button>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1 shrink-0">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="theme-toggle"
                        aria-label="Toggle theme"
                        title={isDark ? 'Light mode' : 'Dark mode'}
                    >
                        {isDark ? (
                            <HiOutlineSun className="icon" />
                        ) : (
                            <HiOutlineMoon className="icon" />
                        )}
                    </button>

                    {/* Mobile Search Toggle */}
                    <button
                        onClick={() => setShowMobileSearch(!showMobileSearch)}
                        className="btn-icon md:hidden"
                    >
                        {showMobileSearch ? <HiOutlineX className="w-5 h-5" /> : <HiOutlineSearch className="w-5 h-5" />}
                    </button>

                    {isAuthenticated ? (
                        <>
                            {/* Create Button (YouTube style) */}
                            <div ref={createMenuRef} className="relative">
                                <button
                                    onClick={() => setShowCreateMenu(!showCreateMenu)}
                                    className="btn-icon"
                                    id="create-btn"
                                >
                                    <HiOutlinePlus className="w-6 h-6" />
                                </button>

                                {showCreateMenu && (
                                    <div className="dropdown-menu right-0 top-12 w-56" id="create-menu">
                                        <Link to="/upload" className="dropdown-item" id="upload-video-link">
                                            <HiOutlineUpload className="w-5 h-5" />
                                            <div>
                                                <p className="font-medium">Upload video</p>
                                                <p className="text-xs text-z-text-muted">Share your content</p>
                                            </div>
                                        </Link>
                                        <button className="dropdown-item w-full">
                                            <HiOutlineFilm className="w-5 h-5" />
                                            <div className="text-left">
                                                <p className="font-medium">Create a Short</p>
                                                <p className="text-xs text-z-text-muted">Vertical short video</p>
                                            </div>
                                        </button>
                                        <button className="dropdown-item w-full">
                                            <HiOutlinePencilAlt className="w-5 h-5" />
                                            <div className="text-left">
                                                <p className="font-medium">Create post</p>
                                                <p className="text-xs text-z-text-muted">Share with community</p>
                                            </div>
                                        </button>
                                        <div className="dropdown-divider" />
                                        <button className="dropdown-item w-full">
                                            <HiOutlineVideoCamera className="w-5 h-5" style={{ color: 'var(--z-brand)' }} />
                                            <div className="text-left">
                                                <p className="font-medium">Go live</p>
                                                <p className="text-xs text-z-text-muted">Start streaming</p>
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Notifications */}
                            <div ref={notifRef} className="relative">
                                <button
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    className="btn-icon relative"
                                    id="notifications-btn"
                                >
                                    <HiOutlineBell className="w-6 h-6" />
                                    {notificationCount > 0 && (
                                        <span className="notification-badge">{notificationCount}</span>
                                    )}
                                </button>

                                {showNotifications && (
                                    <div className="dropdown-menu right-0 top-12 w-96 max-h-[70vh] overflow-y-auto" id="notifications-menu">
                                        <div className="px-4 py-3 border-b border-z-border flex items-center justify-between">
                                            <h3 className="font-medium text-base">Notifications</h3>
                                            <button className="text-xs" style={{ color: 'var(--z-brand-text)' }}>Mark all read</button>
                                        </div>
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="dropdown-item py-3">
                                                <div className="avatar avatar-sm flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(255,0,0,0.1)' }}>
                                                    <HiOutlineVideoCamera className="w-4 h-4" style={{ color: 'var(--z-brand)' }} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm line-clamp-2">
                                                        <span className="font-medium">Creator Name</span> uploaded a new video: "Amazing Content #{i}"
                                                    </p>
                                                    <p className="text-xs text-z-text-muted mt-0.5">{i} hour{i > 1 ? 's' : ''} ago</p>
                                                </div>
                                                <div className="w-16 aspect-video rounded bg-z-surface shrink-0" />
                                            </div>
                                        ))}
                                        <div className="p-3 text-center border-t border-z-border">
                                            <button className="text-sm font-medium" style={{ color: 'var(--z-brand-text)' }}>See all notifications</button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* User Menu */}
                            <div ref={userMenuRef} className="relative ml-1">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="focus:outline-none"
                                    id="user-menu-btn"
                                >
                                    <img
                                        src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=cc0000&color=fff&size=80`}
                                        alt={user?.name}
                                        className="avatar avatar-sm transition-all"
                                    />
                                </button>

                                {showUserMenu && (
                                    <div className="dropdown-menu right-0 top-12 w-72" id="user-dropdown">
                                        <div className="px-4 py-3 border-b border-z-border">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=cc0000&color=fff&size=80`}
                                                    alt={user?.name}
                                                    className="avatar avatar-lg"
                                                />
                                                <div className="min-w-0">
                                                    <p className="font-medium truncate">{user?.name}</p>
                                                    <p className="text-sm text-z-text-muted truncate">@{user?.name?.toLowerCase().replace(/\s+/g, '')}</p>
                                                    <Link to={`/channel/${user?._id}`} className="text-sm mt-1 block" style={{ color: 'var(--z-brand-text)' }}>
                                                        View your channel
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        <Link to={`/channel/${user?._id}`} className="dropdown-item">
                                            <HiOutlineUser className="w-5 h-5" /> Your channel
                                        </Link>
                                        <Link to="/dashboard" className="dropdown-item">
                                            <HiOutlineChartBar className="w-5 h-5" /> Zentube Studio
                                        </Link>
                                        <div className="dropdown-divider" />

                                        {/* Theme option in user menu */}
                                        <button onClick={toggleTheme} className="dropdown-item w-full">
                                            {isDark ? <HiOutlineSun className="w-5 h-5" /> : <HiOutlineMoon className="w-5 h-5" />}
                                            Appearance: {isDark ? 'Dark' : 'Light'}
                                        </button>

                                        <Link to="/settings" className="dropdown-item">
                                            <HiOutlineCog className="w-5 h-5" /> Settings
                                        </Link>
                                        <div className="dropdown-divider" />
                                        {user?.role === 'admin' && (
                                            <>
                                                <Link to="/admin" className="dropdown-item">
                                                    <HiOutlineViewGrid className="w-5 h-5" style={{ color: '#f59e0b' }} />
                                                    <span className="gradient-text-gold font-medium">Admin Panel</span>
                                                </Link>
                                                <div className="dropdown-divider" />
                                            </>
                                        )}
                                        <button onClick={handleLogout} className="dropdown-item w-full" style={{ color: 'var(--z-brand)' }}>
                                            <HiOutlineLogout className="w-5 h-5" /> Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <Link to="/auth" className="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors" style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'var(--z-brand-text)' }} id="signin-btn">
                            <HiOutlineUser className="w-5 h-5" />
                            <span className="text-sm font-medium">Sign in</span>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
