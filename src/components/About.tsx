// src/components/About.tsx
export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About The Scratch Lab</h2>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-10">
            <p className="text-lg md:text-xl text-gray-200 mb-6">
              We provide mobile paint correction and ceramic coating services for cars, boats, and aircraft.
            </p>

            <p className="text-lg md:text-xl text-gray-200 mb-6">
              We work with faded paint, swirl marks, and light scratches, helping restore shine and overall appearance.
            </p>

            <p className="text-lg md:text-xl text-gray-200">
              Services are performed on-site throughout Bucks County, Philadelphia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
