import React, { useState } from "react";

const images = [
  "https://raw.githubusercontent.com/MVPConf/picture/refs/heads/master/foto000.jpeg",
  "https://raw.githubusercontent.com/MVPConf/picture/refs/heads/master/foto111.jpg",
  "https://raw.githubusercontent.com/MVPConf/picture/refs/heads/master/foto47.jpg",
  "https://raw.githubusercontent.com/MVPConf/picture/refs/heads/master/foto77.jpg",
];

const Carousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      <section id="Carousel" className="py-20 bg-gradient-to-br from-gray-900 via-ms-blue-900 to-gray-900 relative overflow-hidden">
        {/* Grid pattern background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Galeria de <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Momentos</span>
            </h2>
            <p className="text-xl text-gray-300">Reviva os melhores momentos do MVP Conf</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Imagem Principal */}
          <div className="relative group mb-8">
            <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-gray-800">
              <img
                src={images[current]}
                alt={`Foto ${current + 1}`}
                className="w-full h-[500px] object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                onClick={() => setIsFullscreen(true)}
              />
              
              {/* Overlay com informações */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">MVP Conf {new Date().getFullYear()}</span>
                  </div>
                  <span className="text-sm font-medium">{current + 1} / {images.length}</span>
                </div>
              </div>

              {/* Botões de navegação modernos */}
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 group/btn"
                aria-label="Anterior"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 group/btn"
                aria-label="Próxima"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Botão fullscreen */}
              <button
                onClick={() => setIsFullscreen(true)}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-lg p-2 shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Tela cheia"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Grid de Miniaturas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`relative cursor-pointer rounded-xl overflow-hidden group transition-all duration-300 ${
                  current === idx 
                    ? 'ring-4 ring-cyan-400 scale-105' 
                    : 'ring-2 ring-gray-700 hover:ring-cyan-500'
                }`}
              >
                <img
                  src={img}
                  alt={`Miniatura ${idx + 1}`}
                  className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className={`absolute inset-0 transition-opacity duration-300 ${
                  current === idx 
                    ? 'bg-cyan-500/20' 
                    : 'bg-black/40 group-hover:bg-black/20'
                }`}></div>
                
                {current === idx && (
                  <div className="absolute top-2 right-2">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-lg"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Fullscreen */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={() => setIsFullscreen(false)}>
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 text-white hover:text-cyan-400 transition-colors z-10"
            aria-label="Fechar"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <img
            src={images[current]}
            alt={`Foto ${current + 1}`}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-4 shadow-lg transition-all"
            aria-label="Anterior"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-4 shadow-lg transition-all"
            aria-label="Próxima"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-lg font-medium">
            {current + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};

export default Carousel;
