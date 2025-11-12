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
      {/* Background image: RAM / Raptor photo */}
      <div className="absolute inset-0">
        <img
          src="/img/hero-ram.jpg"
          alt="Ford truck after professional paint correction & scratch removal"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark overlay + subtle blue glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050814] via-[#050814dd] to-[#050814ee]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span
              className="text-red-500"
              style={{ textShadow: '0 0 24px rgba(248, 113, 113, 0.6)' }}
            >
              Mobile
            </span>{' '}
            <span
              className="text-yellow-300"
              style={{ textShadow: '0 0 26px rgba(253, 224, 71, 0.55)' }}
            >
              Paint Correction
            </span>{' '}
            <span
              className="text-red-500"
              style={{ textShadow: '0 0 24px rgba(248, 113, 113, 0.6)' }}
            >
              &
            </span>
            <br />
            <span
              className="text-yellow-300"
              style={{ textShadow: '0 0 26px rgba(253, 224, 71, 0.55)' }}
            >
              Scratch Removal
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-3">
            Scratch Removal • Paint Correction • Mobile Service — We Come to You
          </p>
          <p className="text-lg md:text-xl text-gray-300 mb-12">
            Located in Doylestown, PA 18901 — Serving Bucks County &amp; Philadelphia.
            Book your appointment &amp; get a fast estimate.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            {/* Primary call button — остаётся синим */}
            <a
              href="tel:+12673793167"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <Phone className="w-5 h-5" />
              Call 267-379-3167
            </a>

            {/* Schedule кнопка с красной рамкой, как просил Андрей */}
            <button
              onClick={scrollToAppointment}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black/40 text-white font-semibold rounded-xl border border-red-500 hover:bg-red-500/10 hover:border-red-400 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <Calendar className="w-5 h-5" />
              Schedule Appointment
            </button>
          </div>

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
