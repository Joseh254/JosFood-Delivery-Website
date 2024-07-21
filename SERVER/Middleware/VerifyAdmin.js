import jwt, { decode } from"jsonwebtoken";
const VerifyAdmin = (request, response,next)=>{
    const accessToken = request.cookies.access_token;
if (!accessToken) {
    return response.status(401).json({success:false, message: "Unaothorized"})
}
jwt.verify(accessToken, process.env.JWT_SECRET, (error, decoded)=>{
    if(error){
        return response.status(401).json({success:false,message:"Unauthorized"})
    }
    if(decoded.role!=="admin"){
        return response.status(401).json({success:false, message:"You are not allowed to perform this opertion"})
    }
    next();
})
}
export default VerifyAdmin;