import {createUser,showUsers,showOneByEmail} from './service.js';
import { catchAsync } from '../utils/catchAsync.js';
import User from './model.js';
import AppError from '../utils/appError.js';



export const userController={
createOne:catchAsync(async (req,res,next)=>{
    const data=req.body;
    const user=await createUser(data);
    res.status(201).json({
        status:'success',
        data:user
    })
}),
showAll:catchAsync(async(req,res,next)=>{
    const users=await showUsers();
    res.status(200).json({
        status:'success',
        result:users.length,
        data:users
    })
}),
showOne:catchAsync(async(req,res,next)=>{
    const email=req.body;
    const user=await showOneByEmail(email);
    res.status(200).json({
        status:'success',
        data:user
    })
}),
findOneAndLogin:catchAsync(async(req,res,next)=>{
    const{email,password}=req.body;
    const user=await showOneByEmail({email});
    console.log(' candidate password type:',typeof password);
    console.log('user password type:',typeof user.password)
const correctPassword=user.comparePasswords(password,toString(user.password));
if(!correctPassword)throw new AppError('Your credentials are wrong,please try again',400)
    user.password=undefined;
    res.status(200).json({status:'success',data:user})
})
}