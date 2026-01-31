import React, { useState } from 'react';
import { ArrowLeft, User, Phone, Check } from 'lucide-react';
interface SignUpPageProps {
  onBack: () => void;
  onSubmit: (role: 'patient' | 'nurse') => void;
}
export function SignUpPage({ onBack, onSubmit }: SignUpPageProps) {
  const [role, setRole] = useState<'patient' | 'nurse'>('patient');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would validate and submit to API here
    onSubmit(role);
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
                  placeholder="(555) 123-4567" />

              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 ${role === 'patient' ? 'bg-teal-medium hover:bg-teal-dark shadow-teal-DEFAULT/20' : 'bg-sage-medium hover:bg-sage-light/80 text-white shadow-sage-DEFAULT/20'}`}>

              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>);

}