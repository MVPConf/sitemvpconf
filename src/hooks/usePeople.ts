import { useMemo } from 'react';
import { useRemoteData } from './useRemoteData';
import { buildStorageUrl, getStorageAccountUrl } from '../utils/storage';

export interface Person {
  name: string; // Usado como identificador único
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

const API_URL = '/data/2025/speakers.json';

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Remove duplicidades pelo nome (case-insensitive, trimming)
const uniqueByName = <T extends { name: string }>(items: T[]): T[] => {
  const seenNames = new Set<string>();

  return items.filter(item => {
    // Verifica por nome (case-insensitive)
    const nameKey = item.name.trim().toLowerCase();
    if (seenNames.has(nameKey)) return false;

    seenNames.add(nameKey);
    return true;
  });
};

export const usePeople = () => {
  const { data, loading, error } = useRemoteData<Person[]>(API_URL);

  const processedData: Person[] = useMemo(() => {
    if (!data) return [];

    return (data ?? []).map((person: Person) => {
      const processedImage = person.image.startsWith('http')
        ? person.image
        : buildStorageUrl(getStorageAccountUrl(), `/data/2025${person.image}`);

      return {
        ...person,
        // Constrói a URL da imagem corretamente com SAS token se for um caminho relativo
        image: processedImage
      };
    });
  }, [data]);

  const activeData: Person[] = useMemo(
    () => processedData.filter((person: Person) => person.enabled !== false),
    [processedData]
  );

  // Palestrantes: todos os registros ativos (inclui também coordenadores para aparecerem nas duas seções)
  const speakers = useMemo(
    () => shuffleArray(
      uniqueByName(activeData)
    ),
    [activeData]
  );

  const coordinators = useMemo(
    () => shuffleArray(
      uniqueByName(activeData.filter((person: Person) => person.isTrackCoordinator === true))
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
