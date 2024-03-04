const hapi = require("@hapi/hapi");
const { initializeApp, cert } = require('firebase-admin/app');
const serviceAccount = require('./statsdatabase.json');

const init = async () => {
    initializeApp({
        credential: cert(serviceAccount)
    });

    const server = hapi.server({
        port: process.env.PORT || 8080,
        host: "0.0.0.0",
        routes: {
            cors: true
        },
        state: {
            strictHeader: false // corrige problema com cookies
        }
    }); 

    // Carrega rotas
    await server.register([
        require('./src/routes/homeRoutes'),
        require('./src/routes/teamRoutes'),
        require('./src/routes/tournamentRoutes')
    ]);

    await server.start();
};

init();
