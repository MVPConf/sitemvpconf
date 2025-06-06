import { useState, useEffect } from 'react';

interface Speaker {
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
  };
}

interface CachedData {
  speakers: Speaker[];
  timestamp: number;
}

const CACHE_KEY = 'mvp_conf_speakers';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos em millisegundos
const API_URL = 'https://raw.githubusercontent.com/MVPConf/2025/refs/heads/main/speakers.json';

export const useSpeakers = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
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
      console.error('Erro ao ler cache:', error);
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
  };

  const setCachedData = (speakers: Speaker[]) => {
    try {
      const data: CachedData = {
        speakers,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Erro ao salvar no cache:', error);
    }
  };

  const fetchSpeakers = async () => {
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

      setSpeakers(data);
      setCachedData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(`Erro ao carregar palestrantes: ${errorMessage}`);
      console.error('Erro ao buscar palestrantes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Primeiro, tenta carregar do cache
    const cachedData = getCachedData();
    
    if (cachedData) {
      setSpeakers(cachedData.speakers);
      setLoading(false);
    } else {
      // Se não há cache válido, busca da API
      fetchSpeakers();
    }
  }, []);

  const refreshSpeakers = () => {
    localStorage.removeItem(CACHE_KEY);
    fetchSpeakers();
  };

  return {
    speakers,
    loading,
    error,
    refreshSpeakers
  };
};