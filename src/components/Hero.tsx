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
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a] via-[#1a2332] to-[#2a3f5f]"></div>
      <div className="absolute inset-0 opacity-10">
        <img src="/img/work2.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Mobile <span className="text-blue-400" style={{ textShadow: '0 0 30px rgba(59, 130, 246, 0.3)' }}>Paint Correction</span> &<br />
            <span className="text-blue-400" style={{ textShadow: '0 0 30px rgba(59, 130, 246, 0.3)' }}>Scratch Removal</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            Scratch Removal • Paint Correction • Mobile Service — We Come to You
          </p>
          <p className="text-lg md:text-xl text-gray-400 mb-12">
            Serving Bucks County, Philadelphia & New Jersey — Book your appointment & get a fast estimate.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="tel:+12673793167"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <Phone className="w-5 h-5" />
              Call 267-379-3167
            </a>

            <button
              onClick={scrollToAppointment}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition-all border border-gray-700 hover:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <Calendar className="w-5 h-5" />
              Schedule Appointment
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Mobile Service
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Professional Materials
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Expert Techniques
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
}
