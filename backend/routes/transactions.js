const express = require("express");
const router = express.Router();

let transactions = [
  {
    id: 1,
    amount: 100,
    type: "income",
    category: "Salary",
    date: "2026-04-19",
  },
  { id: 2, amount: 50, type: "expense", category: "Food", date: "2026-04-19" },
];

router.get("/", (req, res) => {
  res.json(transactions);
});

router.post("/", (req, res) => {
  const { amount, type, category, date } = req.body;
  if (!amount || !type || !category || !date)
    return res.status(400).json({
      message: "All fields are required",
    });

  const newTransaction = {
    id: transactions.length + 1,
    amount,
    category,
    date,
    type,
  };

  transactions.push(newTransaction);

  res.status(201).json({
    message: "Transaction added successfully",
    data: newTransaction,
  });
});

module.exports = router;
