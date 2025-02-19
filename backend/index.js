const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: '*' } });
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(bodyParser.json());

// Use the events routes
app.use('/events', require('./routes/events'));

// Adicione esta rota para GET /
app.get('/', (req, res) => {
  res.status(200).send('API is running');
});

// configuração do socket.io
io.on('connection', (socket) => {
  console.log('Novo cliente conectado:', socket.id);
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

sequelize.sync().then(() => {
  http.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});

module.exports = app;
