const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true

        //username cant be same 
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
      
    },profilePic:{
        type:String,
        default:""
    },desc:{
        type:String,
        required:false,
        
    },
    facebook:{
        type:String,
        required:false,
      
    },
    insta:{
        type:String,
        required:false,
    },
    github:{
        type:String,
        required:false,
    },
    linkedIn:{
        type:String,
        required:false,
    },
    pic:{
        type:String,
        required:false,
    },
    
},{
    timestamps:true
});

module.exports = mongoose.model("User",UserSchema)