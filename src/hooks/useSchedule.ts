import { useRemoteData } from './useRemoteData';

export type Talk = {
  title: string;
  description: string;
  time: string;
  room: string;
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

const API_URL = '/data/2025/schedule.json';

export function useSchedule() {
  const { data, loading, error } = useRemoteData<Day[]>(API_URL);

  return {
    data: data ?? [],
    loading,
    error,
  };
}
