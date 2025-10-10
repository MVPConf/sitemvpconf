import { useRemoteData } from './useRemoteData';

export type Talk = {
  title: string;
  time: string;
  speakers: string[];
  room?: string;
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
