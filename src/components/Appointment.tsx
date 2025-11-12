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

  const validateForm = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = 'Name is required';
    if (!formData.email.trim() || !validateEmail(formData.email)) e.email = 'Valid email is required';
    if (!formData.phone.trim() || !validatePhone(formData.phone)) e.phone = 'Valid phone is required';
    if (!formData.car.trim()) e.car = 'Car make/model is required';
    if (!formData.zip.trim()) e.zip = 'ZIP code is required';
    else if (!validateZip(formData.zip)) e.zip = 'Invalid ZIP format (12345 or 12345-6789)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(ev.target.files || []);
    const valid = selected.filter(
      (f) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(f.type) && f.size <= 10 * 1024 * 1024
    );
    if (valid.length + files.length > 5) {
      setErrorMessage('Maximum 5 photos allowed');
      return;
    }
    setFiles((p) => [...p, ...valid].slice(0, 5));
    setErrorMessage('');
  };

  const removeFile = (i: number) => setFiles((p) => p.filter((_, idx) => idx !== i));

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onloadend = () => resolve(String(r.result));
      r.onerror = reject;
      r.readAsDataURL(file);
    });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const photoUrls: string[] = [];
      for (const f of files) photoUrls.push(await fileToDataUrl(f));

      const res = await fetch('/.netlify/functions/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          car: formData.car,
          zip: formData.zip,
          message: formData.message,
          photoUrls,
        }),
      });
      if (!res.ok) throw new Error('Submit failed');

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', car: '', zip: '', message: '' });
      setFiles([]);
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
            <p className="text-xl text-gray-300 mb-6">We received your appointment request and will contact you shortly.</p>
            <p className="text-gray-400 mb-8">
              Need immediate assistance? Call us at{' '}
              <a href="tel:+12673793167" className="text-blue-400 hover:text-blue-300">
                267-379-3167
              </a>
            </p>
            <button onClick={() => setSubmitStatus('idle')} className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
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
            <p className="text-xl text-gray-400">Get a quick estimate — upload photos, tell us your ZIP and car details.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 md:p-10">
            <div className="space-y-6">
              <Field id="name" label="Full Name" required value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })} error={errors.name} placeholder="John Doe" />
              <Field id="email" label="Email" required value={formData.email} onChange={(v) => setFormData({ ...formData, email: v })} error={errors.email} placeholder="john@example.com" type="email" />
              <Field id="phone" label="Phone" required value={formData.phone} onChange={(v) => setFormData({ ...formData, phone: v })} error={errors.phone} placeholder="+1 267 379 3167" type="tel" />
              <Field id="car" label="Car Make / Model" required value={formData.car} onChange={(v) => setFormData({ ...formData, car: v })} error={errors.car} placeholder="e.g., Tesla Model 3, BMW X5" />
              <Field id="zip" label="ZIP Code" required value={formData.zip} onChange={(v) => setFormData({ ...formData, zip: v })} error={errors.zip} placeholder="18901" pattern="^\d{5}(-\d{4})?$" />

              <div>
                <label htmlFor="photos" className="block text-white font-medium mb-2">Upload Photos (up to 5)</label>
                <div className="relative">
                  <input
                    id="photos"
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
                      files.length >= 5 ? 'border-gray-700 cursor-not-allowed' : 'border-gray-600 cursor-pointer hover:border-blue-500'
                    } rounded-lg transition-colors`}
                  >
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-gray-400">
                      {files.length >= 5 ? 'Maximum files reached' : 'Click to upload photos (JPG, PNG, WEBP, max 10MB each)'}
                    </span>
                  </label>
                </div>
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((f, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                        <span className="text-sm text-gray-300 truncate flex-1">{f.name}</span>
                        <button type="button" onClick={() => removeFile(i)} className="ml-2 text-red-400 hover:text-red-300 transition-colors">
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">Short Description</label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
                {isSubmitting ? (<><Loader2 className="w-5 h-5 animate-spin" /> Sending Request...</>) : ('Send Request')}
              </button>
            </div>
          </form>

          <p className="text-center text-gray-400 mt-8">
            Prefer to call? Reach us at{' '}
            <a href="tel:+12673793167" className="text-blue-400 hover:text-blue-300 font-medium">267-379-3167</a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Field({
  id, label, value, onChange, placeholder, error, required, type = 'text', pattern,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; error?: string; required?: boolean; type?: string; pattern?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-white font-medium mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        pattern={pattern}
        className={`w-full px-4 py-3 bg-gray-900 border ${error ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors`}
        placeholder={placeholder}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
}
