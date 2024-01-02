import jwt from "jsonwebtoken"
export const fetchPatient = (req ,res , next) =>{

    const token = req.header("token");
    if(!token){
        return res.status(400).json("Token nor exist");
    }
    try {
        const data = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
        req.patient = data.patient;
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json("Something went wrong while verifying token")
    }

    
}