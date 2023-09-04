const { Router } = require("express");
const { getDriversHandler } = require("../handlers/getDriversHandler");
const { getByIDHandler } = require("../handlers/getByIDHandler");
const { postHandler } = require("../handlers/postDriverHandler");
const { getByNameHandler } = require("../handlers/getByNameHandler");

const driversRouter = Router();

driversRouter.get("/", getDriversHandler);
driversRouter.get("/:id", getByIDHandler);
driversRouter.post("/create", postHandler);
driversRouter.get("/search", getByNameHandler);

module.exports = { driversRouter };
