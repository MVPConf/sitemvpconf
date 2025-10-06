import { useRemoteData } from './useRemoteData';

export interface ONG {
  id: number;
  name: string;
  url: string;
  current: boolean;
}

const API_URL = 'https://raw.githubusercontent.com/MVPConf/2025/refs/heads/main/ongs.json';

export const useOngs = () => {
  const { data, loading, error } = useRemoteData<ONG[]>(API_URL);

  const ongs = data ?? [];
  const ongs2025 = ongs
    .filter(ong => ong.current === true)
    .sort((a, b) => a.name.localeCompare(b.name));

  const ongsPrevious = ongs
    .filter(ong => ong.current === false)
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    ongs2025,
    ongsPrevious,
    loading,
    error,
  };
};
