import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export fetchTransactions = () => api.get('transactions');
export const addTransaction = (data) => api.post('/transactions', data);
