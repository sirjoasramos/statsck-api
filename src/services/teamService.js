const { getFirestore } = require('firebase-admin/firestore');
const { Tournament, TournamentAliasesEnum } = require('../models/tournament');

class TeamService {
    static async getHomeTeamsData(request, response) {

        const tournament = request.query.tournament;
        const database = this.getDataBase(tournament);

        if (!tournament || !database.HOME_STATS_DATABASE_NAME) {
            throw new Error('Instância válida da classe Tournament é obrigatória.');
        }
        
        try {
            const db = getFirestore();
            const trn = db.collection(database.HOME_STATS_DATABASE_NAME);
            const snapshot = await trn.get();
    
            const allTeamData = snapshot.docs.map(doc => doc.data());
            return allTeamData;
        } catch (error) {
            console.error("Error fetching all teams data:", error);
            throw new Error("Failed to fetch all teams data.");
        }
    }

    static async getAwayTeamsData(request, response) {
        const tournament = request.query.tournament;
        const database = this.getDataBase(tournament);

        if (!tournament || !database.AWAY_STATS_DATABASE_NAME) {
            throw new Error('Instância válida da classe Tournament é obrigatória.');
        }
        
        try {
            const db = getFirestore();
            const trn = db.collection(database.AWAY_STATS_DATABASE_NAME);
            const snapshot = await trn.get();
    
            const allTeamData = snapshot.docs.map(doc => doc.data());
            return allTeamData;
        } catch (error) {
            console.error("Error fetching all teams data:", error);
            throw new Error("Failed to fetch all teams data.");
        }

    }
    static async getAllTeamsData(request, response) {
        const tournament = request.query.tournament;
        const database = this.getDataBase(tournament);

        if (!tournament || !database.ALL_MATCHS_DATABASE_NAME) {
            throw new Error('Instância válida da classe Tournament é obrigatória.');
        }
        
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
