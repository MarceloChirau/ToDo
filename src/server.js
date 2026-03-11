import http from 'node:http';
import app from './app.js'
import dotenv from 'dotenv';
dotenv.config();
const PORT=process.env.PORT || 3000;
 const hostname='127.0.0.1';

// const server=http.createServer((req,res)=>{
//     res.statusCode=200;
//     res.setHeader('Content-Type','application/json');
//     res.end('Hi');

// })

const server=app.listen(PORT,()=>{
    console.log(`Server running at http://${hostname}:${PORT}`)
})

// server.listen(PORT,hostname,()=>{
//     console.log(`Server running at http://${hostname}:${PORT}`)
// })