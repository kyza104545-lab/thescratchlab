// src/App.tsx
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Appointment from './components/Appointment';
import Gallery from './components/Gallery';
import Process from './components/Process';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MobileCallButton from './components/MobileCallButton';
import Reviews from './components/Reviews';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Process />
      <WhyUs />
      <Appointment />
      <Reviews />
      <Contact />
      <Footer />
      <MobileCallButton />
    </div>
  );
}

export default App;
