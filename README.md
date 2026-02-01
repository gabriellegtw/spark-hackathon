# Clearwater Health  
**A Rural Care Coordination Dashboard for Clearwater Ridge**

Clearwater Health is a lightweight healthcare coordination platform designed to improve communication between patients and nurses in remote communities. Built for the challenges faced in Clearwater Ridge, the system supports virtual care, real-time patient monitoring, and rapid response during emergencies or travel disruptions. It helps prevent missed follow-ups, reduces avoidable emergencies, and keeps care connected even when roads are closed.

---

## 🚑 The Problem

Rural communities like Clearwater Ridge face frequent missed appointments, delayed follow-ups, and preventable emergency escalations due to limited staffing, long travel distances, and poor care coordination. Many systems still rely on phone calls and paper records, causing referrals and follow-ups to slip through the cracks. Severe winter weather can also block access to hospitals, increasing the need for strong local coordination and virtual care.

Clearwater Health focuses on **care continuity within the community** by giving nurses and patients a shared digital system for communication, monitoring, and rapid response.

---

## 🌟 Key Features

### 🏥 For Patients
- Dashboard with upcoming appointments and medication reminders  
- One-tap nurse call for non-emergency assistance  
- Access to virtual consultations  
- Secure OTP login using a mobile phone number  

### 👩‍⚕️ For Nurses
- Real-time patient list with health status indicators  
- Priority alerts for patients needing urgent attention  
- Emergency mode to highlight high-risk situations  
- Centralized monitoring during travel or weather disruptions  

### 🔐 Secure & Role-Based Access
- Separate patient and nurse interfaces  
- Passwordless OTP authentication via Supabase  
- Verified user profiles before accessing sensitive data  

---

## 💡 Why This Matters

Breakdowns in follow-up care and monitoring are major causes of preventable hospitalizations in rural areas. Clearwater Health improves visibility for nurses and makes it easier for patients to request help early, reducing the risk of late interventions and emergency escalations.

The system is designed to be:
- Low cost  
- Easy to deploy in small clinics  
- Usable even when travel to hospitals is not possible  

---

## 🛠 Tech Stack

- Frontend: React (Vite)  
- Styling: Tailwind CSS  
- Icons: Lucide React  
- Backend & Authentication: Supabase  
- Language: TypeScript  

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher  
- npm  

### Installation

git clone https://github.com/your-username/clearwater-health.git
cd clearwater-health
npm install

# Create .env and include
- VITE_SUPABASE_URL=your_supabase_url
- VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Start development server
npm run dev
