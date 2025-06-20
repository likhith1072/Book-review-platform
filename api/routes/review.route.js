import express from 'express';
import { verifyToken }  from '../utils/verifyUser.js';
import {createReview,getBookReviews,likeReview,deleteReview} from '../controllers/review.controller.js';

const router =express.Router();

router.post('/create',verifyToken,createReview);
router.get('/getBookReviews/:bookId',getBookReviews); 
router.put('/likeReview/:reviewId',verifyToken,likeReview);
router.delete('/deleteReview/:reviewId',verifyToken,deleteReview);


export default router;