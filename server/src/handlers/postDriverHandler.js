const { createDriver } = require("../controllers/postDriverController");

const postHandler = async (req, res) => {
    // console.log('Llegó la request hasta el handler')
    const { forename, surname, description, image, nationality, dob, teams, } = req.body;
    // console.log(forename, surname, description, image, nationality, dob, teams);
    // console.log(`ACÁ ESTÁ EL DOB: ${dob} RECIBIDO EN EL HANDLER`)
    try {
        const response = await createDriver(forename, surname, description, image, nationality, dob, teams);
        // console.log(response);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = { postHandler };