import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div className="flex items-center space-x-2">
        <span className="text-xl font-medium text-slate-800 tracking-tight">
          Welcome back, <span className="font-bold text-blue-700">{user?.name}</span>
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm font-medium text-slate-600 capitalize">{user?.role}</span>
        </div>
        <button
          onClick={logout}
          className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200 shadow-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
