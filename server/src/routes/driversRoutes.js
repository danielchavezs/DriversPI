const { Router } = require("express");
const { getDriversHandler } = require("../handlers/getDriversHandler");


const driversRouter = Router();

driversRouter.get("/", getDriversHandler);


module.exports = { driversRouter };
