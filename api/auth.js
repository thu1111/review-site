require('dotenv').config();
const router = require("express").Router();
const prisma = require("../prisma");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const verifyToken = async (req,res,next)=>{
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({message: "token not set"})
    }

    try {
        const {id, username} = jwt.verify(token, process.env.JWT_SECRET); //jwt.verify(token, secretOrPublicKey, [options, callback])
        const user = await prisma.user.findUniqueOrThrow({
            where:{id}
        })
        req.user = user; //req.user is set in verifyToken middleware
        // res.send({message: `Hello ${username}`});
        next();
    } catch (error) {
        res.status(401).json({message: "token not valid"});
    }
}

//create token function 
const createToken = (id, username)=>{ 
    return jwt.sign({id, username}, process.env.JWT_SECRET); 
}; //jwt.sign(payload, secretOrPrivateKey, [options, callback])

//Register new user and create token
//POST /api/auth/register
router.post("/register", async(req,res,next)=>{
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 5);
    try {
        const newUser = await prisma.user.create({
            data:{
                name: username,
                password: hashedPassword,
            }
        });
        const token = createToken(newUser.id, newUser.name);
        res.status(201).json(token);
    } catch (error) {
        next(error);
    }
})


//Login user
//POST /api/auth/login
router.post("/login", async(req,res,next)=>{
    const {username, password} = req.body; //get username and password from request body
    try {
        const user = await prisma.user.findUnique({
            where:{name: username} //find user by username
        });
        if(!user){ //if user not found
            return res.status(401).json({message: "Invalid username"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password); //bcrypt.compare(plainTextPassword, hashedPassword)
        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid password"});
        }

        const token = createToken(user.id, user.name);
        res.status(201).json(token);
    } catch (error) {
        next(error);
    }
});

//Get logged in user
//GET /api/auth/me 
router.get("/me", verifyToken, (req,res)=>{
    res.status(201).json(req.user);
});

module.exports = {router, verifyToken};