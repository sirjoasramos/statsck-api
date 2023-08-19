const {getFirestore} = require('firebase-admin/firestore');

class TournamentService {

    static async saveGamesFromTournament(request, response){
        const payload = request.payload;
        const db = getFirestore();

        payload.forEach(async game => {
            const res = await db.collection(game.game.tournament).doc('g-' + game.game.id).set(game);
        });

        return { message: "success" };
    }

}

module.exports = TournamentService;