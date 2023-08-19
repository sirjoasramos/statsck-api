const TeamService = require('../services/teamService');

class TeamController {
    static async getHomeTeams(req, response) {
        return await TeamService.getHomeTeamsData(req, response);
    }

    static async getAwayTeams(req, response) {
        // Lógica para obter dados das equipes visitantes
        return await TeamService.getAwayTeamsData(req, response);
    }

    static async getAllTeams(req, response) {
        // Lógica para obter todos os dados das equipes
        return await TeamService.getAllTeamsData(req, response);
    }
}

module.exports = TeamController;
