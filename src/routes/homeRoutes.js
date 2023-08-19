const HomeController = require('../controllers/homeController');

module.exports = {
    name: 'homeRoutes',
    register: async (server) => {
        server.route({
            method: 'GET',
            path: '/',
            handler: HomeController.getHome
        });        
    }
};
