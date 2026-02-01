import React, { useState } from 'react';
import {
  Bell,
  Search,
  Filter,
  MoreHorizontal,
  Clock,
  Activity,
  AlertTriangle,
  User,
  LogOut,
  Zap
} from
  'lucide-react';
interface NurseDashboardProps {
  onLogout: () => void;
  userName?: string;
}

type UrgencyLevel = 'Low' | 'Medium' | 'High';

type PatientStatus =
  | { type: 'Stable' }
  | { type: 'Needs Attention' }
  | { type: 'Urgent'; level: UrgencyLevel };

interface Patient {
  id: string;
  name: string;
  room: string;
  status: PatientStatus;
  lastCheck: string;
  initials: string;
  age: number;
  diagnosis: string;
}
const patients: Patient[] = [
  {
    id: '1',
    name: 'Eleanor Rigby',
    room: '304',
    status: { type: 'Stable' },
    lastCheck: '15m ago',
    initials: 'ER',
    age: 72,
    diagnosis: 'Post-op Recovery'
  },
  {
    id: '2',
    name: 'David D Souza',
    room: '305',
    status: { type: 'Needs Attention' },
    lastCheck: '45m ago',
    initials: 'DD',
    age: 42,
    diagnosis: 'Observation'
  },
  {
    id: '3',
    name: 'Sarah Connor',
    room: '308',
    status: { type: 'Urgent', level: 'High' },
    lastCheck: '5m ago',
    initials: 'SC',
    age: 35,
    diagnosis: 'Acute Care'
  },
  {
    id: '4',
    name: 'Miles Morales',
    room: '310',
    status: { type: 'Stable' },
    lastCheck: '1h ago',
    initials: 'MM',
    age: 19,
    diagnosis: 'Routine Check'
  },
  {
    id: '5',
    name: 'Diana Prince',
    room: '312',
    status: { type: 'Urgent', level: 'Medium' },
    lastCheck: '20m ago',
    initials: 'DP',
    age: 28,
    diagnosis: 'Recovery'
  },
  {
    id: '6',
    name: 'Tony Stark',
    room: '315',
    status: { type: 'Needs Attention' },
    lastCheck: '30m ago',
    initials: 'TS',
    age: 50,
    diagnosis: 'Cardiac Monitor'
  }];

