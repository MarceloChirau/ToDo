import express from 'express';
const userRouter=express.Router();
import  {userController}  from './controller.js';

userRouter
.post('/user',userController.createOne)
.get('/user',userController.showOne)


userRouter
.get('/user/login',userController.findOneAndLogin);


userRouter.get('/users',userController.showAll)





export default userRouter;