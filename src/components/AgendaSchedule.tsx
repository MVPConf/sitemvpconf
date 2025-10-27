// ========================================
// 📅 COMPONENTE DE PROGRAMAÇÃO DA AGENDA
// ========================================
// Lista todos os slots de um dia específico

import React from 'react';
import type { Slot, Talk, SelectionsMap, CollapsedState } from '../types/agenda';
import AgendaSlot from './AgendaSlot';

interface AgendaScheduleProps {
  slots: Slot[];
  selections: SelectionsMap;
  collapsedSlots: CollapsedState;
  visibleTalksBySlot: { [slotId: string]: Talk[] };
  onSelectTalk: (talk: Talk, slotId: string) => void;
  onToggleCollapse: (slotId: string) => void;
}

const AgendaSchedule: React.FC<AgendaScheduleProps> = ({
  slots,
  selections,
  collapsedSlots,
  visibleTalksBySlot,
  onSelectTalk,
  onToggleCollapse
}) => {
  if (slots.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📅</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum horário disponível</h3>
        <p className="text-gray-500">
          Não há palestras programadas para este dia ou os filtros ativos não retornaram resultados.
        </p>
      </div>
    );
  }

  return (
    <div className="agenda-schedule space-y-6">
      {slots.map((slot) => {
        // Obtém a seleção atual para este slot
        const selection = selections[slot.id];
        
        // Encontra o talk selecionado
        let selectedTalk: Talk | null = null;
        if (selection) {
          if (selection.isVacant) {
            // Seleção vaga
            selectedTalk = {
              id: selection.talkId,
              title: selection.talkTitle,
              speaker: '',
              track: selection.track,
              room: selection.room,
              description: '',
              level: 'Livre',
              isVacant: true
            };
          } else {
            // Procura o talk real no slot
            selectedTalk = slot.talks.find(talk => talk.id === selection.talkId) || null;
          }
        }

        // Obtém talks visíveis para este slot
        const visibleTalks = visibleTalksBySlot[slot.id] || [];
        
        return (
          <AgendaSlot
            key={slot.id}
            slot={slot}
            isCollapsed={collapsedSlots[slot.id] || false}
            selectedTalk={selectedTalk}
            visibleTalks={visibleTalks}
            onSelectTalk={onSelectTalk}
            onToggleCollapse={onToggleCollapse}
          />
        );
      })}
    </div>
  );
};

export default AgendaSchedule;
