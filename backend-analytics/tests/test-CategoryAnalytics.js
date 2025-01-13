const chai = require('chai');
const mongoose = require('mongoose');
const CategoryAnalytics = require('../path/to/categoryAnalytics');
const expect = chai.expect;

describe('CategoryAnalytics Model', () => {
  before(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create a categoryAnalytics document successfully', async () => {
    const categoryAnalytics = new CategoryAnalytics({
      userId: new mongoose.Types.ObjectId(),
      category: 'Food',
      totalExpense: 100.0,
      period: '2025-01'
    });

    const savedDoc = await categoryAnalytics.save();
    expect(savedDoc._id).to.exist;
    expect(savedDoc.category).to.equal('Food');
    expect(savedDoc.totalExpense).to.equal(100.0);
    expect(savedDoc.period).to.equal('2025-01');
  });

  it('should throw validation error if required fields are missing', async () => {
    const invalidDoc = new CategoryAnalytics({});

    try {
      await invalidDoc.save();                                                                                              } catch (error) {
      expect(error.errors.userId).to.exist;
      expect(error.errors.category).to.exist;
      expect(error.errors.period).to.exist;
    }
  });
});
