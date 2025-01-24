import mongoose from 'mongoose';

const TrendSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: {type: String, enum: ['income', 'expense'], required: true },
  amount: {type: Number, required: true },
  date: { type: Date, required: true }
});

const Trend = mongoose.model('Trend', TrendSchema);
export default Trend;
