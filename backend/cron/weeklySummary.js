const cron = require('node-cron');
const sendEmail = require('../utils/sendEmail');
const Expense = require('../models/Expense');
const User = require('../models/User');

// Runs every Monday at 09:00 (server time)
cron.schedule('0 9 * * MON', async () => {
  try {
    const users = await User.find();
    for (const u of users) {
      const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7);
      const recent = await Expense.find({ userId: u._id, date: { $gte: weekAgo } });
      const total = recent.reduce((a, b) => a + b.amount, 0);
      if (u.email) {
        sendEmail(u.email, 'Weekly Summary', `Hello ${u.name}, your spending in last 7 days: ₹${total}`);
      }
    }
  } catch (err) { console.error('Weekly cron error', err.message); }
});
