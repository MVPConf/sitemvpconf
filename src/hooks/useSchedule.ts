import { useEffect, useState } from "react";


const API_URL = 'https://raw.githubusercontent.com/MVPConf/2025/refs/heads/main/schedule.json';


type Talk = {
  title: string;
  speaker: string;
  time: string;
};
type Track = {
  name: string;
  coordinators: string[];
  talks: Talk[];
};
type Day = {
  name: string;
  date: string;
  tracks: Track[];
};

export function useSchedule() {
  const [data, setData] = useState<Day[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      const json = await response.json();
      if (!Array.isArray(json)) {
        throw new Error('Formato de dados inválido');
      }
      setData(json);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(`Erro ao carregar programação: ${errorMessage}`);
      console.error('Erro ao buscar programação:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const refreshSchedule = () => {
    fetchSchedule();
  };

  return { data, loading, error, refreshSchedule };
}
