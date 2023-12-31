const { Router } = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { driversRouter } = require("./driversRoutes");
const { teamsRouter } = require("./teamsRoutes.js");


const router = Router();

router.use(morgan("dev"));
router.use(cors());

router.use('/drivers', driversRouter);
router.use('/teams', teamsRouter);

module.exports = router;
