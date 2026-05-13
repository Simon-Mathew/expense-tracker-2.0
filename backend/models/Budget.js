const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    unique: true,
  },
  limit: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = mongoose.model("Budget", budgetSchema);
