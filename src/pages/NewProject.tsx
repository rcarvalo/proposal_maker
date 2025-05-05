import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileUp, Upload, X, AlertCircle, Check } from 'lucide-react';

const NewProject = () => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('');
  const [clientName, setClientName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    // Check file type (PDF, DOCX, etc.)
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    
    if (!validTypes.includes(selectedFile.type)) {
      setError('Invalid file type. Please upload a PDF, DOCX, or TXT file.');
      return;
    }
    
    // Check file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File is too large. Maximum size is 10MB.');
      return;
    }
    
    setFile(selectedFile);
    setError(null);
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectName || !clientName || !file) {
      setError('Please fill in all fields and upload an RFP document.');
      return;
    }
    
    setUploading(true);
    setError(null);
    
    // Simulate file upload with progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setUploading(false);
    setProcessing(true);
    
    // Simulate backend processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProcessing(false);
    
    // Simulate successful creation by redirecting to the new project
    navigate('/project/new-project-id');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">New RFP Response Project</h1>
        <p className="text-gray-600">Upload an RFP document to start the automated analysis</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSubmit}>
          {/* Project Info */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Project Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <input
                  id="projectName"
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter a name for this RFP response"
                />
              </div>
              
              <div>
                <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
                  Client Name
                </label>
                <input
                  id="clientName"
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter the client's name"
                />
              </div>
            </div>
          </div>
          
          {/* File Upload */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">RFP Document Upload</h2>
            
            {!file ? (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Drag and drop your RFP document here, or{' '}
                  <label className="text-blue-600 hover:text-blue-500 cursor-pointer">
                    browse
                    <input
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept=".pdf,.docx,.doc,.txt"
                    />
                  </label>
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Supports PDF, DOCX, and TXT files (max 10MB)
                </p>
              </div>
            ) : (
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded mr-3">
                      <FileUp size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            )}
            
            {error && (
              <div className="mt-2 flex items-center text-red-600 text-sm">
                <AlertCircle size={16} className="mr-1" />
                {error}
              </div>
            )}
          </div>
          
          {/* Upload Progress */}
          {uploading && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Uploading document...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {/* Processing Indicator */}
          {processing && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="mr-3 flex-shrink-0">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    Processing document...
                  </p>
                  <p className="text-xs text-blue-600 mt-0.5">
                    Extracting requirements and analyzing RFP content
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={uploading || processing}
              className={`px-4 py-2 rounded-md text-white font-medium ${
                uploading || processing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {uploading
                ? 'Uploading...'
                : processing
                ? 'Processing...'
                : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
      
      {/* Information Panel */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
        <h3 className="font-medium text-blue-800 mb-2">How it works</h3>
        <ul className="text-sm text-blue-700 space-y-2">
          <li className="flex items-start">
            <Check size={16} className="mr-2 mt-0.5 flex-shrink-0" />
            <span>Upload your RFP document (PDF, DOCX, or TXT format)</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="mr-2 mt-0.5 flex-shrink-0" />
            <span>Our system will extract key requirements and expertise needed</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="mr-2 mt-0.5 flex-shrink-0" />
            <span>Review the automatically suggested profiles and past missions</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="mr-2 mt-0.5 flex-shrink-0" />
            <span>Generate a professional proposal using our templates</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NewProject;