// src/components/About.tsx
export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-gray-900/30">
            <img
              src="/img/about-us.jpg"
              alt="Paint correction and ceramic coating results"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">About The Scratch Lab</h2>

            <p className="text-lg text-gray-300 mb-4">
              We provide <strong>mobile paint correction</strong>, <strong>scratch removal</strong>, and{' '}
              <strong>ceramic coating</strong> services for cars, boats, and aircraft — done on-site at your location.
            </p>

            <p className="text-lg text-gray-300 mb-4">
              From faded paint and swirl marks to light scratches, we help restore clarity and deep gloss{' '}
              <strong>without repainting</strong>.
            </p>

            <p className="text-lg text-gray-300">
              Based in Doylestown, PA. Serving Bucks County &amp; Philadelphia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
