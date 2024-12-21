const { verifyToken } = require("./auth");

const router = require("express").Router(); // Import the express library and create a router object
// Export the router to be used in the main app
module.exports = router; 

// Use the router defined in auth.js for routes starting with /auth
router.use("/auth", require("./auth").router); //.router accesses the router object that is exported from the auth.js module.
router.use("/users", require("./users"));
router.use("/items", require("./items"));
router.use("/reviews", require("./reviews"));
router.use("/comments", require("./comments"));