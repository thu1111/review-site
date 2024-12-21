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


/** get comments of a logged in user */
// GET /api/comments/me  (middleware later)
router.get("/me", async (req, res, next) => {
  //const { id } = req.user; //req.user is set in verifyToken middleware
  const id = 1; // Assume user id =1 is logged in for now
  try {
    const comments = await prisma.user.findUnique({
      where: { id },
      select: {
        comments: true,
      },
    });
    res.status(201).json(comments);
  } catch (error) {
    next(error);
  }
});