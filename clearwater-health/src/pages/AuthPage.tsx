import React from 'react';
import { Heart, Stethoscope, ArrowRight } from 'lucide-react';
interface AuthPageProps {
  onSelectRole: (role: 'nurse' | 'patient') => void;
}
export function AuthPage({ onSelectRole }: AuthPageProps) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-cream-base">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-teal-light/30 rounded-full mb-6">
            <Heart className="w-8 h-8 text-teal-DEFAULT fill-teal-DEFAULT/20" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-warmGray-heading mb-4">
            Welcome to Clearwater Health
          </h1>
          <p className="text-xl text-warmGray-body max-w-2xl mx-auto">
            We're here to support your journey to better health. Let's get you
            to the right place.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Patient Card */}
          <button
            onClick={() => onSelectRole('patient')}
            className="group relative flex flex-col items-center p-10 bg-white rounded-3xl border-2 border-cream-border hover:border-teal-light shadow-warm hover:shadow-warm-hover hover:-translate-y-1 transition-all duration-300 text-left w-full"
            aria-label="I am a patient">

            <div className="w-24 h-24 bg-teal-light/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-teal-light/40 transition-colors">
              <Heart className="w-12 h-12 text-teal-DEFAULT" />
            </div>
            <h2 className="text-2xl font-bold text-warmGray-heading mb-3">
              I'm a Patient
            </h2>
            <p className="text-warmGray-body text-center mb-8">
              Access your care plan, appointments, and connect with your care
              team.
            </p>
            <div className="mt-auto flex items-center text-teal-DEFAULT font-bold group-hover:gap-2 transition-all">
              Enter Patient Portal <ArrowRight className="w-5 h-5 ml-2" />
            </div>
          </button>

          {/* Caregiver Card */}
          <button
            onClick={() => onSelectRole('nurse')}
            className="group relative flex flex-col items-center p-10 bg-white rounded-3xl border-2 border-cream-border hover:border-teal-light shadow-warm hover:shadow-warm-hover hover:-translate-y-1 transition-all duration-300 text-left w-full"
            aria-label="I am a caregiver">

            <div className="w-24 h-24 bg-sage-light/40 rounded-full flex items-center justify-center mb-6 group-hover:bg-sage-light/60 transition-colors">
              <Stethoscope className="w-12 h-12 text-sage-DEFAULT" />
            </div>
            <h2 className="text-2xl font-bold text-warmGray-heading mb-3">
              I'm a Caregiver
            </h2>
            <p className="text-warmGray-body text-center mb-8">
              Manage patient care, view schedules, and coordinate with your
              team.
            </p>
            <div className="mt-auto flex items-center text-sage-DEFAULT font-bold group-hover:gap-2 transition-all">
              Enter Staff Dashboard <ArrowRight className="w-5 h-5 ml-2" />
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-warmGray-light text-sm">
          <p>© 2026 Clearwater Health. Designed with care.</p>
        </div>
      </div>
    </div>);

}