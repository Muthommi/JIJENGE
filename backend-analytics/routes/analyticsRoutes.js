import express from 'express';
import Summary from '../models/Summary.js';
import CategoryAnalytics from '../models/CategoryAnalytics.js';
import Trend from '../models/Trend.js';

const router = express.Router();

router.get('/summary/:userId/:period', async (req, res) => {
  const { userId, period } = req.params;
  try {
    const summary = await Summary.findOne({ userId, period });
    if (!summary) {
      return res.status(404).json({ message: 'No summary data found' });
    }
    res.json({
      totalIncome: summary.totalIncome,
      totalExpenses: summary.totalExpenses,
      savings: summary.savings,
      period: summary.period,
    });
  } catch (error) {
    console.error('Error fetching summary data:', error)
    res.status(500).json({ error: error.message });
  }
});

router.get('/category/:userId/:period', async (req, res) => {
  const { userId, period } = req.params;
  try {
    const analytics = await CategoryAnalytics.find({ userId, period });
    console.log('Category Analytics Data:', analytics);
    const result = analytics.map((item) => ({ totalExpense: item.totalExpense }));
    res.json(result);
  } catch (error) {
    console.error('Error fetching category analytics data:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/trends/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const trends = await Trend.find({ userId }). sort({ date: 1 });
    console.log('Trends Data:', trends);
    const result = trends.map((item) => ({ amount: item.amount }));
    res.json(result);
  } catch (error) {
    console.error('Error fetching trends data:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
