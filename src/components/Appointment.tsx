// src/components/Appointment.tsx
import { useState, FormEvent } from 'react';
import { Calendar, Upload, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    car: '',
    zip: '',
    message: '',
  });

  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateZip = (zip: string) => /^\d{5}(-\d{4})?$/.test(zip);
  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const validatePhone = (p: string) => /^[\d+\-\s()]{7,20}$/.test(p);

  const setField = (key: keyof typeof formData, value: string) => {
    setFormData((p) => ({ ...p, [key]: value }));

    // очищаем ошибки по мере ввода (чтобы не висели красным после первого submit)
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];

      // если ошибка была "Email or phone is required" — чистим оба, когда человек начал вводить одно из них
      if (key === 'email' || key === 'phone') {
        delete next.email;
        delete next.phone;
      }
      return next;
    });
  };

  const validateForm = () => {
    const e: Record<string, string> = {};

    if (!formData.name.trim()) e.name = 'Name is required';

    const hasEmail = !!formData.email.trim();
    const hasPhone = !!formData.phone.trim();

    // минимум один контакт: phone или email
    if (!hasEmail && !hasPhone) {
      e.email = 'Email or phone is required';
      e.phone = 'Email or phone is required';
    } else {
      if (hasEmail && !validateEmail(formData.email)) e.email = 'Please enter a valid email';
      if (hasPhone && !validatePhone(formData.phone)) e.phone = 'Please enter a valid phone';
    }

    // ZIP НЕ обязателен: проверяем только если введён
    if (formData.zip.trim() && !validateZip(formData.zip.trim())) {
      e.zip = 'Invalid ZIP format (12345 or 12345-6789)';
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(ev.target.files || []);

    // только картинки и максимум 10 МБ на файл (ограничение Телеги)
    const valid = selected.filter(
      (f) =>
        ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(f.type) &&
        f.size <= 10 * 1024 * 1024
    );

    if (valid.length + files.length > 5) {
      setErrorMessage('Maximum 5 photos allowed');
      return;
    }

    setFiles((p) => [...p, ...valid].slice(0, 5));
    setErrorMessage('');
  };

  const removeFile = (i: number) => setFiles((p) => p.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('email', formData.email);
      fd.append('phone', formData.phone);
      fd.append('car', formData.car);
      fd.append('zip', formData.zip);
      fd.append('message', formData.message);

      files.forEach((file) => {
        fd.append('photos', file);
      });

      const res = await fetch('https://n8n.vladkuzmenko.com/webhook/thescratchlab', {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) {
        console.error(await res.text());
        throw new Error('Submit failed');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', car: '', zip: '', message: '' });
      setFiles([]);
      setErrors({});
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
      setErrorMessage('Failed to submit your request. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <section id="appointment" className="py-20 bg-gradient-to-b from-gray-900 to-black scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Thank You!</h2>
            <p className="text-xl text-gray-300 mb-6">
              We received your appointment request and will contact you shortly.
            </p>
            <p className="text-gray-400 mb-8">
              Need immediate assistance? Call us at{' '}
              <a href="tel:+18438558272" className="text-blue-400 hover:text-blue-300">
                843-855-8272
              </a>
            </p>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="appointment" className="py-20 bg-gradient-to-b from-gray-900 to-black scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-6">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Schedule Your Appointment</h2>
            <p className="text-xl text-gray-400">
              Get a quick estimate — upload photos, tell us your ZIP and details.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 md:p-10"
          >
            <div className="space-y-6">
              <Field
                id="name"
                label="Full Name"
                required
                value={formData.name}
                onChange={(v) => setField('name', v)}
                error={errors.name}
                placeholder="John Doe"
                autoComplete="name"
              />

              <Field
                id="email"
                label="Email"
                value={formData.email}
                onChange={(v) => setField('email', v)}
                error={errors.email}
                placeholder="john@example.com"
                type="email"
                autoComplete="email"
              />

              <Field
                id="phone"
                label="Phone"
                value={formData.phone}
                onChange={(v) => setField('phone', v)}
                error={errors.phone}
                placeholder="+1 267 379 3167"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
              />

              <Field
                id="car"
                label="Car Make / Model"
                value={formData.car}
                onChange={(v) => setField('car', v)}
                error={errors.car}
                placeholder="e.g., Tesla Model 3, BMW X5"
                autoComplete="off"
              />

              {/* ZIP теперь НЕ блокирует отправку: без pattern и без required */}
              <Field
                id="zip"
                label="ZIP Code"
                value={formData.zip}
                onChange={(v) => setField('zip', v)}
                error={errors.zip}
                placeholder="29577"
                autoComplete="postal-code"
                inputMode="numeric"
                maxLength={10}
              />

              <div>
                <label htmlFor="photos" className="block text-white font-medium mb-2">
                  Upload Photos (up to 5)
                </label>
                <div className="relative">
                  <input
                    id="photos"
                    name="photos"
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                    multiple
                    onChange={handleFileChange}
                    disabled={files.length >= 5}
                    className="hidden"
                  />
                  <label
                    htmlFor="photos"
                    className={`flex items-center justify-center gap-2 w-full px-4 py-8 bg-gray-900 border-2 border-dashed ${
                      files.length >= 5
                        ? 'border-gray-700 cursor-not-allowed'
                        : 'border-gray-600 cursor-pointer hover:border-blue-500'
                    } rounded-lg transition-colors`}
                  >
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-gray-400">
                      {files.length >= 5
                        ? 'Maximum files reached'
                        : 'Click to upload photos (JPG, PNG, WEBP, max 10MB each)'}
                    </span>
                  </label>
                </div>
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((f, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                        <span className="text-sm text-gray-300 truncate flex-1">{f.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="ml-2 text-red-400 hover:text-red-300 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Short Description
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setField('message', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Describe what you'd like to repair or restore..."
                />
              </div>

              {errorMessage && (
                <div className="flex items-start gap-2 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-400">{errorMessage}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending Request...
                  </>
                ) : (
                  'Send Request'
                )}
              </button>
            </div>
          </form>

          <p className="text-center text-gray-400 mt-8">
            Prefer to call? Reach us at{' '}
            <a href="tel:+18438558272" className="text-blue-400 hover:text-blue-300 font-medium">
              843-855-8272
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  required,
  type = 'text',
  autoComplete,
  inputMode,
  maxLength,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  inputMode?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-white font-medium mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        className={`w-full px-4 py-3 bg-gray-900 border ${
          error ? 'border-red-500' : 'border-gray-600'
        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors`}
        placeholder={placeholder}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
}
