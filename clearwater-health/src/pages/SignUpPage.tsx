import React, { useState } from 'react';
import { ArrowLeft, User, Phone, Loader2 } from 'lucide-react';
import { sendOTP } from '../lib/auth';

interface SignUpPageProps {
  onBack: () => void;
  onSubmit: (role: 'patient' | 'nurse', phone: string) => void;
}

export function SignUpPage({ onBack, onSubmit }: SignUpPageProps) {
  const [role, setRole] = useState<'patient' | 'nurse'>('patient');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await sendOTP(formData.phone);

      if (error) {
        setError(error.message);
      } else {
        // Pass the phone number so we don't have to ask for it again
        onSubmit(role, formData.phone);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-cream-base">
      <div className="max-w-md w-full">
        <button
          onClick={onBack}
          className="flex items-center text-warmGray-light hover:text-teal-DEFAULT mb-8 transition-colors font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-warm border border-cream-border">
          <h1 className="text-3xl font-bold text-warmGray-heading mb-2">
            Create Account
          </h1>
          <p className="text-warmGray-body mb-8">
            Join CareConnect to manage your health journey.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Toggle */}
            <div className="bg-cream-base p-1.5 rounded-xl flex relative">
              <button
                type="button"
                onClick={() => setRole('patient')}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 z-10 ${role === 'patient' ? 'bg-white text-teal-DEFAULT shadow-sm' : 'text-warmGray-light hover:text-warmGray-body'}`}>
                Patient
              </button>
              <button
                type="button"
                onClick={() => setRole('nurse')}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 z-10 ${role === 'nurse' ? 'bg-white text-sage-DEFAULT shadow-sm' : 'text-warmGray-light hover:text-warmGray-body'}`}>
                Healthcare Worker
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-bold text-warmGray-heading mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-warmGray-light" />
                  <input
                    id="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        firstName: e.target.value
                      })
                    }
                    className="w-full pl-10 pr-4 py-3 bg-cream-base border border-cream-border rounded-xl focus:ring-2 focus:ring-teal-light focus:border-teal-DEFAULT outline-none transition-all"
                    placeholder="Jane" />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-bold text-warmGray-heading mb-2">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lastName: e.target.value
                    })
                  }
                  className="w-full px-4 py-3 bg-cream-base border border-cream-border rounded-xl focus:ring-2 focus:ring-teal-light focus:border-teal-DEFAULT outline-none transition-all"
                  placeholder="Doe" />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-bold text-warmGray-heading mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-warmGray-light" />
                <input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value
                    })
                  }
                  className="w-full pl-10 pr-4 py-3 bg-cream-base border border-cream-border rounded-xl focus:ring-2 focus:ring-teal-light focus:border-teal-DEFAULT outline-none transition-all"
                  placeholder="+14155552671" />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed ${role === 'patient' ? 'bg-teal-medium hover:bg-teal-dark shadow-teal-DEFAULT/20' : 'bg-sage-medium hover:bg-sage-light/80 text-white shadow-sage-DEFAULT/20'}`}>
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>);
}
