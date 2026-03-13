import express from 'express';
import userRouter from './apps/users/api.js'
import globalError from './apps/utils/globalError.js';
const app=express();
app.use(express.json());




app.use('/api/v1',userRouter);



app.use(globalError);

export default app;