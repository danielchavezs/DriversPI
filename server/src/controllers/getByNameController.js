const axios = require("axios");
require('dotenv').config();
const { API_URL, DEFAULT_IMAGE } = process.env;
const { Driver, Team } = require('../db.js').conn.models;
const { getDrivers, getAPIdrivers, getDBdrivers } = require("./getDriversController.js");

const getByName = async (originalName) => {

    if (!originalName) {
        throw new Error ('You must enter a name in order to the system to be able to search it.');
    };
    const apiDrivers = await getAPIdrivers();
    // const dbDrivers = getDBdrivers();

    const driverName = originalName.charAt(0).toUpperCase() + originalName.slice(1).toLowerCase();
    console.log(`Gotten name ${originalName} turned into ${driverName}`);

    const dbFoundDriver = await Driver.findAll({
        where: {
            forename: driverName,
        },
        include: {
            model: Team,
            attributes: ["name"],
            through: {
              attributes: [],
            },
         },
    });

    const apiFoundDrivers = apiDrivers.filter((driver) => driver.name.forename == driverName);

    const queryFoundDrivers = dbFoundDriver.concat(apiFoundDrivers);
    if (!queryFoundDrivers.length){
        throw new Error (`The driver ${driverName} was not found.`);
    } else{
        return queryFoundDrivers;
    };
};

module.exports = { getByName };


// -------------------------------------------------------------------------------------------------------------

// const getByName = async (originalName) => {
//     if (!originalName) {
//         throw new Error ('You must enter a name in order to the system to be able to search it.');
//     };

//     const driverName = originalName.charAt(0).toUpperCase() + originalName.slice(1).toLowerCase();
//     console.log(`Gotten name ${originalName} turned into ${driverName}`);

//     const queryFoundDrivers = [];

//     const dbDriver = await Driver.findAll({
//         where: {
//             name: {
//                 forename: driverName,
//             },
//         },
//         include: {
//             model: Team,
//             attributes: ["name"],
//             through: {
//               attributes: [],
//             },
//          },
//     });
    
//   if (dbDriver !== null && dbDriver !== undefined){
//     queryFoundDrivers.push(dbDriver);
//   }else{

//       console.log(`The driver ${driverName} is being searched at the API`);

//       const urlRequest = await axios(`${API_URL}?name.forename=${driverName}`);
//       const searchResponse = urlRequest.data;
      
//       for (let i=0; i < searchResponse.length; i++){
//         // let { id, name, image, dob, nationality, description, } = searchResponse[i];
//         let apiDriver = {
//             id: Number(searchResponse[i].id),
//             name: {
//                 forename: searchResponse[i].forename,
//                 surname: searchResponse[i].surname,
//             },
//             image: searchResponse[i].image.url ? searchResponse[i].image.url : DEFAULT_IMAGE,
//             dob: searchResponse[i].dob,
//             nationality: searchResponse[i].nationality,
//             description: searchResponse[i].description,
//         };
//         queryFoundDrivers.push(apiDriver);
//       };
//   };

//   // console.log(queryFoundDrivers);

//   if (!queryFoundDrivers.length){
//       throw new Error (`The driver ${driverName} was not found.`);
//   }else return queryFoundDrivers;
// };

// module.exports = { getByName };
