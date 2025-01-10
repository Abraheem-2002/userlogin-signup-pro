const mongoose = require("mongoose");
const schema = mongoose.Schema;

// Register new users schema : 

const userschema = new schema({
    username : {
        type : String,
        required : [true,"the username is required"]
    },
    email : {
        type : String,
        required : [true,"the email is required"],
    },
    password : {
        type : String,
        required : [true,"the password is required"],
    },
    address : {
        type : String,
        required : [true,"the address is required"],
    },
    phone : {
        type : Number,
        required : [true,"the phone is required "],
    },
    usertype : {
        type : String,
        required : [true,"the usertype is required"],
        default : "Clinet",
        enum : ["Clinet","Manager","Driver"],
    }
})

module.exports = userschema;