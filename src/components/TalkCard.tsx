// ========================================
// 🎤 COMPONENTE DE CARD DE PALESTRA
// ========================================
// Representa uma palestra individual dentro de um slot

import React from 'react';
import type { TalkCardProps } from '../types/agenda';

const TalkCard: React.FC<TalkCardProps> = ({
  talk,
  isSelected,
  slotId,
  onSelect
}) => {
  const handleSelect = () => {
    onSelect(talk, slotId);
  };

  // Determina as classes CSS baseado no tipo e estado
  const getCardClasses = () => {
    let classes = 'talk-card cursor-pointer transition-all duration-200 ';
    
    if (talk.isVacant) {
      classes += 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100 ';
    } else {
      classes += 'bg-white hover:bg-gray-50 ';
      
      // Verifica se sala está lotada
      if (talk.isFull || talk.lotado) {
        classes += 'border-red-200 bg-red-50 ';
      } else {
        classes += 'border-gray-200 ';
      }
    }
    
    if (isSelected) {
      classes += 'ring-2 ring-blue-500 border-blue-500 ';
    } else {
      classes += 'border ';
    }
    
    return classes;
  };

  // Determina a cor do badge baseado na trilha
  const getBadgeColor = (track: string) => {
    const colors: { [key: string]: string } = {
      'Horario livre': 'bg-yellow-100 text-yellow-800',
      'Keynote': 'bg-purple-100 text-purple-800',
      'DevOps': 'bg-blue-100 text-blue-800',
      'Cloud': 'bg-sky-100 text-sky-800',
      'AI': 'bg-green-100 text-green-800',
      'Security': 'bg-red-100 text-red-800',
      'Data': 'bg-indigo-100 text-indigo-800',
      'Frontend': 'bg-pink-100 text-pink-800',
      'Backend': 'bg-gray-100 text-gray-800',
      'Mobile': 'bg-orange-100 text-orange-800'
    };
    
    return colors[track] || 'bg-gray-100 text-gray-800';
  };

  return (
    <label className={`${getCardClasses()} block rounded-lg p-4`}>
      <input
        type="radio"
        name={`slot-${slotId}`}
        value={talk.id}
        checked={isSelected}
        onChange={handleSelect}
        className="sr-only"
      />
      
      <div>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            {/* Título da palestra */}
            <h3 className={`text-base font-semibold mb-2 ${
              talk.isVacant 
                ? 'text-yellow-800' 
                : talk.isFull || talk.lotado 
                  ? 'text-red-900' 
                  : 'text-gray-900'
            }`}>
              {talk.title}
            </h3>

            {/* Meta informações (palestrante e sala) */}
            {!talk.isVacant && (
              <div className={`text-sm mb-2 ${
                talk.isFull || talk.lotado ? 'text-red-700' : 'text-gray-600'
              }`}>
                {talk.speaker && (
                  <>
                    <span className="font-medium">{talk.speaker}</span>
                    {talk.room && <span className="mx-2">•</span>}
                  </>
                )}
                {talk.room && <span>{talk.room}</span>}
              </div>
            )}

            {/* Descrição */}
            {talk.description && !talk.isVacant && (
              <p className={`text-sm leading-relaxed ${
                talk.isFull || talk.lotado ? 'text-red-600' : 'text-gray-600'
              }`}>
                {talk.description}
              </p>
            )}

            {/* Indicador de sala lotada */}
            {(talk.isFull || talk.lotado) && !talk.isVacant && (
              <div className="mt-3 flex items-center text-red-700">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-medium">Sala Lotada</span>
              </div>
            )}
          </div>

          {/* Badge da trilha */}
          <div className="ml-4 flex-shrink-0">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(talk.track)}`}>
              {talk.track}
            </span>
          </div>
        </div>

      {/* Indicador visual de seleção */}
      {isSelected && (
        <div className="mt-3 flex items-center text-blue-600">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-medium">Selecionado</span>
        </div>
      )}

      {/* Nível da palestra (se não for vago) */}
      {!talk.isVacant && talk.level && talk.level !== 'Livre' && (
        <div className="mt-2">
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
            Nível: {talk.level}
          </span>
        </div>
      )}
      </div>
    </label>
  );
};

export default TalkCard;
