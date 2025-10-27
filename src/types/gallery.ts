// ========================================
// 🖼️ TIPOS DA GALERIA DE FOTOS
// ========================================

export interface GalleryPhoto {
  filename: string; // Usado como identificador único
  alt: string;
  description?: string;
  photographer?: string;
}

export interface GalleryYear {
  year: number;
  title: string;
  description: string;
  coverImage: string;
  photos: GalleryPhoto[];
  totalPhotos: number;
}

export interface GalleryData {
  years: GalleryYear[];
}
