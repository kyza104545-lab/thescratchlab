import { Sparkles, Disc, Shield, Wind, Droplet, Lightbulb } from 'lucide-react';

const services = [
  {
    icon: Sparkles,
    title: 'Car Scratch Removal',
    description: 'Precise removal and finish refinement'
  },
  {
    icon: Disc,
    title: 'Paint Correction & Polishing',
    description: 'Multi-stage correction for deep gloss'
  },
  {
    icon: Shield,
    title: 'Ceramic Coating Application',
    description: 'Durable protection, hydrophobic effect'
  },
  {
    icon: Wind,
    title: 'Swirl Marks & Road Rash Fix',
    description: 'Remove swirls, scuffs, light rash'
  },
  {
    icon: Droplet,
    title: 'Touch-Up Paint',
    description: 'Spot repair to protect exposed areas'
  },
  {
    icon: Lightbulb,
    title: 'Headlight Restoration',
    description: 'Clarity restored, UV-sealed'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Serving Bucks County, Philadelphia & New Jersey
            </h2>
            <p className="text-xl text-gray-400">
              Professional mobile paint restoration at your location
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800 hover:border-blue-500/50 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-400">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <p className="text-xl text-gray-300 font-medium">
              Full Vehicle, Boat & RV Polishing
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
