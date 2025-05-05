import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewProject from './pages/NewProject';
import ProjectDetails from './pages/ProjectDetails';
import ProfileSelection from './pages/ProfileSelection';
import MissionSelection from './pages/MissionSelection';
import SlideGeneration from './pages/SlideGeneration';
import Preview from './pages/Preview';

function App() {
  return (
    <Router>
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/new" element={<NewProject />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/project/:id/profiles" element={<ProfileSelection />} />
            <Route path="/project/:id/missions" element={<MissionSelection />} />
            <Route path="/project/:id/slides" element={<SlideGeneration />} />
            <Route path="/project/:id/preview" element={<Preview />} />
          </Routes>
          
          {/* Demo Mode Banner */}
          <div className="fixed bottom-0 left-0 right-0 bg-amber-100 p-2 border-t border-amber-200">
            <div className="container mx-auto flex items-center justify-center gap-2 text-amber-800 text-sm">
              <AlertCircle size={16} />
              <span>Prototype Mode: Backend functionality simulated for demonstration purposes</span>
            </div>
          </div>
        </div>
      </Layout>
    </Router>
  );
}

export default App;