// ========================================
// 🛠️ UTILITÁRIOS DA AGENDA MVP CONF
// ========================================
// Funções auxiliares migradas do vanilla JS

import type { 
  Talk, 
  Slot, 
  Schedule, 
  Selection, 
  SelectionsMap, 
  ApiTalkData, 
  Day, 
  SlotId 
} from '../types/agenda';

// ========================================
// 📅 FUNÇÕES DE DATA E HORÁRIO
// ========================================

export function dateFromSlotId(slotId: SlotId): Date {
  const match = /^([0-9]{4})-([0-9]{2})-([0-9]{2})-([0-9]{2})([0-9]{2})$/.exec(String(slotId || ''));
  if (!match) return new Date(NaN);
  
  const [, year, month, day, hour, minute] = match;
  return new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);
}

export function formatTimeFromSlotId(slotId: SlotId): string {
  const date = dateFromSlotId(slotId);
  const formatter = new Intl.DateTimeFormat('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  return formatter.format(date);
}

export function formatDayFromSlotId(slotId: SlotId): string {
  const date = dateFromSlotId(slotId);
  const formatted = new Intl.DateTimeFormat('pt-BR', { 
    weekday: 'short', 
    day: '2-digit', 
    month: '2-digit' 
  }).format(date);
  return formatted.replace(', ', ' - ');
}

export function formatTime(start: string): string {
  const startDate = new Date(start);
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
  return formatter.format(startDate);
}

export function formatDay(dateString: string): string {
  const formatted = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit'
  }).format(new Date(dateString));
  
  return formatted.replace(', ', ' - ');
}

export function getDayFromSlot(slot: Slot): Day {
  return String(slot.id || '').slice(0, 10);
}

// ========================================
// 🎯 FUNÇÕES DE FILTROS
// ========================================

export function talkMatchesFilters(
  talk: Talk, 
  selectedTracks: string[], 
  keyword: string
): boolean {
  const tracks = Array.isArray(selectedTracks) ? selectedTracks : [];
  const allSelected = tracks.length === 0 || tracks.includes('all');
  
  if (talk.isVacant) {
    return keyword === '' && (allSelected || tracks.includes('Horario livre'));
  }

  const matchesTrack = allSelected || tracks.includes(talk.track);
  if (!matchesTrack) return false;

  if (!keyword) return true;
  
  const haystack = `${talk.title} ${talk.speaker} ${talk.description}`.toLowerCase();
  return haystack.includes(keyword);
}

// ========================================
// 🏗️ FUNÇÕES DE CONSTRUÇÃO DE DADOS
// ========================================

export function createVacantTalk(slot: Slot): Talk {
  return {
    id: `${slot.id}-vacant`,
    title: 'Slot vago',
    speaker: '',
    track: 'Horario livre',
    room: 'Livre',
    description: '',
    level: 'Livre',
    isVacant: true
  };
}

export function createVacantSelection(slot: Slot, day: Day): Selection {
  // Extrai o horário do slotId (formato: YYYY-MM-DD-HHmm)
  const timeFromSlotId = slot.id.slice(-4);
  const formattedTime = `${timeFromSlotId.slice(0, 2)}:${timeFromSlotId.slice(2)}`;

  return {
    day,
    slotId: slot.id,
    talkId: `${slot.id}-vacant`,
    talkTitle: 'Slot vago',
    track: 'Horário livre',
    room: 'Livre',
    time: formattedTime,
    speakers: [],
    isVacant: true
  };
}

// ========================================
// 📋 NORMALIZAÇÃO DE DADOS DA API
// ========================================

