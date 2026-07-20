"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, X } from "lucide-react";

interface ResourceGalleryProps {
  images: string[];
  title: string;
}

export default function ResourceGallery({ images, title }: ResourceGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // If there are no images (which shouldn't happen, but just in case)
  if (!images || images.length === 0) return null;

  const activeImage = images[activeIndex];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Display Image */}
      <div className="relative w-full aspect-video md:aspect-[16/10] rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 group">
        <Image
          key={activeImage} // Key forces re-render/animation on source change
          src={activeImage}
          alt={`${title} - Preview ${activeIndex + 1}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 animate-fade-in"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
        />
        
        {/* Zoom Button Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <button 
            onClick={() => setIsZoomOpen(true)}
            className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 bg-white/95 dark:bg-black/80 backdrop-blur-md px-5 py-2.5 rounded-full text-zinc-900 dark:text-white font-semibold shadow-xl border border-white/20"
          >
            <ZoomIn size={18} />
            <span>Click to Enlarge</span>
          </button>
        </div>
      </div>

      {/* Thumbnails Gallery */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative shrink-0 w-24 h-16 sm:w-32 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  isActive 
                    ? "border-cp-primary ring-2 ring-cp-primary/30 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-[#0a0a14]" 
                    : "border-transparent opacity-70 hover:opacity-100 hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                <Image
                  src={img}
                  alt={`${title} - Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox Zoom Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in">
          <button 
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-[110]"
          >
            <X size={24} />
          </button>
          
          <div className="relative w-[90vw] h-[85vh] animate-zoom-in">
            <Image
              src={activeImage}
              alt={`${title} - Full Size`}
              fill
              className="object-contain"
              sizes="90vw"
              quality={100}
            />
          </div>
          
          {/* Zoom Modal Thumbnails (Optional bonus detail) */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 p-2 rounded-2xl backdrop-blur-md border border-white/10 z-[110]">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-colors ${
                    idx === activeIndex ? "border-cp-primary" : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
