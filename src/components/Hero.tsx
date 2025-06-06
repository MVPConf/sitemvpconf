import React from 'react';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToTickets = () => {
    const element = document.querySelector('#tickets');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-hero-pattern overflow-hidden pt-20 md:pt-0">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-white/10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
              MVP Conf
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 text-blue-100">
              2025 Brasil
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-4 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            O maior encontro de especialistas Microsoft do Brasil. 
            Conecte-se com líderes renomados e descubra as últimas inovações.
          </p>
          <p className="text-base sm:text-lg text-blue-200 mb-12">
            Uma experiência única de aprendizado, networking e inspiração
          </p>
        </div>

        {/* Event Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 card-hover">
            <Calendar className="h-8 w-8 mx-auto mb-4 text-blue-200" />
            <h3 className="text-lg font-semibold mb-2">Data</h3>
            <p className="text-blue-100">24-25 Outubro 2025</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 card-hover">
            <MapPin className="h-8 w-8 mx-auto mb-4 text-blue-200" />
            <h3 className="text-lg font-semibold mb-2">Local</h3>
            <p className="text-blue-100">São Paulo, SP</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 card-hover">
            <Users className="h-8 w-8 mx-auto mb-4 text-blue-200" />
            <h3 className="text-lg font-semibold mb-2">Participantes</h3>
            <p className="text-blue-100">500+ Especialistas</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={scrollToTickets}
            className="btn-primary flex items-center space-x-2 text-lg w-full sm:w-auto"
          >
            <span>Garantir Ingresso</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          <button 
            onClick={() => document.querySelector('#speakers')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary text-lg w-full sm:w-auto"
          >
            Ver Palestrantes
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;