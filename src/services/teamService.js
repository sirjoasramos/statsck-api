const { getFirestore } = require('firebase-admin/firestore');
const { Tournament, TournamentAliasesEnum } = require('../models/tournament');

class TeamService {
    static async getHomeTeamsData(request, response) {

        const db = getFirestore();

        const trn = db.collection(request.query.tournament);
        const snapshot = await trn.where("game.homeTeam", "==", request.query.team).get();

        if (snapshot.empty) {
            return { dados: 'sem-registros' };
        }

         // Mapear dados dos documentos
         const dados = snapshot.docs.map(doc => doc.data());
         return dados;

    }

    static async getAwayTeamsData(request, response) {
        const db = getFirestore();

        const trn = db.collection(request.query.tournament);
        const snapshot = await trn.where("game.awayTeam", "==", request.query.team).get();

        if (snapshot.empty) {
            return { dados: 'sem-registros' };
        } 

         // Mapear dados dos documentos
         const dados = snapshot.docs.map(doc => doc.data());
         return dados;

    }
    static async getAllTeamsData(request, response) {
        const tournament = request.query.tournament;
        const database = this.getDataBase(tournament);

        if (!tournament || !database.ALL_MATCHS_DATABASE_NAME) {
            throw new Error('Instância válida da classe Tournament é obrigatória.');
        }
    
        console.log(database.ALL_MATCHS_DATABASE_NAME);
        
        try {
            const db = getFirestore();
            const trn = db.collection(database.ALL_MATCHS_DATABASE_NAME);
            const snapshot = await trn.get();
    
            const allTeamData = snapshot.docs.map(doc => doc.data());
            return allTeamData;
        } catch (error) {
            console.error("Error fetching all teams data:", error);
            throw new Error("Failed to fetch all teams data.");
        }
    }
    
    static getDataBase(t) {
        return new Tournament(TournamentAliasesEnum[t]);
    }
    
}

module.exports = TeamService;
