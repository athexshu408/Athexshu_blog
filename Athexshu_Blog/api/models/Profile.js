const mongoose = require("mongoose")


const ProfileSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        

        //username cant be same 
    },
    desc:{
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
    linkdin:{
        type:String,
        required:false,
    },
    pic:{
        type:String,
        required:false,
    },
    categories:{
        type:Array,
        required:false,

    
}},{
    timestamps:true
    
});

module.exports = mongoose.model("Profile",ProfileSchema)