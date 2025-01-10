const usermodel = require("../model/usermodel");
const bcrypt = require('bcryptjs');

// To create or register new users =>>
exports.registerusers = async(req,res) =>{
    try {
        const {username,email,password,address,phone,usertype} = req.body;
        if (!username || !email || !password || !phone || !address || !usertype){
            return res.status(500).send({
                msg : "please provide all fields",
                stete : 0,
                data : [],
            })
        }
        // To check if this email or the username it's already taken before or no
        const taken = await usermodel.findOne({email : email,
            username :username,
        })
        if(taken){
            return res.status(500).send({
                msg : "This username or Email taken already",
                stete : 0,
                data : [],
            })
        }
        // To hash a password:
        var salt = bcrypt.genSaltSync(10);
        const haspassword = await bcrypt.hash(password , salt);

        await usermodel.create({
            username : username,
            email : email,
            password : haspassword,
            address : address,
            phone : phone,
            usertype : usertype,
        }).then((data)=>{
            return res.status(201).send({
                msg : "your acount created successfully",
                stete : 1,
                data : data,  
            })
        }).catch((err)=>{
            return res.status(500).send({
                msg : "internal server error",
                stete : 0,
                data : []
            })
        })        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            msg : "internal server error",
            stete : 0,
            data : []
        })
    }

}

// login ==>>>>

exports.login = async(req,res) => {
    const {username,password} = req.body;
    const result = await usermodel.findOne({username:username,})
        //To check a password:
        const isMatch = await bcrypt.compare(password , result.password);
        if(!isMatch){
            return res.status(404).send({
                msg : "The password is wrong",
                stete : 0,
                data : [],
            })
        }
    if(!username || !password){
        return res.status(404).send({
            msg : "the username or password wrong",
            stete : 0,
            data : []
        })
    }else{
        return res.status(201).send({
            msg : "Login successfully",
            stete : 1,
            data : result,
        })
    }
}


// To update any user info
exports.updateuser = async(req,res) => {
    try {
        await usermodel.findOneAndUpdate({_id:req.params.id},{
            $or : {
                username : req.body.username,
                email : req.body.email,
                password : req.body.password,
                address : req.body.address,
                phone : req.body.phone,
                usertype : req.body.usertype,
            }
        }).then((data)=>{
                return res.status(200).send({
                    msg : "your change has been supmited",
                    stete : 1,
                    data : data
                })
        }).catch((err)=> {
        return res.status(500).send({
            msg : "internal server error",
            stete : 0,
            data : [],
        })
        })       
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            msg : "internal server error",
            stete : 0,
            data : [],
        })       
    }

}

// To delete any user
exports.delete = async(req,res) =>{
    try {
        await usermodel.findOneAndDelete({_id:req.params.id}).then((data)=>{
            return res.status(204).send({
                msg : "your info has been deleted successfully",
                stete : 1,
                data : data,
            })
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            msg : "internal server error",
            stete : 0,
            data : [],
        })
    }
}