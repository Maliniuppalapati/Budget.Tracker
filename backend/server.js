require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/finance', require('./routes/finance'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/ai', require('./routes/ai'));

// start weekly cron for summaries (optional)
require('./cron/weeklySummary');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Budget backend running on ${PORT}`));
