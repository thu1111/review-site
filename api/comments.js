const router = require("express").Router();
module.exports = router;
const prisma = require("../prisma");

//get all comments
router.get("/", async(req,res,next)=>{
    try {
        const comments = await prisma.comment.findMany();
        res.json(comments);
    } catch (error) {
        next()
    }
})



// GET /api/comments/me
router.get("/me", async (req, res, next) => {
  try {
    const { userId } = req.query; // Assume `userId` is sent as a query parameter for now.
    const comments = await prisma.comment.findMany({
      where: { userId: parseInt(userId) },
    });
    res.json(comments);
  } catch (error) {
    next(error);
  }
});