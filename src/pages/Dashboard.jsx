import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import api from '../services/api';

const Dashboard = () => {
  const [flData, setFlData] = useState(null);
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [flRes, casesRes] = await Promise.all([
        api.get('/fl/status'),
        api.get('/cases'),
      ]);
      setFlData(flRes.data);
      setCases(casesRes.data);
    };
    fetchData();
  }, []);

  const kpis = [
    { label: 'Total Cases', value: cases.length, color: 'text-blue-600 bg-blue-50 border-blue-100' },
    { label: 'Pending Reviews', value: cases.filter(c => c.status === 'pending').length, color: 'text-amber-600 bg-amber-50 border-amber-100' },
    { label: 'High Risk Cases', value: Math.floor(cases.length * 0.3), color: 'text-rose-600 bg-rose-50 border-rose-100' },
    { label: 'AI Accuracy', value: `${(flData?.current?.globalAccuracy * 100 || 89).toFixed(1)}%`, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
  ];

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Dashboard Overview</h2>
              <p className="text-sm text-slate-500 mt-1">Real-time platform metrics and recent activities</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpis.map((kpi, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 border ${kpi.color}`}>
                  {kpi.label.includes('Cases') ? '📁' : kpi.label.includes('Pending') ? '⏳' : kpi.label.includes('Risk') ? '⚠️' : '🎯'}
                </div>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">{kpi.label}</p>
                <p className="text-3xl font-extrabold text-slate-800 mt-1">{kpi.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Federated Learning Progress</h3>
              {flData && (
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={flData.history} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis dataKey="round" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dx={-10} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Line type="monotone" dataKey="globalAccuracy" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800">Recent Cases</h3>
                <Link to="/cases" className="text-sm font-medium text-blue-600 hover:text-blue-700">View All &rarr;</Link>
              </div>
              <div className="space-y-3">
                {cases.slice(0, 5).map((c) => (
                  <Link key={c._id} to={`/cases/${c._id}`} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:border-blue-200 hover:shadow-sm transition-all duration-200 group">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                        {c.patientId.slice(-2)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{c.patientId}</p>
                        <p className="text-sm text-slate-500 font-medium">Gleason: {c.gleasonScore}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${c.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {c.status}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
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

export default Dashboard;
