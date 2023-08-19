const chai = require('chai');
const expect = chai.expect;
const { initializeApp, cert } = require('firebase-admin/app');
const serviceAccount = require('../statsdatabase.json');

const TeamService = require('../src/services/teamService');

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