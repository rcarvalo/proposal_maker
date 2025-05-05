import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, Filter, CheckCircle, ArrowRight, ArrowLeft, Building, Calendar, X } from 'lucide-react';
import { MissionType } from '../types';

// Mock missions data
const mockMissions: MissionType[] = [
  {
    id: '1',
    title: 'Financial Services Cloud Migration',
    client: 'BankTech International',
    year: '2022',
    duration: '9 months',
    description: 'Migration of core banking systems from on-premise data centers to AWS, including security compliance for financial data and implementation of CI/CD pipelines.',
    technologies: ['AWS', 'Terraform', 'Docker', 'Jenkins', 'Vault'],
    outcomes: [
      'Reduced infrastructure costs by 35%',
      'Improved deployment frequency from monthly to daily',
      'Enhanced security posture with automated compliance checks'
    ],
    team: ['Cloud Architect', 'DevOps Engineer', 'Security Specialist'],
    matchScore: 0.92
  },
  {
    id: '2',
    title: 'E-commerce Platform Modernization',
    client: 'Global Retail Co.',
    year: '2023',
    duration: '6 months',
    description: 'Moved monolithic e-commerce application to microservices architecture on AWS, implementing CI/CD pipelines and containerization for improved scalability and developer productivity.',
    technologies: ['AWS', 'Kubernetes', 'Microservices', 'Docker', 'GitOps'],
    outcomes: [
      'Increased site reliability from 99.5% to 99.95%',
      'Reduced development cycle time by 60%',
      'Supported 3x traffic during peak sales events'
    ],
    team: ['Solution Architect', 'DevOps Lead', 'Backend Developer'],
    matchScore: 0.87
  },
  {
    id: '3',
    title: 'Healthcare Data Platform',
    client: 'MediTech Solutions',
    year: '2022',
    duration: '12 months',
    description: 'Designed and implemented a HIPAA-compliant cloud data platform on AWS for a healthcare provider, enabling secure storage and processing of patient data while ensuring regulatory compliance.',
    technologies: ['AWS', 'Redshift', 'Lambda', 'S3', 'CloudTrail'],
    outcomes: [
      'Achieved HIPAA compliance certification',
      'Reduced data processing time by 75%',
      'Enabled real-time analytics for patient data'
    ],
    team: ['Data Architect', 'Security Specialist', 'Cloud Engineer'],
    matchScore: 0.83
  },
  {
    id: '4',
    title: 'Manufacturing IoT Cloud Integration',
    client: 'Industrial Systems Inc.',
    year: '2021',
    duration: '8 months',
    description: 'Developed an IoT data ingestion and analytics platform on AWS to process and analyze data from manufacturing floor sensors, enabling predictive maintenance and process optimization.',
    technologies: ['AWS IoT', 'Kinesis', 'DynamoDB', 'Lambda', 'QuickSight'],
    outcomes: [
      'Reduced equipment downtime by 28%',
      'Improved production efficiency by 15%',
      'Enabled predictive maintenance for critical systems'
    ],
    team: ['IoT Specialist', 'Cloud Architect', 'Data Engineer'],
    matchScore: 0.78
  },
  {
    id: '5',
    title: 'Government Agency Cloud Adoption',
    client: 'Federal Technology Department',
    year: '2022',
    duration: '15 months',
    description: 'Guided a federal agency through their cloud adoption journey, including assessment, strategy development, and migration of legacy applications to AWS GovCloud with FedRAMP compliance.',
    technologies: ['AWS GovCloud', 'Terraform', 'Docker', 'CI/CD', 'Legacy Integration'],
    outcomes: [
      'Successfully migrated 35 applications to the cloud',
      'Achieved FedRAMP Moderate compliance',
      'Reduced operational costs by 42%'
    ],
    team: ['Cloud Architect', 'Security Specialist', 'Project Manager', 'Migration Engineer'],
    matchScore: 0.76
  }
];

