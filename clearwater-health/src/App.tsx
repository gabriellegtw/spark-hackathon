import React, { useState } from 'react';
import { RoleSelectPage } from './pages/RoleSelectPage';
import { SignUpPage } from './pages/SignUpPage';
import { LoginPage } from './pages/LoginPage';
import { VerifyCodePage } from './pages/VerifyCodePage';
import { NurseDashboard } from './pages/NurseDashboard';
import { PatientDashboard } from './pages/PatientDashboard';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';



type AuthStep = 'role-select' | 'sign-up' | 'login' | 'verify' | 'dashboard' | 'reschedule';
type UserRole = 'nurse' | 'patient';
export function App() {
  const [authStep, setAuthStep] = useState<AuthStep>('role-select');
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [phoneNumber, setPhoneNumber] = useState('');
  type CalendarValue = Date | null | Date[];
  const [date, setDate] = useState<Date | null>(new Date());
  // Navigation handlers
  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setAuthStep('login');
  };
  const handleSignUpClick = () => {
    setAuthStep('sign-up');
  };
  const handleSignUpSubmit = (role: UserRole, phone: string) => {
    setSelectedRole(role);
    setPhoneNumber(phone);
    setAuthStep('verify');
  };
  const handleLoginSubmit = (phone: string) => {
    setPhoneNumber(phone);
    setAuthStep('verify');
  };
  const handleVerifySuccess = () => {
    setAuthStep('dashboard');
  };
  const handleRescheduleClick = () => {
    console.log('Reschedule clicked');
    setAuthStep('reschedule');
  };
  const handleLogout = () => {
    setAuthStep('role-select');
    setPhoneNumber('');
  };
  const handleBackToRoleSelect = () => {
    setAuthStep('role-select');
  };
  const handleBackToLogin = () => {
    setAuthStep('login');
  };
  return (
    <div className="font-sans antialiased text-warmGray-body bg-cream-base min-h-screen">
      {authStep === 'role-select' &&
      <RoleSelectPage
        onSelectRole={handleRoleSelect}
        onSignUp={handleSignUpClick} />

      }

      {authStep === 'sign-up' &&
      <SignUpPage
        onBack={handleBackToRoleSelect}
        onSubmit={handleSignUpSubmit} />

      }

      {authStep === 'login' &&
      <LoginPage
        role={selectedRole}
        onBack={handleBackToRoleSelect}
        onSubmit={handleLoginSubmit} />

      }

      {authStep === 'verify' &&
      <VerifyCodePage
        role={selectedRole}
        phone={phoneNumber}
        onBack={handleBackToLogin}
        onVerify={handleVerifySuccess} />

      }

      {authStep === 'dashboard' && selectedRole === 'nurse' &&
      <NurseDashboard onLogout={handleLogout} />
      }

      {authStep === 'dashboard' && selectedRole === 'patient' &&
      <PatientDashboard 
      onLogout={handleLogout}
      onReschedule={handleRescheduleClick} />
      }

      {authStep === 'reschedule' && (
        
        <div className="max-w-3xl mx-auto px-6 pt-8">
          <button 
            onClick={() => setAuthStep('dashboard')}
            className="mb-6 text-teal-DEFAULT font-bold flex items-center gap-2"
          >
            ← Back to Dashboard
          </button>
          
          <div className="bg-white rounded-[2rem] p-10 shadow-warm border border-cream-border text-center">
            <h2 className="text-2xl font-bold text-warmGray-heading mb-4">Select a New Date</h2>
            <p className="text-warmGray-body mb-8">Calendar integration goes here.</p>
            
            <div className="aspect-square max-w-sm mx-auto bg-cream-card rounded-2xl flex items-center justify-center border-2 border-dashed border-cream-border">
              <div className="calendar-container w-full max-w-md shadow-sm rounded-2xl overflow-hidden border border-cream-border p-4 bg-white">
                <Calendar 
                  onChange={(value) => setDate(value as Date)}
                  value={date}
                  className="mx-auto border-none font-sans"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>);

}