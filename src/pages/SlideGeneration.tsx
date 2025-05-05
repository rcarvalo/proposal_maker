import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Presentation, ArrowRight, ArrowLeft, Check, Settings, Layout, Eye, Download, ChevronDown, ChevronRight, Edit } from 'lucide-react';

const SlideGeneration = () => {
  const { id } = useParams<{ id: string }>();
  const [template, setTemplate] = useState('corporate');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [progress, setProgress] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const [expandedSections, setExpandedSections] = useState<string[]>(['introduction', 'team']);
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };
  
  const isExpanded = (section: string) => expandedSections.includes(section);
  
  const handleGenerate = () => {
    setGenerating(true);
    setProgress(0);
    setSlideCount(0);
    
    // Simulate generation process
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setGenerating(false);
          setGenerated(true);
          setSlideCount(15);
          return 100;
        }
        
        // Simulate adding new slides
        if (Math.random() > 0.7) {
          setSlideCount(prev => Math.min(prev + 1, 15));
        }
        
        return newProgress;
      });
    }, 300);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Generate Proposal Slides</h1>
          <p className="text-gray-600">Configure and generate your proposal presentation</p>
        </div>
        
        <div className="flex space-x-3">
          <Link
            to={`/project/${id}/missions`}
            className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 rounded-md inline-flex items-center"
          >
            <ArrowLeft size={16} className="mr-1.5" />
            Back to Missions
          </Link>
          
          {generated && (
            <Link
              to={`/project/${id}/preview`}
              className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md inline-flex items-center"
            >
              Preview
              <ArrowRight size={16} className="ml-1.5" />
            </Link>
          )}
        </div>
      </div>
      
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Progress</span>
          <span className="text-sm font-medium text-gray-600">Step 4 of 4</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: '100%' }}
          ></div>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Configuration Panel */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 lg:sticky lg:top-4">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Settings size={18} className="mr-2" />
                Presentation Settings
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-1">
                    Template Style
                  </label>
                  <select
                    id="template"
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="corporate">Corporate (Blue)</option>
                    <option value="modern">Modern (Teal)</option>
                    <option value="minimal">Minimal (Gray)</option>
                    <option value="bold">Bold (Purple)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-1">
                    Output Format
                  </label>
                  <select
                    id="format"
                    className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="pptx">PowerPoint (PPTX)</option>
                    <option value="pdf">PDF</option>
                    <option value="gslides">Google Slides</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                    Language
                  </label>
                  <select
                    id="language"
                    className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Layout size={18} className="mr-2" />
                Template Preview
              </h2>
              
              <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-200 aspect-video relative">
                {template === 'corporate' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                    <div className="text-white text-center">
                      <h3 className="text-xl font-bold">Corporate Template</h3>
                      <p className="text-sm text-blue-100">Professional blue theme</p>
                    </div>
                  </div>
                )}
                
                {template === 'modern' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <h3 className="text-xl font-bold">Modern Template</h3>
                      <p className="text-sm text-teal-100">Clean teal theme</p>
                    </div>
                  </div>
                )}
                
                {template === 'minimal' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center">
                    <div className="text-white text-center">
                      <h3 className="text-xl font-bold">Minimal Template</h3>
                      <p className="text-sm text-gray-300">Elegant gray theme</p>
                    </div>
                  </div>
                )}
                
                {template === 'bold' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center">
                    <div className="text-white text-center">
                      <h3 className="text-xl font-bold">Bold Template</h3>
                      <p className="text-sm text-purple-100">Striking purple theme</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Configuration */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Presentation Content</h2>
            
            {/* Introduction Section */}
            <div className="mb-4 border rounded-lg overflow-hidden">
              <div 
                className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('introduction')}
              >
                <h3 className="font-medium text-gray-800">Introduction & Executive Summary</h3>
                <button className="text-gray-500">
                  {isExpanded('introduction') ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>
              </div>
              
              {isExpanded('introduction') && (
                <div className="p-4 space-y-3 border-t">
                  <div className="flex items-center text-sm">
                    <input 
                      type="checkbox" 
                      id="title-slide" 
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked 
                    />
                    <label htmlFor="title-slide" className="ml-2 font-medium text-gray-700">Title Slide</label>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <input 
                      type="checkbox" 
                      id="about-us" 
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked 
                    />
                    <label htmlFor="about-us" className="ml-2 font-medium text-gray-700">About Us</label>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <input 
                      type="checkbox" 
                      id="exec-summary" 
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked 
                    />
                    <label htmlFor="exec-summary" className="ml-2 font-medium text-gray-700">Executive Summary</label>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <input 
                      type="checkbox" 
                      id="project-timeline" 
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked 
                    />
                    <label htmlFor="project-timeline" className="ml-2 font-medium text-gray-700">Project Timeline</label>
                  </div>
                </div>
              )}
            </div>
            
            {/* Team Section */}
            <div className="mb-4 border rounded-lg overflow-hidden">
              <div 
                className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('team')}
              >
                <h3 className="font-medium text-gray-800">Expert Team</h3>
                <button className="text-gray-500">
                  {isExpanded('team') ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>
              </div>
              
              {isExpanded('team') && (
                <div className="p-4 border-t">
                  <div className="mb-3 flex items-center text-sm">
                    <input 
                      type="checkbox" 
                      id="team-overview" 
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked 
                    />
                    <label htmlFor="team-overview" className="ml-2 font-medium text-gray-700">Team Overview</label>
                  </div>
                  
                  <div className="space-y-3 pl-6">
                    <div className="bg-purple-50 p-3 rounded border border-purple-100 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-purple-800">Sarah Chen</h4>
                        <p className="text-xs text-purple-600">Cloud Architect</p>
                      </div>
                      <button className="text-purple-600 hover:text-purple-700">
                        <Edit size={14} />
                      </button>
                    </div>
                    
                    <div className="bg-purple-50 p-3 rounded border border-purple-100 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-purple-800">Michael Rodriguez</h4>
                        <p className="text-xs text-purple-600">DevOps Lead</p>
                      </div>
                      <button className="text-purple-600 hover:text-purple-700">
                        <Edit size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Case Studies Section */}
            <div className="mb-4 border rounded-lg overflow-hidden">
              <div 
                className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('case-studies')}
              >
                <h3 className="font-medium text-gray-800">Case Studies & References</h3>
                <button className="text-gray-500">
                  {isExpanded('case-studies') ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>
              </div>
              
              {isExpanded('case-studies') && (
                <div className="p-4 border-t">
                  <div className="mb-3 flex items-center text-sm">
                    <input 
                      type="checkbox" 
                      id="case-studies-overview" 
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked 
                    />
                    <label htmlFor="case-studies-overview" className="ml-2 font-medium text-gray-700">Case Studies Overview</label>
                  </div>
                  
                  <div className="space-y-3 pl-6">
                    <div className="bg-teal-50 p-3 rounded border border-teal-100 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-teal-800">Financial Services Cloud Migration</h4>
                        <p className="text-xs text-teal-600">BankTech International, 2022</p>
                      </div>
                      <button className="text-teal-600 hover:text-teal-700">
                        <Edit size={14} />
                      </button>
                    </div>
                    
                    <div className="bg-teal-50 p-3 rounded border border-teal-100 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-teal-800">E-commerce Platform Modernization</h4>
                        <p className="text-xs text-teal-600">Global Retail Co., 2023</p>
                      </div>
                      <button className="text-teal-600 hover:text-teal-700">
                        <Edit size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Approach & Methodology */}
            <div className="mb-4 border rounded-lg overflow-hidden">
              <div 
                className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('methodology')}
              >
                <h3 className="font-medium text-gray-800">Approach & Methodology</h3>
                <button className="text-gray-500">
                  {isExpanded('methodology') ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>
              </div>
              
              {isExpanded('methodology') && (
                <div className="p-4 border-t space-y-3">
                  <div className="flex items-center text-sm">
                    <input 
                      type="checkbox" 
                      id="approach-overview" 
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked 
                    />
                    <label htmlFor="approach-overview" className="ml-2 font-medium text-gray-700">Project Approach</label>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <input 
                      type="checkbox" 
                      id="methodology" 
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked 
                    />
                    <label htmlFor="methodology" className="ml-2 font-medium text-gray-700">Methodology</label>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <input 
                      type="checkbox" 
                      id="deliverables" 
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked 
                    />
                    <label htmlFor="deliverables" className="ml-2 font-medium text-gray-700">Deliverables</label>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <input 
                      type="checkbox" 
                      id="timeline" 
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked 
                    />
                    <label htmlFor="timeline" className="ml-2 font-medium text-gray-700">Timeline & Milestones</label>
                  </div>
                </div>
              )}
            </div>
            
            {/* Commercial Terms */}
            <div className="mb-6 border rounded-lg overflow-hidden">
              <div 
                className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('commercial')}
              >
                <h3 className="font-medium text-gray-800">Commercial Terms</h3>
                <button className="text-gray-500">
                  {isExpanded('commercial') ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>
              </div>
              
              {isExpanded('commercial') && (
                <div className="p-4 border-t space-y-3">
                  <div className="flex items-center text-sm">
                    <input 
                      type="checkbox" 
                      id="pricing" 
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked 
                    />
                    <label htmlFor="pricing" className="ml-2 font-medium text-gray-700">Pricing</label>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <input 
                      type="checkbox" 
                      id="payment-terms" 
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked 
                    />
                    <label htmlFor="payment-terms" className="ml-2 font-medium text-gray-700">Payment Terms</label>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <input 
                      type="checkbox" 
                      id="next-steps" 
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked 
                    />
                    <label htmlFor="next-steps" className="ml-2 font-medium text-gray-700">Next Steps</label>
                  </div>
                </div>
              )}
            </div>
            
            {/* Generation Button */}
            <div className="flex justify-center">
              {!generating && !generated ? (
                <button
                  onClick={handleGenerate}
                  className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center"
                >
                  <Presentation size={18} className="mr-2" />
                  Generate Presentation
                </button>
              ) : generating ? (
                <div className="text-center">
                  <div className="mb-3">
                    <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-100 rounded-md">
                      <div className="animate-spin mr-3 h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                      <span className="text-blue-800">Generating presentation...</span>
                    </div>
                  </div>
                  
                  <div className="mb-2 flex justify-between text-sm text-gray-600">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  
                  <div className="w-80 bg-gray-200 rounded-full h-2 mb-3">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    Created <span className="font-medium">{slideCount}</span> slides so far...
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mb-3 inline-flex items-center px-4 py-2 bg-green-50 border border-green-100 rounded-md text-green-800">
                    <Check size={18} className="mr-2" />
                    Presentation successfully generated!
                  </div>
                  
                  <div className="flex gap-3 justify-center">
                    <Link
                      to={`/project/${id}/preview`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                    >
                      <Eye size={16} className="mr-1.5" />
                      Preview
                    </Link>
                    
                    <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center">
                      <Download size={16} className="mr-1.5" />
                      Download
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideGeneration;