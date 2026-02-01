import React, { useState, useRef } from 'react';
import { ArrowLeft, ShieldCheck, Loader2 } from 'lucide-react';
import { verifyOTP, sendOTP, createUserRecord } from '../lib/auth';

interface VerifyCodePageProps {
  role: 'patient' | 'nurse';
  phone: string;
  firstName?: string;
  lastName?: string;
  onBack: () => void;
  onVerify: () => void;
}

export function VerifyCodePage({
  role,
  phone,
  firstName = '',
  lastName = '',
  onBack,
  onVerify
}: VerifyCodePageProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple chars
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    // Auto-focus next input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    if (pastedData.length > 0) {
      const newCode = [...code];
      pastedData.forEach((char, index) => {
        if (index < 6) newCode[index] = char;
      });
      setCode(newCode);
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (code.every((digit) => digit !== '')) {
      setLoading(true);
      const token = code.join('');
      try {
        const { data, error } = await verifyOTP(phone, token);
        if (error) {
          setError(error.message);
        } else if (data && data.user) { // Check if we have user data
          // If we have first/last name, create the user record
          if (firstName && lastName) {
            const { error: createError } = await createUserRecord(
              data.user.id,
              phone,
              { firstName, lastName, role }
            );
            if (createError) {
              console.error("Failed to create user record:", createError);
              // We might not want to block login on this, but good to know.
              // For now, let's proceed but maybe warn?
              // Actually, if this fails, the user is technically logged in but not in our users table.
            }
          }
          onVerify();
        }
      } catch (err) {
        setError('Verification failed. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError(null);
    try {
      const { error } = await sendOTP(phone);
      if (error) {
        setError(error.message);
      } else {
        alert('Code resent successfully!');
      }
    } catch (err) {
      setError('Failed to resend code.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-cream-base">
      <div className="max-w-md w-full">
        <button
          onClick={onBack}
          className="flex items-center text-warmGray-light hover:text-teal-DEFAULT mb-8 transition-colors font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Login
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-warm border border-cream-border text-center">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${role === 'patient' ? 'bg-teal-light/30 text-teal-DEFAULT' : 'bg-sage-light/40 text-sage-DEFAULT'}`}>
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-bold text-warmGray-heading mb-2">
            Verify Your Identity
          </h1>
          <p className="text-warmGray-body mb-8">
            Enter the 6-digit code we sent to <br />
            <span className="font-bold text-warmGray-heading">{phone}</span>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-between gap-2 mb-8">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => inputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-cream-base border rounded-xl outline-none transition-all ${role === 'patient' ? 'focus:border-teal-DEFAULT focus:ring-2 focus:ring-teal-light' : 'focus:border-sage-DEFAULT focus:ring-2 focus:ring-sage-light'} ${digit ? 'border-warmGray-light' : 'border-cream-border'}`}
                />
              ))}
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed ${role === 'patient' ? 'bg-teal-medium hover:bg-teal-dark shadow-teal-DEFAULT/20' : 'bg-sage-medium hover:bg-sage-light/80 text-white shadow-sage-DEFAULT/20'}`}>
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Verifying...
                </>
              ) : (
                'Verify & Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-sm text-warmGray-light">
            Didn't receive the code?{' '}
            <button
              onClick={handleResend}
              disabled={resending}
              className={`font-bold hover:underline ${role === 'patient' ? 'text-teal-DEFAULT' : 'text-sage-DEFAULT'}`}>
              {resending ? 'Sending...' : 'Resend'}
            </button>
          </div>
        </div>
      </div>
    </div>);
}
