import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/cases', label: 'Cases', icon: '🧬' },
    { path: '/federated-learning', label: 'Federated Learning', icon: '🌐' },
    { path: '/ai-results', label: 'AI Results', icon: '🤖' },
    { path: '/doctor', label: 'Doctor Workspace', icon: '🧑‍⚕️' },
    { path: '/telehealth', label: 'Telehealth', icon: '📡' },
    ...(user?.role === 'admin' ? [{ path: '/admin', label: 'Admin Panel', icon: '⚙️' }] : []),
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 min-h-screen p-4 flex flex-col shadow-sm relative z-10">
      <div className="mb-10 px-2 pt-4">
        <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight">Gleason<span className="text-blue-400">FL</span></h1>
        <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">Telehealth Platform</p>
      </div>
      <nav className="space-y-1.5 flex-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm border border-blue-100'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium border border-transparent'
              }`}
            >
              <span className={`text-lg transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
