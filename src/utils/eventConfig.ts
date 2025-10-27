// ========================================
// 📅 UTILITÁRIOS DE CONFIGURAÇÃO DO EVENTO
// ========================================
// Funções para trabalhar com datas e configurações do evento vindas do event.json

export interface EventDay {
  date: string;        // YYYY-MM-DD
  label: string;       // DD/MM
  weekday: string;     // Nome do dia da semana
  displayName: string; // "Dia DD/MM"
  fullDisplayName: string; // "Dia DD/MM - Dia da Semana"
}

export interface EventConfig {
  event: {
    name: string;
    year: number;
  };
  schedule: {
    days: {
      date: string;
      label: string;
      weekday: string;
    }[];
  };
}

// src/utils/eventConfig.ts
// Configuração padrão como fallback
const DEFAULT_CONFIG: EventConfig = {
  event: {
    name: 'MVPConf 2025',
    year: 2025
  },
  schedule: {
    days: [
      {
        date: '2025-10-24',
        label: '24/10',
        weekday: 'Sexta-feira'
      },
      {
        date: '2025-10-25',
        label: '25/10',
        weekday: 'Sábado'
      }
    ]
  }
};

// Variável para cache da configuração
let cachedConfig: EventConfig | null = null;

// Função para carregar configuração do JSON
export async function loadEventConfig(): Promise<EventConfig> {
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    const response = await fetch('/data/2025/event.json');
    if (!response.ok) {
      console.warn('Falha ao carregar event.json, usando configuração padrão');
      cachedConfig = DEFAULT_CONFIG;
      return cachedConfig;
    }

    const config = await response.json();
    cachedConfig = config;
    return config;
  } catch (error) {
    console.warn('Erro ao carregar event.json:', error);
    cachedConfig = DEFAULT_CONFIG;
    return cachedConfig;
  }
}

// Função para obter configuração (inicializa com padrão)
function getConfig(): EventConfig {
  return cachedConfig || DEFAULT_CONFIG;
}

// Configurações do evento
export const EVENT_CONFIG = {
  get name() {
    return getConfig().event.name;
  },
  get year() {
    return getConfig().event.year;
  }
};

// Retorna todos os dias do evento
export function getEventDays(): EventDay[] {
  const config = getConfig();

  return config.schedule.days.map(day => ({
    date: day.date,
    label: day.label,
    weekday: day.weekday,
    displayName: `Dia ${day.label}`,
    fullDisplayName: `Dia ${day.label} - ${day.weekday}`
  }));
}

// Retorna um dia específico do evento
export function getEventDay(date: string): EventDay | null {
  const days = getEventDays();
  return days.find(day => day.date === date) || null;
}

// Verifica se uma data é um dia do evento
export function isEventDay(date: string): boolean {
  return getEventDay(date) !== null;
}

// Retorna o primeiro dia do evento
export function getFirstEventDay(): EventDay {
  return getEventDays()[0];
}

// Retorna o último dia do evento
export function getLastEventDay(): EventDay {
  const days = getEventDays();
  return days[days.length - 1];
}

// Formata uma data para exibição baseada na configuração
export function formatEventDate(date: string): string {
  const eventDay = getEventDay(date);
  return eventDay ? eventDay.fullDisplayName : date;
}

// Retorna os dias do evento como array de strings (formato YYYY-MM-DD)
export function getEventDateStrings(): string[] {
  return getEventDays().map(day => day.date);
}
