import React from 'react';

const RegisterPage = () => {
    return (
        <div className="register-page">
            <h1>Register</h1>
            <form>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
