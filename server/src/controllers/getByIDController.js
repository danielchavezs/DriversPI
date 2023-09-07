require('dotenv').config();
const { Driver, Team } = require('../db.js');
const { getAPIdrivers } = require('./getDriversController.js');

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
      const allAPIdrivers = await getAPIdrivers();
      const apiDriver = allAPIdrivers.find((driver) => driver.id === Number(driverID));

      if(apiDriver){
        IDFoundDriver.push(apiDriver);
      }
    };

    if ( IDFoundDriver.length > 0 && IDFoundDriver[0] !== null){
        return IDFoundDriver[0];
    } else { throw new Error ('The driver with the given ID does not exists in the system.'); };
  };

module.exports = { getByID };

// -------------------------------------------------------------------------------------------

      // const urlRequest = await axios(`${API_URL}/${driverID}`);
      // const { data } = urlRequest;

      // const {id, name, image, dob, nationality, teams, description } = data;
      
      // const apiDriver = {
      //   id: Number(id),
      //   forename: name.forename,
      //   surname: name.surname,
      //   image: image.url ? image.url : DEFAULT_IMAGE,
      //   dob,
      //   nationality,
      //   teams,
      //   description,
      // };