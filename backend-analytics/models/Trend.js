const mongoose = require('mongoose');

const trendSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: {type: String, enum: ['income', 'expense'], required: true },
  amount: {type: Number, required: true },
  date: { type: Date, required: true }
});

module.exports = mongoose.model('Trend', trendSchema);
