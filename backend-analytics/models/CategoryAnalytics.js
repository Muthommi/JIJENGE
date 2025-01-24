import mongoose from 'mongoose';

const categoryAnalyticsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  totalExpense: {type: Number, default: 0.0},
  period: { type: String, required: true}, // Format: 'YYYY-MM'
});

const CategoryAnalytics = mongoose.model('CategoryAnalytics', categoryAnalyticsSchema);
export default CategoryAnalytics;
