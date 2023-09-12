const { createDriver } = require("../controllers/postDriverController");

const postHandler = async (req, res) => {
    const { forename, surname, description, image, nationality, dob, teams, } = req.body;
    try {
        const response = await createDriver(forename, surname, description, image, nationality, dob, teams);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = { postHandler };