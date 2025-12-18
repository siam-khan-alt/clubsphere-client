# 🌍 ClubSphere – Membership & Event Management

**ClubSphere** is a modern full-stack MERN application designed for local communities to discover, join, and manage clubs (Photography, Tech, Sports, etc.). It facilitates seamless interaction between club managers and members with integrated secure payments.

## 🔗 Project Links
- **🌍 Live Client:** [ClubSphere Web](https://clubsphere-client.vercel.app/)
- **💻 Server API:** [Server Endpoint](https://clubsphere-server-v4xq.vercel.app/)
- **🐙 Client Repo:** [GitHub Client](https://github.com/siam-khan-alt/clubsphere-client)
- **🖥️ Server Repo:** [GitHub Server](https://github.com/siam-khan-alt/clubsphere-server)

---

## 📖 Project Overview
ClubSphere is a comprehensive platform for managing local clubs and events. It supports three distinct user roles: **Admin**, **Club Manager**, and **Member**, each with a dedicated dashboard and specific functionalities.

### **Core Workflows:**
- **Members:** Browse approved clubs, join (free or paid via Stripe), and register for upcoming events.
- **Club Managers:** Create and manage their own clubs, organize events, and monitor participant lists.
- **Admin:** Review and approve/reject club requests, manage user roles, and monitor platform-wide transactions.

---

## ⚡ Key Features
- **Role-Based Access Control (RBAC):** Customized dashboards and private routes for Admin, Manager, and Members.
- **Secure Payments:** Integrated **Stripe (Test Mode)** for membership fees and paid event registrations.
- **Dynamic Data:** Real-time synchronization using **TanStack Query (v5)**.
- **Interactive UI:** Smooth animations with **Framer Motion** and responsive layouts using **Tailwind CSS**.
- **Advanced Searching:** Server-side search by club name and filtering by categories.
- **Data Visualization:** Business insights via **Recharts** on Admin and Manager overview pages.
- **JWT Authentication:** Secure API communication with Firebase token verification middleware.

---

## 🏠 Dashboard Breakdown

### **Admin Dashboard**
- **Overview:** Visual statistics of users, clubs, and total revenue.
- **Manage Users:** Elevate members to Managers or Admins.
- **Manage Clubs:** Approve or Reject club registration requests.

### **Club Manager Dashboard**
- **My Clubs:** CRUD operations for managing club profiles and fees.
- **Events Management:** Create, Update, and Delete events.
- **Event Registrations:** View list of participants (Email, Date, Status, Amount) for each event.

### **Member Dashboard**
- **Overview:** Quick access to joined clubs and upcoming events.
- **My Events:** Track registered events and their current status.
- **Payment History:** A dedicated log for all membership and event-related payments.

---

## 🛠️ Technologies & Packages

### **Frontend:**
- **Core:** React 19, Vite, React Router Dom
- **State & Data:** TanStack Query (v5), Axios
- **Form & Validation:** React Hook Form
- **Styling:** Tailwind CSS, DaisyUI, Framer Motion
- **Feedback:** React Hot Toast, SweetAlert2, React Spinners
- **Visuals:** Recharts, React Icons, React Modal

### **Backend:**
- **Runtime:** Node.js, Express.js
- **Database:** MongoDB
- **Security:** Firebase Admin SDK (JWT Token Verification)
- **Payments:** Stripe SDK

---



### 💻 Local Setup

1. **Clone the repository**  
 ```base
   git clone https://github.com/siam-khan-alt/clubsphere-client.git
   cd travel-ease
   npm install
   npm run dev
````


 2. **Setup Environment Variables**

#### Create a `.env` file in the root and add your Firebase config
```base
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_IMGBB_API_KEY
VITE_API_URL




