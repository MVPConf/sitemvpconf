import React from 'react';
//import { Github, Linkedin, Twitter, RefreshCw, AlertCircle } from 'lucide-react';
//import { useSpeakers } from '../hooks/useSpeakers';

const Speakers: React.FC = () => {
  //const { speakers, loading, error, refreshSpeakers } = useSpeakers();

  return (
    <section id="speakers" className="py-20 bg-gradient-to-br from-ms-light-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nossos <span className="gradient-text">Palestrantes</span>
          </h2>
          {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça os especialistas Microsoft MVP que compartilharão seus conhecimentos e experiências
          </p> */}

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Em breve anunciaremos nossos palestrantes! Fiquem ligados nas nossas redes sociais para mais informações.
          </p>          
        </div>

        {/* 
        {loading ? (
          <p className="text-ms-blue-600 mt-8 text-lg font-medium">Carregando informações dos palestrantes...</p>
        ) : (
          <p className="text-gray-500 mt-8 text-lg">Nenhum palestrante disponível no momento.</p>
        )}         
        */}

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div> */}

        {/* Indicador de cache
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Dados atualizados automaticamente a cada 10 minutos
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default Speakers;