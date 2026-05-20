const Budget = require("../models/Budget");

const defaultBudgets = [
  { title: "Rent", category: "Rent", limit: 450 },
  { title: "Groceries", category: "Groceries", limit: 220 },
  { title: "Transport", category: "Transport", limit: 200 },
  { title: "Dining", category: "Dinning", limit: 150 },
  { title: "Insurance", category: "Insurance", limit: 0 },
  { title: "House Bills", category: "House Bills", limit: 0 },
  { title: "Subscriptions", category: "Subscriptions", limit: 0 },
  { title: "Credit Card Bills", category: "Credit Card Bills", limit: 0 },
  { title: "Other", category: "Other", limit: 0 },
];

async function seedDefaultBudgets() {
  const existingCount = await Budget.countDocuments();

  if (existingCount === 0) {
    await Budget.insertMany(defaultBudgets);
  }
}

async function getAllBudgets() {
  await seedDefaultBudgets();
  const budgets = await Budget.find();

  return defaultBudgets
    .map((defaultBudget) => {
      return (
        budgets.find((budget) => budget.category === defaultBudget.category) ??
        defaultBudget
      );
    })
    .filter(Boolean);
}

async function updateBudgetLimit(category, limit) {
  const defaultBudget = defaultBudgets.find(
    (budget) => budget.category === category,
  );
  const title = defaultBudget?.title ?? category;

  return await Budget.findOneAndUpdate(
    { category },
    { title, category, limit },
    { new: true, upsert: true, runValidators: true },
  );
}

module.exports = {
  getAllBudgets,
  updateBudgetLimit,
};