export function NurseDashboard({ onLogout, userName = "Sarah" }: NurseDashboardProps) {
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate initials logic
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  const initials = getInitials(userName);

  const handleEmergencyClick = () => {
    if (emergencyMode) {
      // If already active, show confirm to deactivate
      setShowConfirmModal(true);
    } else {
      // If not active, show confirm to activate
      setShowConfirmModal(true);
    }
  };
  const handleConfirm = () => {
    const newMode = !emergencyMode;
    setEmergencyMode(!emergencyMode);
    setShowConfirmModal(false);
    localStorage.setItem('emergencyMode', JSON.stringify(newMode));
  };
  const handleCancel = () => {
    setShowConfirmModal(false);
  };
  const getStatusColor = (status: PatientStatus) => {
    if (status.type === 'Stable') {
      return 'bg-teal-400 text-sage-DEFAULT border-sage-light';
    }
    if (status.type === 'Needs Attention') {
      return 'bg-amber-100 text-amber-600 border-amber-200';
    }
    if (status.type === 'Urgent') {
      if (status.level === 'High') return 'bg-red-500 text-gray-700 border-gray-800';
      if (status.level === 'Medium') return 'bg-red-400 text-gray-700 border-gray-800';
      return 'bg-red-300 text-gray-700 border-gray-500';
    }
    return 'bg-gray-100 text-gray-700';
  };

  const getStatusLabel = (status: PatientStatus) => {
    if (status.type === 'Urgent') {
      return `Urgent${status.level ? ` • ${status.level}` : ''}`;
    }
    return status.type;
  };
  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.room.includes(searchTerm)
  );
  return (
    <div
      className={`min-h-screen w-full transition-colors duration-700 ${emergencyMode ? 'bg-coral-light/20' : 'bg-cream-base'}`}>

      {/* Top Navigation */}
      <header
        className={`sticky top-0 z-10 px-6 py-4 transition-colors duration-500 ${emergencyMode ? 'bg-white/90 border-b-2 border-coral-DEFAULT' : 'bg-white/80 border-b border-cream-border'} backdrop-blur-md`}>

        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-teal-medium flex items-center justify-center text-white font-bold">
              {initials}
            </div>
            <div>
              <h1 className="text-lg font-bold text-warmGray-heading">
                Good morning, {userName}
              </h1>
              <p className="text-xs text-warmGray-body">
                Shift: 7:00 AM - 3:00 PM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleEmergencyClick}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all duration-300 ${emergencyMode ? 'bg-red-600 text-white shadow-lg shadow-red-600/40 scale-105 ring-2 ring-red-400 ring-offset-2' : 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/30'}`}>

              {emergencyMode ?
                <>
                  <AlertTriangle className="w-5 h-5 animate-pulse" />
                  <span>Emergency Active</span>
                </> :

                <>
                  <Zap className="w-5 h-5" />
                  <span>Emergency Storm</span>
                </>
              }
            </button>

            <button className="p-2.5 rounded-full bg-cream-card hover:bg-teal-light/20 text-warmGray-body transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-coral-DEFAULT rounded-full"></span>
            </button>

            <button
              onClick={onLogout}
              className="p-2.5 rounded-full bg-cream-card hover:bg-gray-200 text-warmGray-body transition-colors"
              title="Logout">

              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Emergency Banner */}
      {emergencyMode &&
        <div className="bg-coral-DEFAULT text-red-500 py-3 px-10 text-center-bold animate-pulse">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-bold">
              Emergency Protocol Active: Please prioritize tagged patients and
              check station monitors.
            </span>
          </div>
        </div>
      }

      <main className="max-w-7xl mx-auto p-6">
        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-warmGray-heading">
              Patient Overview
            </h2>
            <p className="text-warmGray-body">Unit 3B • 6 Patients Total</p>
          </div>

          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-cream-border w-full md:w-auto">
            <Search className="w-5 h-5 text-warmGray-light ml-2" />
            <input
              type="text"
              placeholder="Search patient or room..."
              className="bg-transparent border-none focus:ring-0 text-warmGray-heading placeholder-warmGray-light w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} />

            <button className="p-2 rounded-xl hover:bg-cream-base text-warmGray-body">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Patient Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) =>
            <div
              key={patient.id}
              className={`bg-white rounded-3xl p-6 border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-warm-hover group ${emergencyMode && patient.status.type === 'Urgent' ? 'border-coral-DEFAULT shadow-lg shadow-coral-DEFAULT/20' : 'border-cream-border shadow-warm'}`}>

              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold ${patient.status.type === 'Urgent' ? 'bg-coral-light/30 text-coral-DEFAULT' : 'bg-teal-light/30 text-teal-dark'}`}>

                    {patient.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-warmGray-heading">
                      {patient.name}
                    </h3>
                    <p className="text-sm text-warmGray-body">
                      Room {patient.room} • {patient.age}y
                    </p>
                  </div>
                </div>
                <button className="text-warmGray-light hover:text-teal-DEFAULT transition-colors">
                  <MoreHorizontal className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6">
                <div className="text-sm text-warmGray-light mb-1">
                  Diagnosis
                </div>
                <div className="font-medium text-warmGray-body">
                  {patient.diagnosis}
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(patient.status)}`}>

                  {getStatusLabel(patient.status)}
                </span>
                <div className="flex items-center gap-1 text-xs text-warmGray-light">
                  <Clock className="w-3 h-3" />
                  <span>Checked {patient.lastCheck}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-cream-border flex gap-2">
                <button className="flex-1 py-2 rounded-xl bg-cream-base hover:bg-teal-light/20 text-teal-dark font-semibold text-sm transition-colors">
                  View Chart
                </button>
                <button className="flex-1 py-2 rounded-xl bg-cream-base hover:bg-teal-light/20 text-teal-dark font-semibold text-sm transition-colors">
                  Log Vitals
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Confirmation Modal */}
      {showConfirmModal &&
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCancel} />


          {/* Modal */}
          <div className="relative bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${emergencyMode ? 'bg-teal-light/30' : 'bg-red-100'}`}>

                <AlertTriangle
                  className={`w-8 h-8 ${emergencyMode ? 'text-teal-DEFAULT' : 'text-red-600'}`} />

              </div>

              <h3 className="text-2xl font-bold text-warmGray-heading mb-3">
                {emergencyMode ?
                  'Deactivate Emergency Mode?' :
                  'Activate Emergency Mode?'}
              </h3>

              <p className="text-warmGray-body mb-8">
                {emergencyMode ?
                  'This will end the emergency protocol and return the dashboard to normal mode.' :
                  'This will activate emergency protocols across the unit. All staff will be notified and urgent patients will be prioritized.'}
              </p>

              <div className="flex gap-4 w-full">
                <button
                  onClick={handleCancel}
                  className="flex-1 py-3 px-6 rounded-xl bg-cream-base hover:bg-cream-card text-warmGray-heading font-semibold transition-colors border border-cream-border">

                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-colors ${emergencyMode ? 'bg-teal-medium hover:bg-teal-dark text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}>

                  {emergencyMode ? 'Yes, Deactivate' : 'Yes, Activate'}
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>);

}