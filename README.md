# HostelHub 🏨

**HostelHub** is a full-stack Hostel Management System designed to bridge the gap between hostel administration and students. It provides a beautiful, modern dashboard for both admins and students to manage daily hostel life, ranging from food menus to complaints and expenses.

## 🌟 Key Features

### For Students
* **Real-time Food Menu & Reviews:** View today's breakfast, lunch, and dinner menu directly from the administration, and provide live, rated feedback.
* **Profile Management:** Instantly update emergency contacts, personal details, and sign out securely.
* **Complaints System:** Easily track and log hostel complaints with importance levels for fast resolution.
* **Laundry Management:** Submit laundry orders, track real-time status (Received → Washing → Ready → Collected), and get notified when laundry is ready for pickup.
* **Lost & Found:** Browse reported lost items and report found items with your contact details to help others.
* **Expenses Tracker:** View personalized expense records assigned by administration.
* **Announcements:** Stay updated with hostel announcements categorized by importance (Normal, Important, Urgent).
* **Dashboard Overview:** Dynamic welcome with your name, quick view of pending fees, room details, and recent announcements.

### For Administrators
* **Secure Admin Login:** Dedicated admin sign-in portal with credential-based authentication and route protection.
* **Student Directory:** Beautifully organized overview of all registered students, their fee statuses, and parent contact details.
* **Live Food & Meals Manager:** Set the daily menu for Breakfast, Lunch, and Dinner. Changes reflect instantly on the student portal.
* **Complaints Manager:** View, manage, and resolve student complaints with status tracking.
* **Laundry Manager:** Receive student laundry orders and progress them through status stages. Students get notified automatically.
* **Lost & Found Manager:** Track lost items, see who found them (with phone number), and manage item statuses (Lost → Found → Returned).
* **Student Expenses:** Assign and manage expense records for individual students.
* **Announcements:** Create and manage hostel-wide announcements with importance levels.
* **Admin Profile:** Editable admin profile with personal and work information, plus secure sign out.

## 🛠 Tech Stack

* **Frontend:** React.js, Vite, Tailwind CSS, Lucide React (Icons)
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL (Hosted on Render via `pg-pool`)
* **Authentication:** Firebase Auth (Students), Credential-based (Admin)
* **Deployment:**
  * Frontend: Vercel
  * Backend: Render

## 📋 Prerequisites

Before running the application locally, ensure you have the following installed:
* Node.js (v16.0 or higher)
* PostgreSQL
* A Firebase Project (for Authentication)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Aditya031906/HostelHub.git
cd HostelHub
```

### 2. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` directory and add your PostgreSQL database URL:
   ```env
   DATABASE_URL=postgresql://your_db_username:your_db_password@host:port/database_name
   ```
4. Start the backend server (This will also automatically auto-initialize your database tables via `db.js`):
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Frontend` directory with your Firebase config and Backend API URL:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id

   # Set this to http://localhost:5000 if running locally, or your live Render URL
   VITE_API_URL=http://localhost:5000
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173/`

## 📂 Project Structure

```
HostelHub/
│
├── Backend/                 # Express.js REST API
│   ├── src/
│   │   ├── config/          # Database configuration (db.js)
│   │   ├── controllers/     # Business logic handler functions
│   │   ├── models/          # Database queries & table abstractions
│   │   └── routes/          # API Endpoint routing
│   └── index.js             # Main backend entry point
│
└── Frontend/                # Vite + React Frontend Application
    ├── src/
    │   ├── pages/           # All page views
    │   │   ├── Home.jsx              # Landing page
    │   │   ├── Login.jsx             # Student sign in (dark theme)
    │   │   ├── Signup.jsx            # Student sign up (dark theme)
    │   │   ├── AdminLogin.jsx        # Admin sign in portal
    │   │   ├── StudentDashboard.jsx  # Student main dashboard
    │   │   ├── AdminDashboard.jsx    # Admin main dashboard
    │   │   ├── DashboardOverview.jsx # Student dashboard home
    │   │   ├── Profile.jsx           # Student profile
    │   │   ├── AdminProfile.jsx      # Admin profile
    │   │   ├── Complaints.jsx        # Student complaints
    │   │   ├── AdminComplaints.jsx   # Admin complaints manager
    │   │   ├── Laundry.jsx           # Student laundry
    │   │   ├── AdminLaundry.jsx      # Admin laundry manager
    │   │   ├── LostAndFound.jsx      # Student lost & found
    │   │   ├── AdminLostFound.jsx    # Admin lost & found manager
    │   │   ├── FoodReviews.jsx       # Student food reviews
    │   │   ├── AdminFoodAndMeals.jsx # Admin food menu manager
    │   │   ├── Expenses.jsx          # Student expenses
    │   │   ├── AdminExpenses.jsx     # Admin expenses manager
    │   │   └── Announcements.jsx     # Student announcements
    │   ├── firebase.js      # Firebase connection & auth config
    │   └── config.js        # Global configs (e.g. dynamic API_URL selection)
    ├── tailwind.config.js   # Tailwind design tokens
    └── package.json
```

## 🤝 Contribution
Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit PRs.

## 📝 License
This project is open-source and available under the MIT License.
