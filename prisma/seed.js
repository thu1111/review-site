const prisma = require("../prisma");

const seed = async () => {
    const createUsers = async()=>{
      const users = [
        { name: "Logan 1", password: "pw1" },
        { name: "Chase 2", password: "pw2" },
        { name: "Linclon 3", password: "pw3" },
        { name: "Amy 4", password: "pw4" },
        { name: "Daisy 5", password: "pw5" },
      ];
      await prisma.user.createMany({ data: users });
    };


    const createItems = async()=>{
        const items = [
          { name: "Plate"  },
          { name: "Cup" },
          { name: "Tea"  },
          { name: "Towel"  },
          { name: "Ball"  },
        ];
        await prisma.item.createMany({ data: items });
      };

    const createReviews = async()=>{
    const reviews = [
        {user_id:1, item_id:1, rating:1, text:"Very Bad",},
        {user_id:2, item_id:2, rating:2, text:"Not Working",},
        {user_id:3, item_id:3, rating:3, text:"Works for me",},
    ];
    await prisma.review.createMany({data:reviews});
    };

    const createComments = async()=>{
        const comments = [
            {user_id:1, review_id:1, text:"He is right",},
            {user_id:2, review_id:2, text:"I don't agree",},
            {user_id:3, review_id:3, text:"Not so sure about that",},
        ];
    await prisma.comment.createMany({data:comments});
    };


    await createUsers();
    await createItems();
    await createReviews();
    await createComments();
  };

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});