import React, { useState } from 'react';
import { Camera, Maximize2, X } from 'lucide-react';
import { PhotoGalleryItem, Celebrity } from '../types';
import { getSafeImageUrl, getMonogramFallback } from '../utils/imageUrl';

interface PhotoGallerySectionProps {
  gallery: PhotoGalleryItem[];
  celebrity: Celebrity;
}

export const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({ gallery, celebrity }) => {
  const [activePhoto, setActivePhoto] = useState<PhotoGalleryItem | null>(null);

  // Combine gallery with best view photo
  const allPhotos: PhotoGalleryItem[] = [
    {
      id: 'main-portrait',
      title: `${celebrity.knownAs} Best View Portrait`,
      imageUrl: celebrity.bestViewPhoto,
      caption: `Best view photo for ${celebrity.knownAs}.`,
      category: 'Photoshoot',
    },
    ...gallery,
  ];

  return (
    <section className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex items-center gap-2.5 border-b border-zinc-800 pb-4">
        <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
          <Camera className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-serif font-bold text-white">Red Carpet & Photo Gallery</h2>
          <p className="text-xs text-zinc-400">High-resolution portraits, red carpet premieres, and event showcases</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {allPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setActivePhoto(photo)}
            className="group relative h-48 rounded-xl overflow-hidden border border-zinc-800 cursor-pointer bg-zinc-950 hover:border-amber-500/50 transition-all shadow"
          >
            <img
              src={getSafeImageUrl(photo.imageUrl)}
              alt={photo.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = getMonogramFallback(celebrity.knownAs, photo.category);
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            <div className="absolute top-2 right-2 p-1.5 bg-zinc-950/80 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity border border-zinc-700">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>

            <div className="absolute bottom-2 left-2 right-2 text-xs">
              <span className="text-[10px] uppercase font-mono font-bold bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30">
                {photo.category}
              </span>
              <p className="text-white font-medium truncate mt-1">{photo.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 p-3 bg-zinc-900 text-white rounded-full hover:bg-amber-500 hover:text-zinc-950 transition-colors z-10"
              id="close-lightbox-modal"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={getSafeImageUrl(activePhoto.imageUrl)}
              alt={activePhoto.title}
              className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl border border-zinc-800"
            />
            <div className="mt-4 text-center space-y-1">
              <span className="text-xs font-mono uppercase bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
                {activePhoto.category}
              </span>
              <h3 className="text-xl font-bold font-serif text-white">{activePhoto.title}</h3>
              <p className="text-sm text-zinc-400 max-w-md">{activePhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
