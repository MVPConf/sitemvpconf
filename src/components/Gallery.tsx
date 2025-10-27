import React, { useState } from 'react';
import { useGallery } from '../hooks/useGallery';
import GalleryYearSelector from './GalleryYearSelector';
import GalleryPhotoGrid from './GalleryPhotoGrid';

const Gallery: React.FC = () => {
  const { galleryData, loading, error, getYearByNumber } = useGallery();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // Função para selecionar um ano e navegar para o grid de fotos
  const handleSelectYear = (year: number) => {
    setSelectedYear(year);
  };

  // Função para voltar à seleção de anos
  const handleBackToYearSelector = () => {
    setSelectedYear(null);
  };

  // Tratamento de erro
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-ms-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-center text-white max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Erro ao carregar galeria</h2>
          <p className="text-gray-300 mb-6">
            Não foi possível carregar as imagens da galeria. Tente novamente mais tarde.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  // Se um ano foi selecionado, mostra o grid de fotos
  if (selectedYear !== null) {
    const yearData = getYearByNumber(selectedYear);
    
    if (!yearData) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-ms-blue-900 to-gray-900 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-2">Ano não encontrado</h2>
            <p className="text-gray-300 mb-6">
              Não foi possível encontrar fotos para o ano {selectedYear}.
            </p>
            <button 
              onClick={handleBackToYearSelector}
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors"
            >
              Voltar à galeria
            </button>
          </div>
        </div>
      );
    }

    return (
      <GalleryPhotoGrid 
        yearData={yearData}
        onBack={handleBackToYearSelector}
      />
    );
  }

  // Caso padrão: mostra o seletor de anos
  return (
    <GalleryYearSelector
      years={galleryData?.years || []}
      onSelectYear={handleSelectYear}
      loading={loading}
    />
  );
};

export default Gallery;
