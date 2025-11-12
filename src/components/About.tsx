export default function About() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About The Scratch Lab
            </h2>

            <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
              <p>
                At The Scratch Lab, we bring paint restoration directly to you.
              </p>
              <p>
                Our Mobile Service allows you to get the best results right at home — no need to drive anywhere.
              </p>
              <p>
                We use top materials and proven methods to bring back a clean, shiny finish to your vehicle's paint.
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
