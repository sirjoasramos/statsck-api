const TournamentService = require('../services/tournamentService')

class TournamentController{
    static async saveGames(request, response){
        return await TournamentService.saveGamesFromTournament(request, response);
    }
}

module.exports = TournamentController;