import  { useEffect, useState } from "react";
import { Day, Track, Talk, useSchedule } from "../hooks/useSchedule";
import BuyTickets from "./BuyTickets";

const Schedule = () => {
  const [activeDay, setActiveDay] = useState(0);
  const [query, setQuery] = useState("");
  const [selectedTracks, setSelectedTracks] = useState<Set<string>>(new Set());
  const [showTrackFilter, setShowTrackFilter] = useState(false);
  const [openTalk, setOpenTalk] = useState<Talk | null>(null);
  const { data: days, loading } = useSchedule();

  // Agrupa uma lista de palestras por horário (campo time)
  function groupTalksByTime(talks: Talk[]) {
    const map = new Map<string, Talk[]>();
    (talks ?? []).forEach((t) => {
      const key = (t.time && t.time.trim()) ? t.time.trim() : 'A definir';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(t);
    });
    return map;
  }

  // Extrai horário de início HH:MM para ordenação; itens sem horário definido vão para o fim
  function timeSortKey(timeLabel: string): number {
    // tenta extrair primeiro HH:MM na string
    const m = timeLabel.match(/(\d{1,2}):(\d{2})/);
    if (!m) return Number.POSITIVE_INFINITY;
    const hh = parseInt(m[1], 10);
    const mm = parseInt(m[2], 10);
    // normaliza 0-24h
    const hours = isNaN(hh) ? 99 : hh % 24;
    const mins = isNaN(mm) ? 0 : mm % 60;
    return hours * 60 + mins;
  }

  const hasDescription = (t?: Talk | null) => !!(t?.description && t.description.trim().length > 0);

  // Fechamento do modal via ESC
  useEffect(() => {
    if (!openTalk) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenTalk(null);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [openTalk]);

  // Dados derivados do dia ativo
  const tracksForActiveDay: Track[] = days[activeDay]?.tracks ?? [];
  const trackNamesForActiveDay: string[] = tracksForActiveDay.map((t) => t.name);
  const tracksFilteredBySelection: Track[] = selectedTracks.size
    ? tracksForActiveDay.filter((t) => selectedTracks.has(t.name))
    : tracksForActiveDay;

  // Ações do filtro de trilhas
  const toggleTrack = (name: string) => {
    setSelectedTracks((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name); else next.add(name);
      return next;
    });
  };
  const selectAllTracks = () => {
    setSelectedTracks(new Set(trackNamesForActiveDay));
  };
  const clearTrackSelection = () => {
    setSelectedTracks(new Set());
  };

  // Normaliza strings para busca case/acentos-insensível
  const normalize = (v?: string) =>
    (v ?? "")
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  // Verifica se a talk corresponde ao termo de busca considerando todos os campos
  function matchesQuery(talk: Talk, track: Track, q: string): boolean {
    if (!q) return true;
    const nQ = normalize(q);
    const haystack = [
      talk.title,
      talk.description,
      talk.time,
      talk.room,
      ...(talk.speakers ?? []),
      track.name,
      ...(track.coordinators ?? []),
    ]
      .map((s) => normalize(String(s ?? '')))
      .join(' \n ');
    return haystack.includes(nQ);
  }

  return (
    <section className="py-16 bg-gray-50" id="schedule">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">
          Agenda de <span className="gradient-text">Palestras</span>
        </h2>

        {loading || !days.length ? (
          <div className="text-center text-blue-700 py-16 text-lg">Loading schedule...</div>
        ) : (
          <>
            {/* Search input */
            /* Inclui botão para abrir filtro de trilhas */}
            <div className="max-w-3xl mx-auto mb-6">
              <label htmlFor="schedule-search" className="sr-only">Buscar palestras</label>
              <div className="flex items-stretch gap-2">
                <input
                  id="schedule-search"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar por título, sala, palestrante, trilha..."
                  className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    aria-label="Limpar busca"
                  >
                    Limpar
                  </button>
                ) : null}

                {/* Filtro de Trilhas (popover simples) */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowTrackFilter((s) => !s)}
                    className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    aria-haspopup="true"
                    aria-expanded={showTrackFilter}
                  >
                    Filtrar trilhas
                  </button>
                  {showTrackFilter && (
                    <div className="absolute right-0 z-20 mt-2 w-72 rounded-md border border-gray-200 bg-white shadow-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-800">Trilhas</span>
                        <button
                          type="button"
                          className="text-xs text-gray-500 hover:text-gray-700"
                          onClick={() => setShowTrackFilter(false)}
                          aria-label="Fechar filtro"
                        >
                          Fechar
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <button
                          type="button"
                          className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-50"
                          onClick={selectAllTracks}
                        >
                          Selecionar tudo
                        </button>
                        <button
                          type="button"
                          className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-50"
                          onClick={clearTrackSelection}
                        >
                          Limpar
                        </button>
                      </div>
                      <div className="max-h-60 overflow-auto pr-1">
                        {trackNamesForActiveDay.length === 0 ? (
                          <div className="text-sm text-gray-500">Sem trilhas neste dia.</div>
                        ) : (
                          trackNamesForActiveDay.map((name) => (
                            <label key={name} className="flex items-center gap-2 py-1 text-sm text-gray-800">
                              <input
                                type="checkbox"
                                className="h-4 w-4"
                                checked={selectedTracks.has(name)}
                                onChange={() => toggleTrack(name)}
                              />
                              <span>{name}</span>
                            </label>
                          ))
                        )}
                      </div>
                      <div className="mt-2 text-xs text-gray-600">
                        {selectedTracks.size > 0
                          ? `${selectedTracks.size} trilha(s) selecionada(s)`
                          : 'Mostrando todas as trilhas'}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-600">
                {selectedTracks.size > 0 ? (
                  <span>{selectedTracks.size} trilha(s) selecionada(s)</span>
                ) : (
                  <span>Todas as trilhas</span>
                )}
              </div>
            </div>

            {/* Day tabs */}
            <div className="flex justify-center mb-8 gap-4">
              {days.map((day: Day, idx: number) => (
                <button
                  key={idx}
                  onClick={() => { setActiveDay(idx); setSelectedTracks(new Set()); setShowTrackFilter(false); }}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 border-2 focus:outline-none ${
                    activeDay === idx
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                      : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {day.name} <span className="ml-2 text-xs">{day.date}</span>
                </button>
              ))}
            </div>

            {/* Tracks for selected day */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {tracksFilteredBySelection.map((track: Track, idx: number) => {
                const originalTalks = track.talks || [];
                const filteredTalks = query.trim()
                  ? originalTalks.filter((t) => matchesQuery(t, track, query))
                  : originalTalks;
                // Se estiver buscando e não houver resultados nesta trilha, não renderiza a trilha
                if (query.trim() && filteredTalks.length === 0) {
                  return null;
                }
                const timeGroups = groupTalksByTime(filteredTalks);
                const orderedSlots = Array.from(timeGroups.keys()).sort(
                  (a, b) => timeSortKey(a) - timeSortKey(b)
                );

                return (
                  <div key={idx} className="bg-white rounded-lg shadow p-6 flex flex-col self-start">
                    <h3 className="text-xl font-semibold mb-2 text-blue-700">{track.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      <span className="font-medium">Coordenadores:</span> {track.coordinators.join(", ")}
                    </p>

                    {filteredTalks && filteredTalks.length > 0 ? (
                      <div className="flex-1 space-y-6">
                        {orderedSlots.map((slotKey) => {
                          const talksAtTime = timeGroups.get(slotKey) ?? [];
                          return (
                            <div key={slotKey} className="rounded-lg border border-blue-100 overflow-hidden bg-blue-50">
                              {/* Cabeçalho com o horário */}
                              <div className="bg-blue-100/70 px-4 py-2 flex items-center justify-between">
                                <div className="text-sm font-semibold text-blue-800">
                                  {slotKey}
                                </div>
                                <div className="text-[11px] uppercase tracking-wide text-blue-700/70">
                                  {talksAtTime.length} {talksAtTime.length > 1 ? 'palestras em paralelo' : 'palestra'}
                                </div>
                              </div>

                              {/* Lista vertical de palestras simultâneas (por sala) */}
                              <div className="flex flex-col gap-3 p-4">
                                {talksAtTime.map((talk, i) => {
                                  const roomDisplay = (talk.room && talk.room.trim()) ? talk.room : 'Sala a definir';
                                  const tooltip = talk.description && talk.description.trim() ? talk.description : undefined;
                                  return (
                                    <div
                                      key={`${slotKey}-${i}`}
                                      className={`rounded-md bg-white border border-blue-200 p-3 shadow-sm ${hasDescription(talk) ? 'cursor-pointer hover:border-blue-300 hover:shadow' : ''}`}
                                      onClick={() => { if (hasDescription(talk)) setOpenTalk(talk); }}
                                      title={tooltip}
                                      aria-label={tooltip ? `${talk.title} — ${tooltip}` : talk.title}
                                    >
                                      <div className="text-xs text-blue-700/80 font-medium mb-1">
                                        {roomDisplay}
                                      </div>
                                      <div className="font-semibold text-gray-900">
                                        {talk.title}
                                      </div>
                                      {talk.speakers?.length ? (
                                        <div className="text-sm text-gray-600 mt-1">
                                          {talk.speakers.join(", ")}
                                        </div>
                                      ) : null}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-center">
                        <div className="w-full bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded text-center text-sm">
                          <span>Em breve anunciaremos as palestras dessa trilha! Fiquem ligados nas nossas redes sociais para mais informações.</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

        <BuyTickets title="Adquira seu Ingresso" />

        {/* Modal de descrição da palestra */}
        {openTalk && hasDescription(openTalk) && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="talk-modal-title"
            aria-describedby="talk-modal-description"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setOpenTalk(null)}
            />
            {/* Content */}
            <div className="relative z-10 mx-4 w-full max-w-2xl rounded-lg bg-white shadow-xl border border-gray-200">
              <div className="flex items-start justify-between p-4 border-b border-gray-200">
                <div>
                  <h3 id="talk-modal-title" className="text-lg font-semibold text-gray-900">
                    {openTalk.title}
                  </h3>
                  <div className="mt-1 text-xs text-gray-600 flex flex-wrap gap-3">
                    {openTalk.time ? <span><span className="uppercase tracking-wide text-gray-400">Hora:</span> {openTalk.time}</span> : null}
                    {openTalk.room ? <span><span className="uppercase tracking-wide text-gray-400">Sala:</span> {openTalk.room}</span> : null}
                    {openTalk.speakers?.length ? <span><span className="uppercase tracking-wide text-gray-400">Speakers:</span> {openTalk.speakers.join(', ')}</span> : null}
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-4 inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  onClick={() => setOpenTalk(null)}
                  autoFocus
                >
                  Fechar
                </button>
              </div>
              <div id="talk-modal-description" className="p-4 text-gray-800 whitespace-pre-line">
                {openTalk.description}
              </div>
            </div>
          </div>
        )}

    </section>
  );
};

export default Schedule;