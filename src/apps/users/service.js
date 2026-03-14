import User from './model.js';
import AppError from '../utils/appError.js';
import jwt from 'jsonwebtoken';


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



export const toDecode= (token)=>{
    const decoded=  jwt.verify(token,process.env.JWT_SECRET,(err,cb)=>{
        if(err){
            console.error('Error:',err.message,'\n',err.name,'\n',err.expiredAt)
          return   new Error(`something went wrong:,${err.message},${err.name}`);}
        console.log(cb)
        return cb;
    })

}

export const deleteOneUser=async(id)=>{
    if(!id)throw new AppError('Please provide the user to delete',400);
    const deletedUser=await User.findByIdAndDelete(id);
    if(!deletedUser)throw new AppError('Couldnt find any user to delete');
    return deletedUser;
}
