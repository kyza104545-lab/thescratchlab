// /src/components/Appointment.tsx
import { useState, FormEvent } from 'react';
import { Calendar, Upload, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    car: '',
    zip: '',
    message: ''
  });

  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateZip = (zip: string) => {
    const zipPattern = /^\d{5}(-\d{4})?$/;
    return zipPattern.test(zip);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.car.trim()) newErrors.car = 'Car make/model is required';

    if (!formData.zip.trim()) {
      newErrors.zip = 'ZIP code is required';
    } else if (!validateZip(formData.zip)) {
      newErrors.zip = 'Invalid ZIP code format (e.g., 12345 or 12345-6789)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    const validFiles = selectedFiles.filter(file => {
      const isValidType = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
      ].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      return isValidType && isValidSize;
    });

    if (validFiles.length + files.length > 5) {
      setErrorMessage('Maximum 5 photos allowed');
      return;
    }

    setFiles(prev => [...prev, ...validFiles].slice(0, 5));
    setErrorMessage('');
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const dataUrlFromFile = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const photoUrls: string[] = [];
      for (const file of files) {
        const base64 = await dataUrlFromFile(file);
        photoUrls.push(base64);
      }

      const res = await fetch('/.netlify/functions/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          car: formData.car,
          zip: formData.zip,
          message: formData.message,
          photoUrls
        })
      });

      if (!res.ok) throw new Error('Failed to submit request');

      setSubmitStatus('success');
      setFormData({ name: '', car: '', zip: '', message: '' });
      setFiles([]);
    } catch (err) {
      console.error('Submit error:', err);
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
              <a href="tel:+12673793167" className="text-blue-400 hover:text-blue-300">
                267-379-3167
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Schedule Your Appointment
            </h2>
            <p className="text-xl text-gray-400">
              Get a quick estimate — upload photos, tell us your ZIP and car details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 md:p-10">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 bg-gray-900 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="car" className="block text-white font-medium mb-2">
                  Car Make / Model <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="car"
                  value={formData.car}
                  onChange={(e) => setFormData({ ...formData, car: e.target.value })}
                  className={`w-full px-4 py-3 bg-gray-900 border ${errors.car ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors`}
                  placeholder="e.g., Tesla Model 3, BMW X5"
                />
                {errors.car && <p className="mt-1 text-sm text-red-400">{errors.car}</p>}
              </div>

              <div>
                <label htmlFor="zip" className="block text-white font-medium mb-2">
                  ZIP Code <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="zip"
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  className={`w-full px-4 py-3 bg-gray-900 border ${errors.zip ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors`}
                  placeholder="18901"
                  pattern="^\d{5}(-\d{4})?$"
                />
                {errors.zip && <p className="mt-1 text-sm text-red-400">{errors.zip}</p>}
              </div>

              <div>
                <label htmlFor="photos" className="block text-white font-medium mb-2">
                  Upload Photos (up to 5)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="photos"
                    accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                    multiple
                    onChange={handleFileChange}
                    disabled={files.length >= 5}
                    className="hidden"
                  />
                  <label
                    htmlFor="photos"
                    className={`flex items-center justify-center gap-2 w-full px-4 py-8 bg-gray-900 border-2 border-dashed ${files.length >= 5 ? 'border-gray-700 cursor-not-allowed' : 'border-gray-600 cursor-pointer hover:border-blue-500'} rounded-lg transition-colors`}
                  >
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-gray-400">
                      {files.length >= 5 ? 'Maximum files reached' : 'Click to upload photos (JPG, PNG, WEBP, max 10MB each)'}
                    </span>
                  </label>
                </div>

                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                        <span className="text-sm text-gray-300 truncate flex-1">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
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
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
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
            <a href="tel:+12673793167" className="text-blue-400 hover:text-blue-300 font-medium">
              267-379-3167
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
