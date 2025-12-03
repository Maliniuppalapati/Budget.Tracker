const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ msg: 'Missing' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: 'User exists' });
    const user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

// login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const u = await User.findOne({ email });
    if (!u) return res.status(400).json({ msg: 'Invalid credentials' });
    const ok = await u.matchPassword(password);
    if (!ok) return res.status(400).json({ msg: 'Invalid credentials' });
    const token = jwt.sign({ id: u._id, name: u.name }, process.env.JWT_SECRET);
    res.json({ token, user: { id: u._id, name: u.name, email: u.email } });
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

module.exports = router;
