const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async ()=> {
    await connection.destroy();
  })

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .set('Authorizaiton', '') //Teste
      .send({
        name: 'APAD TESTE',
        email: 'contato@teste.com',
        whatsapp: '47000000000',
        city: 'Bagé',
        uf: 'RS'
      });
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});
