const { verifyToken } = require("./auth");

const router = require("express").Router();
module.exports = router;

router.use("/auth", require("./auth").router);
router.use("/users", require("./users"));
router.use("/items", require("./items"));
router.use("/reviews", require("./reviews"));
router.use("/comments", require("./comments"));