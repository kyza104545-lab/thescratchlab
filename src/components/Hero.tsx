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
      {/* Background photo with dark overlay */}
      <div className="absolute inset-0">
        {/* ЗАГРУЗИ сюда фото пикапа: public/img/hero-truck.jpg */}
        <img
          src="/img/hero-truck.jpg"
          alt="Ford pickup truck - The Scratch Lab mobile paint correction"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/95" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* MAIN H1 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="text-red-500">
              Mobile
            </span>{' '}
            <span className="text-yellow-300">
              Paint Correction
            </span>{' '}
            <span className="text-red-500">
              &amp;
            </span>{' '}
            <span className="text-yellow-300">
              Scratch Removal
            </span>
          </h1>

          {/* Subheading 1 */}
          <p className="text-lg md:text-xl text-gray-200 mb-3">
            Scratch Removal • Paint Correction • Mobile Service — We Come to You
          </p>

          {/* Subheading 2 + 3 — по ТЗ Андрея */}
          <p className="text-base md:text-lg text-gray-300">
            Located in Doylestown, PA 18901 — Serving Bucks County &amp; Philadelphia.
          </p>
          <p className="text-base md:text-lg text-gray-300 mb-10">
            Book your appointment &amp; get a fast estimate.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <a
              href="tel:+12673793167"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              <Phone className="w-5 h-5" />
              Call 267-379-3167
            </a>

            <button
              onClick={scrollToAppointment}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold border-2 border-red-500 text-white bg-transparent hover:bg-red-500/10 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              <Calendar className="w-5 h-5" />
              Schedule Appointment
            </button>
          </div>

          {/* Bullets */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-300 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Mobile Service
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Professional Materials
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Expert Techniques
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
