const express = require("express");
const router = express.Router();

const {
  getAllTransactions,
  createNewTransaction,
  deleteTransaction,
  updateTransaction,
} = require("../service/transactionService");

router.get("/", async (req, res) => {
  const transactions = await getAllTransactions();
  res.json(transactions);
});

router.post("/", async (req, res) => {
  const { amount, type, category, date } = req.body;
  const transactionAmount = Number(amount);

  if (
    !Number.isFinite(transactionAmount) ||
    transactionAmount < 0 ||
    !type ||
    !category ||
    !date
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const newTransaction = await createNewTransaction(req.body);
  res.status(201).json({
    message: "Transaction added successfully",
    data: newTransaction,
  });
});

router.patch("/:id", async (req, res) => {
  try {
    const { amount, type, category, date, notes } = req.body;
    const update = {};

    if (amount !== undefined) {
      const transactionAmount = Number(amount);

      if (!Number.isFinite(transactionAmount) || transactionAmount < 0) {
        return res.status(400).json({
          message: "Amount must be a positive number",
        });
      }

      update.amount = transactionAmount;
    }

    if (type !== undefined) {
      if (!["Income", "Expense"].includes(type)) {
        return res.status(400).json({
          message: "Transaction type must be Income or Expense",
        });
      }

      update.type = type;
    }

    if (category !== undefined) {
      if (!category) {
        return res.status(400).json({ message: "Category is required" });
      }

      update.category = category;
    }

    if (date !== undefined) {
      if (!date) {
        return res.status(400).json({ message: "Date is required" });
      }

      update.date = date;
    }

    if (notes !== undefined) {
      update.notes = notes ?? "";
    }

    if (Object.keys(update).length === 0) {
      return res.status(400).json({
        message: "At least one transaction field is required",
      });
    }

    const updated = await updateTransaction(req.params.id, update);

    if (!updated) {
      return res.status(404).json({ message: "Not Found" });
    }

    res.status(200).json({
      message: "Transaction updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not update transaction",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const deleted = await deleteTransaction(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: "Not Found" });
  }

  res.status(200).json({ message: "Deleted Successfully" });
});

module.exports = router;
