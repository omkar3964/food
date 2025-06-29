import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'



// /login User
const loginUser =async (req,res)=>{
    const {email, password} = req.body
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false , message:"User doesn't exists"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false, message:"Invalid credentials"})
        }
        const token = createToken(user._id)
        return res.json({success:true, token})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error})
    }

}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'1d'})
}
// register user
const registerUser =async (req,res)=>{
    const {name , password, email} = req.body

    try {
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false, message:"Email already register"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Enter valid email"})
        }
        if(password.length < 8){
            return res.json({success:false, message:"password should be greter than 8 digits"})
        }
        // hashing a password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password: hashPassword
        })
        
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true, token})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error})
    }
}

export {loginUser, registerUser}
