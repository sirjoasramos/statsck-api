// Enumeração de apelidos
const TournamentAliasesEnum = {
    "Premier League": "premier_league",
    "Championship": "championship",
    "Brasileiro Série A": "brasileiro_serie_a",
    "Brasileiro Série B": "brasileiro_serie_b",
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
