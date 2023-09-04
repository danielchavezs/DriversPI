const { getTeams } = require("../controllers/teamsController");

const getTeamsHandler = async (req, res)=>{
    try {
        const response = await getTeams();
        res.status(200).json(response)
    } catch (error) {
        res.status(400).send({ error: error.message })  
    };
};

module.exports = { getTeamsHandler };