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
    "Serie A": "serie_a",
    "Ligue 1": "ligue_1",
    "Eredivisie": "eredivisie",
    "Eerstedivisie":"eerste",
    "Premiership": "premiership",
    "Championship - Scotland":"championship-scotland",
    "Pro League": "belgica_league",
    "Stoiximan Super League": "grecia_league",
    "HNL": "hnl_croacia",
    "Superliga": "servia_liga",
    "Ekstraklasa": "polonia_league",
    "Super Liga - Dinamarca": "dinamarca_liga",
    "Parva Liga": "bulgaria_league",
    "Allsvenskan": "suecia_league",
    "Trendyol Süper Lig": "turquia_league",
    "The FA Women's Super League": "womensuperleague",
    "FA Womens Super League 2": "womenchampionship",
    "2. Bundesliga": "2bundesliga",
    "3. Liga": "3liga",
    "Frauen-Bundesliga":"bundesligawomen",
    "Serie B":"serie-b",
    "A-League":"a-league",
    "Premier League - Egypt":"premier_league_egypt",
    "Super League - India":"super_league_india",
    "Israeli Premier League":"israel_premier_league",
    "Liga Portugal":"liga_portugal",
    "Liga Portugal 2":"liga_portugal_2",
    "Premiership - África":"premiership_africa",
    "Liga MX":"liga_mx",
    "Chile - Primera Division": "chile",
    "J1 League":"japao",
    "Saudi Pro League":"saudi",
    "CFA Super League":"china",
    "UAE Pro League":"uae",
    "LaLiga 2":"laliga2",
    "Liga do Uruguai":"uruguai",
    "Liga da Colombia":"colombia",
    "Liga do Paraguai":"paraguai",
    "Liga da Argentina":"argentina"
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
 