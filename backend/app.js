const express = require("express");
const app = express();

const transactionsRoutes = require("./routes/transactions");

app.use(express.json());
app.use("/api/transactions", transactionsRoutes);

// routes
app.get("/", (req, res) => {
  res.send("App is running");
});

module.exports = app;
