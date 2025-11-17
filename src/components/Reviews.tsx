// src/components/Reviews.tsx
import { useEffect, useState, FormEvent } from 'react';
import { Star, Quote } from 'lucide-react';

const N8N_BASE = 'https://n8n.vladkuzmenkoai.com';

type Review = {
  name: string;
  rating: number;
  text: string;
  car?: string;
  city?: string;
};

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    rating: 5,
    text: '',
    car: '',
    city: '',
  });

  // загрузить список отзывов
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${N8N_BASE}/webhook/scratchlab-reviews-list`);
        const data = await res.json();
        setReviews(data.reviews || []);
      } catch (e) {
        console.error(e);
        setError('Failed to load reviews.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.text.trim()) return;

    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch(`${N8N_BASE}/webhook/scratchlab-review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          rating: form.rating,
          text: form.text,
          car: form.car,
          city: form.city,
        }),
      });

      if (!res.ok) throw new Error('Submit failed');

      // локально добавляем отзыв, чтобы сразу появился
      setReviews(prev => [
        {
          name: form.name || 'Anonymous',
          rating: form.rating,
          text: form.text,
          car: form.car,
          city: form.city,
        },
        ...prev,
      ]);

      setForm({ name: '', rating: 5, text: '', car: '', city: '' });
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      setError('Failed to submit review. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-20 bg-gradient-to-b from-black to-gray-950 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              What Our Clients Say
            </h2>
            <p className="text-gray-400">
              Real results from real car owners we&apos;ve worked with.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]"
          >
            Leave a Review
          </button>
        </div>

        {loading && <p className="text-gray-400">Loading reviews...</p>}
        {error && !loading && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        {!loading && reviews.length === 0 && !error && (
          <p className="text-gray-400">
            There are no reviews yet. Be the first to share your experience 🙌
          </p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <article
              key={idx}
              className="relative bg-gray-900/60 border border-gray-800 rounded-2xl p-6 flex flex-col h-full"
            >
              <Quote className="w-6 h-6 text-blue-500 mb-4" />
              <p className="text-gray-200 mb-4 text-sm leading-relaxed">
                {r.text}
              </p>
              <div className="mt-auto">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-semibold">
                    {r.name || 'Anonymous'}
                  </span>
                  {r.city && (
                    <span className="text-xs text-gray-400">• {r.city}</span>
                  )}
                </div>
                {r.car && (
                  <p className="text-xs text-gray-400 mb-1">Car: {r.car}</p>
                )}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < r.rating ? 'text-yellow-400' : 'text-gray-600'
                      }`}
                      fill={i < r.rating ? 'currentColor' : 'none'}
                    />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">
                    {r.rating}/5
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-2xl p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-300"
            >
              ✕
            </button>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Leave a Review
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Name (optional)
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-950 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Rating
                </label>
                <select
                  value={form.rating}
                  onChange={e =>
                    setForm(f => ({ ...f, rating: Number(e.target.value) }))
                  }
                  className="w-full px-3 py-2 bg-gray-950 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value={5}>5 – Excellent</option>
                  <option value={4}>4 – Good</option>
                  <option value={3}>3 – Okay</option>
                  <option value={2}>2 – Bad</option>
                  <option value={1}>1 – Terrible</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Review
                </label>
                <textarea
                  rows={4}
                  value={form.text}
                  onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-950 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="How was your experience with The Scratch Lab?"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Car (optional)
                  </label>
                  <input
                    type="text"
                    value={form.car}
                    onChange={e => setForm(f => ({ ...f, car: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-950 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Tesla Model 3, BMW X5…"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    City (optional)
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-950 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Philadelphia, Bucks County…"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending…' : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
