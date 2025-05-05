export interface Project {
  id: string;
  title: string;
  client: string;
  status: 'draft' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
  progress: number;
}

export interface ProfileType {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  experience: number;
  matchScore: number;
  availability: string;
  languages: string[];
  photo: string;
  recentMissions: {
    name: string;
    year: string;
    duration: string;
  }[];
  skills: {
    name: string;
    level: number;
  }[];
}

export interface MissionType {
  id: string;
  title: string;
  client: string;
  year: string;
  duration: string;
  description: string;
  technologies: string[];
  outcomes: string[];
  team: string[];
  matchScore: number;
}