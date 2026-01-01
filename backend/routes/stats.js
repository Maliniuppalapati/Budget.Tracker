const router = require('express').Router();
const Expense = require('../models/Expense');

// category totals & monthly trend
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const expenses = await Expense.find({ userId });
    const categoryTotals = {};
    const monthlyTrend = {};

    expenses.forEach(e => {
      categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
      const key = e.date.toISOString().slice(0, 7); // YYYY-MM
      monthlyTrend[key] = (monthlyTrend[key] || 0) + e.amount;
    });

    res.json({ categoryTotals, monthlyTrend });
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

module.exports = router;
