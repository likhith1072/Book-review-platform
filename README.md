# 📚 Book Review Platform

A full-stack MERN application that allows users to browse books, view detailed information, and submit reviews and star ratings. Built with authentication, role-based features, and a responsive UI.

---

## 🚀 Features

- 🔐 **User Authentication** (Register, Login with JWT-based sessions)
- 📖 **Book Details Page** with descriptions, categories, and cover images
- ⭐ **Star-Based Ratings** and average score calculation
- 📝 **Review Section** with user-submitted comments
- 🎯 **Recent Books Carousel**
- 🔍 **Book Filtering** by category and slug
- 🧠 **Redux-based User State Management**
- 🌐 **Fully Responsive UI** using Tailwind CSS

---

## 🛠 Tech Stack

### Frontend
- **React.js**
- **Redux Toolkit** for global state
- **React Router** for routing
- **Tailwind CSS** for styling
- `react-rating-stars-component` for star UI

### Backend
- **Node.js + Express**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **CORS, cookie-parser** for secure API interaction

---

## 📂 Folder Structure

```bash
📦 Book-Review-Platform/
├── client/               # React frontend
│   ├── components/       # Reusable UI components
│   ├── pages/            # Main page components
│   ├── redux/            # Redux user slice
│   └── App.jsx           
├── api/               # Express backend
│   ├── models/           # Mongoose models (User, Book, Rating, Review)
│   ├── routes/           # Express routes
│   ├── controllers/      # Logic for routes
│   ├── utils/            # JWT verification middleware
│   └── index.js          # Entry point

🧪 API Endpoints (Backend)

POST /api/auth/signup

POST /api/auth/signin

GET /api/book/getbooks?slug=...

GET /api/book/getbooks?limit=3

POST /api/rating/create

GET /api/rating/getBookRatings/:bookId

POST /api/review/create

GET /api/review/getReviews/:bookId
POST /api/auth/signup

POST /api/auth/signin

GET /api/book/getbooks?slug=...

GET /api/book/getbooks?limit=3

POST /api/rating/create

GET /api/rating/getBookRatings/:bookId

POST /api/review/create

GET /api/review/getReviews/:bookId
