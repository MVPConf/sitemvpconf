import { useMemo } from 'react';
import { useRemoteData } from './useRemoteData';
import { buildStorageUrl, getStorageAccountUrl } from '../utils/storage';
import { GalleryData, GalleryYear, GalleryPhoto } from '../types/gallery';

const API_URL = '/data/gallery.json';

export const useGallery = () => {
  const { data, loading, error } = useRemoteData<GalleryData>(API_URL);

  const processedGallery: GalleryData | null = useMemo(() => {
    if (!data) return null;

    return {
      ...data,
      years: data.years.map((year: GalleryYear) => ({
        ...year,
        // Processa a imagem de capa
        coverImage: year.coverImage.startsWith('http')
          ? year.coverImage
          : buildStorageUrl(getStorageAccountUrl(), year.coverImage),
        // Processa todas as fotos do ano
        photos: year.photos.map((photo: GalleryPhoto) => ({
          ...photo,
          filename: photo.filename.startsWith('http')
            ? photo.filename
            : buildStorageUrl(getStorageAccountUrl(), photo.filename)
        }))
      }))
    };
  }, [data]);

  const getYearByNumber = (yearNumber: number): GalleryYear | null => {
    if (!processedGallery) return null;
    return processedGallery.years.find(year => year.year === yearNumber) || null;
  };

  const getAvailableYears = (): number[] => {
    if (!processedGallery) return [];
    return processedGallery.years.map(year => year.year).sort((a, b) => b - a); // Mais recente primeiro
  };

  return {
    galleryData: processedGallery,
    loading,
    error,
    getYearByNumber,
    getAvailableYears
  };
};
