class HomeController {
    static async getHome(req, h) {
        return { dados: 'api-on' };
    }
}

module.exports = HomeController;
