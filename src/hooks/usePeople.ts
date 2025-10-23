import { useMemo } from 'react';
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

// Remove duplicidades pelo ID primeiro, depois pelo nome (case-insensitive, trimming)
const uniqueById = <T extends { id: number; name: string }>(items: T[]): T[] => {
  const seenIds = new Set<number>();
  const seenNames = new Set<string>();

  return items.filter(item => {
    // Verifica por ID primeiro
    if (seenIds.has(item.id)) return false;

    // Verifica por nome (case-insensitive)
    const nameKey = item.name.trim().toLowerCase();
    if (seenNames.has(nameKey)) return false;

    seenIds.add(item.id);
    seenNames.add(nameKey);
    return true;
  });
};

export const usePeople = () => {
  const { data, loading, error } = useRemoteData<Person[]>(API_URL);

  const activeData: Person[] = useMemo(
    () => (data ?? []).filter((person: Person) => person.enabled !== false),
    [data]
  );

  // Palestrantes: todos os registros ativos (inclui também coordenadores para aparecerem nas duas seções)
  const speakers = useMemo(
    () => shuffleArray(
      uniqueById(activeData)
    ),
    [activeData]
  );

  const coordinators = useMemo(
    () => shuffleArray(
      uniqueById(activeData.filter((person: Person) => person.isTrackCoordinator === true))
    ) as TrackCoordinator[],
    [activeData]
  );

  return {
    speakers,
    coordinators,
    loading,
    error
  };
};
