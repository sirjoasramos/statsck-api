const hapi = require("@hapi/hapi");
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./statsdatabase.json');

const init = async () => {

    initializeApp({
        credential: cert(serviceAccount)
    });

    const server = hapi.server(
        {
            port: process.env.port || 3000,
            host: "localhost",
            routes: {
                cors: true
            },
            state: {
                strictHeader: false //corrige problema com cookies
            }
        }
    );

    server.route({
        method: 'POST',
        path: "/run",
        handler: insertData
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (req, rep) => {
            return { dados: 'api-on' }
        }
    }
    );

    server.route({
        method: 'GET',
        path: '/hometeams',
        handler: async (request, reply) => {
            const db = getFirestore();

            const trn = db.collection(request.query.tournament);
            const snapshot = await trn.where("game.homeTeam", "==", request.query.team).get();

            if (snapshot.empty) {
                return { dados: 'sem-registros' };
            } else {
                let dados = [];
                snapshot.forEach(doc => {
                    dados.push(doc.data());
                });
                return dados;
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/awayteams',
        handler: async (request, reply) => {
            const db = getFirestore();

            const trn = db.collection(request.query.tournament);
            const snapshot = await trn.where("game.awayTeam", "==", request.query.team).get();

            if (snapshot.empty) {
                return { dados: 'sem-registros' };
            } else {
                let dados = [];
                snapshot.forEach(doc => {
                    dados.push(doc.data());
                });
                return dados;
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/allteams',
        handler: async (request, reply) => {
            const db = getFirestore();
            const trn = db.collection(request.query.tournament);
            const snapshot = await trn.get();

            if (snapshot.empty) {
                return { dados: 'sem-registros' };
            } else {
                let dados = [];
                snapshot.forEach(doc => {
                    dados.push(doc.data());
                });
                return dados;
            }
        }
    });

    await server.start();

};

const insertData = async (request, reply) => {
    const payload = request.payload;
    const db = getFirestore();

    payload.forEach(async game => {
        const res = await db.collection(game.game.tournament).doc('g-' + game.game.id).set(game);
    });

    return { message: "success" };
}

init();