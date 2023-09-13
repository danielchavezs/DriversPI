const { Driver, Team } = require('../db.js');
const { Op, Sequelize } = require('sequelize');
require('dotenv').config();
const { DEFAULT_IMAGE } = process.env;

const createDriver = async (forename, surname, description, image, nationality, dob, teams) => {
  
  if (!Array.isArray(teams)) {
    throw new Error('teams should be an array.');
  }

  const newDVteams = await Team.findAll({
    where: {
      name: teams.map((team) => team)
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
// let newDVteams = [];
 
// for (const team of teams) {
//   if (typeof team === 'number') {
//     // Buscar equipos por ID
//     const teamsByID = await Team.findAll({
//       where: {
//         id: Number(team)
//       },
//     });
//     console.log("ID TEAMS!", teamsByID)
//     newDVteams = newDVteams.concat(teamsByID);
//   }
  
//   if (typeof team === 'string') {
//     // Buscar equipos por nombre
//     const teamsByName = await Team.findAll({
//       where: {
//         name: team
//       },
//     });
//     console.log("NAME TEAMS!",teamsByName)
//     newDVteams = newDVteams.concat(teamsByName);
    
//     let toNumber = Number(team);
//     if (typeof team === "string" && typeof toNumber === "number") {
//       const teamsByID2 = await Team.findAll({
//         where: {
//           id: toNumber
//         },
//       });
//       console.log("ID TEAMS 2!", teamsByID2)
//       newDVteams = newDVteams.concat(teamsByID2);
//     }
//   }
// }
// -----------------------------------------------------------------------------------------
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