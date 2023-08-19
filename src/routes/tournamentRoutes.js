const TournamentController = require('../controllers/tournamentController');

module.exports = {
    name:'tournamentRoutes',
    register: async (server) =>{
        server.route({
            method:'POST',
            path:'/savegames',
            handler: TournamentController.saveGames
        })
    }
}