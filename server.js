require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*"} });
const eventRoutes = require('./routes/events.js');

app.use('/events', eventRoutes);
app.use(cors());
app.use(express.json());

//rota de teste
app.get('/', (req, res) => {
    res.send('API funcionando');
});

//iniciar o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

module.exports = { app, io };