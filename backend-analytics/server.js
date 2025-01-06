const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/jijengeAnalytics', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.use('/api/analytics', analyticsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
