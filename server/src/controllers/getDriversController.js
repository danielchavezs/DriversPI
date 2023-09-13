const axios = require('axios');
require('dotenv').config();
const { API_URL, DEFAULT_IMAGE } = process.env;
const { Driver, Team } = require('../db.js');
const { DESC, ASC } = require('../utils.js');
const DISPLAYED_DRIVERS = 9;

function sortDrivers(foundDrivers, sort, page) {
  // { sort, page = 0 }, --> debería estar como parámetro para que opere la función, reibido como query desde el handler.
  let totalPages = Math.ceil(foundDrivers.length / DISPLAYED_DRIVERS);
  const finalPage = page > totalPages ? totalPages - 1 : page;
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
    if (sort.direction === 'DESC') {
      // --> falta estandarizar con varibale
      sortedDrivers = [...sortedDrivers].reverse();
    }
    foundDrivers = sortedDrivers;
  }

  if (finalPage === 0 || finalPage) {
    let paginatedDrivers = [...foundDrivers].slice(
      finalPage * DISPLAYED_DRIVERS,
      finalPage * DISPLAYED_DRIVERS + DISPLAYED_DRIVERS
    );
    foundDrivers = paginatedDrivers;
  }
  return {
    foundDrivers,
    totalPages,
  };
}

function filterByTeam(drivers, team, origin) {
  if (!team && !origin) {
    return drivers;
  }
  const dirversObject = drivers.reduce(
    (acc, { id, teams }) => ({
      ...acc,
      [id]: teams?.map(({ name }) => name) || [],
    }),
    {}
  );
  const filteredDrivers = drivers.filter(({ id, origin: driverOrigin }) => {
    const teams = dirversObject[id];
    if (team && origin) {
      return teams.includes(team) && origin === driverOrigin;
    }
    if (!team && origin) {
      return origin === driverOrigin;
    }
    if (team && !origin) {
      return teams.includes(team);
    }
  });
  return filteredDrivers;
}

function filterName(drivers, searchName) {
  if (!searchName) {
    return drivers;
  }
  const lowerSearchName = searchName.toLocaleLowerCase();
  const filteredDrivers = drivers.filter(({ forename, surname }) => {
    const fullName = `${forename} ${surname}`.toLocaleLowerCase();
    return fullName.includes(lowerSearchName);
  });
  return filteredDrivers;
}

const getAPIdrivers = async () => {
  //{ sort, page = 0 }
  const apiDrivers = []; // --> cambié de const a let para poder aplicar lógica de paginado

  const apiRequest = axios.get(API_URL);
  const responses = await Promise.all([apiRequest]);

  // FOR PARA OBJETOS
  for (const response of responses) {
    const drivers = response.data.map((driver) => {
      // if propiedad teams y abajo el modelado final con el objeto
      if (driver.teams) {
        const arrayTeams = driver.teams.split(',');
        const trimmedTeams = arrayTeams.map((team) => team.trim());
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
          origin: 'api',
        };
      } else {
        // -->     if (!driver.teams)
        return {
          id: driver.id,
          forename: driver.name.forename,
          surname: driver.name.surname,
          image: driver.image.url ? driver.image.url : DEFAULT_IMAGE,
          dob: driver.dob,
          nationality: driver.nationality,
          teams: driver.teams,
          description: driver.description,
          origin: 'api',
        };
      }
    });
    apiDrivers.push(...drivers);
  }
  // if (sort){
  //   let foundDrivers = apiDrivers;
  //   const sortedDrivers = await sortDrivers(foundDrivers, sort, page);
  //   return sortedDrivers;
  // } else
  return apiDrivers;
};

const getDBdrivers = async () => {
  //{ sort, page = 0 }
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
  return dbDrivers.map((driver) => ({ ...driver, origin: 'db' }));
};

const getDrivers = async ({ sort, page = 0, team = '', origin, name }) => {
  // { sort, page = 0 }
  // const apiReponse = await getAPIdrivers({ sort, page });
  // const dbResponse = await getDBdrivers({ sort, page });

  // const apiDrivers = apiReponse.foundDrivers;
  // const dbDrivers = dbResponse.foundDrivers;
  const apiDrivers = await getAPIdrivers();
  const dbDrivers = await getDBdrivers();

  let foundDrivers = apiDrivers.concat(dbDrivers); // cambio de const a let para manipular datos con la lógica del paginado.

  foundDrivers = filterName(foundDrivers, name);
  const filteredByTeamsDrivers = filterByTeam(foundDrivers, team, origin);
  const sortedDrivers = sortDrivers(filteredByTeamsDrivers, sort, page);
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
