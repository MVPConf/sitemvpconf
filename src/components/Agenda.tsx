// ========================================
// 📋 COMPONENTE PRINCIPAL DA AGENDA
// ========================================
// Componente que integra todos os hooks e gerencia o estado da agenda

import React, { useState, useCallback } from 'react';
import { useAgendaData } from '../hooks/useAgendaData';
import { useAuth } from '../hooks/useAuth';
import { useAgendaFilters } from '../hooks/useAgendaFilters';
import { useAgendaSelections } from '../hooks/useAgendaSelections';
import type { AgendaProps } from '../types/agenda';

// Importações de componentes
import AgendaSchedule from './AgendaSchedule';
import { createVacantTalk } from '../utils/agenda';
import { getEventDays, getFirstEventDay, formatEventDate, EVENT_CONFIG, loadEventConfig } from '../utils/eventConfig';

const Agenda: React.FC<AgendaProps> = ({ className = '' }) => {
  // ========================================
  // 🎛️ ESTADO LOCAL
  // ========================================
  const [currentDay, setCurrentDay] = useState<string>('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'email' | 'code'>('email');

  // ========================================
  // 🎣 HOOKS CUSTOMIZADOS
  // ========================================

  // Hook de dados da agenda
  const { schedule, loading: loadingSchedule, error: scheduleError, refetch } = useAgendaData({
    useLocalJson: import.meta.env.USE_LOCAL_JSON === 'true'
  });

  // Hook de autenticação
  const {
    authState,
    isLoading: isAuthLoading,
    startAuth,
    verifyCode,
    loadUserAgenda,
    saveUserAgenda
  } = useAuth();

  // Hook de filtros
  const {
    filterState,
    availableTracks,
    setSearchKeyword,
    clearFilters,
    checkTalkMatches
  } = useAgendaFilters(schedule);

  // Hook de seleções
  const {
    selections,
    collapsedSlots,
    selectTalk,
    clearSelections,
    toggleSlotCollapse,
    exportToCSV,
    stats,
    selectionsByDay
  } = useAgendaSelections(schedule);

  // ========================================
  // 📅 LÓGICA DOS DIAS
  // ========================================

  // Carrega configuração do evento quando o componente é montado
  React.useEffect(() => {
    loadEventConfig().catch(console.error);
  }, []);

  // Atualiza dia atual quando o schedule carrega
  React.useEffect(() => {
    const firstDay = Object.keys(schedule)[0] || getFirstEventDay().date;
    if (firstDay && !currentDay) {
      setCurrentDay(firstDay);
    }
  }, [schedule, currentDay]);

  const handleDayChange = useCallback((day: string) => {
    setCurrentDay(day);
  }, []);

  // ========================================
  // 🔐 HANDLERS DE AUTENTICAÇÃO
  // ========================================

  const handleOpenAuthModal = useCallback(() => {
    setAuthMode('email');
    setShowAuthModal(true);
  }, []);

  const handleCloseAuthModal = useCallback(() => {
    setShowAuthModal(false);
  }, []);

  const handleEmailSubmit = useCallback(async (email: string) => {
    const result = await startAuth(email);
    if (result.ok) {
      setAuthMode('code');
    } else {
      alert(result.message || 'Erro ao enviar email');
    }
  }, [startAuth]);

  const handleCodeSubmit = useCallback(async (code: string) => {
    const result = await verifyCode(code);
    if (result.ok) {
      setShowAuthModal(false);
      // Carrega agenda salva do usuário
      if (authState.userEmail) {
        await loadUserAgenda(authState.userEmail);
      }
    } else {
      alert(result.message || 'Código inválido');
    }
  }, [verifyCode, authState.userEmail, loadUserAgenda]);

  const handleResendCode = useCallback(async () => {
    if (authState.userEmail) {
      const result = await startAuth(authState.userEmail);
      if (!result.ok) {
        alert(result.message || 'Erro ao reenviar email');
      }
    }
  }, [authState.userEmail, startAuth]);

  // ========================================
  // 💾 HANDLERS DE SALVAMENTO
  // ========================================

  const handleSaveAgenda = useCallback(async () => {
    if (!authState.isAuthenticated) {
      handleOpenAuthModal();
      return;
    }

    if (stats.selectedTalks === 0) {
      alert('Selecione ao menos uma palestra antes de salvar.');
      return;
    }

    const selectionsArray = Object.values(selections);
    const result = await saveUserAgenda(authState.userEmail!, selectionsArray);

    if (result.ok) {
      alert('Agenda salva com sucesso!');
    } else {
      alert(result.message || 'Erro ao salvar agenda');
    }
  }, [authState, stats.selectedTalks, selections, saveUserAgenda, handleOpenAuthModal]);

  // ========================================
  // 🎯 HANDLERS DE FILTROS
  // ========================================



  const handleSearchChange = useCallback((keyword: string) => {
    setSearchKeyword(keyword);
  }, [setSearchKeyword]);

  // ========================================
  // 📋 HANDLERS DE SELEÇÃO
  // ========================================

  const handleTalkSelect = useCallback((talk: any, slotId: string) => {
    selectTalk(talk, slotId);
  }, [selectTalk]);

  // ========================================
  // 🎨 VALORES COMPUTADOS
  // ========================================

  const scheduleDays = Object.keys(schedule);
  const currentSlots = schedule[currentDay] || [];

  // Calcula talks visíveis para cada slot baseado nos filtros
  const visibleTalksBySlot = React.useMemo(() => {
    const visibleBySlot: { [slotId: string]: any[] } = {};

    currentSlots.forEach(slot => {
      const talksWithVacant = [createVacantTalk(slot), ...slot.talks];
      const visibleTalks = talksWithVacant.filter(talk => checkTalkMatches(talk));
      visibleBySlot[slot.id] = visibleTalks;
    });

    return visibleBySlot;
  }, [currentSlots, checkTalkMatches]);

  // ========================================
  // 🎨 RENDER
  // ========================================

  // Estados de loading e erro
  if (loadingSchedule) {
    return (
      <div className={`agenda-container ${className}`}>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando agenda...</p>
          </div>
        </div>
      </div>
    );
  }

  if (scheduleError) {
    return (
      <div className={`agenda-container ${className}`}>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Erro ao carregar agenda</h3>
            <p className="text-gray-600 mb-4">{scheduleError}</p>
            <button
              onClick={refetch}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`agenda-container ${className}`}>
      {/* Seção Hero da Agenda */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Monte sua agenda - {EVENT_CONFIG.name}</h1>
            <p className="text-xl text-blue-100 mb-8">
              Selecione uma palestra por horário, filtre por trilha ou palavra-chave e acompanhe suas escolhas.
            </p>
            <div className="flex items-center justify-center space-x-4">
              {authState.isAuthenticated ? (
                <div className="text-sm text-blue-100">
                  Logado como: <strong>{authState.userEmail}</strong>
                </div>
              ) : (
                <button
                  onClick={handleOpenAuthModal}
                  className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Fazer Login para Salvar
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Layout Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Painel de Controles (Filtros + Tabs) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">

              {/* Seção de Filtros */}
              <section className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h2>

                {/* Pesquisa */}
                <div className="mb-4">
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                    Pesquisar
                  </label>
                  <input
                    id="search"
                    type="text"
                    placeholder="Busque por título, palestrante ou descrição"
                    value={filterState.searchKeyword}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Trilhas - Implementação simplificada por enquanto */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trilhas
                  </label>
                  <div className="text-sm text-gray-500">
                    {availableTracks.length} trilhas disponíveis
                  </div>
                </div>

                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Limpar filtros
                </button>
              </section>

              {/* Tabs de Dias */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Dias do Evento</h2>
                <div className="space-y-2">
                  {getEventDays().map((eventDay) => {
                    const hasSchedule = scheduleDays.includes(eventDay.date);
                    return (
                      <button
                        key={eventDay.date}
                        onClick={() => handleDayChange(eventDay.date)}
                        disabled={!hasSchedule}
                        className={`w-full px-4 py-3 text-left rounded-lg transition-colors ${
                          currentDay === eventDay.date
                            ? 'bg-blue-600 text-white'
                            : hasSchedule
                              ? 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <div className="font-medium">
                          {eventDay.displayName}
                        </div>
                        <div className={`text-sm ${
                          currentDay === eventDay.date
                            ? 'text-blue-100'
                            : hasSchedule
                              ? 'text-gray-500'
                              : 'text-gray-400'
                        }`}>
                          {eventDay.weekday}
                          {!hasSchedule && ' (sem programação)'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>

          {/* Schedule */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Programação - {formatEventDate(currentDay)}
              </h2>

              <AgendaSchedule
                slots={currentSlots}
                selections={selections}
                collapsedSlots={collapsedSlots}
                visibleTalksBySlot={visibleTalksBySlot}
                onSelectTalk={handleTalkSelect}
                onToggleCollapse={toggleSlotCollapse}
              />
            </div>
          </div>

          {/* Summary/Agenda */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Minha Agenda</h2>

              {/* Estatísticas */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Total de slots: {stats.totalSlots}</div>
                  <div>Palestras selecionadas: {stats.selectedTalks}</div>
                  <div>Slots livres: {stats.vacantSlots}</div>
                </div>
              </div>

              {/* Ações */}
              <div className="space-y-3">
                <button
                  onClick={clearSelections}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Limpar agenda
                </button>

                <button
                  onClick={handleSaveAgenda}
                  disabled={isAuthLoading}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isAuthLoading ? 'Salvando...' : 'Salvar agenda'}
                </button>

                <button
                  onClick={exportToCSV}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Baixar CSV
                </button>
              </div>

              {/* Lista resumida da agenda - simplificada por enquanto */}
              {stats.selectedTalks > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Seleções por dia:</h3>
                  {Object.entries(selectionsByDay).map(([day, daySelections]) => {
                    const nonVacantSelections = daySelections.filter(s => !s.isVacant);
                    if (nonVacantSelections.length === 0) return null;

                    return (
                      <div key={day} className="mb-3">
                        <div className="text-xs font-medium text-gray-700 mb-1">
                          {day === '2025-10-24' ? '24/10' : '25/10'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {nonVacantSelections.length} palestra(s) selecionada(s)
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Autenticação - Implementação simplificada */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {authMode === 'email' ? 'Entre com seu e-mail' : 'Digite o código'}
            </h3>

            {authMode === 'email' ? (
              <form onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const email = (form.elements.namedItem('email') as HTMLInputElement).value;
                handleEmailSubmit(email);
              }}>
                <input
                  name="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
                />
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={handleCloseAuthModal}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isAuthLoading}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                  >
                    {isAuthLoading ? 'Enviando...' : 'Continuar'}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const code = (form.elements.namedItem('code') as HTMLInputElement).value;
                handleCodeSubmit(code);
              }}>
                <p className="text-sm text-gray-600 mb-4">
                  Enviamos um código para <strong>{authState.userEmail}</strong>
                </p>
                <input
                  name="code"
                  type="text"
                  placeholder="Código"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
                />
                <div className="flex flex-col space-y-3">
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Reenviar e-mail
                  </button>
                  <button
                    type="submit"
                    disabled={isAuthLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                  >
                    {isAuthLoading ? 'Validando...' : 'Validar'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Agenda;
