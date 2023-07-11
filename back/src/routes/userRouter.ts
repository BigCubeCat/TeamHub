import express from "express";

import * as userController from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/login', userController.loginOne);
userRouter.post('/register', userController.registerOne);

export default userRouter;
