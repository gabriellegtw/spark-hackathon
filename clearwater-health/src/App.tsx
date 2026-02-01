import React, { useState } from 'react';
import { RoleSelectPage } from './pages/RoleSelectPage';
import { SignUpPage } from './pages/SignUpPage';
import { LoginPage } from './pages/LoginPage';
import { VerifyCodePage } from './pages/VerifyCodePage';
import { NurseDashboard } from './pages/NurseDashboard';
import { PatientDashboard } from './pages/PatientDashboard';
import { CallNursePage } from './pages/CallNursePage';
type AuthStep = 'role-select' | 'sign-up' | 'login' | 'verify' | 'dashboard' | 'calling-nurse';
type UserRole = 'nurse' | 'patient';
import { signOut, getUserProfile, getCurrentUser } from './lib/auth';
export function App() {
  const [authStep, setAuthStep] = useState<AuthStep>('role-select');
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

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

      {authStep === 'dashboard' && selectedRole === 'nurse' &&
        <NurseDashboard onLogout={handleLogout} userName={firstName} />
      }

      {authStep === 'dashboard' && selectedRole === 'patient' &&
        <PatientDashboard
          onLogout={handleLogout}
          onCallNurse={handleCallNurse}
          userName={firstName}
        />
      }
    </div>);

}
