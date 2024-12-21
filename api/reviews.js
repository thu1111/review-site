const router = require("express").Router();
module.exports = router;
const prisma = require("../prisma");

router.get("/", async(req,res,next)=>{
    try {
        const reviews = await prisma.review.findMany();
        res.json(reviews);
    } catch (error) {
        next()
    }
})

router.get("/:id",async(req,res,next)=>{
    try {
        const id = +req.params.id;
        const review = await prisma.review.findUnique({where:{id}});
        res.json(review);
    } catch (error) {
        next();
    }
})

/** get reviews of a logged in user */
// GET /api/reviews/me (middleware later)
router.get("/me", async (req, res, next) => { //verifyToken here
  //const { id } = req.user; //req.user is set in verifyToken middleware
  const id = 1; // Assume user id =1 is logged in for now
  try {
    const reviews = await prisma.user.findUnique({
      where: {id},
      select: {
        reviews: true,
      },
    });
    res.status(201).json(reviews);
  } catch (error) {
    next(error);
  }
});