export function normalizeScheduleFromFlatTalks(items: ApiTalkData[]): Schedule {
  const schedule: Schedule = {};
  
  // Agrupa talks por dia e horário
  items.forEach((item) => {
    // Extrai campos relevantes do item da API
    const talk: Talk = {
      id: String(item.talkId || item.id || item.ID || ''),
      title: String(item.title || item.Title || item.Titulo || ''),
      speaker: String(item.speaker || item.Speaker || item.Palestrante || ''),
      track: String(item.track || item.Track || item.Trilha || ''),
      room: String(item.room || item.Room || item.Sala || ''),
      description: String(item.description || item.Description || item.Descricao || ''),
      level: String(item.level || item.Level || item.Nivel || 'Intermediário'),
      isFull: Boolean(item.isFull || item.lotado === 'True' || item.Lotado === 'True'),
      lotado: Boolean(item.lotado === 'True' || item.Lotado === 'True')
    };

    // Extrai informações de slot/horário
    const slotInfo = extractSlotInfo(item);
    if (!slotInfo.slotId || !slotInfo.day) return;

    // Inicializa dia se não existir
    if (!schedule[slotInfo.day]) {
      schedule[slotInfo.day] = [];
    }

    // Procura slot existente ou cria novo
    let slot = schedule[slotInfo.day].find(s => s.id === slotInfo.slotId);
    if (!slot) {
      slot = { id: slotInfo.slotId, talks: [] };
      schedule[slotInfo.day].push(slot);
    }

    // Adiciona talk ao slot
    slot.talks.push(talk);
  });

  // Ordena slots por horário dentro de cada dia
  Object.keys(schedule).forEach(day => {
    schedule[day].sort((a, b) => a.id.localeCompare(b.id));
  });

  return schedule;
}

function extractSlotInfo(item: ApiTalkData): { slotId: SlotId; day: Day } {
  // Tenta extrair informações de slot de diferentes campos possíveis
  const slotId = item.slotId || item.SlotId || item.slot_id || '';
  let day = item.day || item.Day || item.Dia || item.data || item.Data || '';
  
  // Se tem slotId mas não tem day, extrai o dia do slotId (formato: YYYY-MM-DD-HHmm)
  if (slotId && !day) {
    day = String(slotId).slice(0, 10); // Extrai YYYY-MM-DD do slotId
  }
  
  // Se não tem slotId, tenta construir a partir de data/hora
  if (!slotId && (item.date || item.Date || item.start || item.Start)) {
    const dateStr = item.date || item.Date || item.start || item.Start;
    const timeStr = item.time || item.Time || item.hora || item.Hora;
    
    if (dateStr && timeStr) {
      const date = new Date(dateStr);
      const [hour, minute] = timeStr.split(':');
      return {
        slotId: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${hour}${minute}`,
        day: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
      };
    }
  }
  
  return {
    slotId: String(slotId),
    day: String(day).slice(0, 10) // Garante formato YYYY-MM-DD
  };
}

// ========================================
// 💾 FUNÇÕES DE PERSISTÊNCIA
// ========================================

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Falha ao carregar ${key} do localStorage`, error);
    return defaultValue;
  }
}

export function saveToLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Falha ao salvar ${key} no localStorage`, error);
  }
}

export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Falha ao remover ${key} do localStorage`, error);
  }
}

// ========================================
// 📊 FUNÇÕES DE EXPORTAÇÃO
// ========================================

export function selectionsToCSV(selections: SelectionsMap): string {
  const rows = [
    ['day', 'slotId', 'talkId', 'talkTitle', 'track', 'room', 'isVacant'],
    ...Object.values(selections).map((sel) => [
      sel.day,
      sel.slotId,
      sel.talkId,
      sel.talkTitle,
      sel.track,
      sel.room,
      sel.isVacant ? 'true' : 'false'
    ])
  ];

  return rows
    .map((row) =>
      row
        .map((value) => {
          const normalized = String(value ?? '');
          return `"${normalized.replace(/"/g, '""')}"`;
        })
        .join(',')
    )
    .join('\n');
}

export function downloadCSV(content: string, filename: string = 'agenda-mvpconf.csv'): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ========================================
// 🔧 FUNÇÕES AUXILIARES
// ========================================

export function getAllTracks(schedule: Schedule): string[] {
  const tracks = new Set<string>();
  
  Object.values(schedule).forEach((slots) => {
    slots.forEach((slot) => {
      slot.talks.forEach((talk) => {
        if (!talk.isVacant) {
          tracks.add(talk.track);
        }
      });
    });
  });
  
  return Array.from(tracks).sort((a, b) => a.localeCompare(b));
}

export function ensureDefaultSelections(
  schedule: Schedule, 
  currentSelections: SelectionsMap
): SelectionsMap {
  const selections = { ...currentSelections };
  
  Object.entries(schedule).forEach(([day, slots]) => {
    slots.forEach((slot) => {
      if (!selections[slot.id]) {
        selections[slot.id] = createVacantSelection(slot, day);
      }
    });
  });
  
  return selections;
}