const MissionSelection = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedMissions, setSelectedMissions] = useState<string[]>(['1', '2']);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const toggleMissionSelection = (missionId: string) => {
    setSelectedMissions(prev => 
      prev.includes(missionId)
        ? prev.filter(id => id !== missionId)
        : [...prev, missionId]
    );
  };
  
  const filteredMissions = mockMissions
    .filter(mission => 
      mission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mission.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mission.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => b.matchScore - a.matchScore);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Select Reference Missions</h1>
          <p className="text-gray-600">Choose relevant past projects to showcase in your proposal</p>
        </div>
        
        <div className="flex space-x-3">
          <Link
            to={`/project/${id}/profiles`}
            className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 rounded-md inline-flex items-center"
          >
            <ArrowLeft size={16} className="mr-1.5" />
            Back to Profiles
          </Link>
          
          <Link
            to={`/project/${id}/slides`}
            className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md inline-flex items-center"
          >
            Continue
            <ArrowRight size={16} className="ml-1.5" />
          </Link>
        </div>
      </div>
      
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Progress</span>
          <span className="text-sm font-medium text-gray-600">Step 3 of 4</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: '75%' }}
          ></div>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Search and Filter Panel */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 lg:sticky lg:top-4">
            <div className="mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search missions..."
                />
              </div>
            </div>
            
            <div className="mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <Filter size={16} className="mr-1.5" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
            
            {showFilters && (
              <div className="space-y-4 border-t border-gray-200 pt-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Technologies</h3>
                  <div className="space-y-2">
                    {['AWS', 'Kubernetes', 'Terraform', 'Docker', 'CI/CD'].map(tech => (
                      <div key={tech} className="flex items-center">
                        <input
                          id={`tech-${tech}`}
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`tech-${tech}`} className="ml-2 text-sm text-gray-700">
                          {tech}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Project Type</h3>
                  <div className="space-y-2">
                    {['Cloud Migration', 'Platform Modernization', 'Security Implementation', 'Data Platform'].map(type => (
                      <div key={type} className="flex items-center">
                        <input
                          id={`type-${type}`}
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`type-${type}`} className="ml-2 text-sm text-gray-700">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Time Period</h3>
                  <select className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="all">All time periods</option>
                    <option value="2023">2023 Only</option>
                    <option value="2022">2022 Only</option>
                    <option value="2021">2021 Only</option>
                    <option value="older">2020 and older</option>
                  </select>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Industry</h3>
                  <div className="space-y-2">
                    {['Financial Services', 'Healthcare', 'Retail', 'Manufacturing', 'Government'].map(industry => (
                      <div key={industry} className="flex items-center">
                        <input
                          id={`industry-${industry}`}
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`industry-${industry}`} className="ml-2 text-sm text-gray-700">
                          {industry}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <button className="flex-1 px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    Reset
                  </button>
                  <button className="flex-1 px-3 py-1.5 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    Apply
                  </button>
                </div>
              </div>
            )}
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Missions ({selectedMissions.length})</h3>
              <div className="space-y-2">
                {selectedMissions.length === 0 ? (
                  <p className="text-sm text-gray-500">No missions selected yet</p>
                ) : (
                  mockMissions
                    .filter(mission => selectedMissions.includes(mission.id))
                    .map(mission => (
                      <div key={mission.id} className="flex items-center justify-between bg-teal-50 border border-teal-100 rounded-md p-2">
                        <div>
                          <p className="text-sm font-medium text-teal-800">{mission.title}</p>
                          <p className="text-xs text-teal-600">{mission.client}, {mission.year}</p>
                        </div>
                        <button 
                          onClick={() => toggleMissionSelection(mission.id)}
                          className="text-teal-600 hover:text-teal-800"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Missions Grid */}
        <div className="lg:w-2/3">
          <div className="space-y-4">
            {filteredMissions.map(mission => (
              <div 
                key={mission.id} 
                className={`bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow ${
                  selectedMissions.includes(mission.id) ? 'border-teal-300 bg-teal-50' : 'border-gray-100'
                }`}
              >
                <div className="p-5">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{mission.title}</h3>
                      <div className="flex items-center mt-1">
                        <Building size={16} className="text-gray-500 mr-2" />
                        <span className="text-gray-600">{mission.client}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 md:mt-0 flex items-center">
                      <div className="flex items-center mr-4">
                        <Calendar size={16} className="text-gray-500 mr-1" />
                        <span className="text-sm text-gray-600">{mission.year}</span>
                      </div>
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          mission.matchScore >= 0.9 
                            ? 'bg-green-100 text-green-800' 
                            : mission.matchScore >= 0.8
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {Math.round(mission.matchScore * 100)}% Match
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{mission.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {mission.technologies.map((tech, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Team Composition</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {mission.team.map((role, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Key Outcomes</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      {mission.outcomes.map((outcome, index) => (
                        <li key={index}>{outcome}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={() => toggleMissionSelection(mission.id)}
                      className={`py-1.5 px-4 text-sm font-medium rounded-md ${
                        selectedMissions.includes(mission.id)
                          ? 'bg-teal-600 text-white hover:bg-teal-700'
                          : 'bg-white border border-teal-300 text-teal-600 hover:bg-teal-50'
                      }`}
                    >
                      {selectedMissions.includes(mission.id) ? (
                        <span className="flex items-center">
                          <CheckCircle size={16} className="mr-1.5" />
                          Selected
                        </span>
                      ) : (
                        'Select Mission'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-between">
        <Link
          to={`/project/${id}/profiles`}
          className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Back
        </Link>
        
        <div className="flex items-center">
          <span className="mr-4 text-sm text-gray-600">
            <strong>{selectedMissions.length}</strong> missions selected
          </span>
          <Link
            to={`/project/${id}/slides`}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Continue to Slides
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MissionSelection;