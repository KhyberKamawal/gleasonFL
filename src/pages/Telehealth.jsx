import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Telehealth = () => {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Telehealth Consultation</h2>
              <p className="text-sm text-slate-500 mt-1">Collaborate with peers in real-time</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card flex flex-col">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Video Consultation</h3>
              <div className="aspect-video bg-slate-100 border border-slate-200 rounded-xl flex flex-col items-center justify-center mb-6 flex-1">
                <span className="text-4xl mb-3">📹</span>
                <span className="text-slate-500 font-medium">Ready to connect</span>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 px-4 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-sm focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                  Join Call
                </button>
                <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors shadow-sm">
                  Leave
                </button>
              </div>
            </div>
            <div className="card flex flex-col">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Secure Chat</h3>
              <div className="flex-1 min-h-[320px] bg-slate-50 border border-slate-100 rounded-xl p-4 mb-4 overflow-y-auto flex flex-col">
                <div className="space-y-4 flex-1">
                  <div className="max-w-[80%] mr-auto">
                    <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm">
                      <p className="text-sm text-slate-700">Hello, I'd like to discuss the recent case PAT-005. The AI confidence is very high for Gleason 9.</p>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 ml-1 block font-medium">10:42 AM</span>
                  </div>
                  <div className="max-w-[80%] ml-auto">
                    <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none shadow-sm">
                      <p className="text-sm">Sure, let's review the histopathology images together. The GradCAM heatmap highlights the cribriform patterns clearly.</p>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 mr-1 block text-right font-medium">10:45 AM</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <input type="text" className="input-field flex-1" placeholder="Type a secure message..." />
                <button className="btn-primary px-6">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Telehealth;
