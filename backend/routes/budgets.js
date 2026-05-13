const express = require("express");
const router = express.Router();

const { getAllBudgets, updateBudgetLimit } = require("../service/budgetService");

router.get("/", async (req, res) => {
  const budgets = await getAllBudgets();
  res.json(budgets);
});

router.patch("/:category", async (req, res) => {
  const limit = Number(req.body.limit);

  if (!Number.isFinite(limit) || limit < 0) {
    return res.status(400).json({
      message: "Limit must be a positive number",
    });
  }

  const budget = await updateBudgetLimit(req.params.category, limit);
  res.json(budget);
});

module.exports = router;
