import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';

const secret=crypto.randomBytes(32);


// console.log(typeof process.env.JWT_EXPIRES_IN)
const payload={"sub":"private"};
const token=jwt.sign(payload,String(process.env.JWT_SECRET),{expiresIn:process.env.JWT_EXPIRES_IN});
// console.log('token:',token);

const myFunction=async ()=>{
    const decoded=jwt.verify(token,process.env.JWT_SECRET,(err,cb)=>{
        if(err){
            console.error('Error:',err.message,'\n',err.name,'\n',err.expiredAt)
          return   new Error(`something went wrong:,${err.message},${err.name}`);}
        console.log(cb)
        return cb;
    })

}
myFunction();