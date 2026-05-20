const Transactions = require("../models/Transaction");

async function getAllTransactions() {
  return await Transactions.find();
}

async function createNewTransaction(transactionsData) {
  const { amount, type, category, date, notes = "" } = transactionsData;

  const newTransaction = await Transactions.create({
    amount,
    category,
    date,
    type,
    notes,
  });

  return newTransaction;
}

async function deleteTransaction(id) {
  return await Transactions.findByIdAndDelete(id);
}

async function updateTransaction(id, transactionData) {
  const update = {};

  if (transactionData.amount !== undefined) {
    update.amount = Number(transactionData.amount);
  }

  if (transactionData.type !== undefined) {
    update.type = transactionData.type;
  }

  if (transactionData.category !== undefined) {
    update.category = transactionData.category;
  }

  if (transactionData.date !== undefined) {
    update.date = transactionData.date;
  }

  if (transactionData.notes !== undefined) {
    update.notes = transactionData.notes ?? "";
  }

  return await Transactions.findByIdAndUpdate(
    id,
    update,
    { new: true, runValidators: true },
  );
}

module.exports = {
  getAllTransactions,
  createNewTransaction,
  deleteTransaction,
  updateTransaction,
};
