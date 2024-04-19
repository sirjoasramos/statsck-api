const TournamentService = require('../services/tournamentService')

class TournamentController{
    static async saveGames(request, response){
        return await TournamentService.saveGamesFromTournament(request, response);
    }

    static async saveStatsHome(request, response){
        return await TournamentService.saveHomeStatsFromTournament(request, response);
    }

    static async saveStatsAway(request, response){
        return await TournamentService.saveAwayStatsFromTournament(request, response);
    }

    static async saveMatchDay(request, response){
        return await TournamentService.saveMatchsDayFromTournament(request, response);
    }

    static async saveFootMineMapHomeCk(request, response){
        return await TournamentService.saveFootMineMapHomeCk(request, response);
    }

    static async saveFootMineMapAwayCk(request, response){
        return await TournamentService.saveFootMineMapAwayCk(request, response);
    } 

    static async getMineMapHomeCk(req, response) {       
        return await TournamentService.getMineMapHomeCk(req, response);
    }

    static async getMineMapAwayCk(req, response) {       
        return await TournamentService.getMineMapAwayCk(req, response);
    }
}

module.exports = TournamentController;