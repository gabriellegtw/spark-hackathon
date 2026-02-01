import React, { useState } from 'react';
import { RoleSelectPage } from './pages/RoleSelectPage';
import { SignUpPage } from './pages/SignUpPage';
import { LoginPage } from './pages/LoginPage';
import { VerifyCodePage } from './pages/VerifyCodePage';
import { NurseDashboard } from './pages/NurseDashboard';
import { PatientDashboard } from './pages/PatientDashboard';
import { CallNursePage } from './pages/CallNursePage';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';



type AuthStep = 'role-select' | 'sign-up' | 'login' | 'verify' | 'dashboard' | 'calling-nurse' | 'reschedule';
type UserRole = 'nurse' | 'patient';
import { signOut, getUserProfile, getCurrentUser } from './lib/auth';
export function App() {
  const [authStep, setAuthStep] = useState<AuthStep>('role-select');
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  type CalendarValue = Date | null | Date[];
  const [date, setDate] = useState<Date | null>(new Date());
  // Navigation handlers
  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setAuthStep('login');
  };

  const handleSignUpClick = () => {
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setAuthStep('sign-up');
  };

  const handleSignUpSubmit = (role: UserRole, phone: string, first: string, last: string) => {
    setSelectedRole(role);
    setPhoneNumber(phone);
    setFirstName(first);
    setLastName(last);
    setAuthStep('verify');
  };
  const handleLoginSubmit = (phone: string) => {
    setPhoneNumber(phone);
    setFirstName('');
    setLastName('');
    setAuthStep('verify');
  };
  const handleVerifySuccess = async () => {
    // If we don't have the name (login flow), fetch it
    if (!firstName || !lastName) {
      const { user } = await getCurrentUser();
      if (user) {
        const { data } = await getUserProfile(user.id, selectedRole);
        if (data) {
          setFirstName(data.first_name);
          setLastName(data.last_name);
        }
      }
    }
    setAuthStep('dashboard');
  };

  const handleRescheduleClick = () => {
    console.log('Reschedule clicked');
    setAuthStep('reschedule');
  };
  const handleLogout = async () => {
    await signOut();
    setAuthStep('role-select');
    setPhoneNumber('');
  };
  const handleBackToRoleSelect = () => {
    setAuthStep('role-select');
  };
  const handleBackToLogin = () => {
    setAuthStep('login');
  };
  const handleCallNurse = () => {
    setAuthStep('calling-nurse');
  }
  const handleEndCall = () => {
    setAuthStep('dashboard');
  }
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
          firstName={firstName}
          lastName={lastName}
          onBack={handleBackToLogin}
          onVerify={handleVerifySuccess} />
      }


      {authStep === 'calling-nurse' &&
        <CallNursePage onEndCall={handleEndCall} />
      }

      {authStep === 'calling-nurse' &&
        <CallNursePage onEndCall={handleEndCall} />
      }

      {authStep === 'dashboard' && selectedRole === 'nurse' &&
        <NurseDashboard onLogout={handleLogout} userName={firstName} />
      }

      {authStep === 'dashboard' && selectedRole === 'patient' &&
        <PatientDashboard
          onLogout={handleLogout}
          onCallNurse={handleCallNurse}
          userName={firstName}
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
