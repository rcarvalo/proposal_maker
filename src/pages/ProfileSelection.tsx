import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, Filter, CheckCircle, ArrowRight, ArrowLeft, X, Briefcase, Award, Clock } from 'lucide-react';
import { ProfileType } from '../types';

// Mock profile data
const mockProfiles: ProfileType[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Cloud Architect',
    expertise: ['AWS', 'Cloud Migration', 'Infrastructure as Code', 'Solution Design'],
    experience: 8,
    matchScore: 0.95,
    availability: 'Immediate',
    languages: ['English', 'Mandarin'],
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    recentMissions: [
      { name: 'Healthcare Provider Cloud Migration', year: '2022', duration: '9 months' },
      { name: 'Financial Services AWS Infrastructure', year: '2021', duration: '12 months' }
    ],
    skills: [
      { name: 'AWS', level: 0.95 },
      { name: 'Terraform', level: 0.9 },
      { name: 'Cloud Architecture', level: 0.92 },
      { name: 'Security', level: 0.85 },
      { name: 'DevOps', level: 0.8 }
    ]
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    role: 'DevOps Lead',
    expertise: ['CI/CD Pipelines', 'Kubernetes', 'Docker', 'Automation'],
    experience: 7,
    matchScore: 0.87,
    availability: 'In 2 weeks',
    languages: ['English', 'Spanish'],
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    recentMissions: [
      { name: 'E-commerce Platform DevOps Transformation', year: '2023', duration: '6 months' },
      { name: 'Manufacturing Automation Pipeline', year: '2022', duration: '8 months' }
    ],
    skills: [
      { name: 'CI/CD', level: 0.95 },
      { name: 'Kubernetes', level: 0.9 },
      { name: 'Docker', level: 0.92 },
      { name: 'Jenkins', level: 0.88 },
      { name: 'GitOps', level: 0.85 }
    ]
  },
  {
    id: '3',
    name: 'Amanda Johnson',
    role: 'Security Specialist',
    expertise: ['Cloud Security', 'Compliance', 'IAM', 'Security Architecture'],
    experience: 6,
    matchScore: 0.82,
    availability: 'In 1 week',
    languages: ['English', 'French'],
    photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    recentMissions: [
      { name: 'Banking Security Compliance Implementation', year: '2022', duration: '7 months' },
      { name: 'Healthcare Data Protection Project', year: '2021', duration: '10 months' }
    ],
    skills: [
      { name: 'Cloud Security', level: 0.94 },
      { name: 'Compliance', level: 0.9 },
      { name: 'IAM', level: 0.88 },
      { name: 'Penetration Testing', level: 0.85 },
      { name: 'Security Architecture', level: 0.92 }
    ]
  },
  {
    id: '4',
    name: 'David Wilson',
    role: 'Project Manager',
    expertise: ['Agile', 'Cloud Transformation', 'Team Leadership', 'Stakeholder Management'],
    experience: 9,
    matchScore: 0.78,
    availability: 'Immediate',
    languages: ['English'],
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    recentMissions: [
      { name: 'Retail Digital Transformation', year: '2022', duration: '12 months' },
      { name: 'Government Agency Cloud Migration', year: '2021', duration: '18 months' }
    ],
    skills: [
      { name: 'Agile Management', level: 0.95 },
      { name: 'Stakeholder Relations', level: 0.92 },
      { name: 'Risk Management', level: 0.88 },
      { name: 'Budgeting', level: 0.85 },
      { name: 'Team Leadership', level: 0.9 }
    ]
  },
  {
    id: '5',
    name: 'Priya Patel',
    role: 'Data Engineer',
    expertise: ['ETL', 'Data Migration', 'AWS Glue', 'Redshift'],
    experience: 5,
    matchScore: 0.76,
    availability: 'In 3 weeks',
    languages: ['English', 'Hindi'],
    photo: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150',
    recentMissions: [
      { name: 'Insurance Data Lake Implementation', year: '2023', duration: '5 months' },
      { name: 'Retail Analytics Platform Migration', year: '2022', duration: '8 months' }
    ],
    skills: [
      { name: 'ETL Processing', level: 0.92 },
      { name: 'AWS Glue', level: 0.88 },
      { name: 'Redshift', level: 0.85 },
      { name: 'Python', level: 0.9 },
      { name: 'Data Modeling', level: 0.82 }
    ]
  }
];

