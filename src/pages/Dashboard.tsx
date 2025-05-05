import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, FileText, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { Project } from '../types';

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Cloud Infrastructure Migration',
    client: 'TechCorp Solutions',
    status: 'draft',
    createdAt: '2023-10-15T14:30:00Z',
    updatedAt: '2023-10-15T16:45:00Z',
    progress: 0.25,
  },
  {
    id: '2',
    title: 'E-commerce Platform Redesign',
    client: 'Fashion Retail Inc.',
    status: 'in_progress',
    createdAt: '2023-09-28T09:15:00Z',
    updatedAt: '2023-10-12T11:20:00Z',
    progress: 0.75,
  },
  {
    id: '3',
    title: 'Data Analytics Implementation',
    client: 'FinServe Group',
    status: 'completed',
    createdAt: '2023-08-05T10:00:00Z',
    updatedAt: '2023-08-18T17:30:00Z',
    progress: 1,
  },
];

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Dashboard</h1>
          <p className="text-gray-600">Manage your automated RFP responses</p>
        </div>
        <Link
          to="/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition duration-150"
        >
          <PlusCircle size={18} className="mr-2" />
          New Project
        </Link>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <FileText className="text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-700">Total Projects</h3>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-amber-100 p-3 rounded-full">
              <Clock className="text-amber-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-700">In Progress</h3>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-emerald-100 p-3 rounded-full">
              <CheckCircle2 className="text-emerald-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-700">Completed</h3>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Projects */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Projects</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 bg-gray-50"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockProjects.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{project.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{project.client}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                      ${project.status === 'draft' ? 'bg-gray-100 text-gray-800' : ''}
                      ${project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : ''}
                      ${project.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                    `}>
                      {project.status === 'draft' && 'Draft'}
                      {project.status === 'in_progress' && 'In Progress'}
                      {project.status === 'completed' && 'Completed'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          project.progress === 1 ? 'bg-green-600' : 'bg-blue-600'
                        }`}
                        style={{ width: `${project.progress * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">
                      {Math.round(project.progress * 100)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/project/${project.id}`} className="text-blue-600 hover:text-blue-900">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Project Cards for Mobile View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:hidden">
        {mockProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      
      {/* Functionality Diagram */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Functional Flow Diagram</h2>
        <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
          <div className="flex flex-col md:flex-row justify-between items-center text-center">
            <div className="bg-blue-100 p-4 rounded-lg mb-4 md:mb-0">
              <h3 className="font-medium text-blue-800">Document Ingestion</h3>
              <p className="text-sm text-blue-600">Parse RFP documents</p>
            </div>
            
            <div className="hidden md:block text-gray-400">→</div>
            <div className="block md:hidden text-gray-400">↓</div>
            
            <div className="bg-purple-100 p-4 rounded-lg mb-4 md:mb-0">
              <h3 className="font-medium text-purple-800">Profile Matching</h3>
              <p className="text-sm text-purple-600">Select relevant experts</p>
            </div>
            
            <div className="hidden md:block text-gray-400">→</div>
            <div className="block md:hidden text-gray-400">↓</div>
            
            <div className="bg-teal-100 p-4 rounded-lg mb-4 md:mb-0">
              <h3 className="font-medium text-teal-800">Mission Selection</h3>
              <p className="text-sm text-teal-600">Find similar experiences</p>
            </div>
            
            <div className="hidden md:block text-gray-400">→</div>
            <div className="block md:hidden text-gray-400">↓</div>
            
            <div className="bg-amber-100 p-4 rounded-lg">
              <h3 className="font-medium text-amber-800">Slide Generation</h3>
              <p className="text-sm text-amber-600">Create proposal deck</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;