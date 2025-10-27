// ========================================
// 🎯 COMPONENTE DE SLOT DE HORÁRIO
// ========================================
// Representa um horário específico com suas palestras

import React from 'react';
import type { SlotProps } from '../types/agenda';
import { formatTimeFromSlotId, formatDayFromSlotId } from '../utils/agenda';
import TalkCard from './TalkCard.tsx';

const AgendaSlot: React.FC<SlotProps> = ({
  slot,
  isCollapsed,
  selectedTalk,
  visibleTalks,
  onToggleCollapse,
  onSelectTalk
}) => {
  const slotTime = formatTimeFromSlotId(slot.id);
  const slotDay = formatDayFromSlotId(slot.id);

  // Os talks visíveis já vêm filtrados do componente pai
  const filteredTalks = visibleTalks;

  // Conta palestras visíveis (excluindo vago)
  const visibleTalksCount = filteredTalks.filter(talk => !talk.isVacant).length;
  const talksLabel = visibleTalksCount === 1 ? '1 palestra' : `${visibleTalksCount} palestras`;

  // Determina o talk selecionado neste slot
  const selectedTalkInSlot = selectedTalk;

  return (
    <article
      className={`agenda-slot bg-white border border-gray-200 rounded-lg overflow-hidden ${
        isCollapsed ? 'collapsed' : ''
      }`}
      data-slot-id={slot.id}
    >
      {/* Header do Slot */}
      <header className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div>
            <div className="text-lg font-semibold text-gray-900">{slotTime}</div>
            <div className="text-sm text-gray-500">{talksLabel}</div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600 font-medium">{slotDay}</span>

          {/* Botão de colapsar/expandir */}
          <button
            type="button"
            onClick={() => onToggleCollapse(slot.id)}
            className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label={isCollapsed ? 'Expandir slot' : 'Recolher slot'}
            title={isCollapsed ? 'Expandir' : 'Recolher'}
          >
            <svg
              className={`w-4 h-4 text-gray-600 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Indicador da seleção atual */}
      {selectedTalkInSlot && !isCollapsed && (
        <div className="px-4 py-2 bg-blue-50 border-b border-gray-200">
          <div className="text-sm text-blue-800">
            <span className="font-medium">Selecionado:</span>{' '}
            {selectedTalkInSlot.isVacant ? 'Horário livre' : selectedTalkInSlot.title}
          </div>
        </div>
      )}

      {/* Lista de Talks */}
      {!isCollapsed && (
        <div className="talks-container" id={`talks-${slot.id}`}>
          {filteredTalks.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <div className="text-gray-400 text-4xl mb-2">🔍</div>
              <p>Nenhuma palestra corresponde aos filtros atuais.</p>
            </div>
          ) : (
            <div className="space-y-2 p-4">
              {filteredTalks.map((talk) => (
                <TalkCard
                  key={talk.id}
                  talk={talk}
                  isSelected={selectedTalkInSlot?.id === talk.id}
                  slotId={slot.id}
                  onSelect={onSelectTalk}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
};

export default AgendaSlot;
