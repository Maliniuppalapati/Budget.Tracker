const router = require('express').Router();
const auth = require('../middleware/auth');
const Expense = require('../models/Expense');
const Income = require('../models/Income');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const generatePDF = require('../utils/generatePDF');

// add expense
 router.post('/add-expense', auth, async (req, res) => {
  try {
    const { amount, category, note, date } = req.body;
    const totalIncomeAgg = await Income.aggregate([
      { $match: { userId: req.user.id } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalIncome = totalIncomeAgg[0]?.total || 0;
    const totalExpenseAgg = await Expense.aggregate([
      { $match: { userId: req.user.id } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalExpense = totalExpenseAgg[0]?.total || 0;

    if (totalExpense + amount > totalIncome) {
      return res.status(400).json({ msg: 'Cannot add expense: balance will go negative!' });
    }

    const e = new Expense({ userId: req.user.id, amount, category, note, date });
    await e.save();

    res.json({ msg: 'Expense added' });
  } catch (err) { res.status(500).json({ msg: err.message }); }
});


// add income
router.post('/add-income', auth, async (req, res) => {
  try {
    const { amount, source, note, date } = req.body;
    const i = new Income({ userId: req.user.id, amount, source, note, date });
    await i.save();
    res.json({ msg: 'Income added' });
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

// dashboard: this month
router.get('/dashboard', auth, async (req, res) => {
  try {
    const start = new Date(); start.setDate(1); start.setHours(0,0,0,0);
    const expenses = await Expense.find({ userId: req.user.id, date: { $gte: start } }).sort({ date: -1 });
    const incomes = await Income.find({ userId: req.user.id }).sort({ date: -1 });
    res.json({ expenses, incomes, userId: req.user.id });
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

// delete expense
router.delete('/expense/:id', auth, async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

// PDF report (stream)
router.get('/report/:id', auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    const incomes = await Income.find({ userId }).sort({ date: -1 });
    const totalExpenses = expenses.reduce((a, b) => a + b.amount, 0);
    const totalIncome = incomes.reduce((a, b) => a + b.amount, 0);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=budget_summary_${userId}.pdf`);
    generatePDF({ totalIncome, totalExpenses, balance: totalIncome - totalExpenses, expenses, incomes }, res);
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

module.exports = router;
