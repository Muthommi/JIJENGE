import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../../services/api';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchTransactions()
            .then(response => setTransactions(response.data))
            .catch(error => console.error('Error fetching transactions:', error));
    }, []);

    return (
        <div className="transaction-list">
            <h2>Trnsaction List</h2>
            <ul>
                {transactions.map(transaction => (
		    <li key={transaction.id}>
		        {transaction.type}: {transaction.amount} - {transaction.description}
		    </li>
		))}
            </ul>
        </div>
    );
};

export default TransactionList;
