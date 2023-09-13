const { getByName } = require('../controllers/getByNameController');
const {
  getDrivers,
  getDBdrivers,
  getAPIdrivers,
} = require('../controllers/getDriversController');

const getDriversHandler = async (req, res) => {
  const { origin, name, sort, page, team } = req.query;
  try {
    const response = await getDrivers({ sort, page, team, origin, name });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { getDriversHandler };

//----------------------------------------------------------------------------------------------------------
// if ( origin === undefined && name === undefined ){
//   response = await getDrivers()
// }if (origin == "api") {
//    response = await getAPIdrivers();
// } if (origin == "db") {
//   response = await getDBdrivers()
// } if (origin === undefined && name) {
//   response = await getByName(name);
// }
// ----------------------------------------------------------------------------------------------------------

// const getDriversHandler = async (req, res) => {
// //   const { sort, page } = req.query;
//   try {
//     const response = await getDrivers();
//     res.status(200).json(response);
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// };
