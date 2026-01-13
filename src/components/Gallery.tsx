// src/components/Gallery.tsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const showcase = [
  { image: '/img/showcase/car-polishing.jpg', caption: 'Car Polishing & Ceramic Coating' },
  { image: '/img/showcase/boat-polishing.jpg', caption: 'Boat Polishing & Oxidation Removal' },
  { image: '/img/showcase/aircraft-polishing.jpg', caption: 'Aircraft Exterior Polishing' },
];

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

export default function Gallery() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(3);

  const carouselRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const touchStartX = useRef<number | null>(null);

  const workImages = useMemo(() => {
    // 18 новых фото (добавляем, не заменяем старые)
    const newOnes = Array.from({ length: 18 }, (_, i) => `/img/gallery/new-${pad2(i + 1)}.jpg`);

    const existing = [
      '/img/gallery/gallery-01.jpeg',
      '/img/gallery/gallery-02.jpeg',
      '/img/gallery/gallery-03.jpeg',
      '/img/gallery/gallery-04.jpeg',
      '/img/gallery/gallery-05.jpeg',
      '/img/gallery/gallery-06.jpeg',
      '/img/gallery/gallery-07.jpeg',
      '/img/gallery/gallery-08.jpeg',
      '/img/gallery/gallery-09.jpeg',
      '/img/before-after1.jpg',
      '/img/before-after2.jpg',
      '/img/work1.jpg',
      '/img/work2.jpg',
      '/img/work3.jpg',
      '/img/work4.jpg',
      '/img/work5.jpg',
      '/img/work6.jpg',
      '/img/work7.jpg',
    ];

    return [...newOnes, ...existing];
  }, []);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const slidesCount = useMemo(() => {
    return Math.max(1, workImages.length - itemsVisible + 1);
  }, [workImages.length, itemsVisible]);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const nextCarousel = () => setCarouselIndex((p) => (p + 1) % slidesCount);
  const prevCarousel = () => setCarouselIndex((p) => (p - 1 + slidesCount) % slidesCount);

  const nextLightbox = () => {
    setLightboxIndex((p) => {
      if (p === null) return p;
      return (p + 1) % workImages.length;
    });
  };

  const prevLightbox = () => {
    setLightboxIndex((p) => {
      if (p === null) return p;
      return (p - 1 + workImages.length) % workImages.length;
    });
  };

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

  // Скроллим карусель ровно по элементам (без половинок)
  useEffect(() => {
    const el = itemRefs.current[carouselIndex];
    if (!el || !carouselRef.current) return;

    carouselRef.current.scrollTo({
      left: el.offsetLeft,
      behavior: 'smooth',
    });
  }, [carouselIndex]);

  // Клавиатура: если открыт lightbox — листаем там, иначе — карусель
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextLightbox();
        if (e.key === 'ArrowLeft') prevLightbox();
        return;
      }

      if (e.key === 'ArrowRight') nextCarousel();
      if (e.key === 'ArrowLeft') prevCarousel();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex, slidesCount]);

  const onLightboxTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const onLightboxTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const dx = endX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(dx) < 60) return;
    if (dx < 0) nextLightbox();
    else prevLightbox();
  };

  return (
    <section id="gallery" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Showcase */}
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              Full Vehicle, Boat &amp; RV Polishing
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {showcase.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.caption}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 bg-gray-800/70">
                  <p className="text-white font-semibold text-center text-lg">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Our Work */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-2 text-center">Our Work</h3>
            <p className="text-gray-400 text-center mb-8">Swipe or use arrows to browse</p>

            <div className="relative">
              <div
                ref={carouselRef}
                className="flex gap-4 overflow-x-auto scroll-smooth pb-4 md:pb-0 snap-x snap-mandatory"
                aria-label="Work gallery carousel"
              >
                {workImages.map((image, index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 snap-start"
                  >
                    <img
                      src={image}
                      alt={`Work sample #${index + 1}`}
                      className="w-full h-64 object-cover rounded-xl shadow-xl cursor-pointer hover:opacity-90 transition-opacity"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onClick={() => openLightbox(index)}
                    />
                  </div>
                ))}
              </div>

              {/* стрелки */}
              <button
                onClick={prevCarousel}
                className="flex absolute left-3 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-colors z-10 shadow-lg"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextCarousel}
                className="flex absolute right-3 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-colors z-10 shadow-lg"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* точки */}
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: slidesCount }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === carouselIndex ? 'bg-blue-500 w-8' : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox with navigation */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              prevLightbox();
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              nextLightbox();
            }}
            aria-label="Next image"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div
            className="max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onLightboxTouchStart}
            onTouchEnd={onLightboxTouchEnd}
          >
            <img
              src={workImages[lightboxIndex]}
              alt="Enlarged work sample"
              className="max-w-full max-h-[85vh] object-contain"
            />
            <div className="text-center text-white/70 text-sm mt-3">
              {lightboxIndex + 1} / {workImages.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
