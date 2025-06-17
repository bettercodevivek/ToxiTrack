# 🚨 ToxiTrack - Real-Time Toxicity Detection API

ToxiTrack is a real-time backend platform designed to detect and moderate toxic messages using WebSockets and AI-powered toxicity detection APIs like Perspective API. It's built with **Node.js**, **Express**, **MongoDB**, and **WebSockets**, making it ideal for integration into chat systems or community platforms that require intelligent content moderation.

---

## 🔥 Features

- ✅ User signup/login with JWT authentication
- 🔁 Refresh token support for persistent sessions
- 🔐 Protected routes using `verifyToken` middleware
- 📩 Email OTP verification with Nodemailer
- 🌐 WebSocket-based real-time message broadcasting
- 🧠 Toxicity analysis using Perspective API
- ⚠️ Auto-blocking/reporting of toxic messages
- 📊 MongoDB-based message and user tracking

---

## 🧰 Tech Stack

| Layer       | Tech                                 |
|-------------|--------------------------------------|
| Backend     | Node.js, Express.js                  |
| Realtime    | WebSocket (ws)                       |
| Database    | MongoDB + Mongoose                   |
| AI/ML       | Perspective API                      |
| Auth        | JWT (Access + Refresh Tokens)        |
| Email       | Nodemailer + Gmail SMTP              |
| Env Config  | dotenv                               |

---

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/toxitrack.git
cd toxitrack

# Install dependencies
npm install

# Create .env file with following values:
# (replace with your real values)
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
REFRESH_SECRET=your_refresh_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
PERSPECTIVE_API_KEY=your_perspective_api_key

# Start the server
npm start
```
