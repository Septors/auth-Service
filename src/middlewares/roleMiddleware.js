import User from "../models/userModels.js"

export const roleMiddleware = (requiredRole) =>{
 return async(req,res,next) =>{
    try{
        const user = await User.findById(req.user.user)
        if(user.role !== requiredRole){
            return res.status(401).json({Error: "Access denide"});
        }
        next()

    }catch(err){
        console.error(err);
        res.status(500).json({Error:"Server error"});
}
}}