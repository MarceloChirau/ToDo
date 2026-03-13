import User from './model.js';
import AppError from '../utils/appError.js';

export  const createUser=async (data)=>{

        if(!data|| Object.keys(data).length===0)throw new AppError('Please provide data to create your user profile',400)
    const user=await User.create(data);
        return user;
}

export const showUsers=async()=>{
const users=await User.find();
if(!users)throw new AppError('There is no users available',404);
return users;
}

export const showOneByEmail=async(email)=>{
    if(!email)throw new AppError('Please provide correct credentials',400);
    const user=await User.findOne(email).select('password');
    if(!user)throw new AppError('There is no user with these credentials',404);
    return user;
}






