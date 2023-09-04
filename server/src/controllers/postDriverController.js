const { Driver, Team } = require('../db.js');
const { Op } = require('sequelize');

const createDriver = async (forename, surname, description, image, nationality, dob, teams) => {

  const conditions = teams.map(team => ({ name: team }));
  const newDVteams = await Team.findAll({
    where: {
      [Op.or]: conditions, // Realiza una consulta OR entre las condiciones
    },
  });

  // console.log(newDVteams);

  if (!newDVteams.length){
    throw new Error ('There is no team listed within the database that matches the one(s) received.');
  }else{
    const newDriver = await Driver.create({forename, surname, description, image, nationality, dob });
    await newDriver.addTeam(newDVteams);
    // console.log(newDriver);
    return newDriver;
  }
};    

module.exports = { createDriver }


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