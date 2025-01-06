function predictRecurringExpenses(expenses) {
  if (expenses.length === 0) return 0;
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  return total / expenses.length;
}

module.exports = {
  predictRecurringExpenses,
};
