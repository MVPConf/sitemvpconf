import React, { useState } from 'react';
import { GalleryYear } from '../types/gallery';

interface GalleryPhotoGridProps {
  yearData: GalleryYear;
  onBack: () => void;
}

const GalleryPhotoGrid: React.FC<GalleryPhotoGridProps> = ({ yearData, onBack }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set());

  const openLightbox = (index: number) => {
    setSelectedPhoto(index);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const nextPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto + 1) % yearData.photos.length);
    }
  };

  const prevPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto - 1 + yearData.photos.length) % yearData.photos.length);
    }
  };

  const handleImageError = (photoId: string) => {
    setImageLoadErrors(prev => {
      const newSet = new Set(prev);
      newSet.add(photoId);
      return newSet;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedPhoto !== null) {
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'Escape') closeLightbox();
    }
  };

  return (
    <section
      className="min-h-screen bg-gradient-to-br from-gray-900 via-ms-blue-900 to-gray-900 relative overflow-hidden z-0"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        {/* Header com botão de voltar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-3 text-white hover:text-cyan-400 transition-colors group"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-full p-3 group-hover:bg-cyan-400/20 transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="text-lg font-semibold">Voltar à galeria</span>
          </button>

          <div className="text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
              {yearData.title}
            </h1>
            <p className="text-gray-300">{yearData.totalPhotos} fotos</p>
          </div>

          <div className="w-32 lg:w-40"></div> {/* Spacer para centralizar o título */}
        </div>

        {/* Grid de fotos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 mb-8">
          {yearData.photos.map((photo, index) => (
            <div
              key={photo.filename}
              onClick={() => openLightbox(index)}
              className="group cursor-pointer bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 aspect-square"
            >
              {!imageLoadErrors.has(photo.filename) ? (
                <img
                  src={photo.filename}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={() => handleImageError(photo.filename)}
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs">Imagem indisponível</p>
                  </div>
                </div>
              )}

              {/* Overlay com informações */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                {photo.description && (
                  <p className="text-white text-sm font-medium truncate">
                    {photo.description}
                  </p>
                )}
              </div>

              {/* Ícone de zoom */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/50 backdrop-blur-md rounded-full p-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem quando não há fotos */}
        {yearData.photos.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Nenhuma foto encontrada</h3>
            <p className="text-gray-400">As fotos deste evento ainda estão sendo organizadas</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-[10002] flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Botão fechar */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 bg-black/50 backdrop-blur-md hover:bg-black/70 text-white hover:text-cyan-400 rounded-full p-3 transition-all hover:scale-110 z-30"
            aria-label="Fechar lightbox"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navegação */}
          {yearData.photos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-md hover:bg-black/70 text-white rounded-full p-3 md:p-4 shadow-lg transition-all hover:scale-110 z-20"
                aria-label="Foto anterior"
              >
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-md hover:bg-black/70 text-white rounded-full p-3 md:p-4 shadow-lg transition-all hover:scale-110 z-20"
                aria-label="Próxima foto"
              >
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Imagem principal */}
          <div className="max-w-[90vw] max-h-[85vh] mx-auto flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={yearData.photos[selectedPhoto].filename}
              alt={yearData.photos[selectedPhoto].alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Informações da foto */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white max-w-[90vw]">
            {yearData.photos[selectedPhoto].description && (
              <div className="bg-black/60 backdrop-blur-md rounded-lg px-4 py-2 mb-2 max-w-md mx-auto">
                <p className="text-sm font-medium">
                  {yearData.photos[selectedPhoto].description}
                </p>
                {yearData.photos[selectedPhoto].photographer && (
                  <p className="text-xs text-gray-300 mt-1">
                    📸 {yearData.photos[selectedPhoto].photographer}
                  </p>
                )}
              </div>
            )}
            <div className="bg-black/40 backdrop-blur-md rounded-full px-3 py-1">
              <p className="text-xs font-medium">
                {selectedPhoto + 1} / {yearData.photos.length}
              </p>
            </div>
          </div>
        </div>
      )}


    </section>
  );
};

export default GalleryPhotoGrid;
