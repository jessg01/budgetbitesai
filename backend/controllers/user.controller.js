const User = require('../models/user.model')
const bcrypt = require('bcrypt')


const userSignup = async(req,res) =>{
    try{
        const {firstname, lastname, email, username, password } = req.body;
        const checkEmail = await User.findOne({email: email});
        const checkUsername = await User.findOne({username: username})
        if(checkEmail || checkUsername){
            return res.status(404).json({message: "email or username already exists"});
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashedPassword,
            username: username
        });
        if(!user){
            return res.status(404).json({message: "not working"});
        }
        res.status(200).json({message: "done"});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

const userLogin = async(req,res) =>{
    try{
        const {email, username, password} = req.body;
        const user = await User.findOne({username: username});
        if(!user){
            return res.status(404).json({message: "Username not found"});
        }
        console.log(user.password, password);
        const match = await bcrypt.compare(password, user.password);
        console.log(match)
        if(!match){
            return res.status(401).json({message: "Incorrect password"});
        }
        res.status(200).json({message: "success"});
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    userSignup,
    userLogin
};