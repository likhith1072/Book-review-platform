import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import bookRoutes from './routes/book.route.js';
import reviewRoutes from './routes/review.route.js';
import ratingRoutes from './routes/rating.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{console.log('Connected to mongoDB');}).catch((err)=>{console.log(err);}); 

const __dirname = path.resolve();
const app=express();

app.use(cors({
    origin: 'http://localhost:5173', // Frontend domain
    credentials: true, // If you plan to send cookies/auth headers
  }));

  app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp'); // Optional but helpful
    next();
  });

app.use(express.json());
app.use(cookieParser());

app.listen(3000,()=>{
    console.log('Server is running on port 3000'
    );
});

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/book',bookRoutes);
app.use('/api/review',reviewRoutes);
app.use('/api/rating',ratingRoutes);


app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client','dist','index.html'));
// });

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message =err.message || "internal Server Error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});
