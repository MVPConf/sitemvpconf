import { useMemo } from 'react';
import { useRemoteData } from './useRemoteData';
import { buildStorageUrl, getStorageAccountUrl } from '../utils/storage';

export interface Sponsor {
  name: string;
  logo: string;
  tier: 'platinum' | 'gold' | 'silver';
  website: string;
}

const API_URL = '/data/2025/sponsors.json';

export const useSponsors = () => {
  const { data, loading, error } = useRemoteData<Sponsor[]>(API_URL);

  const processedSponsors: Sponsor[] = useMemo(() => {
    if (!data) return [];

    return (data ?? []).map((sponsor: Sponsor) => ({
      ...sponsor,
      // Constrói a URL do logo corretamente com SAS token se for um caminho relativo
      logo: sponsor.logo.startsWith('http')
        ? sponsor.logo
        : buildStorageUrl(getStorageAccountUrl(), `/data/2025${sponsor.logo}`)
    }));
  }, [data]);

  // Remove duplicatas por nome (mantém apenas a primeira ocorrência)
  const uniqueSponsors = processedSponsors.reduce((acc, sponsor) => {
    if (!acc.some(s => s.name === sponsor.name)) {
      acc.push(sponsor);
    }
    return acc;
  }, [] as Sponsor[]);

  const sorted = uniqueSponsors.slice().sort((a, b) => a.name.localeCompare(b.name));

  return {
    sponsors: sorted,
    loading,
    error
  };
};
