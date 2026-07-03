import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import api from '../services/api';

const Doctor = () => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    api.get('/cases').then(res => setCases(res.data.filter(c => c.status === 'pending')));
  }, []);

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Doctor Workspace</h2>
              <p className="text-sm text-slate-500 mt-1">Review pending histopathology cases assigned to you</p>
            </div>
          </div>
          
          <div className="card mb-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Pending Reviews</h3>
            {cases.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                <span className="text-4xl mb-3 block">🎉</span>
                <p className="text-slate-600 font-medium">No pending cases. Great job!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cases.map((c) => (
                  <div key={c._id} className="flex items-center justify-between p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all group">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                        {c.patientId.slice(-2)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-lg group-hover:text-blue-700 transition-colors">{c.patientId}</p>
                        <p className="text-sm text-slate-500 font-medium mt-0.5">
                          <span className="text-indigo-600 font-semibold">Gleason: {c.gleasonScore}</span> 
                          <span className="mx-2 text-slate-300">|</span> 
                          Confidence: {(c.confidence * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                    <Link to={`/cases/${c._id}`} className="btn-primary">
                      Review Case
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
