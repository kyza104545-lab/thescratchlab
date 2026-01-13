// src/components/Hero.tsx
import { Phone, Calendar } from 'lucide-react';

export default function Hero() {
  const scrollToAppointment = () => {
    const el = document.getElementById('appointment');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const red = '#ff2738';

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/img/hero-truck.jpg"
          alt="Paint correction and ceramic coating"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_55%)]" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title (как просил Андрей) */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-[0_2px_18px_rgba(0,0,0,0.65)]">
            Paint Correction
            <br />
            <span className="text-blue-300">Ceramic Coating</span>
          </h1>

          {/* Description (оставляем как было) */}
          <p className="text-lg md:text-xl text-gray-100 mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
            Restore dull and faded paint, remove swirl marks,
            <br className="hidden md:block" />
            and bring back deep gloss —{' '}
            <span className="font-semibold">without repainting.</span>
          </p>

          <div className="text-sm md:text-base text-gray-200 space-y-1 mb-10">
            <p>Professional mobile service — we come to you</p>
            <p>Serving Bucks County • Philadelphia</p>
          </div>

          {/* Buttons (не трогаем логику) */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href="tel:+12673793167"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all hover:shadow-[0_0_18px_rgba(59,130,246,0.45)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              <Phone className="w-5 h-5" />
              Call 267-379-3167
            </a>

            <button
              onClick={scrollToAppointment}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
              style={{
                backgroundImage: `linear-gradient(90deg, ${red}, #d10f28)`,
                color: '#ffffff',
                boxShadow: '0 0 12px rgba(255, 39, 56, 0.35)',
              }}
            >
              <Calendar className="w-5 h-5" />
              Schedule Appointment
            </button>
          </div>

          {/* Our Services (правки по цветам) */}
          <div className="max-w-xl mx-auto text-left bg-black/35 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <h2 className="text-center text-xl md:text-2xl font-semibold text-blue-300 mb-4">
              Our Services
            </h2>

            <ul className="space-y-2 text-white">
              <li className="flex gap-3">
                <span
                  className="mt-2 h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: red }}
                />
                <span>
                  <strong>One-Step</strong>{' '}
                  <span className="text-blue-300 font-semibold">Paint Correction</span>{' '}
                  (Paint Enhancement)
                </span>
              </li>

              <li className="flex gap-3">
                <span
                  className="mt-2 h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: red }}
                />
                <span>
                  <strong>Two-Step</strong>{' '}
                  <span className="text-blue-300 font-semibold">Paint Correction</span>{' '}
                  (Deep Gloss &amp; Clarity)
                </span>
              </li>

              <li className="flex gap-3">
                <span
                  className="mt-2 h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: red }}
                />
                <span>
                  <span className="text-blue-300 font-semibold">Ceramic</span> Coating Protection
                </span>
              </li>

              <li className="flex gap-3">
                <span
                  className="mt-2 h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: red }}
                />
                <span>
                  <strong>Headlight</strong> Restoration
                </span>
              </li>

              <li className="flex gap-3">
                <span
                  className="mt-2 h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: red }}
                />
                <span>
                  <strong>Light</strong> Scratch &amp; Swirl Mark Removal
                </span>
              </li>
            </ul>

            <p className="text-sm md:text-base text-gray-300 mt-5">
              Light scratches and swirl marks are corrected as part of the paint correction process.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
