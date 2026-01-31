import React, { useState } from 'react';
import { RoleSelectPage } from './pages/RoleSelectPage';
import { SignUpPage } from './pages/SignUpPage';
import { LoginPage } from './pages/LoginPage';
import { VerifyCodePage } from './pages/VerifyCodePage';
import { NurseDashboard } from './pages/NurseDashboard';
import { PatientDashboard } from './pages/PatientDashboard';
type AuthStep = 'role-select' | 'sign-up' | 'login' | 'verify' | 'dashboard';
type UserRole = 'nurse' | 'patient';
export function App() {
  const [authStep, setAuthStep] = useState<AuthStep>('role-select');
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [phoneNumber, setPhoneNumber] = useState('');
  // Navigation handlers
  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setAuthStep('login');
  };
  const handleSignUpClick = () => {
    setAuthStep('sign-up');
  };
  const handleSignUpSubmit = (role: UserRole) => {
    setSelectedRole(role);
    setAuthStep('login');
  };
  const handleLoginSubmit = (phone: string) => {
    setPhoneNumber(phone);
    setAuthStep('verify');
  };
  const handleVerifySuccess = () => {
    setAuthStep('dashboard');
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
      <PatientDashboard onLogout={handleLogout} />
      }
    </div>);

}