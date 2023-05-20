const mongoose=require("mongoose")
const connection=require("../db/connection")

const songSchema=new mongoose.Schema({
    id:{
        type:String,
        default:""
    },
    userId:{
        type:String,
        default:""
    },
    name:{
        type:String,
        default:""
    },
    image:{
        type:String,
        default:""
    },
    desc:{
        type:String,
        default:""
    },
    song:{
        type:String,
        default:""
    },
})

const Music=mongoose.model("song",songSchema);

module.exports=Music