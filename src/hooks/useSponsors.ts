import { useState, useEffect } from 'react';

interface Sponsor {
  id: number;
  name: string;
  logo: string;
  tier: 'platinum' | 'gold' | 'silver';
  website: string;
}

const API_URL = 'https://raw.githubusercontent.com/MVPConf/2025/refs/heads/main/sponsors.json';

export const useSponsors = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const fetchSponsors = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();

      // Valida se os dados têm a estrutura esperada
      if (!Array.isArray(data)) {
        throw new Error('Formato de dados inválido');
      }

      setSponsors(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(`Erro ao carregar patrocinadores: ${errorMessage}`);
      console.error('Erro ao buscar patrocinadores:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const refreshSponsors = () => {
    fetchSponsors();
  };

  return {
    sponsors,
    loading,
    error,
    refreshSponsors
  };
};