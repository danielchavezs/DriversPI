const { Team } = require('../db.js');
const { getAPIdrivers } = require("./getDriversController.js");
require("dotenv").config();

const getTeams = async ()=>{

  const teamNamesSet = new Set();
  const dbTeams = await Team.findAll();
  const apiDrivers = await getAPIdrivers();

  if (!dbTeams.length) {
  apiDrivers.forEach((driver) => {
    if (driver.teams && driver.teams[0]) {
      driver.teams.forEach((team) => {
        // const teamName = team.name.trim();
        teamNamesSet.add(JSON.stringify({ name: team.name }));
      });
    }
  });

  const remodeledTeams = [...teamNamesSet].map((jsonString) => JSON.parse(jsonString));
  console.log(remodeledTeams);

    try {
      const createdTeams = await Team.bulkCreate(remodeledTeams, {
        ignoreDuplicates: true,
      });
      console.log("The teams have been successfully added to the database.");
      // console.log(createdTeams);
      return remodeledTeams;
    } catch (error) {
      console.error("Error creating teams:", error);
    }
  }
};

module.exports = { getTeams };

// -----------------------------------------------------------------------------------------------------

// apiDrivers.forEach((driver) => {
//   if (driver.teams) {
//     const teams = driver.teams.split(','); // Divido los equipos si hay más de uno en la cadena
//     teams.forEach((team) => {
//       const trimmedTeam = team.trim(); // Elimino los espacios alrededor del nombre del equipo
//       if (trimmedTeam) {
//         teamNames.push(trimmedTeam); // Agrego los nombres de equipos individuales sin espacios
//       }
//     });
//   }
// });

// const uniqueTeams = [...new Set(teamNames)];  // Elimino los equipos repetidos del arreglo anterior y giardo los únicos en un arreglo nuevo.

// const addTeams = uniqueTeams.map((team) => ({
//   name: team,
// }));


