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
  const sorted = (data ?? []).slice().sort((a, b) => a.name.localeCompare(b.name));
  return {
    sponsors: sorted,
    loading,
    error
  };
};