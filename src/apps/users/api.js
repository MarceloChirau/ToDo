import express from 'express';
const userRouter=express.Router();
import  {userController}  from './controller.js';

userRouter
.post('/user',userController.createOne)
.get('/user',userController.showOne)
.delete('/user',userController.protect,userController.deleteUser)


userRouter
.get('/user/login',userController.findOneAndLogin);

userRouter
.post('/user/logOut', userController.protect,userController.logOut)


userRouter.get('/users',userController.showAll)





export default userRouter;