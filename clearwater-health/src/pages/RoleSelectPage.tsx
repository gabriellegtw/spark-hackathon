import React from 'react';
import { Heart, Stethoscope, ArrowRight, UserPlus } from 'lucide-react';
interface RoleSelectPageProps {
  onSelectRole: (role: 'patient' | 'nurse') => void;
  onSignUp: () => void;
}
export function RoleSelectPage({
  onSelectRole,
  onSignUp
}: RoleSelectPageProps) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-cream-base">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-teal-light/30 rounded-full mb-6">
            <Heart className="w-8 h-8 text-teal-DEFAULT fill-teal-DEFAULT/20" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-warmGray-heading mb-4">
            Welcome to Clearview Health
          </h1>
          <p className="text-xl text-warmGray-body max-w-2xl mx-auto">
            We're here to support your journey to better health. Please select
            your portal to continue.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12">
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
              Log In to Patient Portal <ArrowRight className="w-5 h-5 ml-2" />
            </div>
          </button>

          {/* Healthcare Worker Card */}
          <button
            onClick={() => onSelectRole('nurse')}
            className="group relative flex flex-col items-center p-10 bg-white rounded-3xl border-2 border-cream-border hover:border-teal-light shadow-warm hover:shadow-warm-hover hover:-translate-y-1 transition-all duration-300 text-left w-full"
            aria-label="I am a healthcare worker">

            <div className="w-24 h-24 bg-sage-light/40 rounded-full flex items-center justify-center mb-6 group-hover:bg-sage-light/60 transition-colors">
              <Stethoscope className="w-12 h-12 text-sage-DEFAULT" />
            </div>
            <h2 className="text-2xl font-bold text-warmGray-heading mb-3">
              I'm a Healthcare Worker
            </h2>
            <p className="text-warmGray-body text-center mb-8">
              Manage patient care, view schedules, and coordinate with your
              team.
            </p>
            <div className="mt-auto flex items-center text-sage-DEFAULT font-bold group-hover:gap-2 transition-all">
              Log In to Healthcare Portal{' '}
              <ArrowRight className="w-5 h-5 ml-2" />
            </div>
          </button>
        </div>

        {/* Sign Up Section */}
        <div className="text-center">
          <p className="text-warmGray-body mb-4">New to Clearwater Health?</p>
          <button
            onClick={onSignUp}
            className="inline-flex items-center justify-center px-8 py-3 bg-white border-2 border-teal-DEFAULT text-teal-DEFAULT hover:bg-teal-light/10 rounded-xl font-bold transition-colors shadow-sm hover:shadow-md">

            <UserPlus className="w-5 h-5 mr-2" />
            Create an Account
          </button>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-warmGray-light text-sm">
          <p>© 2026 Clearview Health. Designed with care.</p>
        </div>
      </div>
    </div>);

}