import React { useState } from 'react';
import axios from 'axios';

const TransactionForm = () => {
    const [formData, setFormData] = useState({
        amount: '',
        type: '',
        description: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/transactions', formData)
	    .then(response => {
	        console.log('Transaction added:', response.data);
	    })
            .catch(error => {
	        console.error('Error adding transaction:', error);
	    });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input tyype="number" name="amount" placeholder="Amount" onChange={handleChange} />
            <input type="text" name="type" placeholder="Type" onChange={handleChange} />
            <input type="text" name="description" placeholder="Description" onChange={handleChange} />
            <button type="submit">Add Transaction</button>
        </form>
    );
};

export default TransactionForm;
