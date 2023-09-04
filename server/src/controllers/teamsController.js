const { Team } = require('../db.js');
const { getAPIdrivers } = require("./getDriversController.js");
require("dotenv").config();

const getTeams = async ()=>{
    const teamNames = [];
    const dbTeams = await Team.findAll();
    const apiDrivers = await getAPIdrivers();
    
    if(!dbTeams.length){

        apiDrivers.forEach((driver) => {
            if (driver.teams) {
              const teams = driver.teams.split(','); // Divide los equipos si hay más de uno en la cadena
              teams.forEach((team) => {
                const trimmedTeam = team.trim(); // Elimina los espacios alrededor del nombre del equipo
                if (trimmedTeam) {
                  teamNames.push(trimmedTeam); // Agrega los nombres de equipos individuales sin espacios
                }
              });
            }
          });
 
        const uniqueTeams = [...new Set(teamNames)];  // Elimino los equipos repetidos del arreglo anterior y giardo los únicos en un arreglo nuevo.

        const addTeams = uniqueTeams.map((team) => ({
            name: team,
        }));

        try {
            const createdTeams = await Team.bulkCreate(addTeams, {
              ignoreDuplicates: true,
            });
            console.log('The teams have been successfully added to the database.');
            // console.log(createdTeams); // Muestra las instancias de equipos creadas
          } catch (error) {
            console.error('Error creating teams:', error);
          };
    };
};

module.exports = { getTeams };

// -----------------------------------------------------------------------------------------------------

    // if(!allTeams.length){           
    //     // const apiGenres = apiResponse.map((genre)=> ({
    //     //     name:genre.name,
    //     // }));

    //     const apiDrivers = getDrivers();
    //     const apiRequest = axios.get(API_URL);
    //     const responses = await Promise.all([apiRequest]);
    
    //     const teamNames = [];
    
    //     // FOR PARA OBJETOS
    //     for (const response of responses) {
    //         const drivers = response.data.map((driver) => {
    //             const teams = driver.teams.split(', '); // Divide los equipos si hay más de uno en la cadena
    //             teamNames.push(...teams); // Agrega los nombres de equipos individuales
    //             // return {
    //             //     id: driver.id,
    //             //     name: {
    //             //         forename: driver.name.forename,
    //             //         surname: driver.name.surname,
    //             //     },
    //             //     image: driver.image.url ? driver.image.url : DEFAULT_IMAGE,
    //             //     dob: driver.dob,
    //             //     nationality: driver.nationality,
    //             //     description: driver.description,
    //             // };
    //         });
    //         apiDrivers.push(...drivers);
    //     }
    
    //     const uniqueTeams = [...new Set(teamNames)]; // Elimina duplicados usando Set y luego convierte a array

    //     await Team.bulkCreate(uniqueTeams, {
    //         ignoreDuplicates: true,
    //     });
    //     console.log('The teams have been succesfully added to the database.')
    // };




// ------------------------------------------------------------------------------------------------

// const getTeams2 = async () => {
//     const apiDrivers = [];
//     const apiRequest = axios.get(API_URL);
//     const responses = await Promise.all([apiRequest]);

//     const teamNames = [];

//     // FOR PARA OBJETOS
//     for (const response of responses) {
//         const drivers = response.data.map((driver) => {
//             const teams = driver.teams.split(', '); // Divide los equipos si hay más de uno en la cadena
//             teamNames.push(...teams); // Agrega los nombres de equipos individuales
//             return {
//                 id: driver.id,
//                 name: {
//                     forename: driver.name.forename,
//                     surname: driver.name.surname,
//                 },
//                 image: driver.image.url ? driver.image.url : DEFAULT_IMAGE,
//                 dob: driver.dob,
//                 nationality: driver.nationality,
//                 description: driver.description,
//             };
//         });
//         apiDrivers.push(...drivers);
//     };

//     const uniqueTeams = [...new Set(teamNames)]; // Elimina duplicados usando Set y luego convierte a array
//     return uniqueTeams;
// };

// Llamada a la función
// const teams = await getTeams();
// console.log(teams);


