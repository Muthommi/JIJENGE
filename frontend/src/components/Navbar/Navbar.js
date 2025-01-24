import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Jijenge</h1>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/dashboard">Dashboard</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
