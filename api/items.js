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
    try {
        const id = +req.params.id;
        const item = await prisma.item.findUnique({where:{id}});
        res.json(item);
    } catch (error) {
        next();
    }
})

/** Returns all reviews given by the author with the specified id. WORKS*/
//GET /api/items/:id/reviews
router.get("/:id/reviews",async(req,res,next)=>{
    try {
        const id = +req.params.id;
        const reviews = await prisma.review.findMany({
            where:{itemId: id}
        });
        res.json(reviews);
    } catch (error) {
        next();
    }
})



//GET /api/items/:itemId/reviews/:id WORKS
router.get("/:itemId/reviews/:id", async (req, res, next) => {
  try {
    const { itemId, id } = req.params;
    const review = await prisma.review.findFirst({
      where: {
        id: parseInt(id),
        itemId: parseInt(itemId),
      },
      include: { user: true, comments: true },
    });
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json(review);
  } catch (error) {
    next(error);
  }
});

// // POST /api/items/:id/reviews WORKS
// router.post("/:id/reviews", async (req, res, next) => {
//   try {
//     const itemId = parseInt(req.params.id);
//     const { text, rating, userId } = req.body; // Assume `userId` is sent in request body for now.

//     const review = await prisma.review.create({
//       data: {
//         text,
//         rating,
//         itemId,
//         userId,
//       },
//     });
//     res.status(201).json(review);
//   } catch (error) {
//     next(error);
//   }
// });

// POST /api/items/:id/reviews
router.post("/:id/reviews", async (req, res, next) => {
    try {
      const itemId = parseInt(req.params.id);
      const { text, rating, userId } = req.body; // Assume `userId` is sent in request body for now.
  
      const review = await prisma.review.create({
        data: {
          text,
          rating,
          itemId,
          userId,
        },
      });
      res.status(201).json(review);
    } catch (error) {
      next(error);
    }
  });




// POST /api/items/:itemId/reviews/:id/comments
router.post("/:itemId/reviews/:id/comments", async (req, res, next) => {
  try {
    const reviewId = parseInt(req.params.id);
    const { text, userId } = req.body; // Assume `userId` is sent in request body for now.

    const comment = await prisma.comment.create({
      data: {
        text,
        reviewId,
        userId,
      },
    });
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
});
