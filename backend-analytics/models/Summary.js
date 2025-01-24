import mongoose from 'mongoose';

const summarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalIncome: { type: Number, default: 0.0 },
  totalExpenses: {type: Number, default: 0.0},
  savings: { type: Number, default: 0.0},
  period: { type: String, required: true },
});

const Summary = mongoose.model('Summary', summarySchema);
export default Summary
