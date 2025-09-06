import React from 'react';
// import { Github, Linkedin, Twitter, Instagram, Youtube} from 'lucide-react';
import { useSpeakers } from '../hooks/useSpeakers';
import BuyTickets from './BuyTickets';

const Speakers: React.FC = () => {
const { speakers, loading } = useSpeakers();

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

        
        {loading ? (
          <p className="text-ms-blue-600 mt-8 text-lg font-medium">Carregando informações dos palestrantes...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {speakers.map((speaker) => (
              <div key={speaker.id} className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover group flex flex-col items-center py-8">
                <img 
                  src={speaker.image} 
                  alt={speaker.name}
                  className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-ms-blue-100 shadow"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = speaker.image;
                  }}
                />
                <h3 className="text-lg font-bold text-gray-900 text-center">{speaker.name}</h3>
              </div>
            ))}
          </div>
        )}  
      </div>

      <BuyTickets title="Garanta agora seu Ingresso" />

    </section>
  );
};

export default Speakers;