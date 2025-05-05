import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Download, ChevronLeft, ChevronRight, Edit, Presentation, Share2 } from 'lucide-react';

const Preview = () => {
  const { id } = useParams<{ id: string }>();
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 15;
  
  const navigateSlide = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentSlide > 1) {
      setCurrentSlide(prev => prev - 1);
    } else if (direction === 'next' && currentSlide < totalSlides) {
      setCurrentSlide(prev => prev + 1);
    }
  };
  
  const slideThumbnails = [
    { id: 1, title: 'Title Slide', type: 'cover' },
    { id: 2, title: 'About Us', type: 'intro' },
    { id: 3, title: 'Executive Summary', type: 'text' },
    { id: 4, title: 'Project Timeline', type: 'timeline' },
    { id: 5, title: 'Team Overview', type: 'team' },
    { id: 6, title: 'Sarah Chen', type: 'profile' },
    { id: 7, title: 'Michael Rodriguez', type: 'profile' },
    { id: 8, title: 'Case Studies Overview', type: 'intro' },
    { id: 9, title: 'Financial Services Cloud Migration', type: 'case-study' },
    { id: 10, title: 'E-commerce Platform Modernization', type: 'case-study' },
    { id: 11, title: 'Project Approach', type: 'methodology' },
    { id: 12, title: 'Methodology', type: 'methodology' },
    { id: 13, title: 'Deliverables', type: 'list' },
    { id: 14, title: 'Pricing', type: 'table' },
    { id: 15, title: 'Next Steps', type: 'conclusion' },
  ];
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link
              to={`/project/${id}/slides`}
              className="mr-4 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Cloud Infrastructure Migration Proposal</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 flex items-center">
              <Edit size={16} className="mr-1.5" />
              Edit
            </button>
            <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 flex items-center">
              <Share2 size={16} className="mr-1.5" />
              Share
            </button>
            <button className="px-3 py-1.5 bg-blue-600 rounded-md text-white text-sm font-medium hover:bg-blue-700 flex items-center">
              <Download size={16} className="mr-1.5" />
              Download
            </button>
          </div>
        </div>
      </header>
      
      <div className="flex-1 flex">
        {/* Slide Thumbnails Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:block overflow-y-auto">
          <div className="p-4">
            <h2 className="text-sm font-medium text-gray-700 mb-3">Slides</h2>
            
            <div className="space-y-2">
              {slideThumbnails.map(slide => (
                <div 
                  key={slide.id}
                  onClick={() => setCurrentSlide(slide.id)}
                  className={`p-2 rounded-md cursor-pointer ${
                    currentSlide === slide.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 text-xs font-medium rounded mr-2">
                      {slide.id}
                    </div>
                    <div>
                      <p className={`text-sm ${currentSlide === slide.id ? 'font-medium text-blue-800' : 'text-gray-800'}`}>{slide.title}</p>
                      <p className="text-xs text-gray-500">{slide.type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
        
        {/* Main Slide Viewer */}
        <main className="flex-1 flex flex-col">
          {/* Slide Viewport */}
          <div className="flex-1 p-8 flex items-center justify-center bg-gray-800">
            <div className="bg-white w-full max-w-3xl aspect-[16/9] shadow-xl relative">
              {/* Mock Slide Content - this would be replaced with actual slide rendering */}
              {currentSlide === 1 && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 flex flex-col items-center justify-center text-white p-12">
                  <div className="mb-8">
                    <Presentation size={48} className="mx-auto mb-4" />
                  </div>
                  <h1 className="text-4xl font-bold mb-4 text-center">Cloud Infrastructure Migration</h1>
                  <h2 className="text-2xl text-blue-100 mb-8 text-center">Proposal for TechCorp Solutions</h2>
                  <p className="text-blue-100 text-center">Prepared by: Your Consulting Company</p>
                  <p className="text-blue-100 text-center">October 2023</p>
                </div>
              )}
              
              {currentSlide === 2 && (
                <div className="absolute inset-0 flex flex-col p-12">
                  <div className="border-b-4 border-blue-600 pb-4 mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">About Us</h2>
                  </div>
                  <div className="flex-1 flex">
                    <div className="w-1/2 pr-8">
                      <p className="text-gray-700 mb-4">Your Consulting Company is a leading technology consultancy specializing in:</p>
                      <ul className="list-disc pl-5 text-gray-700 space-y-2">
                        <li>Cloud Migration & Modernization</li>
                        <li>DevOps Transformation</li>
                        <li>Security & Compliance</li>
                        <li>Data Solutions</li>
                      </ul>
                      <p className="mt-4 text-gray-700">With over 10 years of experience and 200+ successful projects, we deliver exceptional results for our clients.</p>
                    </div>
                    <div className="w-1/2 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-400 text-sm">Company Overview Image</p>
                    </div>
                  </div>
                </div>
              )}
              
              {currentSlide !== 1 && currentSlide !== 2 && (
                <div className="absolute inset-0 flex flex-col p-12">
                  <div className="border-b-4 border-blue-600 pb-4 mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">{slideThumbnails.find(s => s.id === currentSlide)?.title}</h2>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-400">Slide {currentSlide} content would appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Slide Navigation Controls */}
          <div className="py-4 px-6 bg-white border-t border-gray-200 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigateSlide('prev')}
                disabled={currentSlide === 1}
                className={`p-2 rounded-full ${
                  currentSlide === 1 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ChevronLeft size={24} />
              </button>
              
              <span className="text-sm text-gray-600">
                Slide <span className="font-medium">{currentSlide}</span> of {totalSlides}
              </span>
              
              <button 
                onClick={() => navigateSlide('next')}
                disabled={currentSlide === totalSlides}
                className={`p-2 rounded-full ${
                  currentSlide === totalSlides 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            <div className="text-sm text-gray-600">
              <select 
                value={currentSlide}
                onChange={(e) => setCurrentSlide(Number(e.target.value))}
                className="border border-gray-300 rounded-md py-1 pl-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {slideThumbnails.map(slide => (
                  <option key={slide.id} value={slide.id}>
                    {slide.id}. {slide.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Preview;