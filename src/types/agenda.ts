// ========================================
// 📋 TIPOS DA AGENDA MVP CONF
// ========================================
// Tipos baseados na análise da agenda vanilla JS existente

export interface Talk {
  id: string;
  title: string;
  speaker: string;
  track: string;
  room: string;
  description: string;
  level: string;
  isVacant?: boolean;
  isFull?: boolean;
  lotado?: boolean; // Campo usado para detectar sala lotada
}

export interface Slot {
  id: string; // Formato: YYYY-MM-DD-HHmm (ex: 2025-10-24-0900)
  talks: Talk[];
}

export interface Schedule {
  [day: string]: Slot[]; // Chave: YYYY-MM-DD
}

export interface Selection {
  day: string;
  slotId: string;
  talkId: string;
  talkTitle: string;
  track: string;
  room: string;
  speaker?: string;
  isVacant?: boolean;
}

export interface SelectionsMap {
  [slotId: string]: Selection;
}

export interface TrackCoordinator {
  name: string;
  coordinator?: string;
}

// ========================================
// 🔐 TIPOS DE AUTENTICAÇÃO
// ========================================

export interface AuthState {
  isAuthenticated: boolean;
  userEmail: string | null;
  userCode: string | null;
}

export interface ApiResponse<T = any> {
  ok: boolean;
  data?: T;
  status?: number;
  message?: string;
}

// ========================================
// 🔍 TIPOS DE FILTROS
// ========================================

export interface FilterState {
  selectedTracks: string[];
  searchKeyword: string;
}

export interface CollapsedState {
  [slotId: string]: boolean;
}

// ========================================
// ⚙️ TIPOS DE CONFIGURAÇÃO
// ========================================

export interface AgendaConfig {
  useLocalJson: boolean;
  storageKey: string;
  collapseKey: string;
}

// ========================================
// 📊 TIPOS DE DADOS REMOTOS
// ========================================

export interface ApiTalkData {
  // Estrutura esperada do Power Automate / Excel API
  [key: string]: any;
}

export interface ApiLoadResponse {
  body?: ApiTalkData[];
  Talks?: ApiTalkData[];
  talks?: ApiTalkData[];
  items?: ApiTalkData[];
}

// ========================================
// 📱 TIPOS DE UI/COMPONENTES
// ========================================

export interface AgendaProps {
  className?: string;
}

export interface TalkCardProps {
  talk: Talk;
  isSelected: boolean;
  slotId: string;
  onSelect: (talk: Talk, slotId: string) => void;
}

export interface SlotProps {
  slot: Slot;
  isCollapsed: boolean;
  selectedTalk: Talk | null;
  visibleTalks: Talk[];
  onToggleCollapse: (slotId: string) => void;
  onSelectTalk: (talk: Talk, slotId: string) => void;
}

export interface FilterProps {
  tracks: string[];
  selectedTracks: string[];
  searchKeyword: string;
  onTrackChange: (tracks: string[]) => void;
  onSearchChange: (keyword: string) => void;
  onClearFilters: () => void;
}

export interface AuthModalProps {
  isOpen: boolean;
  mode: 'email' | 'code';
  email?: string;
  onClose: () => void;
  onEmailSubmit: (email: string) => Promise<void>;
  onCodeSubmit: (code: string) => Promise<void>;
  onResendCode: () => Promise<void>;
}

export interface SummaryProps {
  selections: SelectionsMap;
  onClearSelections: () => void;
  onSaveAgenda: () => Promise<void>;
}

// ========================================
// 🛠️ UTILITY TYPES
// ========================================

export type Day = string; // YYYY-MM-DD format
export type SlotId = string; // YYYY-MM-DD-HHmm format
export type TalkId = string;

export interface DateUtils {
  formatTime: (start: string) => string;
  formatDay: (dateString: string) => string;
  formatTimeFromSlotId: (slotId: string) => string;
  formatDayFromSlotId: (slotId: string) => string;
  dateFromSlotId: (slotId: string) => Date;
  getDayFromSlot: (slot: Slot) => string;
}
