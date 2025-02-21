const express = require('espress');
const router = express.Router();
const Event = require('../models/Event.js');

//criar evento 
router.post('/', async (req, res) => {
    try {
        const event = await Event.create(req.body);
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//listar eventos
router.get('/', async (req, res) => {
    const events = await Event.findAll();
    res.json(events);
});

//atualizar evento
router.put('/:id', async (req, res) => {
    const event = await Event.findByPk(req.params.id);
    if(!event) return res.status(404).json({ error: "Evento não encontrado" });

    await event.update(req.body);
    res.json(event);
});

//deletar evento
router.delete('/:id', async (req, res) => {
    const event = await Event.findByPk(req.params.id);
    if(!event) return res.status(404).json({ error: "Evento não encontrado" });

    await event.destroy();
    res.json({ message: "Evento deletado" });
});

module.exports = router;