import React from 'react';
import {
  Video,
  Building2,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Pill,
  Sun,
  LogOut,
  Phone } from
'lucide-react';
interface PatientDashboardProps {
  onLogout: () => void;
}
export function PatientDashboard({ onLogout }: PatientDashboardProps) {
  return (
    <div className="min-h-screen w-full bg-cream-base pb-20">
      {/* Header */}
      <header className="px-6 py-6 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-medium rounded-full flex items-center justify-center text-white font-bold">
              MP
            </div>
            <span className="font-bold text-warmGray-heading">Clearwater Health</span>
          </div>
          <button
            onClick={onLogout}
            className="text-sm font-medium text-warmGray-body hover:text-teal-DEFAULT transition-colors">

            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 pt-8">
        {/* Welcome Section */}
        <div className="mb-10 flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-warmGray-heading mb-2">
              Hello, Michael
            </h1>
            <p className="text-lg text-warmGray-body">
              We're here for you. How are you feeling today?
            </p>
          </div>
          <button className="px-6 py-3 bg-teal-medium hover:bg-teal-dark text-white rounded-xl font-bold transition-colors shadow-lg shadow-teal-DEFAULT/20 whitespace-nowrap">
            Fill Out Form
          </button>
        </div>

        {/* Main Appointment Widget */}
        <div className="bg-white rounded-[2rem] shadow-warm overflow-hidden mb-10 border border-cream-border">
          <div className="bg-teal-medium/10 p-6 flex items-center gap-3 border-b border-teal-light/20">
            <Calendar className="w-5 h-5 text-teal-dark" />
            <span className="font-bold text-teal-dark">Up Next</span>
          </div>

          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-warmGray-heading mb-2">
                  Dr. Sarah Chen
                </h2>
                <p className="text-warmGray-body mb-4">Cardiology Department</p>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-warmGray-heading">
                    <div className="w-8 h-8 rounded-full bg-cream-card flex items-center justify-center">
                      <Clock className="w-4 h-4 text-teal-DEFAULT" />
                    </div>
                    <span className="font-medium">Today, 2:30 PM</span>
                  </div>
                  <div className="flex items-center gap-3 text-warmGray-heading">
                    <div className="w-8 h-8 rounded-full bg-cream-card flex items-center justify-center">
                      <Video className="w-4 h-4 text-teal-DEFAULT" />
                    </div>
                    <span className="font-medium">Virtual Consultation</span>
                  </div>
                </div>
              </div>

              <div className="bg-cream-base rounded-2xl p-6 md:w-64 flex flex-col items-center text-center border border-cream-border">
                <div className="w-16 h-16 bg-teal-light/30 rounded-full flex items-center justify-center mb-4 text-teal-dark">
                  <Video className="w-8 h-8" />
                </div>
                <p className="text-sm text-warmGray-body mb-4">
                  Your care team is ready. You can join the waiting room 10
                  minutes early.
                </p>
                <button className="w-full py-3 bg-teal-medium hover:bg-teal-dark text-white rounded-xl font-bold transition-colors shadow-lg shadow-teal-DEFAULT/20">
                  Join Call
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-cream-border flex items-center justify-between text-sm text-warmGray-light">
              <span>Appointment ID: #88392</span>
              <button className="text-teal-DEFAULT font-bold hover:underline">
                Reschedule
              </button>
            </div>
          </div>
        </div>

        {/* Medications (Prominent full-width card) */}
        <div className="mb-10">
          <div className="bg-white p-8 rounded-3xl shadow-warm border border-cream-border hover:border-teal-light transition-colors">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-sage-light/40 rounded-2xl flex items-center justify-center text-sage-DEFAULT transition-colors">
                  <Pill className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-warmGray-heading mb-1">Medications</h3>
                  <p className="text-warmGray-body">Next dose: Metoprolol (50mg) with dinner.</p>
                </div>
              </div>
              <span className="text-sm font-bold bg-sage-light/30 text-sage-DEFAULT px-3 py-1 rounded-full">On Track</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <p className="text-warmGray-body mb-4">Here are your current medications, upcoming doses, and any important notes. Contact your care team or pharmacist if you have questions.</p>
                <button className="text-teal-DEFAULT font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  View Schedule <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="md:col-span-1 flex flex-col gap-3">
                <div className="bg-cream-card rounded-lg p-4 border border-cream-border">
                  <p className="text-sm font-medium text-warmGray-heading">Next dose</p>
                  <p className="text-warmGray-body">Today, 6:00 PM</p>
                </div>
                <div className="bg-cream-card rounded-lg p-4 border border-cream-border">
                  <p className="text-sm font-medium text-warmGray-heading">Refill</p>
                  <p className="text-warmGray-body">2 months left</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Footer */}
        <div className="bg-teal-dark rounded-3xl p-8 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-teal-light rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-3">Need immediate help?</h3>
            <p className="text-teal-light mb-6 max-w-md mx-auto">
              Our nurse line is available 24/7 for any urgent questions or
              concerns.
            </p>
            <button className="bg-white text-teal-dark px-6 py-3 rounded-xl font-bold hover:bg-teal-light transition-colors inline-flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Call Nurse Line
            </button>
          </div>
        </div>
      </main>
    </div>);

}