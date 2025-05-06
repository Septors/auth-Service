import jwt, { decode } from "jsonwebtoken";

export const authMiddleware = async(req,res,next) =>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(404).json({Error: "Token is not found"});
        };


        const token = authHeader.split(' ')[1];
        const decoded = await jwt.verify(token,process.env.ACCESS_SECRET);
        if(!decoded){
            return res.status(404).json({Error: 'Incrorrect token'});
        }
        req.user = decoded;
        console.log(req.user)
        next();
    }catch(err){
        console.error(err);
        res.status(500).json({Error: "Server error"});
    }
}