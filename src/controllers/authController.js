import User from "../models/userModels.js";
import { checkedEmail,createUser } from "../services/authService.js"
import { comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/token.js";
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';

export const registUser = async(req,res) =>{
    try{
        const{email,password} = req.body;
        const isEmailExists = await checkedEmail(email);
        console.log(isEmailExists)
        if(isEmailExists){
            return res.status(400).json({Error: 'Email is Exists error'});
        }
        
        const user = await createUser(email,password);
        const {accessToken,refreshToken} = generateToken({user:user._id});

        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure:false,
            sameSite:"Strict",
            maxAge:7*24*60*1000
        });
        res.status(201).json({
            Message: "User created",
            user,
            accessToken,
        });

    }catch(err){
        console.error(err);
        res.status(500).json({Error: "Server error"});
    };

};

export const loginUser = async(req,res) =>{
    try{
        const{email,password} =req.body;

        const isEmailExist = await checkedEmail(email);
        if(!isEmailExist){
            return res.status(404).json({Error: "incorrect email"});
        }

        const isPasswrodMatch = await comparePassword(password,isEmailExist.password);
        if(!isPasswrodMatch){
            return res.status(401).json({Error: 'Incorrect password'});
        }

        const {accessToken,refreshToken} = await generateToken({user:isEmailExist._id});

        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure:false,
            sameSite:"Strict",
            maxAge:7*24*60*1000
        });
        res.status(200).json({Message: 'Exist accepted',isEmailExist,accessToken});
    }catch(err){
        console.error(err);
        res.status(500).json({Error: 'Server error'});
    }
}

export const profileUser = async (req,res) =>{
    try{
        const userId = req.user.user;
        const user = await User.findById(userId).select('-password');
        console.log(user)
        res.status(200).json({Message: "About user",user});
    }catch(err){
        console.error(err);
        res.status(500).json({Error: 'Server error'});
    };
};

export const logoutUser = (req,res) =>{
    res.clearCookie("refreshToken",{
        httpOnly:true,
        secure:true,
        sameSite:"Strict"
    });
    res.status(200).json({Message: 'User logout'});
};

export const refreshAccess = (req,res) =>{
    try{
    const refresh = req.cookies.refreshToken;
    console.log(refresh);
    const user = jwt.verify(refresh,process.env.REFRESH_SECRET);
    const {accessToken,refreshToken} = generateToken({user:user._id});
    console.log(accessToken);
    res.status(200).json({Message: 'New access token created',accessToken});
    }catch(err){
        console.error(err);
        res.status(500).json({Error: "Server error"});
    }

}
