const { Router } = require("express");
const { getDriversHandler } = require("../handlers/getDriversHandler");
const { getByIDHandler } = require("../handlers/getByIDHandler");
const { postHandler } = require("../handlers/postDriverHandler");

const driversRouter = Router();

driversRouter.get("/", getDriversHandler);
driversRouter.get("/:id", getByIDHandler);
driversRouter.post("/create", postHandler);

module.exports = { driversRouter };
