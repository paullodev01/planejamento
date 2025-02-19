const request = require('supertest');
const app = require('../index'); // Certifique-se de que o caminho está correto
const { sequelize, Event } = require('../models');
const { expect } = require('chai');

before(async () => {
  await sequelize.sync({ force: true });
});

describe('Endpoints da API', () => {
  it('deve retornar status 200 para GET /', async () => {
    const res = await request(app).get('/');
    expect(res.status).to.equal(200);
  });

  it('deve criar um novo evento com POST /events', async () => {
    const res = await request(app)
      .post('/events')
      .send({
        title: 'Novo Evento',
        description: 'Descrição do evento',
        date: new Date(),
        location: 'Local do evento'
      });
    expect(res.status).to.equal(201);
  });

  it('deve listar todos os eventos com GET /events', async () => {
    const res = await request(app).get('/events');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.lengthOf(1);
  });

  it('deve obter um evento específico com GET /events/:id', async () => {
    const event = await Event.create({
      title: 'Evento Teste',
      description: 'Descrição do evento teste',
      date: new Date(),
      location: 'Local do evento teste'
    });
    const res = await request(app).get(`/events/${event.id}`);
    expect(res.status).to.equal(200);
    expect(res.body.title).to.equal('Evento Teste');
  });

  it('deve atualizar um evento existente com PUT /events/:id', async () => {
    const event = await Event.create({
      title: 'Evento Atualizar',
      description: 'Descrição do evento atualizar',
      date: new Date(),
      location: 'Local do evento atualizar'
    });
    const res = await request(app)
      .put(`/events/${event.id}`)
      .send({
        title: 'Evento Atualizado'
      });
    expect(res.status).to.equal(200);
    expect(res.body.title).to.equal('Evento Atualizado');
  });

  it('deve excluir um evento com DELETE /events/:id', async () => {
    const event = await Event.create({
      title: 'Evento Deletar',
      description: 'Descrição do evento deletar',
      date: new Date(),
      location: 'Local do evento deletar'
    });
    const res = await request(app).delete(`/events/${event.id}`);
    expect(res.status).to.equal(200);
  });
});