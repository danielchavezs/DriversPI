const { Router } = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { driversRouter } = require("./driversRoutes");

const router = Router();

router.use(morgan("dev"));
router.use(cors());

router.use('/drivers', driversRouter)

module.exports = router;
