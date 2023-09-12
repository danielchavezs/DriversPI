const { Driver, Team } = require('../db.js');
const { Op } = require('sequelize');
require('dotenv').config();
const { DEFAULT_IMAGE } = process.env;

const createDriver = async (forename, surname, description, image, nationality, dob, teams) => {
  
  const newDVteams = await Team.findAll({
    where: {
      name: teams.map(team => team)
    },
  });
  
  if (!newDVteams.length){
    throw new Error ('There is no team listed within the database that matches the one(s) received.');
  }else{
    const newDriver = await Driver.create({forename, surname, description, image: image? image: DEFAULT_IMAGE, nationality, dob });  // : image? image: DEFAULT_IMAGE,
    await newDriver.addTeam(newDVteams);
    return newDriver;
  }
};    

module.exports = { createDriver }

// --------------------------------------------------------------------------------------------------
// const conditions = teams.map(team => ({ name: team }));
// where: {
//   [Op.or]: conditions, // Realiza una consulta OR entre las condiciones
// },
// --------------------------------------------------------------------------------------------------

// const existingDriver = await Driver.findOne({
//   were: {
//     forename,
//     surname,
//   },
// NUEVO
// // if (existingDriver) {
// //   const error = new Error("The pilot already exists");
// //   error.status = 409; // conflict
// //   throw error;
// // }

// ---------------------------------------------------------------------------------------------------

// const createDriver = async (forename, surname, description, image, nationality, dob, teams) => {

//   const existingTeams = await Team.findAll({
//     where: {
//       name: {
//         [Op.in]: teams, // Utilizamos el operador "in" para buscar nombres en el array
//       },
//     },
//   });

//   console.log(existingTeams);

//   if (!existingTeams.length){
//     throw new Error ('There is no team listed within the database that matches the one(s) received.');
//   } else {
//     const newDriver = await Driver.create({forename, surname, description, image, nationality, dob });
//     await newDriver.addTeams(existingTeams);
//     console.log(newDriver);
//     return newDriver;
//   }
// };    

// module.exports = { createDriver };