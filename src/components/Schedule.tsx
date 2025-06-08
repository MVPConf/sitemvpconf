import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin, ChevronRight, RefreshCw, AlertCircle } from 'lucide-react';
import { useSchedule } from '../hooks/useSchedule';

const Schedule: React.FC = () => {
  const [activeDay, setActiveDay] = useState(0);
  const { schedule, loading, error, refreshSchedule } = useSchedule();

  const getSessionTypeColor = (type: string) => {
    switch (type) {
      case 'keynote':
        return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white';
      case 'session':
        return 'bg-gradient-to-r from-ms-blue-500 to-ms-blue-600 text-white';
      case 'workshop':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
      case 'break':
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
      case 'networking':
        return 'bg-gradient-to-r from-orange-500 to-orange-600 text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSessionTypeLabel = (type: string) => {
    switch (type) {
      case 'keynote':
        return 'Keynote';
      case 'session':
        return 'Palestra';
      case 'workshop':
        return 'Workshop';
      case 'break':
        return 'Intervalo';
      case 'networking':
        return 'Networking';
      default:
        return 'Sessão';
    }
  };

  return (
    <section id="schedule" className="py-20 bg-gradient-to-br from-ms-light-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Agenda de <span className="gradient-text">Palestras</span>
          </h2>
          {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dois dias repletos de conteúdo técnico, workshops práticos e networking com os melhores especialistas Microsoft
          </p> */}

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Em breve anunciaremos a grade completa! Fiquem ligados nas nossas redes sociais para mais informações.
          </p> 
        </div>

        {/* Tabs */}
        {/* <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            {schedule.map((day, index) => (
              <button
                key={index}
                onClick={() => setActiveDay(index)}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeDay === index
                    ? 'bg-ms-blue-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-ms-blue-600 hover:bg-ms-blue-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <div className="text-left">
                    <div className="text-sm font-medium">{day.dayName}</div>
                    <div className="text-xs opacity-75">{day.date}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div> */}

        {/* Schedule Content */}
        {/* <div className="space-y-6">
          {schedule[activeDay]?.sessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                  <div className="flex-shrink-0 mb-6 lg:mb-0">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="h-5 w-5" />
                        <span className="font-semibold text-lg">{session.time}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSessionTypeColor(session.type)}`}>
                        {getSessionTypeLabel(session.type)}
                      </span>
                    </div>
                    
                    {session.room && (
                      <div className="flex items-center space-x-2 text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{session.room}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {session.title}
                    </h3>

                    {session.speaker && session.speaker !== 'Networking' && session.speaker !== 'Equipe MVP Conf' && (
                      <div className="flex items-start space-x-4 mb-6">
                        <img
                          src={session.speakerImage}
                          alt={session.speaker}
                          className="w-16 h-16 rounded-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150';
                          }}
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-ms-blue-600" />
                            <span className="font-semibold text-gray-900">{session.speaker}</span>
                          </div>
                          {session.speakerTitle && (
                            <p className="text-ms-blue-600 font-medium">{session.speakerTitle}</p>
                          )}
                          {session.speakerCompany && (
                            <p className="text-gray-600 text-sm">{session.speakerCompany}</p>
                          )}
                        </div>
                      </div>
                    )}

                    <p className="text-gray-700 leading-relaxed mb-6">
                      {session.summary}
                    </p>

                    {session.tags && session.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {session.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-ms-blue-100 text-ms-blue-700 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {session.type !== 'break' && session.type !== 'networking' && (
                    <div className="flex-shrink-0 hidden lg:block">
                      <ChevronRight className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div> */}

        {/* Call to Action */}
        {/* <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-ms-blue-50 to-ms-blue-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Não perca nenhuma palestra!
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Garante seu ingresso agora e tenha acesso a todo este conteúdo exclusivo, 
              além de networking com os melhores profissionais do mercado.
            </p>
            <button 
              onClick={() => document.querySelector('#tickets')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              Garantir Meu Ingresso
            </button>
          </div>
        </div> */}

        {/* Indicador de cache */}
        {/* <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Dados atualizados automaticamente a cada 10 minutos
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default Schedule;