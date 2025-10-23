import { useRemoteData } from './useRemoteData';

export interface Sponsor {
  id: number;
  name: string;
  logo: string;
  tier: 'platinum' | 'gold' | 'silver';
  website: string;
}

const API_URL = 'https://raw.githubusercontent.com/MVPConf/2025/refs/heads/main/sponsors.json';

export const useSponsors = () => {
  const { data, loading, error } = useRemoteData<Sponsor[]>(API_URL);
  
  // Remove duplicatas por ID (mantém apenas a primeira ocorrência)
  const uniqueSponsors = (data ?? []).reduce((acc, sponsor) => {
    if (!acc.some(s => s.id === sponsor.id)) {
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
