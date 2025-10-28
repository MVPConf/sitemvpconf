// ========================================
// 📋 HOOK DE SELEÇÕES DA AGENDA
// ========================================
// Hook para gerenciar seleções de palestras do usuário

import { useState, useCallback, useEffect, useMemo } from 'react';
import type {
  Schedule,
  Talk,
  Slot,
  Selection,
  SelectionsMap,
  CollapsedState
} from '../types/agenda';
import {
  ensureDefaultSelections,
  loadFromLocalStorage,
  saveToLocalStorage,
  removeFromLocalStorage,
  selectionsToCSV,
  downloadCSV,
  createVacantSelection,
  formatTimeFromSlotId
} from '../utils/agenda';

const STORAGE_KEY = 'mvpconf-agenda';
const COLLAPSE_KEY = 'mvpconf-collapsed';

export function useAgendaSelections(schedule: Schedule) {
  // Estado das seleções (não persiste para evitar confusão)
  const [selections, setSelections] = useState<SelectionsMap>({});

  // Estado dos slots colapsados (persiste)
  const [collapsedSlots, setCollapsedSlots] = useState<CollapsedState>(() => {
    return loadFromLocalStorage(COLLAPSE_KEY, {});
  });

  // Garante que todos os slots tenham seleções padrão
  useEffect(() => {
    if (Object.keys(schedule).length > 0) {
      setSelections(currentSelections =>
        ensureDefaultSelections(schedule, currentSelections)
      );
    }
  }, [schedule]);

  // Salva estado dos colapsos
  useEffect(() => {
    saveToLocalStorage(COLLAPSE_KEY, collapsedSlots);
  }, [collapsedSlots]);

  // Seleciona uma palestra em um slot
  const selectTalk = useCallback((talk: Talk, slotId: string) => {
    const slot = Object.values(schedule).flat().find(s => s.id === slotId);
    if (!slot) return;

    const day = slotId.slice(0, 10); // YYYY-MM-DD

    const selection: Selection = {
      day,
      slotId,
      talkId: talk.id,
      talkTitle: talk.title,
      track: talk.track,
      room: talk.room,
      time: formatTimeFromSlotId(slotId),
      speakers: talk.speaker ? [talk.speaker] : [],
      isVacant: talk.isVacant || false
    };

    setSelections(prev => ({
      ...prev,
      [slotId]: selection
    }));
  }, [schedule]);

  // Limpa todas as seleções
  const clearSelections = useCallback(() => {
    // Remove do localStorage também
    removeFromLocalStorage(STORAGE_KEY);

    // Recria seleções vazias
    const newSelections: SelectionsMap = {};
    Object.entries(schedule).forEach(([day, slots]) => {
      slots.forEach((slot) => {
        newSelections[slot.id] = createVacantSelection(slot, day);
      });
    });

    setSelections(newSelections);
  }, [schedule]);

  // Alterna estado de colapso de um slot
  const toggleSlotCollapse = useCallback((slotId: string) => {
    setCollapsedSlots(prev => ({
      ...prev,
      [slotId]: !prev[slotId]
    }));
  }, []);

  // Expande um slot específico
  const expandSlot = useCallback((slotId: string) => {
    setCollapsedSlots(prev => ({
      ...prev,
      [slotId]: false
    }));
  }, []);

  // Colapsa um slot específico
  const collapseSlot = useCallback((slotId: string) => {
    setCollapsedSlots(prev => ({
      ...prev,
      [slotId]: true
    }));
  }, []);

  // Obtém a seleção atual de um slot
  const getSlotSelection = useCallback((slotId: string): Selection | null => {
    return selections[slotId] || null;
  }, [selections]);

  // Verifica se um slot está colapsado
  const isSlotCollapsed = useCallback((slotId: string): boolean => {
    // Por padrão, slots começam colapsados (true)
    return collapsedSlots[slotId] !== undefined ? collapsedSlots[slotId] : true;
  }, [collapsedSlots]);

  // Obtém talk selecionado de um slot
  const getSelectedTalk = useCallback((slot: Slot): Talk | null => {
    const selection = selections[slot.id];
    if (!selection) return null;

    // Se é seleção vaga, retorna talk vago
    if (selection.isVacant) {
      return {
        id: selection.talkId,
        title: selection.talkTitle,
        speaker: '',
        track: selection.track,
        room: selection.room,
        description: '',
        level: 'Livre',
        isVacant: true
      };
    }

    // Procura o talk real no slot
    return slot.talks.find(talk => talk.id === selection.talkId) || null;
  }, [selections]);

  // Exporta seleções como CSV
  const exportToCSV = useCallback(() => {
    const selectedCount = Object.values(selections).filter(sel => !sel.isVacant).length;

    if (selectedCount === 0) {
      alert('Selecione ao menos uma palestra antes de salvar.');
      return;
    }

    const csvContent = selectionsToCSV(selections);
    downloadCSV(csvContent, 'agenda-mvpconf.csv');
  }, [selections]);

  // Estatísticas das seleções
  const stats = useMemo(() => {
    const totalSlots = Object.keys(selections).length;
    const selectedTalks = Object.values(selections).filter(sel => !sel.isVacant).length;
    const vacantSlots = totalSlots - selectedTalks;

    return {
      totalSlots,
      selectedTalks,
      vacantSlots
    };
  }, [selections]);

  // Seleções agrupadas por dia
  const selectionsByDay = useMemo(() => {
    const grouped: { [day: string]: Selection[] } = {};

    Object.values(selections).forEach(selection => {
      if (!grouped[selection.day]) {
        grouped[selection.day] = [];
      }
      grouped[selection.day].push(selection);
    });

    // Ordena seleções por horário dentro de cada dia
    Object.keys(grouped).forEach(day => {
      grouped[day].sort((a, b) => a.slotId.localeCompare(b.slotId));
    });

    return grouped;
  }, [selections]);

  return {
    selections,
    collapsedSlots,
    selectTalk,
    clearSelections,
    toggleSlotCollapse,
    expandSlot,
    collapseSlot,
    getSlotSelection,
    isSlotCollapsed,
    getSelectedTalk,
    exportToCSV,
    stats,
    selectionsByDay
  };
}
