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

/** update a review based on user id and review id */
// PUT /api/users/:userId/reviews/:id (middleware later)
router.put("/:user_id/reviews/:review_id", async (req, res, next) => {
  const {user_id, review_id} = req.params;
  const { rating,text  } = req.body;
  try {
    const updatedReview = await prisma.review.update({
      where: { id: +review_id }, //assumed user_id is authorized user and left out
      data: { 
        rating:+rating, //test
        text, //test
        updatedAt: new Date(),
       },
    });
    res.json(updatedReview);
  } catch (error) {
    next(error);
  }
});

/** update a comment based on user id and comment id */
// PUT /api/users/:userId/comments/:id (middleware later)
router.put("/:user_id/comments/:comment_id", async (req, res, next) => {
    const { user_id, comment_id } = req.params; 
    const { text } = req.body;
  try {
    const updatedComment = await prisma.comment.update({
      where: { id: +comment_id }, //assumed user_id is authorized user and left out
      data: { 
        text, 
        updatedAt: new Date(), 
      },
    });
    res.json(updatedComment);
  } catch (error) {
    next(error);
  }
});

/** delete a review based on user id and review id */
// DELETE /api/users/:userId/reviews/:id (middleware later)
router.delete("/:userId/reviews/:review_id", async (req, res, next) => {
    try {
      const { user_id, review_id } = req.params;
  
      await prisma.review.delete({
        where: { id: +review_id }, //assumed user_id is authorized user and left out
      });
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  });

/** delete a comment based on user id and comment id */
// DELETE /api/users/:userId/comments/:id (middleware later)
router.delete("/:userId/comments/:comment_id", async (req, res, next) => {
  try {
    const { user_id, comment_id } = req.params;

    await prisma.comment.delete({
      where: { id: +comment_id }, //assumed user_id is authorized user and left out
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

