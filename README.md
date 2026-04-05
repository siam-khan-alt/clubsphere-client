# 🌍 ClubSphere – Membership & Event Management

**ClubSphere** is a modern full-stack MERN application designed for local communities to discover, join, and manage clubs (Photography, Tech, Sports, etc.). It facilitates seamless interaction between club managers and members with integrated secure payments.

## 🔗 Project Links
- **🌍 Live Client:** [ClubSphere Web](https://clubsphere-client.vercel.app/)
- **💻 Server API:** [Server Endpoint](https://clubsphere-server-v4xq.vercel.app/)
- **🐙 Client Repo:** [GitHub Client](https://github.com/siam-khan-alt/clubsphere-client)
- **🖥️ Server Repo:** [GitHub Server](https://github.com/siam-khan-alt/clubsphere-server)

---

## 📸 Project Showcases (Dark & Light Experience)

<h3> 1. Home Page & Hero Experience </h3>

<div align="center">
  <table>
    <tr>
      <td align="center" width="50%">
        <p><b>☀️ Light Mode</b></p>
        <a href="https://i.ibb.co.com/ychmrgWJ/image.png">
          <img src="https://i.ibb.co.com/ychmrgWJ/image.png" 
               alt="Home Light" 
               height="450" />
        </a>
      </td>
      <td align="center" width="50%">
        <p><b>🌙 Dark Mode</b></p>
        <a href="https://i.ibb.co.com/NgyMDGVf/image.png">
          <img src="https://i.ibb.co.com/NgyMDGVf/image.png" 
               alt="Home Dark" 
               height="450" />
        </a>
      </td>
    </tr>
  </table>
  <p><i>(Tip: Click on the images to see the full long-page view)</i></p>
</div>
  <br />

  <h3>2. Member Dashboard </h3>
  <table width="100%">
    <tr>
      <td width="50%">
        <img src="https://i.ibb.co.com/35Kjs8kr/image.png" alt="Member Light" />
      </td>
      <td width="50%">
        <img src="https://i.ibb.co.com/Y4TdPKyq/image.png" alt="Member Dark" />
      </td>
    </tr>
  </table>

  <br />

  <h3>3. Club Manager Dashboard </h3>
  <table width="100%">
    <tr>
      <td width="50%">
        <img src="https://i.ibb.co.com/Xfg19f12/image.png" alt="Club Manager Light" />
      </td>
      <td width="50%">
        <img src="https://i.ibb.co.com/zh0cCNgc/image.png" alt="Club Manager Dark" />
      </td>
    </tr>
  </table>

  <br />

  <h3>4. Admin Dashboard </h3>
  <table width="100%">
    <tr>
      <td width="50%">
        <img src="https://i.ibb.co.com/v4PNKdtX/image.png" alt="Admin Light" />
      </td>
      <td width="50%">
        <img src="https://i.ibb.co.com/xRprQYf/image.png" alt="Admin Dark" />
      </td>
    </tr>
  </table>
  
  <p><i>Premium glassmorphism and theme toggles are implemented across all dashboard layers.</i></p>
</div>

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
   cd clubsphere-client
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




