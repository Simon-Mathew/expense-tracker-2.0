const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    { id: 1, amount: 100, type: "income" },
    { id: 2, amount: 50, type: "expense" },
  ]);
});

module.exports = router;
