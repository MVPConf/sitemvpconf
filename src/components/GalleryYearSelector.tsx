import React from 'react';
import { GalleryYear } from '../types/gallery';

interface GalleryYearSelectorProps {
  years: GalleryYear[];
  onSelectYear: (year: number) => void;
  loading?: boolean;
}

const GalleryYearSelector: React.FC<GalleryYearSelectorProps> = ({
  years,
  onSelectYear,
  loading = false
}) => {
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-ms-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-white text-xl">Carregando galeria...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-ms-blue-900 to-gray-900 relative overflow-hidden z-0">
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Galeria de <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Fotos</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Reviva os melhores momentos dos eventos MVP Conf através dos anos
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-8 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {years.map((yearData) => (
            <div
              key={yearData.year}
              onClick={() => onSelectYear(yearData.year)}
              className="group cursor-pointer bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
            >
              {/* Imagem de Capa */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={yearData.coverImage}
                  alt={`MVP Conf ${yearData.year}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay com gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Badge do ano */}
                <div className="absolute top-4 right-4">
                  <div className="bg-cyan-400 text-gray-900 px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                    {yearData.year}
                  </div>
                </div>

                {/* Contador de fotos */}
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-2 text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-semibold">{yearData.totalPhotos} fotos</span>
                  </div>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {yearData.title}
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {yearData.description}
                </p>

                {/* Call to Action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                    <span>Ver galeria</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Seção informativa */}
        {years.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Em breve</h3>
            <p className="text-gray-400">Estamos organizando as fotos dos eventos passados</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default GalleryYearSelector;
