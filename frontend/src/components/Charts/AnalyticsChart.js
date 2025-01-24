import React from 'react';
import { Line } from 'react-chartjs-2';

const AnalyticsChart = () {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
	    {
	        label: 'Income',
	        data: [65, 59, 80, 81, 56, 55, 40],
	        fill: false,
	        backgroundColor: 'rgba(75, 192, 192, 0.2)',
	        borderColor: 'rgba(75, 192, 192, 1)',
	    },
	    {
	        label: 'Expenses',
	        data: [28, 48, 40, 19, 86, 27, 90],
	        fill: false,
	        backgroundColor: 'rgba(255, 99, 132, 0.2)',
	        borderColor: 'rgba(255, 99, 132, 1)',
	    }
	]
    };

    return (
        <div className="chart-container">
            <h2>Analytics Chart</h2>
            <Line data={data} />
        </div>
    );
};

export default AnalyticsChart;
