import React from 'react';
import { Github, Linkedin, Twitter, RefreshCw, AlertCircle } from 'lucide-react';
import { useSpeakers } from '../hooks/useSpeakers';

const Speakers: React.FC = () => {
  const { speakers, loading, error, refreshSpeakers } = useSpeakers();

  if (loading) {
    return (
      <section id="speakers" className="py-20 bg-gradient-to-br from-ms-light-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nossos <span className="gradient-text">Palestrantes</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça os especialistas Microsoft MVP que compartilharão seus conhecimentos e experiências
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-ms-blue-600 mb-4"></div>
            <p className="text-gray-600 text-lg">Carregando palestrantes...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="speakers" className="py-20 bg-gradient-to-br from-ms-light-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nossos <span className="gradient-text">Palestrantes</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça os especialistas Microsoft MVP que compartilharão seus conhecimentos e experiências
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">Erro ao Carregar</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={refreshSpeakers}
                className="flex items-center space-x-2 mx-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Tentar Novamente</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (speakers.length === 0) {
    return (
      <section id="speakers" className="py-20 bg-gradient-to-br from-ms-light-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nossos <span className="gradient-text">Palestrantes</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça os especialistas Microsoft MVP que compartilharão seus conhecimentos e experiências
            </p>
          </div>

          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">Em breve anunciaremos nossos palestrantes!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="speakers" className="py-20 bg-gradient-to-br from-ms-light-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nossos <span className="gradient-text">Palestrantes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça os especialistas Microsoft MVP que compartilharão seus conhecimentos e experiências
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {speakers.map((speaker) => (
            <div key={speaker.id} className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover group">
              <div className="relative">
                <img 
                  src={speaker.image} 
                  alt={speaker.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://images.pexels.com/photos/3791664/pexels-photo-3791664.jpeg?auto=compress&cs=tinysrgb&w=400`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{speaker.name}</h3>
                <p className="text-ms-blue-600 font-semibold mb-1">{speaker.title}</p>
                <p className="text-gray-600 text-sm mb-4">{speaker.company}</p>
                
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">{speaker.bio}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {speaker.expertise?.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-ms-blue-100 text-ms-blue-700 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  {speaker.social?.linkedin && (
                    <a 
                      href={speaker.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-ms-blue-600 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {speaker.social?.twitter && (
                    <a 
                      href={speaker.social.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-ms-blue-600 transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {speaker.social?.github && (
                    <a 
                      href={speaker.social.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-ms-blue-600 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicador de cache */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Dados atualizados automaticamente a cada 10 minutos
          </p>
        </div>
      </div>
    </section>
  );
};

export default Speakers;