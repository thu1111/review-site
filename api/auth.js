const router = require("express").Router();
module.exports = router;
const prisma = require("../prisma");


const verifyToken = async (req,res,next)=>{
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    console.log("token", token);

    if(!token) {
        return res.status(401).json({message: "token not set"})
    }

    try {
        const {id, username} = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUniqueOrThrow({
            where:{id}
        })
        req.user = user;
        res.send({message: `Hello ${username}`});
        next();
    } catch (error) {
        
    }
}


//register new user
router.post("/register", async(req,res,next)=>{
    try {
        
    } catch (error) {
        next(error);
    }
})



module.exports = {router, verifyToken};