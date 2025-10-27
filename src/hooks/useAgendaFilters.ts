// ========================================
// 🎯 HOOK DE FILTROS DA AGENDA
// ========================================
// Hook para gerenciar filtros de trilha e pesquisa

import { useState, useCallback, useMemo } from 'react';
import type { Schedule, Talk, FilterState } from '../types/agenda';
import { talkMatchesFilters, getAllTracks } from '../utils/agenda';

export function useAgendaFilters(schedule: Schedule) {
  const [filterState, setFilterState] = useState<FilterState>({
    selectedTracks: [],
    searchKeyword: ''
  });

  // Extrai todas as trilhas disponíveis do schedule
  const availableTracks = useMemo(() => {
    return getAllTracks(schedule);
  }, [schedule]);

  // Atualiza trilhas selecionadas
  const setSelectedTracks = useCallback((tracks: string[]) => {
    setFilterState(prev => ({
      ...prev,
      selectedTracks: tracks
    }));
  }, []);

  // Atualiza palavra-chave de pesquisa
  const setSearchKeyword = useCallback((keyword: string) => {
    setFilterState(prev => ({
      ...prev,
      searchKeyword: keyword.toLowerCase().trim()
    }));
  }, []);

  // Limpa todos os filtros
  const clearFilters = useCallback(() => {
    setFilterState({
      selectedTracks: [],
      searchKeyword: ''
    });
  }, []);

  // Verifica se um talk passa pelos filtros atuais
  const checkTalkMatches = useCallback((talk: Talk) => {
    return talkMatchesFilters(talk, filterState.selectedTracks, filterState.searchKeyword);
  }, [filterState.selectedTracks, filterState.searchKeyword]);

  // Filtra talks de um slot
  const filterSlotTalks = useCallback((talks: Talk[]) => {
    return talks.filter(checkTalkMatches);
  }, [checkTalkMatches]);

  // Conta quantos talks visíveis (não vagos) existem em um slot
  const countVisibleTalks = useCallback((talks: Talk[]) => {
    return filterSlotTalks(talks).filter(talk => !talk.isVacant).length;
  }, [filterSlotTalks]);

  return {
    filterState,
    availableTracks,
    setSelectedTracks,
    setSearchKeyword,
    clearFilters,
    checkTalkMatches,
    filterSlotTalks,
    countVisibleTalks
  };
}
