const Transactions = require("../models/Transaction");

async function getAllTransactions() {
  return await Transactions.find();
}

async function createNewTransaction(transactionsData) {
  const { amount, type, category, date } = transactionsData;

  const newTransaction = await Transactions.create({
    amount,
    category,
    date,
    type,
  });

  return newTransaction;
}

async function deleteTransaction(id) {
  return await Transactions.findByIdAndDelete(id);
}

module.exports = {
  getAllTransactions,
  createNewTransaction,
  deleteTransaction,
};
