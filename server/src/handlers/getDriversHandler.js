const { getDrivers } = require("../controllers/getDriversController");

const getDriversHandler = async (req, res) => {
//   const { sort, page } = req.query;
  try {
    const response = await getDrivers();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { getDriversHandler };
