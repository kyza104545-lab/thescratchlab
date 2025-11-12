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
      {/* Фон с машиной */}
      <div className="absolute inset-0">
        <img
          src="/img/work2.jpg" // сюда у тебя уже загружен нужный пикап
          alt=""
          className="w-full h-full object-cover"
        />
        {/* затемняющий градиент */}
        <div className="absolute inset-0 bg-black/55 lg:bg-black/60" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Заголовок */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span
              className="text-[#e21823]"
              style={{ textShadow: '0 0 10px rgba(226,24,35,0.35)' }}
            >
              Mobile
            </span>{' '}
            <span
              className="text-[#ffd54a]"
              style={{ textShadow: '0 0 10px rgba(255,213,74,0.3)' }}
            >
              {' '}
              Paint Correction{' '}
            </span>
            <span
              className="text-white"
              style={{ textShadow: '0 0 6px rgba(0,0,0,0.4)' }}
            >
              {' '}
              &{' '}
            </span>
            <br />
            <span
              className="text-[#ffd54a]"
              style={{ textShadow: '0 0 10px rgba(255,213,74,0.3)' }}
            >
              Scratch Removal
            </span>
          </h1>

          {/* Подзаголовок 1 – всё белое */}
          <p className="text-xl md:text-2xl text-gray-100 mb-3">
            Scratch Removal • Paint Correction • Mobile Service — We Come to You
          </p>

          {/* Подзаголовок 2 – две строки, как просил Андрей */}
          <p className="text-lg md:text-xl text-gray-100 mb-1">
            Located in Doylestown, PA 18901
          </p>
          <p className="text-lg md:text-xl text-gray-100 mb-10">
            Serving Bucks County &amp; Philadelphia — Book your appointment &amp; get a fast
            estimate.
          </p>

          {/* Кнопки */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <a
              href="tel:+12673793167"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#2563eb] text-white font-semibold rounded-xl hover:bg-[#1d4ed8] transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              <Phone className="w-5 h-5" />
              Call 267-379-3167
            </a>

            <button
              onClick={scrollToAppointment}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#e21823] text-white font-semibold rounded-xl hover:bg-[#c8101b] transition-all hover:shadow-[0_0_22px_rgba(226,24,35,0.7)] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              <Calendar className="w-5 h-5" />
              Schedule Appointment
            </button>
          </div>

          {/* Нижние преимущества – без изменений */}
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
