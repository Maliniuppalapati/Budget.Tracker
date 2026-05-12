import React from 'react';
import API from '../utils/api';

export default function DownloadCSV({ userId }) {
  const download = async () => {
    try {
      const res = await API.get(`/finance/export-csv/${userId}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `budget_transactions_${userId}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Error downloading CSV');
    }
  };
  return <button className="btn" style={{background: 'linear-gradient(135deg, #10b981, #059669)', width: 'auto'}} onClick={download}>Download CSV</button>;
}
