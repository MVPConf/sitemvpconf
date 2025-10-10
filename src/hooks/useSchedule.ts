import { useRemoteData } from './useRemoteData';

// Normalized schedule types (post-processing)
export type Talk = {
  title: string;
  time: string;
  speakers: string[];
};

export type Track = {
  name: string;
  coordinators: string[];
  talks: Talk[];
};

export type Day = {
  name: string;
  date: string;
  tracks: Track[];
};

const API_URL = 'https://raw.githubusercontent.com/MVPConf/2025/refs/heads/main/schedule.json';

export function useSchedule() {
  const { data, loading, error } = useRemoteData<Day[]>(API_URL);

  return {
    data: data ?? [],
    loading,
    error,
  };
}
