import { useState, useEffect } from 'react';

interface Session {
  id: string;
  time: string;
  title: string;
  speaker: string;
  speakerTitle: string;
  speakerCompany: string;
  speakerImage: string;
  summary: string;
  room: string;
  type: 'keynote' | 'session' | 'workshop' | 'break' | 'networking';
  tags: string[];
}

interface DaySchedule {
  date: string;
  dayName: string;
  sessions: Session[];
}

interface CachedData {
  schedule: DaySchedule[];
  timestamp: number;
}

const CACHE_KEY = 'mvp_conf_schedule';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos em millisegundos
const API_URL = 'https://raw.githubusercontent.com/MVPConf/2025/refs/heads/main/schedule.json';

export const useSchedule = () => {
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
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
      console.error('Erro ao ler cache do cronograma:', error);
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
  };

  const setCachedData = (schedule: DaySchedule[]) => {
    try {
      const data: CachedData = {
        schedule,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Erro ao salvar cronograma no cache:', error);
    }
  };

  const fetchSchedule = async () => {
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

      setSchedule(data);
      setCachedData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(`Erro ao carregar cronograma: ${errorMessage}`);
      console.error('Erro ao buscar cronograma:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Primeiro, tenta carregar do cache
    const cachedData = getCachedData();
    
    if (cachedData) {
      setSchedule(cachedData.schedule);
      setLoading(false);
    } else {
      // Se não há cache válido, busca da API
      fetchSchedule();
    }
  }, []);

  const refreshSchedule = () => {
    localStorage.removeItem(CACHE_KEY);
    fetchSchedule();
  };

  return {
    schedule,
    loading,
    error,
    refreshSchedule
  };
};