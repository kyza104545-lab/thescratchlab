// src/components/Gallery.tsx
import { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const workImages = [
  // moved from removed "Before & After" section
  '/img/before-after1.jpg',
  '/img/before-after2.jpg',
  '/img/gallery/gallery-01.jpeg',
  '/img/gallery/gallery-02.jpeg',
  '/img/gallery/gallery-03.jpeg',
  '/img/gallery/gallery-04.jpeg',

  // remaining new gallery images
  '/img/gallery/gallery-05.jpeg',
  '/img/gallery/gallery-06.jpeg',
  '/img/gallery/gallery-07.jpeg',
  '/img/gallery/gallery-08.jpeg',
  '/img/gallery/gallery-09.jpeg',

  // existing work images
  '/img/work1.jpg',
  '/img/work2.jpg',
  '/img/work3.jpg',
  '/img/work4.jpg',
  '/img/work5.jpg',
  '/img/work6.jpg',
  '/img/work7.jpg',
];

export default function Gallery() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [itemsVisible, setItemsVisible] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsVisible(1);
      else if (window.innerWidth < 1024) setItemsVisible(2);
      else setItemsVisible(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(1, workImages.length - itemsVisible + 1);

  const nextSlide = () => setCarouselIndex((prev) => (prev + 1) % maxIndex);
  const prevSlide = () => setCarouselIndex((prev) => (prev - 1 + maxIndex) % maxIndex);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImage(null);
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxIndex]);

  useEffect(() => {
    if (!carouselRef.current) return;
    const child = carouselRef.current.children?.[carouselIndex] as HTMLElement | undefined;
    if (!child) return;
    carouselRef.current.scrollTo({ left: child.offsetLeft, behavior: 'smooth' });
  }, [carouselIndex]);

  return (
    <section id="gallery" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Our Work</h2>
            <p className="text-gray-400">Swipe or use arrows to browse</p>
          </div>

          <div className="relative">
            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-4 md:pb-0"
              aria-label="Work gallery carousel"
            >
              {workImages.map((image, index) => (
                <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3">
                  <img
                    src={image}
                    alt={`Work sample #${index + 1}`}
                    className="w-full h-64 object-cover rounded-xl shadow-xl cursor-pointer hover:opacity-90 transition-opacity"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onClick={() => setLightboxImage(image)}
                  />
                </div>
              ))}
            </div>

            {/* arrows visible on mobile too */}
            <button
              onClick={prevSlide}
              className="flex absolute left-3 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-colors z-10 shadow-lg"
              aria-label="Previous slide"
              type="button"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="flex absolute right-3 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-colors z-10 shadow-lg"
              aria-label="Next slide"
              type="button"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxIndex }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === carouselIndex ? 'bg-blue-500 w-8' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                  type="button"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setLightboxImage(null)}
            aria-label="Close lightbox"
            type="button"
          >
            <X className="w-8 h-8" />
          </button>

          <img
            src={lightboxImage}
            alt="Enlarged work sample"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
