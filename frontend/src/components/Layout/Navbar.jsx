import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    HiOutlineSearch, HiOutlineBell, HiOutlinePlus,
    HiOutlineVideoCamera, HiOutlineMicrophone,
    HiOutlineMenu, HiOutlineX, HiOutlineCog,
    HiOutlineLogout, HiOutlineUser, HiOutlineViewGrid,
    HiOutlineUpload, HiOutlineFilm, HiOutlinePencilAlt,
    HiOutlineChartBar
} from 'react-icons/hi';

const Navbar = ({ onToggleSidebar }) => {
    const { user, isAuthenticated, logout } = useAuth();
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
        <header className="fixed top-0 left-0 right-0 z-50 h-14" style={{ backgroundColor: '#0f0f0f' }}>
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
                            <span style={{ color: '#f1f1f1' }}>Zen</span>
                            <span style={{ color: '#ff0000' }}>tube</span>
                        </span>
                    </Link>
                </div>

                {/* Center: YouTube-style Search Bar */}
                <div className={`flex-1 max-w-[600px] mx-4 ${showMobileSearch ? 'flex' : 'hidden md:flex'} items-center gap-2`}>
                    <form onSubmit={handleSearch} className="flex flex-1 items-center">
                        <div className={`flex flex-1 items-center rounded-l-full overflow-hidden transition-all duration-200`}
                            style={{
                                border: `1px solid ${searchFocused ? '#1c62b9' : '#303030'}`,
                                backgroundColor: searchFocused ? '#121212' : 'transparent',
                            }}>
                            {searchFocused && (
                                <div className="pl-4">
                                    <HiOutlineSearch className="w-4 h-4" style={{ color: '#717171' }} />
                                </div>
                            )}
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setSearchFocused(false)}
                                className="flex-1 bg-transparent text-base px-4 py-2 outline-none"
                                style={{ color: '#f1f1f1' }}
                                id="search-input"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-5 py-[9px] rounded-r-full transition-colors"
                            style={{
                                backgroundColor: '#222222',
                                border: '1px solid #303030',
                                borderLeft: 'none',
                            }}
                            aria-label="Search"
                        >
                            <HiOutlineSearch className="w-5 h-5" style={{ color: '#f1f1f1' }} />
                        </button>
                    </form>
                    <button className="btn-icon rounded-full hidden lg:flex" style={{ backgroundColor: '#222222' }} aria-label="Voice search">
                        <HiOutlineMicrophone className="w-5 h-5" />
                    </button>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1 shrink-0">
                    {/* Mobile Search Toggle */}
                    <button
                        onClick={() => setShowMobileSearch(!showMobileSearch)}
                        className="btn-icon md:hidden"
                    >
                        {showMobileSearch ? <HiOutlineX className="w-5 h-5" /> : <HiOutlineSearch className="w-5 h-5" />}
                    </button>

                    {isAuthenticated ? (
                        <>
                            {/* Create Button */}
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
                                                <p className="text-xs" style={{ color: '#717171' }}>Share your content</p>
                                            </div>
                                        </Link>
                                        <button className="dropdown-item w-full">
                                            <HiOutlineFilm className="w-5 h-5" />
                                            <div className="text-left">
                                                <p className="font-medium">Create a Short</p>
                                                <p className="text-xs" style={{ color: '#717171' }}>Vertical short video</p>
                                            </div>
                                        </button>
                                        <button className="dropdown-item w-full">
                                            <HiOutlinePencilAlt className="w-5 h-5" />
                                            <div className="text-left">
                                                <p className="font-medium">Create post</p>
                                                <p className="text-xs" style={{ color: '#717171' }}>Share with community</p>
                                            </div>
                                        </button>
                                        <div className="dropdown-divider" />
                                        <button className="dropdown-item w-full">
                                            <HiOutlineVideoCamera className="w-5 h-5" style={{ color: '#ff0000' }} />
                                            <div className="text-left">
                                                <p className="font-medium">Go live</p>
                                                <p className="text-xs" style={{ color: '#717171' }}>Start streaming</p>
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
                                        <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid #3f3f3f' }}>
                                            <h3 className="font-medium text-base" style={{ color: '#f1f1f1' }}>Notifications</h3>
                                            <button className="text-xs" style={{ color: '#3ea6ff' }}>Mark all read</button>
                                        </div>
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="dropdown-item py-3">
                                                <div className="avatar avatar-sm flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(255,0,0,0.1)' }}>
                                                    <HiOutlineVideoCamera className="w-4 h-4" style={{ color: '#ff0000' }} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm line-clamp-2">
                                                        <span className="font-medium">Creator Name</span> uploaded a new video: "Amazing Content #{i}"
                                                    </p>
                                                    <p className="text-xs mt-0.5" style={{ color: '#717171' }}>{i} hour{i > 1 ? 's' : ''} ago</p>
                                                </div>
                                                <div className="w-16 aspect-video rounded" style={{ backgroundColor: '#272727' }} />
                                            </div>
                                        ))}
                                        <div className="p-3 text-center" style={{ borderTop: '1px solid #3f3f3f' }}>
                                            <button className="text-sm font-medium" style={{ color: '#3ea6ff' }}>See all notifications</button>
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
                                        className="avatar avatar-sm"
                                    />
                                </button>

                                {showUserMenu && (
                                    <div className="dropdown-menu right-0 top-12 w-72" id="user-dropdown">
                                        <div className="px-4 py-3" style={{ borderBottom: '1px solid #3f3f3f' }}>
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=cc0000&color=fff&size=80`}
                                                    alt={user?.name}
                                                    className="avatar avatar-lg"
                                                />
                                                <div className="min-w-0">
                                                    <p className="font-medium truncate" style={{ color: '#f1f1f1' }}>{user?.name}</p>
                                                    <p className="text-sm truncate" style={{ color: '#717171' }}>@{user?.name?.toLowerCase().replace(/\s+/g, '')}</p>
                                                    <Link to={`/channel/${user?._id}`} className="text-sm mt-1 block" style={{ color: '#3ea6ff' }}>
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
                                        <button onClick={handleLogout} className="dropdown-item w-full">
                                            <HiOutlineLogout className="w-5 h-5" /> Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <Link to="/auth" className="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors" style={{ borderColor: 'rgba(62, 166, 255, 0.5)', color: '#3ea6ff' }} id="signin-btn">
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
