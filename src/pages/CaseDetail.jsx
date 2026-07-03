import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import api from '../services/api';

const CaseDetail = () => {
  const { id } = useParams();
  const [caseItem, setCaseItem] = useState(null);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    api.get(`/cases/${id}`).then(res => {
      setCaseItem(res.data);
      setNotes(res.data.doctorNotes || '');
    });
  }, [id]);

  const handleSaveNotes = async () => {
    await api.put(`/cases/${id}`, { doctorNotes: notes, status: 'reviewed' });
    setCaseItem(prev => ({ ...prev, doctorNotes: notes, status: 'reviewed' }));
  };

  if (!caseItem) return <div>Loading...</div>;

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Case Details</h2>
              <p className="text-sm text-slate-500 mt-1">Patient ID: <span className="font-bold text-slate-700">{caseItem.patientId}</span></p>
            </div>
            <span className={`badge px-4 py-1.5 text-sm ${caseItem.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
              {caseItem.status === 'pending' ? 'Pending Review' : 'Reviewed'}
            </span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="card">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Original Image</h3>
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-square flex items-center justify-center">
                <img src={caseItem.imageUrl} alt="Histopathology" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="card">
              <h3 className="text-lg font-bold text-slate-800 mb-4">GradCAM Heatmap</h3>
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-square flex items-center justify-center relative">
                <img src={caseItem.heatmapUrl || caseItem.imageUrl} alt="Heatmap" className="w-full h-full object-cover opacity-80 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-indigo-500/20 mix-blend-overlay pointer-events-none"></div>
                {!caseItem.heatmapUrl && <span className="absolute text-slate-500 font-medium">Heatmap Visualization</span>}
              </div>
            </div>
          </div>

          <div className="card mb-6">
            <h3 className="text-lg font-bold text-slate-800 mb-6">AI Prediction Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-xl">
                <p className="text-sm text-indigo-600 font-bold uppercase tracking-wider mb-1">Gleason Score</p>
                <p className="text-3xl font-extrabold text-indigo-900">{caseItem.gleasonScore}</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-xl">
                <p className="text-sm text-emerald-600 font-bold uppercase tracking-wider mb-1">ISUP Grade</p>
                <p className="text-3xl font-extrabold text-emerald-900">Grade {caseItem.isupGrade}</p>
              </div>
              <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl">
                <p className="text-sm text-blue-600 font-bold uppercase tracking-wider mb-1">Confidence</p>
                <p className="text-3xl font-extrabold text-blue-900">{(caseItem.confidence * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="card mb-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Clinical Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="input-field min-h-[120px] mb-4 resize-y"
              placeholder="Enter your clinical findings and diagnostic notes here..."
            />
            <button
              onClick={handleSaveNotes}
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <span>Save & Mark as Reviewed</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </button>
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

export default CaseDetail;
