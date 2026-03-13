import {styleText} from "node:util"
export default (err,req,res,next)=>{
    const errorDetector=styleText(['magenta','bold','underline'],'--- ERROR DETECTED ---');
    const consoleErrorName=styleText(['red','bold'], 'Error name:');
    const errorName=styleText(['blue','bold'], err.name);

    console.log(errorDetector);
    // console.dir(err, { depth: null });
    // console.log(`${consoleErrorName}:${errorName}`);
    console.log(`${styleText(['red','bold'], 'Error name:')}:${styleText(['blue','bold'], err.name)}`)
    console.log(styleText(['bgYellow','red','doubleunderline'],'Type of Code:'), typeof err.cause?.code );



    let statusCode=err.statusCode || 500;
    let status=statusCode===500 ? "error" :'fail' ;
const errorCode=err.code || (err.cause && err.cause.code)

    if(err.name==='ValidationError'){
        statusCode=400;
    err.message=`Invalid data: ${err.message}`;
    }
    if (errorCode===11000){
        statusCode=400;
    }

    




    res.status(statusCode).json({
        status:status,
        message:err.message,
        cause:process.env.NODE_ENV==='development' ? err.cause : undefined,
        stack:process.env.NODE_ENV==='development' ? err.stack : undefined
    })
};