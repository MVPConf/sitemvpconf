import React from 'react';
import { Calendar, MapPin, Users, ArrowRight, Presentation, Rocket, Trophy, Award } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToTickets = () => {
    const element = document.querySelector('#tickets');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-hero-pattern overflow-hidden pt-24">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 card-hover">
            <Calendar className="h-8 w-8 mx-auto mb-4 text-blue-200" />
            <h3 className="text-lg font-semibold mb-2">Data</h3>
            <p className="text-blue-100">24-25 Outubro 2025</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 card-hover">
            <MapPin className="h-8 w-8 mx-auto mb-4 text-blue-200" />
            <h3 className="text-lg font-semibold mb-2">Local</h3>
            <p className="text-blue-100">UNIP Campus Paraíso/Vergueiro</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 card-hover">
            <Users className="h-8 w-8 mx-auto mb-4 text-blue-200" />
            <h3 className="text-lg font-semibold mb-2">Participantes</h3>
            <p className="text-blue-100">500+ Especialistas</p>
          </div>
        </div>

        {/* MVP Startups Challenge Box */}
        <div className="mb-12 max-w-4xl mx-auto">
          <a 
            href="/mvp-startups-challenge.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="relative bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20 backdrop-blur-md rounded-2xl p-8 border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl group-hover:bg-blue-400/40 transition-all duration-500"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl group-hover:bg-purple-400/40 transition-all duration-500"></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Rocket className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-200 via-blue-100 to-purple-200 bg-clip-text text-transparent">
                        MVP Startups Challenge
                      </h3>
                      <p className="text-sm text-blue-200/80">Competição de Inovação</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center space-x-2 bg-blue-500/20 px-4 py-2 rounded-full border border-blue-400/30">
                    <Trophy className="h-4 w-4 text-yellow-300" />
                    <span className="text-sm font-semibold text-blue-100">3 prêmios incríveis!</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Presentation className="h-5 w-5 text-cyan-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-white">Pitch de 8 minutos</p>
                      <p className="text-xs text-blue-200/70">Até 8 slides para apresentar sua ideia inovadora. Equipes de 1 a 3 pessoas</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Award className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-white">Prêmios Valiosos</p>
                      <p className="text-xs text-blue-200/70">Notebook, mentoria na Microsoft Brasil e Smartphone para os vencedores</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-white">Avaliação de Especialistas</p>
                      <p className="text-xs text-blue-200/70">Banca com MVPs e profissionais experientes do mercado tech</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-blue-400/20">
                  <p className="text-blue-100 text-sm mb-3 sm:mb-0">
                    Transforme sua ideia em realidade com tecnologia Microsoft
                  </p>
                  <div className="flex items-center space-x-2 text-blue-200 group-hover:text-white transition-colors">
                    <span className="font-semibold">Participe</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </a>
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