import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import api from '../services/api';

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [patientId, setPatientId] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    api.get('/cases').then(res => setCases(res.data));
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('patientId', patientId);
    formData.append('image', file);
    const res = await api.post('/cases', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    setCases([...cases, res.data]);
    setPatientId('');
    setFile(null);
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Case Management</h2>
              <p className="text-sm text-slate-500 mt-1">Upload and review histopathology cases</p>
            </div>
          </div>

          <div className="card mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Upload New Case</h3>
            <form onSubmit={handleUpload} className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Patient ID</label>
                <input
                  type="text"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className="input-field"
                  placeholder="e.g. PAT-12345"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Histopathology Image</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full px-4 py-1.5 border border-slate-200 rounded-lg text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all bg-slate-50"
                  required
                />
              </div>
              <button type="submit" className="btn-primary py-2.5">
                Upload Case
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Case ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Gleason Score</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Confidence</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cases.map((c) => (
                  <tr key={c._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 text-sm text-slate-500 font-medium">#{c._id.slice(0, 8)}</td>
                    <td className="px-6 py-4 text-sm text-slate-800 font-bold">{c.patientId}</td>
                    <td className="px-6 py-4 text-sm font-bold text-indigo-600">{c.gleasonScore}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-full bg-slate-200 rounded-full h-2 mr-2 max-w-[4rem]">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${c.confidence * 100}%` }}></div>
                        </div>
                        <span className="text-sm font-medium text-slate-600">{(c.confidence * 100).toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge ${c.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/cases/${c._id}`} className="text-sm font-semibold text-blue-600 hover:text-blue-800 group-hover:underline">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cases;
