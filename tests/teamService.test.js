const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const { initializeApp, cert } = require('firebase-admin/app');
const serviceAccount = require('../statsdatabase.json');
const { getFirestore } = require('firebase-admin/firestore');

const TeamService = require('../src/services/teamService');
const TournamentService = require('../src/services/tournamentService');

const { Tournament, TournamentAliasesEnum } = require('../src/models/tournament');


before(() => {
    // Inicializa o Firebase antes de todos os testes
    initializeApp({
        credential: cert(serviceAccount)
    });
})

describe('TeamService', () => {
    describe('getAllTeamsData', () => {
        it('deve retornar todos os dados das equipes', async () => {
            const request = {
                query: {
                    tournament: TournamentAliasesEnum['Premier League']
                }
            };

            const result = await TeamService.getAllTeamsData(request);
            expect(result).to.be.an('array');
        }).timeout(6000);

        it('deve retornar um erro para torneio inexistente', async () => {
            const request = {
                query: {
                    tournament: 'torneioSemRegistros'
                }
            };

            try {
                await TeamService.getAllTeamsData(request);
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });
    });

    describe('getDataBase', () => {
        it('deve retornar o nome correto do banco de dados para um determinado torneio', () => {
            // Teste para um torneio específico ('premierleague')
            const tournamentAlias = 'Premier League';
            const expectedDatabaseName = 'premier_league_all_matchs_database';

            const database = TeamService.getDataBase(tournamentAlias);

            expect(database).to.be.an.instanceOf(Tournament);
            expect(database.ALL_MATCHS_DATABASE_NAME).to.equal(expectedDatabaseName);
        });

        // Adicione mais testes para outros torneios, se necessário
    });

    describe('getHomeTeamsData', () => {
        it('deve retornar dados das equipes mandantes', async () => {
            const request = {
                query: {
                    tournament: TournamentAliasesEnum['Premier League']
                }
            };

            const result = await TeamService.getHomeTeamsData(request);
            expect(result).to.be.an('array');
        }).timeout(6000);

        it('deve retornar um erro para torneio inexistente', async () => {
            const request = {
                query: {
                    tournament: 'torneioSemRegistros'
                }
            };

            try {
                await TeamService.getHomeTeamsData(request);
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });
    });

    describe('getAwayTeamsData', () => {
        it('deve retornar dados das equipes visitantes', async () => {
            const request = {
                query: {
                    tournament: TournamentAliasesEnum['Premier League']
                }
            };

            const result = await TeamService.getAwayTeamsData(request);
            expect(result).to.be.an('array');
        }).timeout(6000);

        it('deve retornar um erro para torneio inexistente', async () => {
            const request = {
                query: {
                    tournament: 'torneioSemRegistros'
                }
            };

            try {
                await TeamService.getAwayTeamsData(request);
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });
    });
});

describe('TournamentService', () => {
    describe('saveGamesFromTournament', () => {
        it('deve salvar os jogos no Firestore', async () => {
            const TournamentAliasesEnum = {
                'Premier League': 'premier_league_all_matchs_database',
                // Mapeie todos os apelidos dos torneios com os nomes correspondentes dos bancos de dados
            };

            const request = {
                payload: [
                    { id: '1', tournament: 'Premier League', game: { home: { name: 'corinthians' }, away: { name: 'flamengo' } } },
                    // ... outros jogos
                ]
            };

            const firestoreStub = sinon.stub(getFirestore(), 'collection').returns({
                doc: sinon.stub().returnsThis(),
                set: sinon.stub()
            });

            const response = await TournamentService.saveGamesFromTournament(request);

            expect(response).to.deep.equal({ message: "success" });
            expect(firestoreStub.callCount).to.equal(request.payload.length);
            expect(firestoreStub.firstCall.args[0]).to.equal(TournamentAliasesEnum[request.payload[0].tournament]);

            firestoreStub.restore();
        });
    });

    describe('saveHomeStatsFromTournament', () => {
        it('deve salvar estatísticas de times mandantes no Firestore', async () => {
            const payload = {
                tournament: 'Premier League', // Defina o torneio corretamente conforme seus dados
                stats: [
                    { name: 'TeamA', statistics: { goals: 10, wins: 5 } },
                    // Adicione mais times e estatísticas, se necessário
                ]
            };

            const firestoreStub = sinon.stub(getFirestore(), 'collection').returns({
                doc: sinon.stub().returnsThis(),
                set: sinon.stub()
            });

            const response = await TournamentService.saveHomeStatsFromTournament({ payload });

            expect(response).to.deep.equal({ message: "success" });
            expect(firestoreStub.callCount).to.equal(payload.stats.length);

            firestoreStub.restore();
        });
    });

    describe('saveAwayStatsFromTournament', () => {
        it('deve salvar estatísticas de times visitantes no Firestore', async () => {
            const payload = {
                tournament: 'Premier League', // Defina o torneio corretamente conforme seus dados
                stats: [
                    { name: 'TeamA', statistics: { goals: 10, wins: 5 } },
                    // Adicione mais times e estatísticas, se necessário
                ]
            };

            const firestoreStub = sinon.stub(getFirestore(), 'collection').returns({
                doc: sinon.stub().returnsThis(),
                set: sinon.stub()
            });

            const response = await TournamentService.saveAwayStatsFromTournament({ payload });

            expect(response).to.deep.equal({ message: "success" });
            expect(firestoreStub.callCount).to.equal(payload.stats.length);

            firestoreStub.restore();
        });
    });

    describe('getDataBase', () => {
        it('deve retornar o nome correto do banco de dados para um determinado torneio', () => {
            // Teste para um torneio específico ('premierleague')
            const tournamentAlias = 'Premier League';
            const expectedDatabaseName = 'premier_league_all_matchs_database';

            const database = TournamentService.getDataBase(tournamentAlias);

            expect(database).to.be.an.instanceOf(Tournament);
            expect(database.ALL_MATCHS_DATABASE_NAME).to.equal(expectedDatabaseName);
        });

        // Adicione mais testes para outros torneios, se necessário
    });
});