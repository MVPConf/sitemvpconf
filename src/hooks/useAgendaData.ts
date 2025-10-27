// ========================================
// 🎣 HOOK DE DADOS DA AGENDA
// ========================================
// Hook para carregar dados de palestras (API ou JSON local)

import { useState, useEffect, useCallback } from 'react';
import type { Schedule, ApiResponse, ApiLoadResponse, ApiTalkData } from '../types/agenda';
import { normalizeScheduleFromFlatTalks } from '../utils/agenda';

export interface UseAgendaDataOptions {
  useLocalJson: boolean;
  apiUrl?: string;
}

export function useAgendaData(options: UseAgendaDataOptions) {
  const [schedule, setSchedule] = useState<Schedule>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFromLocal = useCallback(async (): Promise<ApiResponse<ApiLoadResponse>> => {
    try {
      const response = await fetch('./agenda/Palestras.json');
      if (!response.ok) {
        return {
          ok: false,
          status: response.status,
          message: `Falha ao carregar Palestras.json (HTTP ${response.status}).`
        };
      }
      const data = await response.json();
      return { ok: true, data: data || {} };
    } catch (err) {
      console.warn('loadFromLocal error', err);
      return {
        ok: false,
        message: 'Não foi possível carregar o arquivo Palestras.json.'
      };
    }
  }, []);

  const loadFromApi = useCallback(async (): Promise<ApiResponse<ApiLoadResponse>> => {
    const url = options.apiUrl || import.meta.env.TALKS_API_URL;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), Number(import.meta.env.API_TIMEOUT) || 12000);

    try {
      const response = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        mode: 'cors'
      });

      clearTimeout(timeout);

      if (!response.ok) {
        return {
          ok: false,
          status: response.status,
          message: `Falha ao carregar palestras (HTTP ${response.status}).`
        };
      }

      const contentType = response.headers.get('content-type') || '';
      let data = null;

      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch {
          // Fallback para objeto vazio se o texto não for JSON válido
          data = {};
        }
      }

      return { ok: true, data: data || {} };
    } catch (err) {
      clearTimeout(timeout);
      console.error('loadFromApi error', err);

      const aborted = err && (err as any).name === 'AbortError';
      return {
        ok: false,
        message: aborted
          ? 'Tempo esgotado ao carregar palestras.'
          : 'Não foi possível carregar as palestras.'
      };
    }
  }, [options.apiUrl]);

  const loadSchedule = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log(`📚 Carregando palestras de: ${options.useLocalJson ? 'JSON LOCAL (Palestras.json)' : 'API POWER AUTOMATE (Excel)'}`);

      const response = options.useLocalJson
        ? await loadFromLocal()
        : await loadFromApi();

      if (!response.ok) {
        const errorMessage = response.message || 'Falha ao carregar palestras.';
        setError(errorMessage);
        console.error('❌ Erro ao carregar palestras:', errorMessage);
        return;
      }

      const payload = response.data || {};
      const items: ApiTalkData[] = Array.isArray(payload)
        ? payload
        : (payload.body || payload.Talks || payload.talks || payload.items || []);

      if (!Array.isArray(items) || items.length === 0) {
        const errorMessage = 'Nenhuma palestra foi encontrada nos dados carregados.';
        setError(errorMessage);
        console.warn('⚠️ Nenhum item encontrado para processar!');
        return;
      }

      console.log('✅ Processando', items.length, 'palestras...');
      const newSchedule = normalizeScheduleFromFlatTalks(items);
      setSchedule(newSchedule);
      console.log('✅ Schedule normalizado:', newSchedule);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao carregar agenda';
      setError(errorMessage);
      console.error('Erro ao carregar agenda:', err);
    } finally {
      setLoading(false);
    }
  }, [options.useLocalJson, loadFromLocal, loadFromApi]);

  const refetch = useCallback(() => {
    loadSchedule();
  }, [loadSchedule]);

  useEffect(() => {
    loadSchedule();
  }, [loadSchedule]);

  return {
    schedule,
    loading,
    error,
    refetch
  };
}
