const router = require("express").Router();
const apiRoutes = require("./userRoutes");

router.use("/api", apiRoutes);

module.exports = router;
