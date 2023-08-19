const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const { initializeApp, cert } = require('firebase-admin/app');
const serviceAccount = require('../statsdatabase.json');
const { getFirestore } = require('firebase-admin/firestore');

const TeamService = require('../src/services/teamService');
const TournamentService = require('../src/services/tournamentService');


before(() => {
    // Inicializa o Firebase antes de todos os testes
    initializeApp({
        credential: cert(serviceAccount)
    });
})

describe('TeamService', () => {
    describe('getAllTeamsData', () => {
        it('deve retornar dados de times', async () => {
            const request = {
                query: {
                    tournament: 'Premier League'
                }
            };

            const result = await TeamService.getAllTeamsData(request);
            expect(result).to.be.an('array');
        }).timeout(6000);

        it('deve retornar "sem-registros" para torneio vazio', async () => {
            const request = {
                query: {
                    tournament: 'torneioSemRegistros'
                }
            };

            const result = await TeamService.getAllTeamsData(request);
            expect(result).to.deep.equal({ dados: 'sem-registros' });
        });
    });
});

describe('getHomeTeamsData', () => {
    it('deve retornar dados das equipes mandantes', async () => {
        const request = {
            query: {
                tournament: 'Premier League',
                team: 'Liverpool'
            }
        };

        const result = await TeamService.getHomeTeamsData(request);
        expect(result).to.be.an('array');
    }).timeout(6000);

    it('deve retornar "sem-registros" para equipe mandante não encontrada', async () => {
        const request = {
            query: {
                tournament: 'Premier League',
                team: 'EquipeNaoEncontrada'
            }
        };

        const result = await TeamService.getHomeTeamsData(request);
        expect(result).to.deep.equal({ dados: 'sem-registros' });
    });
});

describe('TournamentService', () => {
    describe('saveGamesFromTournament', () => {
        it('deve salvar os jogos no Firestore', async () => {
            const request = {
                payload: [
                    // Aqui você pode adicionar exemplos de jogos que seriam enviados na requisição
                    // Por exemplo:
                    { game: { tournament: 'Torneio1', game: { id: '1', home: { name: 'corinthians' }, away: { name: 'flamengo' } } } },
                    { game: { tournament: 'Torneio1', game: { id: '2', home: { name: 'santos' }, away: { name: 'vasco' } } } },
                    // ...
                ]
            };

            const firestoreStub = sinon.stub(getFirestore(), 'collection').returns({
                doc: sinon.stub().returnsThis(),
                set: sinon.stub()
            });

            const response = await TournamentService.saveGamesFromTournament(request);

            expect(response).to.deep.equal({ message: "success" });
            expect(firestoreStub.callCount).to.equal(request.payload.length);
            expect(firestoreStub.firstCall.args[0]).to.equal(request.payload[0].game.tournament);
            expect(firestoreStub.secondCall.args[0]).to.equal(request.payload[1].game.tournament);

            firestoreStub.restore();
        });
    });
});