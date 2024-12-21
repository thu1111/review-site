const router = require("express").Router();
module.exports = router;
const prisma = require("../prisma");

router.get("/", async(req,res,next)=>{
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        next()
    }
})

// PUT /api/users/:userId/reviews/:id
router.put("/:userId/reviews/:reviewId", async (req, res, next) => {
  try {
    const { userId, reviewId } = req.params;
    const { text, rating } = req.body;

    const updatedReview = await prisma.review.update({
      where: { id: parseInt(reviewId) },
      data: { text, rating, updatedAt: new Date() },
    });
    res.json(updatedReview);
  } catch (error) {
    next(error);
  }
});


// PUT /api/users/:userId/comments/:id
router.put("/:userId/comments/:id", async (req, res, next) => {
    const { userId, id } = req.params;
  try {
    const { text } = req.body;

    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(id) },
      data: { text, updatedAt: new Date() },
    });
    res.json(updatedComment);
  } catch (error) {
    next(error);
  }
});


// DELETE /api/users/:userId/reviews/:id
router.delete("/:userId/reviews/:id", async (req, res, next) => {
    try {
      const { userId, id } = req.params;
  
      await prisma.review.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  });


// DELETE /api/users/:userId/comments/:id
router.delete("/:userId/comments/:id", async (req, res, next) => {
  try {
    const { userId, id } = req.params;

    await prisma.comment.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

