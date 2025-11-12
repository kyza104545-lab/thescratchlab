// /src/components/Hero.tsx
import { Phone, Calendar } from 'lucide-react';

export default function Hero() {
  const scrollToAppointment = () => {
    const element = document.getElementById('appointment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const red = '#ff2738';

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* фон с машиной */}
      <div className="absolute inset-0">
        <img
          src="/img/hero-truck.jpg"
          alt="Ford Raptor after paint correction"
          className="w-full h-full object-cover"
        />
      </div>

      {/* мягкое затемнение и лёгкий градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/80 to-black/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Заголовок */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span style={{ color: red }}>Mobile</span>{' '}
            <span className="text-yellow-300">Paint Correction</span>{' '}
            <span style={{ color: red }}>&amp;</span>{' '}
            <span className="text-yellow-300">Scratch Removal</span>
          </h1>

          {/* Подзаголовок: всё белое, без красного Mobile Service */}
          <p className="text-lg md:text-xl text-gray-100 mb-4">
            Scratch Removal • Paint Correction &amp; Mobile Service — We Come to You
          </p>

          {/* Две строки, как просил Андрей */}
          <p className="text-base md:text-lg text-gray-100">
            Located in Doylestown, PA 18901
          </p>
          <p className="text-base md:text-lg text-gray-100 mb-10">
            Serving Bucks County &amp; Philadelphia — Book your appointment &amp; get a fast estimate.
          </p>

          {/* Кнопки */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            {/* Call */}
            <a
              href="tel:+12673793167"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all hover:shadow-[0_0_18px_rgba(59,130,246,0.45)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              <Phone className="w-5 h-5" />
              Call 267-379-3167
            </a>

            {/* Schedule Appointment – красная кнопка */}
            <button
              onClick={scrollToAppointment}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
              style={{
                backgroundImage: `linear-gradient(90deg, ${red}, #d10f28)`,
                color: '#ffffff',
                boxShadow: '0 0 16px rgba(255, 39, 56, 0.4)',
              }}
            >
              <Calendar className="w-5 h-5" />
              Schedule Appointment
            </button>
          </div>

          {/* Буллеты */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-300 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              Mobile Service
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              Professional Materials
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              Expert Techniques
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
