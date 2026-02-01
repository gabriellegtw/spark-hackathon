# Clearwater Health  
**A Rural Care Coordination Dashboard for Clearwater Ridge**

Clearwater Health is a lightweight healthcare coordination platform built to improve communication between patients and nurses in remote communities. Designed for Clearwater Ridge, the system supports virtual care, real-time patient monitoring, and rapid response during emergencies or travel disruptions. It helps prevent missed follow-ups, reduces avoidable emergencies, and keeps care connected even when roads are closed.

---

## 🚑 The Problem We Address

Clearwater Ridge faces frequent missed appointments, delayed follow-ups, and emergency escalations due to poor care coordination, limited staffing, and travel barriers. Patients often rely on manual systems like phone calls and paper records, making it easy for referrals and follow-ups to fall through the cracks. Severe winter weather can completely cut off access to hospitals, increasing the need for virtual and locally coordinated care.

Clearwater Health focuses on **care continuity inside the community** by giving nurses and patients a shared digital system for monitoring health status, managing communication, and responding quickly to urgent needs.

---

## 🌟 Key Features

### 🏥 Patient Experience
- Dashboard with appointments and medication reminders  
- One-tap nurse call for non-emergency assistance  
- Access to virtual consultations  
- Secure OTP login using mobile number  

### 👩‍⚕️ Nurse Experience
- Real-time patient list with health status indicators  
- Priority alerts for patients needing urgent attention  
- Emergency mode to flag high-risk situations  
- Centralized monitoring during weather or transport disruptions  

### 🔐 Secure & Role-Based Access
- Separate patient and nurse interfaces  
- Passwordless OTP authentication via Supabase  
- Verified user profiles before accessing health data  

---

## 💡 Why This Matters

Our system directly addresses breakdowns in **follow-up care and monitoring**, which are major causes of preventable emergency hospitalizations in rural communities. By giving nurses visibility and patients an easy way to request help, Clearwater Health reduces the risk of missed care and late interventions.

It is designed to be:
- Low cost  
- Easy to deploy in small clinics  
- Usable even when travel to hospitals is impossible  

---

## 🛠 Tech Stack

- **Frontend:** React (Vite)  
- **Styling:** Tailwind CSS  
- **Icons:** Lucide React  
- **Backend & Auth:** Supabase  
- **Language:** TypeScript  



## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher  
- npm  

### Installation

git clone https://github.com/your-username/clearwater-health.git
cd clearwater-health
npm install

### create .env file
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

### start development server
npm run dev


## 📂 Project Structure
src/
├── lib/            # Supabase client and authentication logic
├── pages/          # Application pages (Dashboards, Auth, etc.)
│   ├── NurseDashboard.tsx
│   ├── PatientDashboard.tsx
│   ├── CallNursePage.tsx
│   └── ...
├── App.tsx         # Main application component and routing logic
└── index.css       # Global styles and Tailwind directives

For SPARK, our prototype demonstrates how a small nursing station can:

Monitor patients locally

Respond quickly to health concerns

Maintain care continuity during travel disruptions

This solution can scale by integrating referral tracking, transportation coordination, and remote specialist follow-ups in future iterations.