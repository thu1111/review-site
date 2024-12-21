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

// GET /api/reviews/me
router.get("/me", async (req, res, next) => {
  try {
    const { userId } = req.query; // Assume `userId` is sent as a query parameter for now.
    const reviews = await prisma.review.findMany({
      where: { userId: parseInt(userId) },
    });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

