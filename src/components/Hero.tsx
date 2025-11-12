import { Phone, Calendar } from 'lucide-react';

export default function Hero() {
  const scrollToAppointment = () => {
    const element = document.getElementById('appointment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Фон с фото пикапа */}
      <div className="absolute inset-0">
        <img
          src="/og-v2.jpg"
          alt="Truck after professional paint correction and scratch removal"
          className="w-full h-full object-cover"
        />
        {/* затемнение, чтобы текст читался */}
        <div className="absolute inset-0 bg-black/70 md:bg-black/60" />
      </div>

      {/* Лёгкие световые акценты */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/80 pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Заголовок по ТЗ */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            <span className="text-red-500 drop-shadow-[0_0_25px_rgba(248,113,113,0.7)]">
              Mobile
            </span>{' '}
            <span className="text-yellow-300 drop-shadow-[0_0_25px_rgba(250,204,21,0.7)]">
              Paint Correction
            </span>{' '}
            <span className="text-red-500 drop-shadow-[0_0_25px_rgba(248,113,113,0.7)]">
              &amp;
            </span>{' '}
            <span className="text-yellow-300 drop-shadow-[0_0_25px_rgba(250,204,21,0.7)]">
              Scratch Removal
            </span>
          </h1>

          {/* Подзаголовок – можно оставить, как было, только контрастнее */}
          <p className="text-xl md:text-2xl text-gray-100 mb-4">
            Scratch Removal • Paint Correction • Mobile Service — We Come to You
          </p>

          {/* Новый текст по ТЗ Андрея */}
          <p className="text-lg md:text-xl text-gray-100">
            Located in Doylestown, PA 18901 — Serving Bucks County &amp; Philadelphia.
          </p>
          <p className="text-lg md:text-xl text-gray-100 mb-12">
            Book your appointment &amp; get a fast estimate.
          </p>

          {/* Кнопки */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            {/* Call button — оставляем синим */}
            <a
              href="tel:+12673793167"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              <Phone className="w-5 h-5" />
              Call 267-379-3167
            </a>

            {/* Schedule Appointment — белый текст, красная рамка */}
            <button
              onClick={scrollToAppointment}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black/60 text-white font-semibold rounded-xl border-2 border-red-500 hover:bg-red-500/10 hover:border-red-500 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              <Calendar className="w-5 h-5" />
              Schedule Appointment
            </button>
          </div>

          {/* Буллеты оставляем как были */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-200 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              Mobile Service
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              Professional Materials
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              Expert Techniques
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
