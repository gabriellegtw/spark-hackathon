import React, { useState } from 'react';
import { ArrowLeft, Phone, ArrowRight, Loader2 } from 'lucide-react';
import { sendOTP } from '../lib/auth';

interface LoginPageProps {
  role: 'patient' | 'nurse';
  onBack: () => void;
  onSubmit: (phone: string) => void;
}

export function LoginPage({ role, onBack, onSubmit }: LoginPageProps) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    try {
      const { error } = await sendOTP(phone);
      if (error) {
        setError(error.message);
      } else {
        onSubmit(phone);
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
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Role Selection
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-warm border border-cream-border">
          <div className="mb-8">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${role === 'patient' ? 'bg-teal-light/30 text-teal-dark' : 'bg-sage-light/40 text-sage-DEFAULT'}`}>
              {role === 'patient' ?
                'Patient Portal' :
                'Healthcare Worker Portal'}
            </span>
            <h1 className="text-3xl font-bold text-warmGray-heading mb-2">
              Welcome Back
            </h1>
            <p className="text-warmGray-body">
              Enter your phone number to receive a login code.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  autoFocus
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-cream-base border border-cream-border rounded-xl focus:ring-2 outline-none transition-all ${role === 'patient' ? 'focus:ring-teal-light focus:border-teal-DEFAULT' : 'focus:ring-sage-light focus:border-sage-DEFAULT'}`}
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
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending Code...
                </>
              ) : (
                <>
                  Send Login Code <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>);
}
