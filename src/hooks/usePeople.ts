import { useRemoteData } from './useRemoteData';

export interface Person {
  id: number;
  name: string;
  title: string;
  company: string;
  image: string;
  bio: string;
  expertise: string[];
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  enabled?: boolean;
  isTrackCoordinator?: boolean;
  trackName?: string;
}

export interface Speaker extends Person {
  isTrackCoordinator?: false;
}

export interface TrackCoordinator extends Person {
  isTrackCoordinator: true;
  trackName: string;
}

const API_URL = 'https://raw.githubusercontent.com/MVPConf/2025/refs/heads/main/speakers.json';

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const usePeople = () => {
  const { data, loading, error } = useRemoteData<Person[]>(API_URL);
  
  const activeData = (data ?? []).filter(person => person.enabled !== false);
  
  const speakers = shuffleArray(
    activeData.filter(person => !person.isTrackCoordinator)
  );
  
  const coordinators = shuffleArray(
    activeData.filter(person => person.isTrackCoordinator === true)
  ) as TrackCoordinator[];
  
  return {
    speakers,
    coordinators,
    loading,
    error
  };
};
