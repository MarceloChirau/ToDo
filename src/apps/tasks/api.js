import express from 'express';
const taskRouter=express.Router();
import  {userController}  from '../users/controller.js';
import {taskController} from './controller.js'

taskRouter
.post('/task',userController.protect,taskController.createOneTask)
.get('/task',userController.protect,taskController.showAllTasks)









export default taskRouter;