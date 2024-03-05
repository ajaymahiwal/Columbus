

const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');



const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
    },
    username:{
        type:String,
    },
    googleId:{
        type:String,
    },
    name:{
        type:String,
    },
    admin:{
        type:Boolean,
    },
    dob:{
        type:Date,
    },
    gender:{
        type:String,
    },
    contact_num:{
        type:String,
    },
    bio:{
        type:String,
    },
    image: {
        type: String,
        default:
            "https://img.freepik.com/free-vector/cute-happy-smiling-child-isolated-white_1308-32243.jpg",
        set: (v) =>
            v === ""
                ? "https://img.freepik.com/free-vector/cute-happy-smiling-child-isolated-white_1308-32243.jpg"
                : v,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
});

userSchema.plugin(passportLocalMongoose);

module.exports = new mongoose.model("User",userSchema);