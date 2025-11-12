import { Phone, Truck, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: Phone,
    number: '1',
    title: 'Call or Email',
    description: 'Share your issue and location'
  },
  {
    icon: Truck,
    number: '2',
    title: 'We Come to You',
    description: 'Driveway or garage, minimal hassle'
  },
  {
    icon: Sparkles,
    number: '3',
    title: 'Scratch-Free Glossy Finish',
    description: 'Premium materials, lasting results'
  }
];

export default function Process() {
  return (
    <section id="process" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-400">
              Simple, convenient, professional
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative text-center">
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full blur-xl opacity-30"></div>
                    <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-lg">
                    {step.description}
                  </p>

                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <a
              href="tel:+12673793167"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              <Phone className="w-5 h-5" />
              Call 267-379-3167
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
