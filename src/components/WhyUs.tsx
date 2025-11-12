import { Truck, Award, Target, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Mobile — We Come to You',
    description: 'No need to drive anywhere. We bring professional service to your location.'
  },
  {
    icon: Award,
    title: 'Premium Materials',
    description: 'Industry-leading products for superior results and long-lasting protection.'
  },
  {
    icon: Target,
    title: 'Expert Techniques',
    description: 'Proven methods refined through years of experience in paint restoration.'
  },
  {
    icon: TrendingUp,
    title: 'Lasting Results',
    description: 'Quality workmanship that stands the test of time and weather.'
  }
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose The Scratch Lab
            </h2>
            <p className="text-xl text-gray-400">
              Excellence in every detail
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:bg-gray-800 hover:border-blue-500/50 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
