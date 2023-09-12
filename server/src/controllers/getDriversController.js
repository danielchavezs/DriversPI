const axios = require('axios');
require('dotenv').config();
const { API_URL, DEFAULT_IMAGE } = process.env;
const { Driver, Team } = require('../db.js');
const { DESC, ASC } = require('../utils.js');
const DISPLAYED_DRIVERS = 9;

function sortDrivers (foundDrivers, sort, page){  // { sort, page = 0 }, --> debería estar como parámetro para que opere la función, reibido como query desde el handler.
  let totalPages = Math.ceil(foundDrivers.length / DISPLAYED_DRIVERS);

  if (sort) {
    let sortedDrivers = [...foundDrivers].sort((a, b) => {
      if (a[sort.field] < b[sort.field]) {
        return -1;
      }
      if (a[sort.field] > b[sort.field]) {
        return 1;
      }
      return 0;
    });
    if (sort.direction === "DESC") {  // --> falta estandarizar con varibale
      sortedDrivers = [...sortedDrivers].reverse();
    }
    foundDrivers = sortedDrivers;
  }
  
  if (page === 0 || page) {
    let paginatedDrivers = [...foundDrivers].slice(
      page * DISPLAYED_DRIVERS,
      page * DISPLAYED_DRIVERS + DISPLAYED_DRIVERS
    );
    foundDrivers = paginatedDrivers;
  }
  return {
    foundDrivers,
    totalPages,
  };
};

const getAPIdrivers = async () => { //{ sort, page = 0 }
  const apiDrivers = [];  // --> cambié de const a let para poder aplicar lógica de paginado

  const apiRequest = axios.get(API_URL);
  const responses = await Promise.all([apiRequest]);

  // FOR PARA OBJETOS
  for (const response of responses) {
    const drivers = response.data.map((driver) => {
      // if propiedad teams y abajo el modelado final con el objeto
      if(driver.teams){
        const arrayTeams = driver.teams.split(",")
        const trimmedTeams = arrayTeams.map((team) => team.trim());;
        const modeledTeams = trimmedTeams.map((team) => ({
          name: team,
        }));
        // console.log(modeledTeams);
        return {
          id: driver.id,
          forename: driver.name.forename,
          surname: driver.name.surname,
          image: driver.image.url ? driver.image.url : DEFAULT_IMAGE,
          dob: driver.dob,
          nationality: driver.nationality,
          teams: modeledTeams,
          description: driver.description,
        };
      }else{  // -->     if (!driver.teams)
        return {
          id: driver.id,
          forename: driver.name.forename,
          surname: driver.name.surname,
          image: driver.image.url ? driver.image.url : DEFAULT_IMAGE,
          dob: driver.dob,
          nationality: driver.nationality,
          teams: driver.teams,
          description: driver.description,
        };
      };
    });
    apiDrivers.push(...drivers);
  };
  // if (sort){
  //   let foundDrivers = apiDrivers;
  //   const sortedDrivers = await sortDrivers(foundDrivers, sort, page);
  //   return sortedDrivers;
  // } else 
  return apiDrivers;
};

const getDBdrivers = async () => { //{ sort, page = 0 }
  const dbDrivers = await Driver.findAll({
    include: {
      model: Team,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });
  // if (sort){
  //   let foundDrivers = dbDrivers;
  //   const sortedDrivers = await sortDrivers(foundDrivers, sort, page);
  //   return sortedDrivers;
  // } else 
  return dbDrivers;
};

const getDrivers = async ({ sort, page = 0 }) => { // { sort, page = 0 }
  // const apiReponse = await getAPIdrivers({ sort, page });
  // const dbResponse = await getDBdrivers({ sort, page });
  
  // const apiDrivers = apiReponse.foundDrivers;
  // const dbDrivers = dbResponse.foundDrivers;

  const apiDrivers = await getAPIdrivers();
  const dbDrivers = await getDBdrivers();
  
  let foundDrivers = apiDrivers.concat(dbDrivers); // cambio de const a let para manipular datos con la lógica del paginado.
  
  // if (sort) {
      const sortedDrivers = sortDrivers(foundDrivers, sort, page);
      console.log(sort, page)
      return sortedDrivers;
    // } else 
    // return foundDrivers;
};

module.exports = { getDrivers, getAPIdrivers, getDBdrivers };

// ----------------------------------------------------------------------------------------------------------------------------
// SORT LOGIC DENTRO DE CADA FUNCIÓN (GETDRIVERS EN ESTE CASO):
//
// let totalPages = Math.ceil(foundDrivers.length / DISPLAYED_DRIVERS);

// if (sort) {
//   let sortedDrivers = [...foundDrivers].sort((a, b) => {
//     if (a[sort.field] < b[sort.field]) {
//       return -1;
//     }
//     if (a[sort.field] > b[sort.field]) {
//       return 1;
//     }
//     return 0;
//   });
//   if (sort.direction === DESC) {
//     sortedDrivers = [...sortedDrivers].reverse();
//   }
//   foundDrivers = sortedDrivers;
// }

// if (page === 0 || page) {
//   let paginatedDrivers = [...foundDrivers].slice(
//     page * DISPLAYED_DRIVERS,
//     page * DISPLAYED_DRIVERS + DISPLAYED_DRIVERS
//   );
//   foundDrivers = paginatedDrivers;
// }
// return {
//   foundDrivers,
//   totalPages,
// };