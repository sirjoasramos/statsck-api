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
        }),
        server.route({
            method:'POST',
            path:'/saveminemaphomeck',
            handler: TournamentController.saveFootMineMapHomeCk
        }),
        server.route({
            method:'POST',
            path:'/saveminemapawayck',
            handler: TournamentController.saveFootMineMapAwayCk
        }),
        server.route({
            method: 'GET',
            path: '/getminemaphomeck',
            handler: TournamentController.getMineMapHomeCk
        }),
        server.route({
            method: 'GET',
            path: '/getminemapawayck',
            handler: TournamentController.getMineMapAwayCk
        })
    }
}