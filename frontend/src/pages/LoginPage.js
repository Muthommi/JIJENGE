import React from 'react';

const LoginPage = () => {
    return (
        <div className="Login-page">
            <h1>Login</h1>
            <form>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
