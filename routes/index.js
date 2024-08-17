const router = require("express").Router();
const apiRoutes = require("./api");
// the url /api
router.use("/api", apiRoutes);

module.exports = router;
