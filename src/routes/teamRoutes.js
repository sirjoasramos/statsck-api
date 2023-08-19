const TeamController = require('../controllers/teamController')

module.exports = {
    name: 'teamRoutes',
    register: async (server) => {
        server.route({
            method: 'GET',
            path: '/hometeams',
            handler: TeamController.getHomeTeams
        }),
            server.route({
                method: 'GET',
                path: '/awayteams',
                handler: TeamController.getAwayTeams
            }),
            server.route({
                method: 'GET',
                path: '/allteams',
                handler: TeamController.getAllTeams
            })
    }

}
