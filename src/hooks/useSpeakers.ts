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
    instagram?: string;
    youtube?: string;
  };
}


const API_URL = 'https://raw.githubusercontent.com/MVPConf/2025/refs/heads/main/speakers.json';

export const useSpeakers = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSpeakers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Formato de dados inválido');
      }
      setSpeakers(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(`Erro ao carregar palestrantes: ${errorMessage}`);
      console.error('Erro ao buscar palestrantes:', err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchSpeakers();
  }, []);


  const refreshSpeakers = () => {
    fetchSpeakers();
  };

  return {
    speakers,
    loading,
    error,
    refreshSpeakers
  };
};