import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
	    setUser(jwtDecode(token));
	}
    }, []);

    const login = (token) => {
        localStorage.setItem('jwtToken', token);
        setUser(jwtDecode(token));
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, ;ogin, logout }}>
            {childrem}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
