import { catchAsync } from '../utils/catchAsync.js';
import {allTasks, createTask} from './service.js';

export const taskController={
    createOneTask:catchAsync(async(req,res,next)=>{
        const task=req.body;
        const id=req.user._id
        const newTask=await createTask(id,task);
    res.status(201).json({status:'success',data:newTask})
    }),
    showAllTasks:catchAsync(async(req,res,next)=>{
        const id=req.user._id;

        const tasks=await allTasks(id);
        console.log('tasks:',tasks)
        res.status(200).json({status:'success',data:{tasks}})

    })
}

