import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClasses(project.status)}`}>
            {project.status === 'draft' && 'Draft'}
            {project.status === 'in_progress' && 'In Progress'}
            {project.status === 'completed' && 'Completed'}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">{project.client}</p>
        
        <div className="flex flex-col space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={16} className="mr-2" />
            <span>Created: {formatDate(project.createdAt)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock size={16} className="mr-2" />
            <span>Updated: {formatDate(project.updatedAt)}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{Math.round(project.progress * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                project.progress === 1 ? 'bg-green-600' : 'bg-blue-600'
              }`}
              style={{ width: `${project.progress * 100}%` }}
            ></div>
          </div>
        </div>
        
        <Link 
          to={`/project/${project.id}`}
          className="block w-full text-center bg-gray-50 hover:bg-gray-100 text-blue-600 font-medium py-2 rounded-md transition duration-150"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;