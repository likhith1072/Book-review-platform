import express from 'express';
import {verifyToken} from '../utils/verifyUser.js';
import { uploadbook } from '../controllers/book.controller.js';
import { getbooks } from '../controllers/book.controller.js';
import { deletebook } from '../controllers/book.controller.js';
import { updatebook } from '../controllers/book.controller.js';


const router =express.Router();

router.post('/uploadbook',verifyToken,uploadbook);
router.get('/getbooks',getbooks);
router.delete('/deletebook/:bookId/:userId',verifyToken,deletebook)
router.put('/updatebook/:bookId/:userId',verifyToken,updatebook)

export default router;