const ProfileSelection = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>(['1', '2']);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    roles: [] as string[],
    skills: [] as string[],
    minExperience: 0
  });
  const [showFilters, setShowFilters] = useState(false);
  
  const toggleProfileSelection = (profileId: string) => {
    setSelectedProfiles(prev => 
      prev.includes(profileId)
        ? prev.filter(id => id !== profileId)
        : [...prev, profileId]
    );
  };
  
  const filteredProfiles = mockProfiles
    .filter(profile => 
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => b.matchScore - a.matchScore);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Select Expert Profiles</h1>
          <p className="text-gray-600">Choose the best profiles to include in your proposal</p>
        </div>
        
        <div className="flex space-x-3">
          <Link
            to={`/project/${id}`}
            className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 rounded-md inline-flex items-center"
          >
            <ArrowLeft size={16} className="mr-1.5" />
            Back to Project
          </Link>
          
          <Link
            to={`/project/${id}/missions`}
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
          <span className="text-sm font-medium text-gray-600">Step 2 of 4</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: '50%' }}
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
                  placeholder="Search by name, role, or skills..."
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
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Roles</h3>
                  <div className="space-y-2">
                    {['Cloud Architect', 'DevOps Engineer', 'Security Specialist', 'Project Manager', 'Data Engineer'].map(role => (
                      <div key={role} className="flex items-center">
                        <input
                          id={`role-${role}`}
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`role-${role}`} className="ml-2 text-sm text-gray-700">
                          {role}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Key Skills</h3>
                  <div className="space-y-2">
                    {['AWS', 'Cloud Migration', 'Kubernetes', 'Security', 'DevOps'].map(skill => (
                      <div key={skill} className="flex items-center">
                        <input
                          id={`skill-${skill}`}
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`skill-${skill}`} className="ml-2 text-sm text-gray-700">
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Minimum Experience</h3>
                  <select className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="0">Any experience</option>
                    <option value="2">2+ years</option>
                    <option value="5">5+ years</option>
                    <option value="8">8+ years</option>
                    <option value="10">10+ years</option>
                  </select>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Availability</h3>
                  <div className="space-y-2">
                    {['Immediate', 'Within 2 weeks', 'Within a month'].map(option => (
                      <div key={option} className="flex items-center">
                        <input
                          id={`availability-${option}`}
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`availability-${option}`} className="ml-2 text-sm text-gray-700">
                          {option}
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
              <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Profiles ({selectedProfiles.length})</h3>
              <div className="space-y-2">
                {selectedProfiles.length === 0 ? (
                  <p className="text-sm text-gray-500">No profiles selected yet</p>
                ) : (
                  mockProfiles
                    .filter(profile => selectedProfiles.includes(profile.id))
                    .map(profile => (
                      <div key={profile.id} className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-md p-2">
                        <div className="flex items-center">
                          <img 
                            src={profile.photo} 
                            alt={profile.name} 
                            className="h-8 w-8 rounded-full object-cover"
                          />
                          <div className="ml-2">
                            <p className="text-sm font-medium text-blue-800">{profile.name}</p>
                            <p className="text-xs text-blue-600">{profile.role}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => toggleProfileSelection(profile.id)}
                          className="text-blue-600 hover:text-blue-800"
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
        
        {/* Profiles Grid */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Recommended Experts</h2>
              <p className="text-sm text-gray-600">{filteredProfiles.length} profiles found</p>
            </div>
            
            <div className="space-y-4">
              {filteredProfiles.map(profile => (
                <div 
                  key={profile.id} 
                  className={`border rounded-lg overflow-hidden hover:shadow-md transition-shadow ${
                    selectedProfiles.includes(profile.id) ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Profile Header / Sidebar */}
                    <div className="p-4 md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200">
                      <div className="flex items-start md:items-center md:flex-col">
                        <div className="mr-4 md:mr-0 md:mb-3">
                          <div className="h-16 w-16 md:h-24 md:w-24 rounded-full overflow-hidden border-2 border-white shadow-sm">
                            <img 
                              src={profile.photo} 
                              alt={profile.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                        
                        <div className="md:text-center">
                          <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
                          <p className="text-gray-600">{profile.role}</p>
                          
                          <div className="mt-2 flex md:justify-center">
                            <span 
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                profile.matchScore >= 0.9 
                                  ? 'bg-green-100 text-green-800' 
                                  : profile.matchScore >= 0.8
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {Math.round(profile.matchScore * 100)}% Match
                            </span>
                          </div>
                          
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <Briefcase size={16} className="mr-2" />
                              {profile.experience} years exp.
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock size={16} className="mr-2" />
                              {profile.availability}
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <button
                              onClick={() => toggleProfileSelection(profile.id)}
                              className={`w-full py-1.5 px-3 text-sm font-medium rounded-md ${
                                selectedProfiles.includes(profile.id)
                                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                                  : 'bg-white border border-blue-300 text-blue-600 hover:bg-blue-50'
                              }`}
                            >
                              {selectedProfiles.includes(profile.id) ? (
                                <span className="flex items-center justify-center">
                                  <CheckCircle size={16} className="mr-1.5" />
                                  Selected
                                </span>
                              ) : (
                                'Select Profile'
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Profile Details */}
                    <div className="p-4 md:w-2/3">
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Expertise</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {profile.expertise.map((skill, index) => (
                            <span 
                              key={index} 
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Key Skills</h4>
                        <div className="space-y-2">
                          {profile.skills.slice(0, 3).map((skill, index) => (
                            <div key={index}>
                              <div className="flex justify-between text-xs text-gray-600 mb-1">
                                <span>{skill.name}</span>
                                <span>{Math.round(skill.level * 100)}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div 
                                  className={`h-1.5 rounded-full ${
                                    skill.level >= 0.9 ? 'bg-green-600' : 'bg-blue-600'
                                  }`}
                                  style={{ width: `${skill.level * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Similar Missions</h4>
                        <div className="space-y-2">
                          {profile.recentMissions.map((mission, index) => (
                            <div key={index} className="bg-gray-50 p-2 rounded border border-gray-100">
                              <div className="flex justify-between">
                                <p className="text-sm font-medium text-gray-800">{mission.name}</p>
                                <span className="text-xs text-gray-500">{mission.year}</span>
                              </div>
                              <p className="text-xs text-gray-600">{mission.duration}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-between">
        <Link
          to={`/project/${id}`}
          className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Back
        </Link>
        
        <div className="flex items-center">
          <span className="mr-4 text-sm text-gray-600">
            <strong>{selectedProfiles.length}</strong> profiles selected
          </span>
          <Link
            to={`/project/${id}/missions`}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Continue to Missions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelection;