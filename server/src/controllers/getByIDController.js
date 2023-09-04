const axios = require('axios');
require('dotenv').config();
const { API_URL, DEFAULT_IMAGE } = process.env;
const { Driver, Team } = require('../db.js');

const getByID = async (driverID) => {    
    IDFoundDriver = [];

    if (driverID.length > 3){
      console.log("Executing search on database.");    
      const DBdriver =  await Driver.findOne({
        where: {
            id: driverID,
        },
        include: {
            model: Team,
            attributes: ["name"],
            through: {
              attributes: [],
            },
         },
      });
      IDFoundDriver.push(DBdriver);
    };
    
    if (driverID.length < 4){
      console.log("Executing search on API.")
      const urlRequest = await axios(`${API_URL}/${driverID}`);
      const { data } = urlRequest;

      const {id, name, image, dob, nationality, teams, description } = data;
      
      const apiDriver = {
        id: Number(id),
        name:  {
            forename: name.forename,
            surname: name.surname,
        },
        image: image.url ? image.url : DEFAULT_IMAGE,
        dob,
        nationality,
        teams,
        description,
      };
      IDFoundDriver.push(apiDriver);
    };

    if ( IDFoundDriver.length > 0){
        return IDFoundDriver[0];
    } else { throw new Error ('The driver with the given ID does not exists in the system.'); };
  };

module.exports = { getByID };