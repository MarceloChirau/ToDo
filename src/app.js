import express from 'express';
import userRouter from './apps/users/api.js'
import globalError from './apps/utils/globalError.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app=express();
app.use(express.json());
app.use(cookieParser());

if(process.env.NODE_ENV==='development'){

    app.use(cors({
        origin:"http://127.0.0.1:8000",
        credentials:true
    }));
}

if(process.env.NODE_ENV==='production'){

    app.use(cors({
        origin:"https://xyz.onrender.com",
        credentials:true
    }));
}



app.use('/api/v1',userRouter);



app.use(globalError);

export default app;