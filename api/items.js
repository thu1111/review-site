const router = require("express").Router();
module.exports = router;
const prisma = require("../prisma");

router.get("/", async(req,res,next)=>{
    try {
        const items = await prisma.item.findMany();
        res.json(items);
    } catch (error) {
        next()
    }
})

router.get("/:id",async(req,res,next)=>{
  const id = +req.params.id;
    try {
        const item = await prisma.item.findUnique({where:{id}});
        res.json(item);
    } catch (error) {
        next();
    }
})

/** get all reviews given to a specified item id */
//GET /api/items/:id/reviews
router.get("/:id/reviews",async(req,res,next)=>{
  const id = +req.params.id;
    try {
        const reviews = await prisma.review.findMany({
            where:{item_id: id}
        });
        res.json(reviews);
    } catch (error) {
        next();
    }
})

/** get a review based on id from a specified item id */
//GET /api/items/:itemId/reviews/:id WORKS 
router.get("/:item_id/reviews/:review_id", async (req, res, next) => {
  const { item_id, review_id } = req.params;
  try {
    const review = await prisma.review.findFirst({
      where: {
        id: +review_id,
        item_id: +item_id,
      }
    });
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json(review);
  } catch (error) {
    next(error);
  }
});

/** add review to an item based on item id */
// POST /api/items/:id/reviews (middleware later)
router.post("/:id/reviews", async (req, res, next) => {
  const item_id = +req.params.id;
  const user_id = 1; // Assume `userId=1` is sent in request body for now  
  const { rating,text  } = req.body; 
    try {
      const addReview = await prisma.review.create({
        data: {
          item_id,
          user_id,
          rating: +rating, //test in item-id 2
          text, //test
        },
      });
      res.status(201).json(addReview);
    } catch (error) {
      next(error);
    }
  });


/** add comment on a review based on review id and item id*/
// POST /api/items/:itemId/reviews/:id/comments (middleware later)
router.post("/:item_id/reviews/:review_id/comments", async (req, res, next) => {
  const review_id = +req.params.review_id;
  const user_id  = 1; // Assume `userId=1` is sent in request body for now
  const { text } = req.body;
    try {
      const addComment = await prisma.comment.create({
        data: {
          user_id,
          review_id,
          text, //test
        },
      });
      res.status(201).json(addComment);
    } catch (error) {
      next(error);
    }
});
