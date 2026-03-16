import {createUser,showUsers,showOneByEmail,toDecode,deleteOneUser} from './service.js';
import { catchAsync } from '../utils/catchAsync.js';
import User from './model.js';
import AppError from '../utils/appError.js';
import jwt from 'jsonwebtoken';




export const userController={
createOne:catchAsync(async (req,res,next)=>{
    const data=req.body;
    const user=await createUser(data);
    const payload={sub:user._id};
    const token=jwt.sign(payload,String(process.env.JWT_SECRET),{expiresIn:process.env.JWT_EXPIRES_IN});
    if (process.env.NODE_ENV==='development'){
    
        res.cookie('token',token,{
            httpOnly:true,
            path:'/',
            domain:'localhost',
            secure:false,
            sameSite:'lax',
            maxAge:3600000
                                })
    }
    
    if (process.env.NODE_ENV==='production'){
    
        res.cookie('token',token,{
            httpOnly:true,
            path:'/',
            secure:true,
            sameSite:'strict',
            maxAge:3600000
                                })
    }

    res.status(201).json({
        status:'success',
        token,
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
    const {email,password}=req.body;
    const user=await showOneByEmail({email});
const correctPassword= await user.comparePasswords(password,user.password);
//unauthorized
if(!correctPassword)throw new AppError('Your credentials are wrong,please try again',401)
    user.password=undefined;
// console.log('user:',user)
const payload={sub:user._id.toString()};
// console.log('payload:',payload)
const token=jwt.sign(payload,String(process.env.JWT_SECRET),{expiresIn:process.env.JWT_EXPIRES_IN});
// console.log('login token:',token);
if (process.env.NODE_ENV==='development'){

    res.cookie('token',token,{
        httpOnly:true,
        path:'/',
        secure:false,
        sameSite:'lax',
        maxAge:3600000
                            })
}

if (process.env.NODE_ENV==='production'){

    res.cookie('token',token,{
        httpOnly:true,
        path:'/',
        secure:true,
        sameSite:'strict',
        maxAge:3600000
                            })
}

    res.status(200).json({status:'success',
        token,
        data:user})
}),
protect:catchAsync(async(req,res,next)=>{
    let token;
    // console.log('req.cookies.token:',req.cookies.token);
    // console.log('req.cookies:',req.cookies);

    if(req.cookies.token){
        token=req.cookies.token;
    }
    if(!token)throw new AppError('You are not logged in, please log in',401)
// console.log('protect token:',token)
        const decoded= jwt.verify(token,process.env.JWT_SECRET,(err,cb)=>{
            if(err){
                // console.error('Error:',err.message,'\n',err.name,'\n',err.expiredAt)
              return   new Error(`something went wrong:,${err.message},${err.name}`);}
            console.log(cb)
            return cb;
        })
        // const decoded=jwt.verify(token,process.env.JWT_SECRET);
        // console.log('decoded:',decoded)

        const currentUser=await User.findById(decoded.sub);
        if(!currentUser)throw new AppError('The user doesnt exist anymore',401);

        req.user=currentUser;
        next();

}),
deleteUser:catchAsync(async(req,res,next)=>{
    const {_id}=req.user;
    const deleteUser=await deleteOneUser(_id);
    res.status(200).json({status:'success',data:null})
}),
logOut:catchAsync(async(req,res,next)=>{

    
    res.cookie('token',null,{expires:new Date(Date.now()+10*1000),
        httpOnly:true,
        path:'/',
        secure:process.env.NODE_ENV==='production' ? true : false,
        sameSite:process.env.NODE_ENV==='production' ? 'none' : 'lax'
    })
    res.status(200).json({status:'success',message:'You have been logged out'})
})
}