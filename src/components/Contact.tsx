// src/components/Contact.tsx
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-400">
              Ready to restore your vehicle&apos;s finish?
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 md:p-12 mb-12">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <a
                href="tel:+12673793167"
                className="flex items-start gap-4 p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-all border border-gray-700 hover:border-blue-500/50"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Call us</div>
                  <div className="text-xl font-semibold text-white">267-379-3167</div>
                </div>
              </a>

              <a
                href="mailto:info@leatherclinic.org"
                className="flex items-start gap-4 p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-all border border-gray-700 hover:border-blue-500/50"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Email us</div>
                  <div className="text-lg font-semibold text-white break-all">
                    info@leatherclinic.org
                  </div>
                </div>
              </a>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-sm text-gray-400 mb-1">Service Area</div>
                  <div className="text-lg text-white">
                    Bucks County, Philadelphia &amp; New Jersey
                  </div>
                </div>
              </div>

              {/* HOURS: только правка, о которой сказал Андрей */}
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-sm text-gray-400 mb-2">Hours</div>
                  <div className="text-lg font-semibold text-white">
                    Available 24/7
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-sm text-gray-400 mb-1">Address</div>
                  <div className="text-lg text-white">
                    9-4 Aspen Way, Doylestown, PA 18901, United States
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-700">
              <div className="text-sm text-gray-400 mb-3">Follow us</div>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/leather_repair_service2222"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61572483165003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
