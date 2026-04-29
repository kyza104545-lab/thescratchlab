import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Do you offer mobile boat detailing?',
    a: 'Yes — we are fully mobile. We come directly to your marina, dock, storage facility, or home in Myrtle Beach and the surrounding coastal areas of South Carolina. No need to transport your boat.'
  },
  {
    q: 'Can you remove oxidation from my boat\'s gelcoat?',
    a: 'Yes. We specialize in marine oxidation removal and gelcoat restoration. Most moderately oxidized boats respond very well to a two-step compound and polish treatment, bringing back a deep, like-new gloss.'
  },
  {
    q: 'What areas do you serve?',
    a: 'We serve Myrtle Beach and the surrounding coastal areas of South Carolina. Contact us to confirm availability at your specific location.'
  },
  {
    q: 'How do I request a quote for boat polishing?',
    a: 'Call us at 843-855-8272 or use the appointment form on this page. We\'ll discuss your boat\'s size, condition, and location to give you an accurate estimate.'
  },
  {
    q: 'How long does boat detailing take?',
    a: 'A one-step detail typically takes 4–6 hours. Two-step oxidation removal and polish on larger boats can take a full day or more depending on size and condition.'
  },
  {
    q: 'Do you detail RVs and cars as well as boats?',
    a: 'Yes. In addition to mobile boat detailing, we provide paint correction, polishing, and ceramic coating services for RVs, cars, and aircraft.'
  }
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-400">
              About mobile boat detailing, oxidation removal & our service area
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-gray-700 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-gray-800/50 hover:bg-gray-800 transition-colors"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="text-white font-medium text-lg">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-400 flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {open === i && (
                  <div className="px-6 py-5 bg-gray-900/60 text-gray-300 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
