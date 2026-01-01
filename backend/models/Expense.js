const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, default: 'general' },
  note: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', ExpenseSchema);
