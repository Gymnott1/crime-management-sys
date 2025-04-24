import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Stores mock user data { email, name }
    const [loading, setLoading] = useState(true); // Handle initial check
    const navigate = useNavigate();

    // Check local storage on initial load
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('mockUser');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Error parsing user from localStorage", error);
            localStorage.removeItem('mockUser'); // Clear corrupted data
        } finally {
            setLoading(false); // Done checking
        }
    }, []);

    // Mock login function
    const login = (email, name = 'User') => { // Name is optional for login
        const mockUserData = { email, name };
        setUser(mockUserData);
        localStorage.setItem('mockUser', JSON.stringify(mockUserData));
        navigate('/home'); // Redirect to home after login
    };

    // Mock signup function (essentially same as login for this mock setup)
    const signup = (email, name) => {
        const mockUserData = { email, name };
        setUser(mockUserData);
        localStorage.setItem('mockUser', JSON.stringify(mockUserData));
        navigate('/home'); // Redirect to home after signup
    };


    // Mock logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem('mockUser');
        navigate('/'); // Redirect to login page after logout
    };

    const value = {
        user,
        isAuthenticated: !!user, // Boolean flag derived from user state
        loading,
        login,
        signup,
        logout,
    };

    // Don't render children until initial auth check is complete
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};