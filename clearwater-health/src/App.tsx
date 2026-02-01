<<<<<<< Updated upstream
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
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

>>>>>>> Stashed changes
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
