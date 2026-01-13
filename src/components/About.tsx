export default function About() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About The Scratch Lab
            </h2>

            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                We provide mobile paint correction and ceramic coating services for cars, boats, and aircraft.
              </p>
              <p>
                We work with faded paint, swirl marks, and light scratches, helping restore shine and overall appearance.
              </p>
              <p>
                Services are performed on-site throughout Bucks County, Philadelphia.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-2xl blur-3xl"></div>
            <img
              src="/img/about-us.jpg"
              alt="The Scratch Lab team and professional paint restoration services"
              className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
