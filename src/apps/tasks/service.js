import Task from './model.js';
import AppError from '../utils/appError.js';

export const createTask=async(userId,taskData)=>{
    const {task}=taskData;
    if(!task)throw  new AppError('Please provide us a task',400);
    const existingTask=await Task.findOne({user:userId,task:task})
    if(existingTask)throw new AppError('This user already has  this task',400)

        const newTask=await Task.findOneAndUpdate({user:userId},
{$addToSet:{task:task}},
{upsert:true,new:true}
        );
    return newTask;
}

export const allTasks=async(userId)=>{
    if(!userId)throw new AppError('Please provide users id',400);
    const tasks=await Task.findOne({user:userId});
    console.log('tasks:',tasks)
    return tasks;
}