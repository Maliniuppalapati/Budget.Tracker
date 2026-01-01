const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  source: { type: String, default: 'salary' },
  note: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Income', IncomeSchema);
