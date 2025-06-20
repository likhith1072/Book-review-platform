import express from 'express';
import {test} from '../controllers/user.controller.js';
const router=express.Router();
import {updateUser,deleteUser,signout,getUsers,getUser} from '../controllers/user.controller.js';
import {verifyToken} from '../utils/verifyUser.js';

router.get('/test',test);
router.put('/update/:userId',verifyToken,updateUser);
router.delete('/delete/:userId',verifyToken,deleteUser);
router.post('/signout',signout);
router.get('/getusers',verifyToken,getUsers);
router.get('/:userId',getUser)

export default router;