
# FacesearchAI

### An AI-driven app that empowers users to search faces and explore premium features with integrated credits and subscription plans! [Watch Demo On Youtube](https://youtu.be/xNPEdx1Rr0Q)

![badge](https://img.shields.io/badge/version-1.0.0-brightgreen) [![React](https://img.shields.io/badge/Frontend-React-blue)](https://reactjs.org/) [![Express](https://img.shields.io/badge/Backend-Express-green)](https://expressjs.com/) [![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)](https://www.postgresql.org/) [![Stripe](https://img.shields.io/badge/Payment-Stripe-red)](https://stripe.com/) 
---

## 🚀 Project Overview
FacesearchAI is a full-stack web application that lets users search faces with AI while managing their credits and subscription plans. This app provides a seamless user experience with a dark mode, fully responsive design, and premium features via Stripe integration.

## ✨ Features
- **Landing Page**: Introducing the app and showcasing its value.
- **User Authentication**: Secure login and signup, with user data stored in PostgreSQL.
- **Image Upload & Face Search**: Users upload an image, conduct searches, and view search results.
- **Credits System**: Free users get 3 credits; premium users get 25 daily credits upon subscribing.
- **User Dashboard**: Displays credits, plan details, and user info.
- **Subscription Plan**: Stripe-powered checkout for the premium plan, with success and failure notifications.
- **Dark Mode Support**: Clean and modern UI in dark mode.
- **Account Management**: Users can delete accounts or log out, and all navigation flows redirect appropriately.

## 🛠 Tech Stack
### Backend
- **Express** - Node.js framework for building the backend
- **PostgreSQL** - Database for storing user information and tracking credits
- **Stripe** - For handling secure payment processing
- **bcryptjs, dotenv, cors** - Secure handling of user data and API requests

### Frontend
- **React (via Vite)** - Frontend JavaScript framework for building the UI
- **Redux Toolkit** - State management for user authentication and data flow
- **React Router DOM** - For protected routing
- **Stripe.js** - To seamlessly integrate Stripe on the frontend
- **Tailwind CSS** - Styling for responsive and modern UI components

### AI Tools Integrated
- **GPT, Claude, Vercel’s V0** - Generative and backend AI integrations for enhanced functionality

---

## 🚀 How to Run the Project

### Prerequisites
- Install **Node.js** and **npm**
- Install **PostgreSQL**

### Backend Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/monukd01dev/FacesearchAI-Persist-Ventures.git
   cd FacesearchAI-Persist-Ventures/facesearch-backend
   ```
2. **Environment Variables**: Create a `.env` file in the backend directory with the following variables:
   ```env
   PORT=your_backend_port
   STRIPE_SECRET_KEY=your_stripe_secret_key
   DB_NAME=your_database_name
   DB_PASSWORD=your_database_password
   DB_PORT=your_database_port
   ```
3. **Database Setup**:
   - Open PostgreSQL and create the `users` table:
     ```sql
     CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       first_name VARCHAR(50),
       last_name VARCHAR(50),
       email VARCHAR(100) UNIQUE,
       password VARCHAR(100),
       plan VARCHAR(10) DEFAULT 'free',
       remaining_credits INT DEFAULT 3
     );
     ```

4. **Start the Backend Server**:
   ```bash
   yarn
   yarn start
   ```

### Frontend Setup
1. **Navigate to the Client Directory**:
   ```bash
   cd ../facesearchai-client
   ```
2. **Install Dependencies and Start the Frontend**:
   ```bash
   npm install
   npm run dev
   ```

3. **Access the App**: Open `http://localhost:[port]` in your browser to interact with FacesearchAI.

---

## 🙏 Acknowledgments
Thank you to the **Persist Ventures Team** for this invaluable assignment, which helped me discover my superpower in AI-integrated web development. This project-based approach refined my skills, showing me why I am truly a well-rounded developer.

---

