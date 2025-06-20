import express from 'express';
import { verifyToken }  from '../utils/verifyUser.js';
import {createRating,getBookRatings} from '../controllers/rating.controller.js';

const router =express.Router();

router.post('/create',verifyToken,createRating);
router.get('/getBookRatings/:bookId',getBookRatings); 



export default router;