const axios = require('axios');
require('dotenv').config();
const { API_URL, DEFAULT_IMAGE } = process.env;
const { Driver, Team } = require('../db.js');

const getAPIdrivers = async () => {
  const apiDrivers = []; 

  const apiRequest = axios.get(API_URL);
  const responses = await Promise.all([apiRequest]);

  // FOR PARA OBJETOS
  for (const response of responses) {
    const drivers = response.data.map((driver) => {
      return {
        id: driver.id,
        name: {
            forename: driver.name.forename,
            surname: driver.name.surname,
        },
        image: driver.image.url ? driver.image.url : DEFAULT_IMAGE,
        dob: driver.dob,
        nationality: driver.nationality,
        teams: driver.teams,
        description: driver.description,
      };
    });
    apiDrivers.push(...drivers);
  }
  return apiDrivers;
};

const getDBdrivers = async () => {
  const dbDrivers = await Driver.findAll({
    include: {
      model: Team,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });
  return dbDrivers;
};

const getDrivers = async () => {
  const apiDrivers = await getAPIdrivers();
  const dbDrivers = await getDBdrivers();

  const allDrivers = apiDrivers.concat(dbDrivers);
  return allDrivers;
//   filter logic here

};

module.exports = { getDrivers, getAPIdrivers, getDBdrivers };