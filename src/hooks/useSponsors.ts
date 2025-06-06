import { useState, useEffect } from 'react';

interface Sponsor {
  id: number;
  name: string;
  logo: string;
  tier: 'platinum' | 'gold' | 'silver';
  website: string;
}

interface CachedData {
  sponsors: Sponsor[];
  timestamp: number;
}

const CACHE_KEY = 'mvp_conf_sponsors';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos em millisegundos
const API_URL = 'https://raw.githubusercontent.com/MVPConf/2025/refs/heads/main/sponsors.json';

export const useSponsors = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCachedData = (): CachedData | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const data: CachedData = JSON.parse(cached);
      const now = Date.now();
      
      // Verifica se o cache ainda é válido (menos de 10 minutos)
      if (now - data.timestamp < CACHE_DURATION) {
        return data;
      }
      
      // Cache expirado, remove do localStorage
      localStorage.removeItem(CACHE_KEY);
      return null;
    } catch (error) {
      console.error('Erro ao ler cache de patrocinadores:', error);
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
  };

  const setCachedData = (sponsors: Sponsor[]) => {
    try {
      const data: CachedData = {
        sponsors,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Erro ao salvar patrocinadores no cache:', error);
    }
  };

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
      setCachedData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(`Erro ao carregar patrocinadores: ${errorMessage}`);
      console.error('Erro ao buscar patrocinadores:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Primeiro, tenta carregar do cache
    const cachedData = getCachedData();
    
    if (cachedData) {
      setSponsors(cachedData.sponsors);
      setLoading(false);
    } else {
      // Se não há cache válido, busca da API
      fetchSponsors();
    }
  }, []);

  const refreshSponsors = () => {
    localStorage.removeItem(CACHE_KEY);
    fetchSponsors();
  };

  return {
    sponsors,
    loading,
    error,
    refreshSponsors
  };
};