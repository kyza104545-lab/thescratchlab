// src/components/Gallery.tsx
import { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

type BeforeAfterCard = {
  image: string;
  label: string;
  objectPos: string;
};

const beforeAfterCards: BeforeAfterCard[] = [
  { image: '/img/before-after1.jpg', label: 'Before & After #1', objectPos: 'center top' },
  // before-after2.jpg удалили из секции по просьбе клиента (закресленная фотка)
];

const workImages: string[] = [
  // новые фото — первыми, чтобы на мобилке шли 1..9 сверху/впереди
  '/img/gallery/gallery-01.jpeg',
  '/img/gallery/gallery-02.jpeg',
  '/img/gallery/gallery-03.jpeg',
  '/img/gallery/gallery-04.jpeg',
  '/img/gallery/gallery-05.jpeg',
  '/img/gallery/gallery-06.jpeg',
  '/img/gallery/gallery-07.jpeg',
  '/img/gallery/gallery-08.jpeg',
  '/img/gallery/gallery-09.jpeg',

  // старые
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

  const maxIndex = Math.max(0, workImages.length - itemsVisible);

  useEffect(() => {
    setCarouselIndex((i) => Math.min(i, maxIndex));
  }, [itemsVisible, maxIndex]);

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lightboxImage) return;
      if (e.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxImage]);

  useEffect(() => {
    const el = carouselRef.current?.children?.[carouselIndex] as HTMLElement | undefined;
    if (el) el.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  }, [carouselIndex]);

  const beforeGridClass =
    beforeAfterCards.length <= 1 ? 'grid grid-cols-1 max-w-3xl mx-auto' : 'grid md:grid-cols-2';

  return (
    <section id="gallery" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Before &amp; After</h2>
            <p className="text-xl text-gray-400">See the transformation</p>
          </div>

          <div className={`${beforeGridClass} gap-6 mb-20`}>
            {beforeAfterCards.map((card, index) => (
              <div
                key={index}
                className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all border-2 border-white/10"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={card.image}
                    alt={`${card.label}: paint correction & scratch removal results`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                    style={{ objectPosition: card.objectPos }}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    onClick={() => setLightboxImage(card.image)}
                  />
                </div>
                <div className="p-5 bg-gray-800/70">
                  <p className="text-white font-semibold text-center text-lg">{card.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-2 text-center">Our Work</h3>
            <p className="text-gray-400 text-center mb-8">Swipe or use arrows to browse</p>

            <div className="relative">
              <div
                ref={carouselRef}
                className="flex gap-4 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
                style={{ scrollBehavior: 'smooth' }}
                aria-label="Work gallery carousel"
              >
                {workImages.map((image, index) => (
                  <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 snap-start">
                    <img
                      src={image}
                      alt={`Work photo #${index + 1}`}
                      className="w-full h-64 object-cover rounded-xl shadow-xl cursor-pointer hover:opacity-90 transition-opacity"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onClick={() => setLightboxImage(image)}
                    />
                  </div>
                ))}
              </div>

              {/* стрелки — ВИДИМЫ и на мобилке */}
              <button
                onClick={prevSlide}
                className="flex absolute left-3 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-colors z-10 shadow-lg"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextSlide}
                className="flex absolute right-3 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-colors z-10 shadow-lg"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="flex justify-center gap-2 mt-6 flex-wrap">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === carouselIndex ? 'bg-blue-500 w-8' : 'bg-gray-600 hover:bg-gray-500 w-2'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
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
