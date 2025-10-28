import  { useEffect, useMemo, useState } from "react";
import { Day, Track, Talk, useSchedule } from "../hooks/useSchedule";
import BuyTickets from "./BuyTickets";

// Paleta e helpers movidos para fora do componente para estabilizar referências e evitar warnings do React Compiler
const OFFICE_PALETTE = [
  '#2B579A', '#217346', '#ED6C47', '#0078D4', '#7719AA', '#6264A7', '#008272', '#0364B8', '#A4373A', '#00B294', '#3955A3', '#107C10', '#F2C811', '#742774', '#CD1F3F', '#00B7C3', '#2564CF', '#4F6BED', '#498205', '#B4009E',
] as const;

function hexToRgba(hex: string, alpha = 0.08): string {
  const m = hex.replace('#','');
  const r = parseInt(m.substring(0,2), 16);
  const g = parseInt(m.substring(2,4), 16);
  const b = parseInt(m.substring(4,6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getSpecialColorForTrack(name: string): string | null {
  const n = name.toLowerCase();
  if (n.includes('azure')) return '#0078D4';
  if (n.includes('developer') || n.includes('desenvolvedor')) return '#ED6C47';
  if (n.includes('business') || n.includes('dynamics') || n.includes('power platform') || n.includes('aplica')) return '#B4009E';
  return null;
}

function buildTrackColorMap(tracks: Track[]): Map<string, string> {
  const map = new Map<string, string>();
  const used = new Set<string>();
  tracks.forEach((t) => {
    const special = getSpecialColorForTrack(t.name);
    if (special && !used.has(special)) {
      map.set(t.name, special);
      used.add(special);
    }
  });
  tracks.forEach((t, idx) => {
    if (map.has(t.name)) return;
    const next = OFFICE_PALETTE.find((c) => !used.has(c));
    if (next) {
      map.set(t.name, next);
      used.add(next);
    } else {
      const hue = (idx * 37) % 360;
      map.set(t.name, `hsl(${hue} 70% 45%)`);
    }
  });
  return map;
}

const Schedule = () => {
  const [activeDay, setActiveDay] = useState(0);
  const [query, setQuery] = useState("");
  const [selectedTracks, setSelectedTracks] = useState<Set<string>>(new Set());
  const [showTrackFilter, setShowTrackFilter] = useState(false);
  const [openTalk, setOpenTalk] = useState<Talk | null>(null);
  const { data: days, loading } = useSchedule();

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


  // (removido: trackAccent em favor do mapa de cores por trilha)

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

  // Cores preferenciais por nomes de trilha (case-insensitive)
  const trackColorMap = useMemo(() => buildTrackColorMap(tracksFilteredBySelection), [tracksFilteredBySelection]);

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

        {/* Certificate callout: more attractive message with icon and emphasis */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center gap-4 rounded-lg border border-green-100 bg-gradient-to-r from-green-50 to-white p-4 shadow-sm">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-white border border-green-200 text-green-600">
              {/* Certificate / ribbon SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2a3 3 0 0 0-3 3v.26A5 5 0 0 0 5 10.9V15a3 3 0 0 0 2 2.83V22l3-1 3 1v-4.17A3 3 0 0 0 19 15v-4.1a5 5 0 0 0-4-5.64V5a3 3 0 0 0-3-3zM7 10.9A3 3 0 0 1 12 8a3 3 0 0 1 5 2.9V15a1 1 0 0 1-.63.93L12 18.08l-4.37-2.15A1 1 0 0 1 7 15V10.9z" />
              </svg>
            </div>

            <div className="flex-1 text-sm text-gray-800">
              <div className="font-semibold text-gray-900">Certificado de participação</div>
              <div className="mt-1 text-sm text-gray-700">Todos os participantes receberão um certificado digital ao final do evento — uma ótima forma de comprovar sua presença e agregar ao seu portfólio.</div>
            </div>

            <div className="hidden sm:block">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Gratuito</span>
            </div>
          </div>
        </div>

        {loading || !days.length ? (
          <div className="text-center text-blue-700 py-16 text-lg">Loading schedule...</div>
        ) : (
          <>
            {/* Search input */
            /* Inclui botão para abrir filtro de trilhas */}
            <div className="max-w-3xl mx-auto mb-6">
              <label htmlFor="schedule-search" className="sr-only">Buscar palestras</label>
              <div className="flex items-stretch gap-2">
                <div className="relative flex-1">
                  <input
                    id="schedule-search"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar por título, sala, palestrante, trilha..."
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                  {query ? (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="absolute inset-y-0 right-0 px-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                      aria-label="Limpar busca"
                    >
                      ×
                    </button>
                  ) : null}
                </div>

                {/* Filtro de Trilhas (popover simples) */}
                <div className="relative flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowTrackFilter((s) => !s)}
                    className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    aria-haspopup="true"
                    {...(showTrackFilter && { 'aria-expanded': true })}
                  >
                    Filtrar trilhas
                  </button>
                  {showTrackFilter && (
                    <div className="absolute right-0 z-20 mt-2 sm:w-96 w-[calc(100vw-2rem)] max-w-sm rounded-md border border-gray-200 bg-white shadow-lg p-3">
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
                      <div className="max-h-[65vh] overflow-auto pr-1">
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

            {/* Tracks for selected day - Masonry columns (3 colunas) */}
            <div className="columns-1 md:columns-2 lg:columns-3" style={{ columnGap: '2rem' }}>
              {tracksFilteredBySelection.map((track: Track, idx: number) => {
                const originalTalks = track.talks || [];
                const filteredTalks = query.trim()
                  ? originalTalks.filter((t) => matchesQuery(t, track, query))
                  : originalTalks;
                // Se estiver buscando e não houver resultados nesta trilha, não renderiza a trilha
                if (query.trim() && filteredTalks.length === 0) {
                  return null;
                }
                const accent = trackColorMap.get(track.name) ?? OFFICE_PALETTE[0];
                const tint = hexToRgba(accent, 0.08);
                const softTint = hexToRgba(accent, 0.04);
                const softBorder = hexToRgba(accent, 0.15);
                // Ordena as palestras por horário (quando existir)
                const orderedTalks = [...filteredTalks].sort(
                  (a, b) => timeSortKey(a.time ?? '') - timeSortKey(b.time ?? '')
                );

                return (
                  <div
                    key={idx}
                    className="rounded-lg shadow p-0 flex flex-col break-inside-avoid mb-8 w-full border"
                    style={{ borderTop: `4px solid ${accent}`, background: softTint, borderColor: softBorder }}
                  >
                    <div className="px-6 pt-4 pb-3" style={{ background: tint }}>
                      <div className="flex items-center gap-2">
                        <span
                          aria-hidden
                          className="inline-block rounded-full"
                          style={{ width: 10, height: 10, background: accent }}
                        />
                        <h3 className="text-xl font-semibold text-gray-900">{track.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Coordenadores:</span> {track.coordinators.join(", ")}
                      </p>
                    </div>
                    <div className="px-6 pb-6 pt-3">

                    {filteredTalks && filteredTalks.length > 0 ? (
                      <div className="flex-1 space-y-4">
                        {orderedTalks.map((talk, i) => {
                          const roomDisplay = (talk.room && talk.room.trim()) ? talk.room : 'Sala a definir';
                          const tooltip = talk.description && talk.description.trim() ? talk.description : undefined;
                          return (
                            <div
                              key={`talk-${i}`}
                              className={`rounded-md bg-white border p-3 shadow-sm ${hasDescription(talk) ? 'cursor-pointer hover:shadow' : ''}`}
                              style={{ borderColor: softBorder }}
                              onClick={() => { if (hasDescription(talk)) setOpenTalk(talk); }}
                              title={tooltip}
                              aria-label={tooltip ? `${talk.title} — ${tooltip}` : talk.title}
                            >
                              <div className="text-xs text-gray-600 flex flex-wrap gap-3 mb-1">
                                {roomDisplay ? (
                                  <span><span className="uppercase tracking-wide text-gray-400">Sala:</span> {roomDisplay}</span>
                                ) : null}
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
                    ) : (
                      <div className="flex-1 flex items-center justify-center">
                        <div className="w-full bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded text-center text-sm">
                          <span>Em breve anunciaremos as palestras dessa trilha! Fiquem ligados nas nossas redes sociais para mais informações.</span>
                        </div>
                      </div>
                    )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

        {/* <BuyTickets title="Adquira seu Ingresso" /> */}

        {/* Modal de descrição da palestra */}
        {openTalk && hasDescription(openTalk) && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
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
            <div className="relative z-10 w-full sm:max-w-2xl rounded-t-lg sm:rounded-lg bg-white shadow-xl border border-gray-200 overflow-hidden flex flex-col max-h-[85vh]">
              <div className="sticky top-0 bg-white flex items-start justify-between p-4 border-b border-gray-200 z-10">
                <div>
                  <h3 id="talk-modal-title" className="text-lg font-semibold text-gray-900">
                    {openTalk.title}
                  </h3>
                  <div className="mt-1 text-xs text-gray-600 flex flex-wrap gap-3">
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
              <div id="talk-modal-description" className="p-4 text-gray-800 whitespace-pre-line overflow-y-auto overscroll-contain">
                {openTalk.description}
              </div>
            </div>
          </div>
        )}

    </section>
  );
};

export default Schedule;
