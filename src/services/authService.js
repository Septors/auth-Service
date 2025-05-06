import User from "../models/userModels.js";
import { hashPassword } from "../utils/hash.js";

export const checkedEmail = async(email) =>{
    try{
        return await User.findOne({email});
    }catch(err){
        console.error("Invalide Email",err);
    }
}

export const createUser = async(email,password,role='user') =>{
    try{
    const hash = await hashPassword(password);
    return await User.create({
        email,
        password:hash,
        role
    })}catch(err){
        console.error("Create user failed",err);

    }
}
