import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FileText, Users, Briefcase, Presentation, ArrowRight, Edit2, Download, CheckCircle, AlertCircle } from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock project data - In a real application, this would be fetched from API
  const project = {
    id,
    title: 'Cloud Infrastructure Migration',
    client: 'TechCorp Solutions',
    status: 'in_progress',
    createdAt: '2023-10-15T14:30:00Z',
    updatedAt: '2023-10-15T16:45:00Z',
    progress: 0.65,
    stages: [
      { id: 'document', name: 'Document Upload', status: 'completed', date: '2023-10-15' },
      { id: 'analysis', name: 'RFP Analysis', status: 'completed', date: '2023-10-16' },
      { id: 'profiles', name: 'Profile Selection', status: 'in_progress', date: null },
      { id: 'missions', name: 'Mission Selection', status: 'pending', date: null },
      { id: 'slides', name: 'Slide Generation', status: 'pending', date: null },
    ],
    insights: [
      { key: 'Cloud Migration', score: 0.92 },
      { key: 'AWS Architecture', score: 0.87 },
      { key: 'DevOps', score: 0.85 },
      { key: 'Security', score: 0.78 },
      { key: 'Project Management', score: 0.72 }
    ],
    documentSummary: 'This RFP is seeking a technology partner to assist with migrating an on-premises infrastructure to the cloud, specifically AWS. The project includes redesigning the architecture, implementing CI/CD pipelines, and ensuring security best practices. The timeline is aggressive, with a 6-month target for full migration.',
    suggestedProfiles: 3,
    suggestedMissions: 5
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle size={12} className="mr-1" />
            Completed
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <div className="mr-1 h-2 w-2 rounded-full bg-blue-600"></div>
            In Progress
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Pending
          </span>
        );
    }
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Pending';
    return new Date(dateString).toLocaleDateString();
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
          <p className="text-gray-600">Client: {project.client}</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md flex items-center hover:bg-gray-50">
            <Edit2 size={16} className="mr-1.5" />
            Edit
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md flex items-center hover:bg-gray-50">
            <Download size={16} className="mr-1.5" />
            Export
          </button>
        </div>
      </div>
      
      {/* Progress and Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div className="flex items-center mb-3 md:mb-0">
            <div className="mr-3">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600">
                {Math.round(project.progress * 100)}%
              </span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Project Progress</h2>
              <p className="text-sm text-gray-600">Last updated: {formatDate(project.updatedAt)}</p>
            </div>
          </div>
          
          <div>
            {getStatusBadge(project.status)}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div 
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${project.progress * 100}%` }}
          ></div>
        </div>
        
        {/* Project Stages */}
        <div className="relative">
          <div className="absolute left-6 top-0 h-full w-0.5 bg-gray-200"></div>
          
          {project.stages.map((stage, index) => (
            <div key={stage.id} className="relative mb-4 last:mb-0 pl-12">
              <div className={`absolute left-4 top-1 h-5 w-5 rounded-full ${
                stage.status === 'completed' ? 'bg-green-500' : 
                stage.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-300'
              }`}>
                {stage.status === 'completed' && (
                  <CheckCircle size={20} className="text-white" />
                )}
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h3 className={`text-md font-medium ${
                    stage.status === 'completed' ? 'text-green-700' : 
                    stage.status === 'in_progress' ? 'text-blue-700' : 'text-gray-600'
                  }`}>
                    {stage.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {stage.status === 'completed' ? `Completed on ${formatDate(stage.date)}` : 
                     stage.status === 'in_progress' ? 'In progress' : 'Pending'}
                  </p>
                </div>
                
                {/* Action Button */}
                {stage.status === 'in_progress' && (
                  <Link
                    to={`/project/${id}/${stage.id}`}
                    className="mt-2 md:mt-0 inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                  >
                    Continue
                    <ArrowRight size={16} className="ml-1.5" />
                  </Link>
                )}
                {stage.status === 'completed' && (
                  <Link
                    to={`/project/${id}/${stage.id}`}
                    className="mt-2 md:mt-0 inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-white border border-blue-200 hover:bg-blue-50 rounded-md"
                  >
                    View
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Project Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === 'analysis'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              RFP Analysis
            </button>
            <button
              onClick={() => setActiveTab('profiles')}
              className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === 'profiles'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Profiles
            </button>
            <button
              onClick={() => setActiveTab('missions')}
              className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === 'missions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Missions
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Project Overview</h2>
              
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-700 mb-2">RFP Summary</h3>
                <p className="text-gray-600 bg-gray-50 p-3 rounded border border-gray-100">
                  {project.documentSummary}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center mb-2">
                    <FileText size={18} className="text-blue-600 mr-2" />
                    <h3 className="text-md font-medium text-blue-800">Document</h3>
                  </div>
                  <p className="text-sm text-blue-700">RFP document processed and analyzed</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <div className="flex items-center mb-2">
                    <Users size={18} className="text-purple-600 mr-2" />
                    <h3 className="text-md font-medium text-purple-800">Profiles</h3>
                  </div>
                  <p className="text-sm text-purple-700">{project.suggestedProfiles} suggested profiles</p>
                </div>
                
                <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                  <div className="flex items-center mb-2">
                    <Briefcase size={18} className="text-teal-600 mr-2" />
                    <h3 className="text-md font-medium text-teal-800">Missions</h3>
                  </div>
                  <p className="text-sm text-teal-700">{project.suggestedMissions} relevant past missions</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <Link
                  to={`/project/${id}/profiles`}
                  className="flex-1 bg-white border border-blue-300 hover:bg-blue-50 text-blue-700 px-4 py-3 rounded-md flex items-center justify-center font-medium"
                >
                  <Users size={18} className="mr-2" />
                  Select Profiles
                </Link>
                
                <Link
                  to={`/project/${id}/missions`}
                  className="flex-1 bg-white border border-teal-300 hover:bg-teal-50 text-teal-700 px-4 py-3 rounded-md flex items-center justify-center font-medium"
                >
                  <Briefcase size={18} className="mr-2" />
                  Review Missions
                </Link>
                
                <Link
                  to={`/project/${id}/slides`}
                  className="flex-1 bg-white border border-amber-300 hover:bg-amber-50 text-amber-700 px-4 py-3 rounded-md flex items-center justify-center font-medium"
                >
                  <Presentation size={18} className="mr-2" />
                  Generate Slides
                </Link>
              </div>
            </div>
          )}
          
          {/* Analysis Tab */}
          {activeTab === 'analysis' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">RFP Analysis</h2>
              
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-700 mb-2">Document Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded border border-gray-100">
                    <span className="text-xs text-gray-500">Document Type</span>
                    <p className="text-sm font-medium text-gray-800">PDF</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded border border-gray-100">
                    <span className="text-xs text-gray-500">Page Count</span>
                    <p className="text-sm font-medium text-gray-800">32 pages</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded border border-gray-100">
                    <span className="text-xs text-gray-500">Extracted Sections</span>
                    <p className="text-sm font-medium text-gray-800">12 sections</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-700 mb-3">Key Topics Identified</h3>
                
                <div className="space-y-3">
                  {project.insights.map((insight, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-32 text-sm text-gray-600">{insight.key}</div>
                      <div className="flex-1 ml-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${insight.score * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="ml-3 text-sm font-medium text-gray-600">{Math.round(insight.score * 100)}%</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 flex items-start">
                <AlertCircle size={20} className="text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-amber-800 mb-1">Missing Information</h3>
                  <p className="text-sm text-amber-700">
                    The RFP does not clearly specify the budget constraints. This could impact our pricing strategy in the proposal.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Profiles Tab */}
          {activeTab === 'profiles' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Suggested Profiles</h2>
                <Link
                  to={`/project/${id}/profiles`}
                  className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-white border border-blue-200 hover:bg-blue-50 rounded-md inline-flex items-center"
                >
                  View All & Select
                  <ArrowRight size={16} className="ml-1.5" />
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Match Score
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Key Skills
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Sarah Chen</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">Cloud Architect</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          95%
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            AWS
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            Cloud Migration
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            Terraform
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Michael Rodriguez</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">DevOps Lead</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          87%
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            CI/CD
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            Kubernetes
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            Docker
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Amanda Johnson</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">Security Specialist</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          82%
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            Cloud Security
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            IAM
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            Compliance
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Missions Tab */}
          {activeTab === 'missions' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Similar Missions</h2>
                <Link
                  to={`/project/${id}/missions`}
                  className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-white border border-blue-200 hover:bg-blue-50 rounded-md inline-flex items-center"
                >
                  View All & Select
                  <ArrowRight size={16} className="ml-1.5" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="bg-teal-50 px-4 py-3 border-b border-teal-100">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-teal-800">Financial Services Cloud Migration</h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                        92% Match
                      </span>
                    </div>
                    <p className="text-xs text-teal-600">BankTech International, 2022</p>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-3">
                      Migration of core banking systems from on-premise data centers to AWS, including security compliance for financial data.
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        Cloud Migration
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        AWS
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        Financial Services
                      </span>
                    </div>
                    <button className="text-xs text-teal-600 font-medium hover:text-teal-800">
                      View Details
                    </button>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="bg-teal-50 px-4 py-3 border-b border-teal-100">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-teal-800">E-commerce Platform Modernization</h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                        87% Match
                      </span>
                    </div>
                    <p className="text-xs text-teal-600">Global Retail Co., 2023</p>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-3">
                      Moved monolithic e-commerce application to microservices architecture on AWS, implementing CI/CD pipelines and containerization.
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        Microservices
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        AWS
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        DevOps
                      </span>
                    </div>
                    <button className="text-xs text-teal-600 font-medium hover:text-teal-800">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;