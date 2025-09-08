import { useRemoteData } from './useRemoteData';

export interface Speaker {
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
}

const API_URL = 'https://raw.githubusercontent.com/MVPConf/2025/refs/heads/main/speakers.json';

export const useSpeakers = () => {
  const { data, loading, error } = useRemoteData<Speaker[]>(API_URL);
  const sorted = (data ?? []).slice().sort((a, b) => a.name.localeCompare(b.name));
  return {
    speakers: sorted,
    loading,
    error
  };
};