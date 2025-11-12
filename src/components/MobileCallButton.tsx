import { Phone } from 'lucide-react';

export default function MobileCallButton() {
  return (
    <a
      href="tel:+12673793167"
      className="lg:hidden fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:shadow-[0_0_40px_rgba(59,130,246,0.8)] transition-all hover:scale-110 active:scale-95"
      aria-label="Call us"
    >
      <Phone className="w-7 h-7 text-white" />
    </a>
  );
}
