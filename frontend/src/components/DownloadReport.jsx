import React from 'react';
import API from '../utils/api';

export default function DownloadReport({ userId }) {
  const download = async () => {
    try {
      const res = await API.get(`/finance/report/${userId}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `budget_summary_${userId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Error downloading report');
    }
  };
  return <button className="btn" onClick={download}>Download PDF</button>;
}
