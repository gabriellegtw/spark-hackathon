import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
interface VerifyCodePageProps {
  role: 'patient' | 'nurse';
  phone: string;
  onBack: () => void;
  onVerify: () => void;
}
export function VerifyCodePage({
  role,
  phone,
  onBack,
  onVerify
}: VerifyCodePageProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
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
  e: React.KeyboardEvent<HTMLInputElement>) =>
  {
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.every((digit) => digit !== '')) {
      onVerify();
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
              {code.map((digit, index) =>
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
                className={`w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-cream-base border rounded-xl outline-none transition-all ${role === 'patient' ? 'focus:border-teal-DEFAULT focus:ring-2 focus:ring-teal-light' : 'focus:border-sage-DEFAULT focus:ring-2 focus:ring-sage-light'} ${digit ? 'border-warmGray-light' : 'border-cream-border'}`} />

              )}
            </div>

            <button
              type="submit"
              className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 ${role === 'patient' ? 'bg-teal-DEFAULT hover:bg-teal-dark shadow-teal-DEFAULT/20' : 'bg-sage-DEFAULT hover:bg-sage-light/80 text-white shadow-sage-DEFAULT/20'}`}>

              Verify & Sign In
            </button>
          </form>

          <div className="mt-6 text-sm text-warmGray-light">
            Didn't receive the code?{' '}
            <button
              className={`font-bold hover:underline ${role === 'patient' ? 'text-teal-DEFAULT' : 'text-sage-DEFAULT'}`}>

              Resend
            </button>
          </div>
        </div>
      </div>
    </div>);

}