import React, { useState, useMemo } from 'react';
import { usePeople } from '../hooks/usePeople';
import BuyTickets from './BuyTickets';

const Speakers: React.FC = () => {
  const { speakers, coordinators, loading } = usePeople();
  
  // Estados para palestrantes
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);
  const INITIAL_DISPLAY_COUNT = 12;
  
  // Estados para coordenadores
  const [coordinatorSearchTerm, setCoordinatorSearchTerm] = useState('');
  const [showAllCoordinators, setShowAllCoordinators] = useState(false);
  const INITIAL_COORDINATORS_COUNT = 12;

  // Filtrar coordenadores pela busca
  const filteredCoordinators = useMemo(() => {
    if (!coordinatorSearchTerm.trim()) return coordinators;
    
    const term = coordinatorSearchTerm.toLowerCase();
    return coordinators.filter(coordinator => 
      coordinator.name.toLowerCase().includes(term) ||
      coordinator.title?.toLowerCase().includes(term) ||
      coordinator.company?.toLowerCase().includes(term) ||
      coordinator.trackName?.toLowerCase().includes(term)
    );
  }, [coordinators, coordinatorSearchTerm]);

  // Coordenadores a serem exibidos (limitados ou todos)
  const displayedCoordinators = useMemo(() => {
    if (showAllCoordinators || coordinatorSearchTerm.trim()) return filteredCoordinators;
    return filteredCoordinators.slice(0, INITIAL_COORDINATORS_COUNT);
  }, [filteredCoordinators, showAllCoordinators, coordinatorSearchTerm]);

  // Filtrar palestrantes pela busca
  const filteredSpeakers = useMemo(() => {
    if (!searchTerm.trim()) return speakers;
    
    const term = searchTerm.toLowerCase();
    return speakers.filter(speaker => 
      speaker.name.toLowerCase().includes(term) ||
      speaker.title?.toLowerCase().includes(term) ||
      speaker.company?.toLowerCase().includes(term)
    );
  }, [speakers, searchTerm]);

  // Palestrantes a serem exibidos (limitados ou todos)
  const displayedSpeakers = useMemo(() => {
    if (showAll || searchTerm.trim()) return filteredSpeakers;
    return filteredSpeakers.slice(0, INITIAL_DISPLAY_COUNT);
  }, [filteredSpeakers, showAll, searchTerm]);

  return (
    <section id="speakers" className="py-20 bg-gradient-to-br from-ms-light-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nossos <span className="gradient-text">Coordenadores de Trilhas</span> e <span className="gradient-text">Palestrantes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça os especialistas Microsoft MVP que compartilharão seus conhecimentos e experiências
          </p>        
        </div>

        
        {loading ? (
          <p className="text-ms-blue-600 mt-8 text-lg font-medium">Carregando informações dos palestrantes...</p>
        ) : (
          <>
            {/* Coordenadores */}
            {coordinators.length > 0 && (
              <div className="mb-16">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                  <h3 className="text-3xl font-bold text-gray-900 text-center md:text-left">
                    <span className="gradient-text">Coordenadores de Trilha</span>
                    {coordinators.length > 0 && (
                      <span className="text-lg text-gray-600 ml-3">({coordinators.length})</span>
                    )}
                  </h3>
                  
                  {/* Barra de Busca para Coordenadores */}
                  <div className="relative w-full md:w-96">
                    <input
                      type="text"
                      placeholder="Buscar coordenador..."
                      value={coordinatorSearchTerm}
                      onChange={(e) => setCoordinatorSearchTerm(e.target.value)}
                      className="w-full px-4 py-3 pr-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-ms-blue-500 transition-colors"
                    />
                    <svg
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Resultado da busca de coordenadores */}
                {coordinatorSearchTerm && (
                  <p className="text-center text-gray-600 mb-6">
                    {filteredCoordinators.length === 0 
                      ? 'Nenhum coordenador encontrado' 
                      : `${filteredCoordinators.length} coordenador${filteredCoordinators.length !== 1 ? 'es' : ''} encontrado${filteredCoordinators.length !== 1 ? 's' : ''}`
                    }
                  </p>
                )}

                {/* Grid de Coordenadores */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {displayedCoordinators.map((coordinator) => (
                    <div key={coordinator.id} className="bg-gradient-to-br from-ms-blue-50 to-white rounded-2xl shadow-lg overflow-hidden card-hover group flex flex-col items-center py-6 px-4 border-2 border-ms-blue-200">
                      <img 
                        src={coordinator.image} 
                        alt={coordinator.name}
                        className="w-20 h-20 object-cover rounded-full mb-3 border-4 border-ms-blue-300 shadow-md"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = coordinator.image;
                        }}
                      />
                      <h3 className="text-sm font-bold text-gray-900 text-center">{coordinator.name}</h3>
                      <p className="text-ms-blue-700 text-xs font-semibold text-center mt-1 mb-1">
                        Coordenador(a) da Trilha
                      </p>
                      <p className="text-ms-blue-900 text-sm font-bold text-center mb-1 px-2 py-1 bg-ms-blue-100 rounded-full line-clamp-2">
                        {coordinator.trackName}
                      </p>
                      {coordinator.title && (
                        <p className="text-gray-600 text-xs text-center mt-2 line-clamp-2">{coordinator.title}</p>
                      )}
                      {coordinator.social?.linkedin && (
                        <a
                          href={coordinator.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-xs text-ms-blue-600 hover:underline hover:text-ms-blue-800 transition-colors"
                        >
                          LinkedIn
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                {/* Botão Ver Mais / Ver Menos para Coordenadores */}
                {!coordinatorSearchTerm && filteredCoordinators.length > INITIAL_COORDINATORS_COUNT && (
                  <div className="text-center mt-10">
                    <button
                      onClick={() => setShowAllCoordinators(!showAllCoordinators)}
                      className="px-8 py-4 bg-gradient-to-r from-ms-blue-600 to-ms-blue-700 text-white font-semibold rounded-lg shadow-lg hover:from-ms-blue-700 hover:to-ms-blue-800 transition-all duration-300 transform hover:scale-105"
                    >
                      {showAllCoordinators 
                        ? 'Ver Menos' 
                        : `Ver Todos os ${coordinators.length} Coordenadores`
                      }
                    </button>
                  </div>
                )}
              </div>
            )}
            {/* Coordenadores */}

            {/* Palestrantes */}
            <div>
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h3 className="text-3xl font-bold text-gray-900 text-center md:text-left">
                  <span className="gradient-text">Palestrantes</span>
                  {speakers.length > 0 && (
                    <span className="text-lg text-gray-600 ml-3">({speakers.length})</span>
                  )}
                </h3>
                
                {/* Barra de Busca */}
                <div className="relative w-full md:w-96">
                  <input
                    type="text"
                    placeholder="Buscar palestrante..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pr-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-ms-blue-500 transition-colors"
                  />
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Resultado da busca */}
              {searchTerm && (
                <p className="text-center text-gray-600 mb-6">
                  {filteredSpeakers.length === 0 
                    ? 'Nenhum palestrante encontrado' 
                    : `${filteredSpeakers.length} palestrante${filteredSpeakers.length !== 1 ? 's' : ''} encontrado${filteredSpeakers.length !== 1 ? 's' : ''}`
                  }
                </p>
              )}

              {/* Grid de Palestrantes */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedSpeakers.map((speaker) => (
                  <div key={speaker.id} className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover group flex flex-col items-center py-6 px-4">
                    <img 
                      src={speaker.image} 
                      alt={speaker.name}
                      className="w-20 h-20 object-cover rounded-full mb-3 border-4 border-ms-blue-100 shadow"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = speaker.image;
                      }}
                    />
                    <h3 className="text-sm font-bold text-gray-900 text-center">{speaker.name}</h3>
                    {speaker.title && (
                      <p className="text-ms-blue-900 text-xs font-medium text-center mb-1 line-clamp-2">{speaker.title}</p>
                    )}
                    {speaker.social?.linkedin && (
                      <a
                        href={speaker.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-xs text-ms-blue-600 hover:underline hover:text-ms-blue-800 transition-colors"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* Botão Ver Mais / Ver Menos */}
              {!searchTerm && filteredSpeakers.length > INITIAL_DISPLAY_COUNT && (
                <div className="text-center mt-10">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="px-8 py-4 bg-gradient-to-r from-ms-blue-600 to-ms-blue-700 text-white font-semibold rounded-lg shadow-lg hover:from-ms-blue-700 hover:to-ms-blue-800 transition-all duration-300 transform hover:scale-105"
                  >
                    {showAll 
                      ? 'Ver Menos' 
                      : `Ver Todos os ${speakers.length} Palestrantes`
                    }
                  </button>
                </div>
              )}
            </div>
          </>
        )}  
      </div>

      <BuyTickets title="Garanta agora seu Ingresso" />

    </section>
  );
};

export default Speakers;