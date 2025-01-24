import React from 'react';
import TransactionForm from '../components/TransactionForm/TransactionForm';
import TransactionList frpm '../components/TransactionList/TransactionList';
import AnalyticsChart from '../components/Charts/AnalyticsChart';

const DashboardPage = () => {
    return (
        <div className="dashboard-page">
            <h1>Dashboard</h1>
            <TransactionForm />
            <TransactionList />
            <AnalyticsChart />
        </div>
    );
};

export default DashboardPage;
