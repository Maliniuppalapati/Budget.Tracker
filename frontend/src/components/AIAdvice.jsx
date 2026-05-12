import React, { useState } from 'react';
import API from '../utils/api';

export default function AIAdvice({ totalExpenses, budgetLimit }) {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const getAdvice = async () => {
    setLoading(true);
    try {
      const res = await API.get('/ai/advice');
      setAdvice(res.data.advice);
    } catch (err) {
      setAdvice('Error: ' + (err.response?.data?.msg || err.message));
    }
    setLoading(false);
  };

  const progress = Math.min((totalExpenses / (budgetLimit || 20000)) * 100, 100);

  return (
    <div className="card ai-card">
      <h3 style={{marginTop: 0}}>✨ AI Financial Advisor</h3>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <span>Budget Usage</span>
          <span>{progress.toFixed(1)}% of Rs. {budgetLimit || 20000}</span>
        </div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        {progress >= 90 && <p style={{color: 'var(--accent-danger)', fontSize: '0.85rem', marginTop: '0.5rem'}}>⚠️ You are approaching your budget limit!</p>}
      </div>

      <button className="btn ai-btn" onClick={getAdvice} disabled={loading}>
        {loading ? 'Analyzing Finances...' : 'Get Personalized Advice'}
      </button>
      
      {advice && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', borderLeft: '4px solid var(--accent-primary)', fontStyle: 'italic' }}>
          {advice}
        </div>
      )}
    </div>
  );
}
