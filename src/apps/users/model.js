import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'As a user you should have a name']
    },
    email:{
        type:String,
        required:[true,'A user should have an email'],
unique:[true,'There is already a user with this email']
    },
    password:{
        type:String,
        required:[true,'A user should have a password'],
        select:false
    },
    issuedAt:{
        type:Date,
        default:Date
    }
});


 userSchema.pre("save",async function(){
    if(!this.isModified('password'))return;
    this.password=await bcrypt.hash(this.password,10);
})

userSchema.methods.comparePasswords=async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,this.password);
}


const User=mongoose.model('User',userSchema);
export default User;