const express = require('express');
const router = express.Router();
const Summary = require('../models/Summary');
const CategoryAnalytics = require('../models/CategoryAnalytics');
const Trend = require('../models/Trend');

router.get('/summary/:userId/:period', async (req, res) => {
  const { userId, period } = req.params;
  try {
    const summary = await Summary.findOne({ userId, period });
    if (!summary) {
      return res.status(404).json({ message: 'No summary data found' });
    }
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/category/:userId/:period', async (req, res) => {
  const { userId, period } = req.params;
  try {
    const analytics = await CategoryAnalytics.find({ userId, period });
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/trends/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const trends = await Trend.find({ userId }). sort({ date: 1 });
    res.json(trends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
