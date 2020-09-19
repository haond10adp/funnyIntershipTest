export let data = {
  incomes: [],
  expenses: [],

  // Methods
  get totalIncome() {
    return this.incomes
      .map((item) => item.value)
      .reduce((sum, current) => sum + current, 0);
  },

  get totalExpense() {
    return this.expenses
      .map((item) => item.value)
      .reduce((sum, current) => sum + current, 0);
  },

  get budget() {
    return this.totalIncome - this.totalExpense;
  },

  get totalExpensePercentage() {
    return Math.round((this.totalExpense / this.totalIncome) * 100);
  },
};
