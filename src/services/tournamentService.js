const { getFirestore } = require('firebase-admin/firestore');
const { Tournament, TournamentAliasesEnum } = require('../models/tournament');

class TournamentService {

    static async saveGamesFromTournament(request, response) {
        const payload = request.payload;
        const db = getFirestore();

        try {
            for (const game of payload) {
                await db.collection(this.getDataBase(game.tournament).ALL_MATCHS_DATABASE_NAME)
                    .doc(`g-${game.id}`)
                    .set(game);
            }

            return { message: "success" };
        } catch (error) {
            console.error("Error saving games:", error);
            throw new Error("Failed to save games.");
        }
    }

    static async saveHomeStatsFromTournament(request, response) {
        const payload = request.payload;
        const db = getFirestore();
        const dataBase = this.getDataBase(payload.tournament).HOME_STATS_DATABASE_NAME;

        try {
            for (const team of payload.stats) {
                await db.collection(dataBase)
                    .doc(`${team.name}`)
                    .set(team.statistics);                
            }

            return { message: "success" };
        } catch (error) {
            console.error("Error saving home stats:", error);
            throw new Error("Failed to save home stats.");
        }
    }

    static async saveAwayStatsFromTournament(request, response) {
        const payload = request.payload;
        const db = getFirestore();
        const dataBase = this.getDataBase(payload.tournament).AWAY_STATS_DATABASE_NAME;
        try {
            for (const team of payload.stats) {
                await db.collection(dataBase)
                    .doc(`${team.name}`)
                    .set(team.statistics);
            }

            return { message: "success" };
        } catch (error) {
            console.error("Error saving away stats:", error);
            throw new Error("Failed to save away stats.");
        }
    }

    static async saveMatchsDayFromTournament(request, response) {
        const payload = request.payload;
        const db = getFirestore();
        const dataBase = this.getDataBase(payload.tournament).MATCHDAY_DATABASE_NAME;
        try {
            for (const game of payload.games) {
                await db.collection(dataBase)
                    .doc(`g-${game.id}`)
                    .set(game);
            }

            return { message: "success" };
        } catch (error) {
            console.error("Error saving matchday:", error);
            throw new Error("Failed to save matchday.");
        }
    }

    static getDataBase(t) {
        return new Tournament(TournamentAliasesEnum[t]);
    }

    static async saveFootMineMapHomeCk(request, response) {
        const payload = request.payload;
        const db = getFirestore();

        try {
            for (const game of payload) {
                await db.collection('footy_mine_map_home_ck')
                    .doc(`${game.team}`)
                    .set(game);
            }

            return { message: "success" };
        } catch (error) {
            console.error("Error saving games:", error);
            throw new Error("Failed to save games.");
        }
    }

    static async saveFootMineMapAwayCk(request, response) {
        const payload = request.payload;
        const db = getFirestore();

        try {
            for (const game of payload) {
                await db.collection('footy_mine_map_away_ck')
                    .doc(`${game.team}`)
                    .set(game);
            }

            return { message: "success" };
        } catch (error) {
            console.error("Error saving games:", error);
            throw new Error("Failed to save games.");
        }
    }

    static async getMineMapHomeCk(request, response) {  
        const database = 'footy_mine_map_home_ck';    
        
        try {
            const db = getFirestore();
            const trn = db.collection(database);
            const snapshot = await trn.get();
    
            const allTeamData = snapshot.docs.map(doc => doc.data());
            return allTeamData;
        } catch (error) {
            console.error("Error fetching all teams data:", error);
            throw new Error("Failed to fetch all teams data.");
        }
    }

    static async getMineMapAwayCk(request, response) {  
        const database = 'footy_mine_map_away_ck';    
        
        try {
            const db = getFirestore();
            const trn = db.collection(database);
            const snapshot = await trn.get();
    
            const allTeamData = snapshot.docs.map(doc => doc.data());
            return allTeamData;
        } catch (error) {
            console.error("Error fetching all teams data:", error);
            throw new Error("Failed to fetch all teams data.");
        }
    }
}

module.exports = TournamentService;
