import { Sparkles, Disc, Shield, Wind, Droplet, Anchor } from 'lucide-react';

const services = [
  {
    icon: Anchor,
    title: 'Mobile Boat Detailing',
    description: 'One-step & two-step boat detailing at your marina, dock, or storage'
  },
  {
    icon: Disc,
    title: 'Boat Polishing',
    description: 'Professional compound & polish to restore deep gloss and clarity'
  },
  {
    icon: Sparkles,
    title: 'Oxidation Removal',
    description: 'Marine oxidation removal and gelcoat surface restoration'
  },
  {
    icon: Wind,
    title: 'Gelcoat Restoration',
    description: 'Revive faded and chalky marine gelcoat to like-new condition'
  },
  {
    icon: Shield,
    title: 'Ceramic Coating',
    description: 'Long-lasting ceramic protection for boats, RVs, and vehicles'
  },
  {
    icon: Droplet,
    title: 'RV & Car Polishing',
    description: 'Paint correction and swirl removal for RVs, cars, and aircraft'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Mobile Marine Detailing – Myrtle Beach & Coastal SC
            </h2>
            <p className="text-xl text-gray-400">
              We come to your marina, dock, storage facility, or home
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
              Boats · RVs · Cars · Aircraft — Mobile Service Comes to You
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
