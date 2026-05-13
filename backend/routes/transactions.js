const express = require("express");
const router = express.Router();

const {
  getAllTransactions,
  createNewTransaction,
  deleteTransaction,
  updateTransactionAmount,
} = require("../service/transactionService");

router.get("/", async (req, res) => {
  const transactions = await getAllTransactions();
  res.json(transactions);
});

router.post("/", async (req, res) => {
  const { amount, type, category, date } = req.body;
  if (!amount || !type || !category || !date)
    return res.status(400).json({
      message: "All fields are required",
    });

  const newTransaction = await createNewTransaction(req.body);
  res.status(201).json({
    message: "Transaction added successfully",
    data: newTransaction,
  });
});

router.patch("/:id", async (req, res) => {
  const amount = Number(req.body.amount);

  if (!Number.isFinite(amount) || amount < 0) {
    return res.status(400).json({
      message: "Amount must be a positive number",
    });
  }

  const updated = await updateTransactionAmount(req.params.id, amount);

  if (!updated) {
    return res.status(404).json({ message: "Not Found" });
  }

  res.status(200).json({
    message: "Transaction updated successfully",
    data: updated,
  });
});

router.delete("/:id", async (req, res) => {
  const deleted = await deleteTransaction(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: "Not Found" });
  }

  res.status(200).json({ message: "Deleted Successfully" });
});

module.exports = router;
