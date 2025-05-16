# 🚗 RideEase – Smart Carpooling & Ride Booking Platform

RideEase is a modern, community-driven carpooling and ride-sharing web application that connects commuters traveling in similar directions. Designed with sustainability, affordability, and convenience in mind, RideEase offers real-time ride booking, secure payments, and seamless user experiences for both passengers and carpool owners.

---

## 🌟 Features

### 👤 User Management
- Rider and Carpool Owner registration/login
- Role assignment and profile management
- View account summary and trip history

### 🛺 Ride Matching & Booking
- Search for available rides using Google Maps
- Filter rides by type (standard, pool, premium) and seat availability
- Join or create rides dynamically with real-time updates

### 💳 Secure Payment
- Stripe-integrated payment flow with support for Google Pay
- Instant booking confirmation after payment
- Simulated payment backend with error handling and validation

### 🛰️ Real-Time Tracking
- GPS-enabled live route tracking
- Route optimization for carpool owners
- UI overlay for dynamic ride paths

### 📣 Feedback & Promotions
- Submit ratings and feedback after a trip
- In-app customer support system
- Push promotional notifications and offers

---

## 📁 Project Structure
```bash
rideease-frontend/
│
├── public/
├── src/
│ ├── components/
│ ├── routes/
│ │ └── PaymentPg/
│ │ ├── Payment.js
│ │ └── Payment.css
│ └── service/
│ └── RideService.js
└── .env

rideease-backend/
│
├── src/
│ ├── routes/
│ │ ├── auth.routes.js
│ │ ├── hopin.routes.js
│ │ └── payment.js
│ ├── models/
│ ├── controllers/
│ ├── db/
│ │ └── connection.js
│ └── server.js
└── .env
```
---

## 🛠️ Technologies Used

### Frontend
- React.js
- Google Maps JavaScript API
- Stripe.js & React Stripe Elements
- CSS3

### Backend
- Node.js + Express.js
- MongoDB with Mongoose
- Stripe Server SDK
- Socket.io (for future chat/alerts integration)

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js & npm
- MongoDB (local or Atlas)
- Stripe Developer Account


