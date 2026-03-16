import mongoose from 'mongoose';

const taskSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'A task must belong to a user'],
        trim:true
    
    },
    task:{
        type:[String],
        required:[true,'A task must have content']

    },
    completed:{
        type:Boolean,
        default:false
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
});

const Task=mongoose.model('Task',taskSchema);
export default Task;