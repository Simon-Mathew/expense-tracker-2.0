const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/expense-tracker")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.use(
  cors({
    origin: "http://localhost:4200",
  }),
);

app.use(express.json());
const transactionsRoutes = require("./routes/transactions");
app.use("/api/transactions", transactionsRoutes);

// routes
app.get("/", (req, res) => {
  res.send("App is running");
});

module.exports = app;
