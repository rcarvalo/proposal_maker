import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Users, Briefcase, Layers, PresentationIcon as LayoutPresentationIcon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path) ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-800';
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col">
        <div className="p-4 border-b border-blue-800">
          <h1 className="text-xl font-bold flex items-center">
            <LayoutPresentationIcon className="mr-2" />
            RFP Automator
          </h1>
          <p className="text-xs text-blue-300 mt-1">Proposal Generation System</p>
        </div>
        
        <nav className="flex-1 py-4">
          <ul>
            <li>
              <Link to="/" className={`flex items-center px-4 py-3 ${isActive('/') && location.pathname === '/' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-800'}`}>
                <Layers size={18} className="mr-3" />
                Dashboard
              </Link>
            </li>
            <li className="mt-6 px-4 text-xs font-semibold text-blue-400 uppercase">
              Workflow
            </li>
            <li>
              <Link to="/new" className={`flex items-center px-4 py-3 ${isActive('/new') ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-800'}`}>
                <FileText size={18} className="mr-3" />
                Upload RFP
              </Link>
            </li>
            <li>
              <Link to="/" className={`flex items-center px-4 py-3 ${isActive('/project') && location.pathname.includes('/profiles') ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-800'}`}>
                <Users size={18} className="mr-3" />
                Select Profiles
              </Link>
            </li>
            <li>
              <Link to="/" className={`flex items-center px-4 py-3 ${isActive('/project') && location.pathname.includes('/missions') ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-800'}`}>
                <Briefcase size={18} className="mr-3" />
                Select Missions
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-blue-800 text-center">
          <p className="text-xs text-blue-400">Prototype v0.1</p>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;