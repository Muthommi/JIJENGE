import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from '.context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './utils/auth';
import '.styles.css';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <ProtectedRoute path="/dashboard" component={DashboardPage} />
                </Switch>
            </Router>
        </AuthProvider>
    );
};

export default App;
