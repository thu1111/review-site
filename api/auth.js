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
        const {id, username} = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUniqueOrThrow({
            where:{id}
        })
        req.user = user;
        res.send({message: `Hello ${username}`});
        next();
    } catch (error) {
        res.status(401).json({message: "token not valid"});
    }
}

//Register new user
//POST /api/auth/register
router.post("/register", async(req,res,next)=>{
    try {
        const {username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 5);
        const user = await prisma.user.create({
            data:{
                username,
                password: hashedPassword,
            }
        });
        res.status(201).json({message: "User registered successfully"});
    } catch (error) {
        next(error);
    }
})

//Login user
//POST /api/auth/login
router.post("/login", async(req,res,next)=>{
    try {
        const {username, password} = req.body;
        const user = await prisma.user.findUnique({
            where:{username}
        });
        if(!user){
            return res.status(401).json({message: "Invalid username or password"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid username or password"});
        }
        const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET);
        res.json({token});
    } catch (error) {
        next(error);
    }
});

//Get logged in user
//GET /api/auth/me 
router.get("/me", verifyToken, (req,res)=>{
    res.json(req.user);
});

module.exports = {router, verifyToken};