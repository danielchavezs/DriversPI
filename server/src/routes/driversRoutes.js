const { Router } = require("express");
const { getDriversHandler } = require("../handlers/getDriversHandler");
const { getByIDHandler } = require("../handlers/getByIDHandler");
const { postHandler } = require("../handlers/postDriverHandler");
const { getByNameHandler } = require("../handlers/getByNameHandler");
// const { getByNameHandler2 } = require("../handlers/byNameHandler");

const driversRouter = Router();

driversRouter.get("/", getDriversHandler);
driversRouter.get("/search", getByNameHandler);
driversRouter.get("/:id", getByIDHandler);
driversRouter.post("/create", postHandler);

module.exports = { driversRouter };
