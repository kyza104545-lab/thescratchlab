// src/components/Header.tsx
import { useState } from 'react';
import { Menu, X, Phone, Instagram, Facebook } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Лого + жёлтое подчёркивание текста */}
          <div className="flex items-center gap-3">
            <img
              src="/img/logo.png"
              alt="The Scratch Lab Logo"
              className="h-12 w-12 object-contain"
            />
            <div className="relative inline-block">
              <span className="text-xl font-semibold text-white">
                The Scratch Lab
              </span>
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-yellow-400 rounded-full" />
            </div>
          </div>

          {/* Desktop навигация */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('process')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection('why-us')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Why Us
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Contact
            </button>

            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-700">
              <a
                href="tel:+12673793167"
                className="text-blue-400 hover:text-blue-300 transition-colors"
                aria-label="Call us"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/leather_repair_service2222"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61572483165003"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </nav>

          {/* Mobile: call + burger */}
          <div className="lg:hidden flex items-center gap-4">
            <a
              href="tel:+12673793167"
              className="text-blue-400 hover:text-blue-300 transition-colors"
              aria-label="Call us"
            >
              <Phone className="w-6 h-6" />
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile меню */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-800 mt-2">
            <nav className="flex flex-col gap-4 pt-4">
              <button
                onClick={() => scrollToSection('services')}
                className="text-gray-300 hover:text-white transition-colors text-left"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="text-gray-300 hover:text-white transition-colors text-left"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection('process')}
                className="text-gray-300 hover:text-white transition-colors text-left"
              >
                Process
              </button>
              <button
                onClick={() => scrollToSection('why-us')}
                className="text-gray-300 hover:text-white transition-colors text-left"
              >
                Why Us
              </button>
              <button
                onClick={() => scrollToSection('reviews')}
                className="text-gray-300 hover:text-white transition-colors text-left"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-300 hover:text-white transition-colors text-left"
              >
                Contact
              </button>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                <a
                  href="https://www.instagram.com/leather_repair_service2222"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61572483165003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
