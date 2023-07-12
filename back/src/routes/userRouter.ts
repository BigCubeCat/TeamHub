import express from "express";

import * as userController from '../controllers/user.controller';
import { auth } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post('/login', userController.loginOne);
userRouter.post('/register', userController.registerOne);
userRouter.get('/me', auth, userController.getMe);
userRouter.get('/:username/', auth, userController.getUser);

export default userRouter;
