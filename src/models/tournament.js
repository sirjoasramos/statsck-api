// Enumeração de apelidos
const TournamentAliasesEnum = {
    "Premier League": "premier_league",
    "Championship": "championship",
    "League One": "leagueone",
    "League Two": "leaguetwo",
    "National League": "nationalleague",
    "Brasileiro Série A": "brasileiro_serie_a",
    "Brasileiro Série B": "brasileiro_serie_b",
    "LaLiga": "laliga",
    "Bundesliga": "bundesliga",
    "Itália - Serie A": "serie_a",
    "Ligue 1": "ligue_1",
    "Holanda": "eredivisie",
    "Holanda - 2ª Divisão":"eerste",
    "Escócia": "premiership",
    "Escócia - 2ª Divisão":"championship-scotland",
    "Bélgica": "belgica_league",
    "Grécia": "grecia_league",
    "Cróacia": "hnl_croacia",
    "Superliga": "servia_liga",
    "Polônia": "polonia_league",
    "Dinamarca": "dinamarca_liga",
    "Bulgária": "bulgaria_league",
    "Suécia": "suecia_league",
    "Turquia": "turquia_league",
    "The FA Women's Super League": "womensuperleague",
    "FA Womens Super League 2": "womenchampionship",
    "Bundesliga - 2ª Divisão": "2bundesliga",
    "3. Liga": "3liga",
    "Frauen-Bundesliga":"bundesligawomen",
    "Itália - Serie B":"serie-b",
    "Austrália":"a-league",
    "Egito":"egito",
    "Super League - India":"super_league_india",
    "Israeli Premier League":"israel_premier_league",
    "Portugal":"liga_portugal",
    "Portugal - 2ª Divisão":"liga_portugal_2",
    "Premiership - África":"premiership_africa",
    "Liga do México":"liga_mx",
    "Liga do Chile": "chile",
    "Japão":"japao",
    "Arábia":"saudi",
    "China":"china",
    "Emirados Árabes":"uae",
    "LaLiga 2":"laliga2",
    "Uruguai":"uruguai",
    "Colômbia":"colombia",
    "Paraguai":"paraguai",
    "Argentina":"argentina",
    "Bolivia":"bolivia",
    "Peru":"peru",
    "Venezuela":"venezuela",
    "Coreia do Sul":"coreia",
    "Coreia do Sul - 2ª Divisão'":"coreia2",
    "Irlanda":"irlanda",
    "Equador":"equador",
    "nba":"nba",
    "Japão - 2ª Divisão":"japao2"
}; 

// Classe para representar os torneios
class Tournament {
    constructor(alias) {
        this.alias = alias;
        this.ALL_MATCHS_DATABASE_NAME = `${alias}_all_matchs_database`;
        this.HOME_STATS_DATABASE_NAME = `${alias}_home_stats_database`;
        this.AWAY_STATS_DATABASE_NAME = `${alias}_away_stats_database`;
        this.MATCHDAY_DATABASE_NAME = `${alias}_matchday_database`;
    }
}

module.exports = {
    TournamentAliasesEnum,
    Tournament
};
 