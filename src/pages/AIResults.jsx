import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import api from '../services/api';

const AIResults = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    api.get('/ai/metrics').then(res => setMetrics(res.data));
  }, []);

  const chartData = metrics ? [
    { name: 'Accuracy', value: metrics.accuracy * 100 },
    { name: 'Precision', value: metrics.precision * 100 },
    { name: 'Recall', value: metrics.recall * 100 },
    { name: 'F1 Score', value: metrics.f1 * 100 },
  ] : [];

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">AI Results & Metrics</h2>
              <p className="text-sm text-slate-500 mt-1">Detailed performance analysis of the clinical AI models</p>
            </div>
          </div>
          
          <div className="card mb-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Global Model Performance Metrics</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 600}} dy={10} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dx={-10} tickFormatter={(value) => `${value}%`} />
                  <Tooltip 
                    formatter={(value) => [`${value.toFixed(1)}%`, 'Score']} 
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="value" fill="#4f46e5" radius={[6, 6, 0, 0]} maxBarSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {chartData.map((metric, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center hover:border-indigo-200 transition-colors">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">{metric.name}</p>
                <p className="text-4xl font-extrabold text-indigo-600">{metric.value.toFixed(1)}<span className="text-2xl">%</span></p>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-start space-x-3">
            <span className="text-blue-500 text-xl">ℹ️</span>
            <p className="text-blue-800 text-sm leading-relaxed">
              <strong className="font-semibold block mb-1">Medical Disclaimer</strong>
              This AI output is for clinical decision support only. Final diagnosis must be confirmed by a certified pathologist.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIResults;
