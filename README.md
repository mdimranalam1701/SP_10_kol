# GymSaaS Platform

GymSaaS is a premium, role-based fitness management platform designed for gym owners, personal trainers, and gym members. It features a modern, dark-mode glassmorphic aesthetic built to impress and convert.

## 🏗️ Architecture

To keep the platform lightweight and easy to maintain, the entire ecosystem has been consolidated into exactly **three main frontend applications**:

1. **Admin Dashboard (`frontend/admin-dashboard`)**
   - **Type:** Web Application (Next.js)
   - **Role:** Gym Owner / Administrator
   - **Features:** Finance overview, subscription plans CRM, member management, and high-level analytics.

2. **Unified Web App (`frontend/web-app`)**
   - **Type:** Web Application (Next.js)
   - **Role:** Customers & Trainers (Role-based routing)
   - **Features:** 
     - *For Customers:* Diet plans, weight tracking, active subscriptions, and messaging trainers.
     - *For Trainers:* Managing assigned clients, viewing daily schedules, and tracking payouts.
   - **Note:** This web app serves as the primary interface for iPhone users and desktop users, ensuring a native-like responsive experience on mobile browsers.

3. **Unified Mobile App (`frontend/mobile-app`)**
   - **Type:** Android App (React Native / Expo)
   - **Role:** Customers & Trainers
   - **Features:** The exact same role-based features as the Web App, but packaged as a native Android APK for a seamless on-the-go experience.

4. **Backend API (`backend`)**
   - **Type:** Node.js / NestJS API
   - **Features:** Powers the authentication, database operations (MongoDB), and business logic for all frontend clients.

---

## 🚀 How to Run the Project Locally

This project uses **Turborepo** to manage the monorepo workspace. You can start all services simultaneously or run them individually.

### Prerequisites
- Node.js (v18+)
- npm (v10+)
- Expo CLI (for the mobile app)

### 1. Install Dependencies
Navigate to the root directory and install all dependencies for the entire monorepo:
```bash
npm install
```

### 2. Start Everything
To start all frontend applications and the backend API at the same time, simply run:
```bash
npm run dev
```

### 3. Run Individual Applications

If you prefer to run the applications individually, you can navigate into their specific folders:

**Admin Dashboard (Next.js):**
```bash
cd frontend/admin-dashboard
npm run dev
# Runs on http://localhost:3001
```

**Unified Web App (Next.js):**
```bash
cd frontend/web-app
npm run dev
# Runs on http://localhost:3000
```

**Unified Mobile App (Expo / React Native):**
```bash
cd frontend/mobile-app
npm start
# Opens the Expo Metro Bundler. 
# You can press 'a' to open on an Android Emulator, or scan the QR code with the Expo Go app on your Android device.
```

**Backend API:**
```bash
cd backend
npm run start:dev
# Runs on http://localhost:8000
```

---

## 🎨 Tech Stack
- **Frontend Frameworks:** Next.js (React), React Native (Expo)
- **Styling:** Tailwind CSS (Dark Mode Glassmorphism)
- **Backend:** Node.js, NestJS
- **Database:** MongoDB
- **File Storage:** Cloudinary
- **Monorepo Management:** Turborepo
