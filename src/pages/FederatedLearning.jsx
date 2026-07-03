import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import api from '../services/api';

const FederatedLearning = () => {
  const [flData, setFlData] = useState(null);

  useEffect(() => {
    api.get('/fl/status').then(res => setFlData(res.data));
  }, []);

  const handleNextRound = async () => {
    const res = await api.post('/fl/next-round');
    setFlData(prev => ({
      current: res.data,
      history: [...prev.history, res.data],
    }));
  };

  if (!flData) return <div>Loading...</div>;

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Federated Learning Dashboard</h2>
              <p className="text-sm text-slate-500 mt-1">Monitor global model training across distributed clinical nodes</p>
            </div>
            <button
              onClick={handleNextRound}
              className="btn-primary shadow-md hover:shadow-lg flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              <span>Run Next FL Round</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {flData.current.clients.map((client, i) => (
              <div key={i} className="card hover:border-blue-200 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-800">{client.name}</h3>
                  <span className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Local Accuracy</p>
                    <p className="text-2xl font-extrabold text-emerald-600">{(client.localAccuracy * 100).toFixed(1)}%</p>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${client.localAccuracy * 100}%` }}></div>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                    <p className="text-sm text-slate-500">Training Samples</p>
                    <p className="font-bold text-slate-700">{client.samples}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card mb-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Global Model Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Accuracy Trend</h4>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={flData.history} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis dataKey="round" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} label={{ value: 'Round', position: 'insideBottom', offset: -10, fill: '#94a3b8', fontSize: 12 }} />
                      <YAxis domain={[0.7, 1]} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dx={-10} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Line type="monotone" dataKey="globalAccuracy" stroke="#10b981" strokeWidth={3} name="Accuracy" dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Loss Convergence</h4>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={flData.history} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis dataKey="round" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} label={{ value: 'Round', position: 'insideBottom', offset: -10, fill: '#94a3b8', fontSize: 12 }} />
                      <YAxis domain={[0, 0.5]} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dx={-10} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Line type="monotone" dataKey="globalLoss" stroke="#ef4444" strokeWidth={3} name="Loss" dot={{ r: 4, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-lg flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400 text-xl">🌐</span>
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium">Current Status</p>
                <p className="font-bold">Federation Active</p>
              </div>
            </div>
            <div className="flex gap-8">
              <div>
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Round</p>
                <p className="text-2xl font-bold">{flData.current.round}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Global Accuracy</p>
                <p className="text-2xl font-bold text-emerald-400">{(flData.current.globalAccuracy * 100).toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Global Loss</p>
                <p className="text-2xl font-bold text-rose-400">{flData.current.globalLoss.toFixed(3)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FederatedLearning;
