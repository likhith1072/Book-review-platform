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

```
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
\```

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

1.⚙️ How to Run Locally
Clone the Repository

git clone https://github.com/likhith1072/Book-review-platform.git
cd Book-Review-Platform

2.Setup Backend
  run:npm install


Create a .env file and add:
MONGO=<your-mongodb-connection-uri> ,
JWT_SECRET=<your-secret>,
NODE_ENV='development',
SMTP_USER=Your smtp username
SMTP_PASS=YOur smtp_pass,
SENDER_EMAIL=Your email id from which you send email to user for verifcation of otp



in terminal:(in directory Book-Review-Repository)
npm run dev

3.Setup Frontend

cd client
npm install
npm run dev

4.create .env in frontend inside client
VITE_FIREBASE_API_KEY=Your vite firebase api key which is used for image uploading and getting url of images to display and image url is saved in mongodb

The ScreenShots that i have attached can be seen using there links provided below 
![Screenshot (393)](https://github.com/user-attachments/assets/f3060f88-6d90-4e18-bd29-d6084e7d0480)
![Screenshot (394)](https://github.com/user-attachments/assets/772a6b38-18b6-46ae-ac55-bf2a1de5c791)
![Screenshot (395)](https://github.com/user-attachments/assets/3b02548a-f7cb-4ec9-81e7-e75f779072fc)
![Screenshot (396)](https://github.com/user-attachments/assets/c8bfe339-828c-43a3-bd27-8d86deeec43d)
![Screenshot (397)](https://github.com/user-attachments/assets/493f7e5c-cb7b-4a2d-b0ae-480056e9d21e)
![Screenshot (398)](https://github.com/user-attachments/assets/2722451e-fd2a-4e17-a037-a3f169147fe0)
![Screenshot (405)](https://github.com/user-attachments/assets/10c5854c-6f05-4db5-b325-30cd3b5cb40c)
![Screenshot (406)](https://github.com/user-attachments/assets/6ca3807d-1feb-415b-a4b9-1f172c3dc1fa)
![Screenshot (407)](https://github.com/user-attachments/assets/de11d98c-6720-474f-9545-d3ae045a492f)


