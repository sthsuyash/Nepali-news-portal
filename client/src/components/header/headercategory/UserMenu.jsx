import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { useAuthStore } from '../../../store/authStore';

const UserMenu = ({ show, toggleUserMenu }) => {
    const { isAuthenticated, user, logout } = useAuthStore();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const [dropdownOpen, setDropdownOpen] = useState(show);  // Manage local state for dropdown visibility

    const handleLogout = () => {
        logout();
        setDropdownOpen(false);  // Close the dropdown after logout
    };

    const getUserInitials = (name) => {
        const nameParts = name?.split(" ") || [];
        return nameParts.length > 1
            ? nameParts[0][0] + nameParts[1][0]  // First letter of first and last name
            : nameParts[0]?.substring(0, 2);      // First two letters of the first name
    };

    const handleRedirect = () => {
        if (user?.role.name === 'ADMIN') {
            navigate('/admin');  // Redirect to admin page if the user is an admin
        } else {
            navigate('/dashboard');  // Otherwise, redirect to the dashboard
        }
        setDropdownOpen(false); // Close the dropdown after redirect
    };
    const handleLogin = () => {
        const currentPath = window.location.pathname; // Get the current path
        localStorage.setItem('redirectPath', currentPath); // Store it in localStorage
        navigate('/login');
        setDropdownOpen(false);
    };
    
    // Close dropdown when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false); // Close the dropdown when clicking outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Toggle the dropdown menu visibility on button click
    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);  // Toggle local state for dropdown
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {isAuthenticated ? (
                <>
                    <button
                        className="flex items-center space-x-2"
                        onClick={toggleDropdown}  // Toggle user menu visibility
                    >
                        {/* Avatar Circle with User Initials */}
                        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white">
                            {user?.name ? getUserInitials(user.name) : 'U'}
                        </div>
                    </button>

                    {/* Dropdown */}
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 z-50 bg-white shadow-md rounded-md">
                            <button
                                className="block w-full px-4 py-2 text-left hover:bg-gray-200 rounded-t-md" 
                                onClick={handleRedirect}  // Redirect based on the user's role
                            >
                                {user?.role.name === 'ADMIN' ? 'Admin Panel' : 'Dashboard'}
                            </button>
                            <button
                                className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                                onClick={() => navigate('/bookmarks')}
                            >
                                Bookmarks
                            </button>
                            <button
                                className="block w-full px-4 py-2 text-left hover:bg-gray-200 rounded-b-md"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <button
                    className="login-btn-new flex items-center space-x-2"
                    onClick={handleLogin}
                >
                    <span>लगइन</span>
                </button>
            )}
        </div>
    );
};

export default UserMenu;


