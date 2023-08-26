const axios = require('axios');
require('dotenv').config();
const { API_URL, DEFAULT_IMAGE } = process.env;
const { Driver, Team } = require('../db.js');


const getDrivers = async () => {

  const apiDrivers = []; // ----> lo tenía como let y cambié a const.

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
        description: driver.description,
      };
    });
    apiDrivers.push(...drivers);
  }

  const dbDrivers = await Driver.findAll({
    include: {
      model: Team,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });
  const allDrivers = apiDrivers.concat(dbDrivers);
  return allDrivers;
//   filter logic here
};

module.exports = { getDrivers };