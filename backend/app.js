const express = require("express");
const cors = require("cors");

const app = express();

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
