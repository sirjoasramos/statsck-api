const TournamentController = require('../controllers/tournamentController');

module.exports = {
    name:'tournamentRoutes',
    register: async (server) =>{
        server.route({
            method:'POST',
            path:'/savegames',
            handler: TournamentController.saveGames
        }),
        server.route({
            method:'POST',
            path:'/savestatshome',
            handler: TournamentController.saveStatsHome
        }),
        server.route({
            method:'POST',
            path:'/savestatsaway',
            handler: TournamentController.saveStatsAway
        }),
        server.route({
            method:'POST',
            path:'/savematchday',
            handler: TournamentController.saveMatchDay
        })
    }
}