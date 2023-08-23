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
}

module.exports = TournamentController;