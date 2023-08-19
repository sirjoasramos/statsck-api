const { getFirestore } = require('firebase-admin/firestore');

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

    static async getAllTeamsData(request) {
         // Validar presença dos parâmetros obrigatórios
         if (!request.query.tournament) {
            throw new Error('Parâmetro "tournament" obrigatório.');
        }
        const db = getFirestore();
        const trn = db.collection(request.query.tournament);
        const snapshot = await trn.get();

        if (snapshot.empty) {
            return { dados: 'sem-registros' };
        }   
        // Mapear dados dos documentos
        const dados = snapshot.docs.map(doc => doc.data());
        return dados;
    }
}

module.exports = TeamService;
