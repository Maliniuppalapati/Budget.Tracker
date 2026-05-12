const router = require('express').Router();
const auth = require('../middleware/auth');
const Expense = require('../models/Expense');
const Income = require('../models/Income');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');

router.post('/categorize', auth, async (req, res) => {
  try {
    const { text } = req.body;
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here' || process.env.GEMINI_API_KEY === 'dummy_key') {
      // Fallback heuristic if no key
      let amount = 0;
      let category = 'General';
      const numMatch = text.match(/\d+/);
      if (numMatch) amount = Number(numMatch[0]);
      
      const lowerText = text.toLowerCase();
      if (lowerText.includes('coffee') || lowerText.includes('food') || lowerText.includes('dinner')) category = 'Food & Dining';
      else if (lowerText.includes('uber') || lowerText.includes('bus') || lowerText.includes('taxi')) category = 'Transportation';
      else if (lowerText.includes('movie') || lowerText.includes('game')) category = 'Entertainment';

      return res.json({ amount, category, note: text });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `Extract the expense amount and best category from this text: "${text}". 
    Categories can be Food & Dining, Transportation, Entertainment, Utilities, Shopping, Health, or General.
    Return ONLY a valid JSON object in this exact format: {"amount": <number>, "category": "<string>"}. Do not include markdown formatting.`;
    
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(jsonStr);
    
    res.json({ amount: data.amount || 0, category: data.category || 'General', note: text });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get('/advice', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    const incomes = await Income.find({ userId: req.user.id });
    
    const totalIncome = incomes.reduce((a, b) => a + b.amount, 0);
    const totalExpense = expenses.reduce((a, b) => a + b.amount, 0);

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here' || process.env.GEMINI_API_KEY === 'dummy_key') {
      return res.json({ advice: `You have spent Rs. ${totalExpense} out of your Rs. ${totalIncome} income. Try to save at least 20% of your income!` });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const expenseCategories = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

    const prompt = `Act as a professional financial advisor. Here is a summary of a user's monthly finances:
    Total Income: ${totalIncome}
    Total Expenses: ${totalExpense}
    Expenses by Category: ${JSON.stringify(expenseCategories)}
    
    Provide a short, encouraging, and highly specific 2-3 sentence financial advice based on this data.`;
    
    const result = await model.generateContent(prompt);
    res.json({ advice: result.response.text().trim() });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
