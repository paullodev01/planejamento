const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Event, Participant, Registration } = require('../models');

// GET /events
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, date, location } = req.query;
  const offset = (page - 1) * limit;

  const where = {};
  if (date) {
    where.date = date;
  }
  if (location) {
    where.location = { [Op.like]: `%${location}%` };
  }

  const events = await Event.findAndCountAll({
    where,
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  res.status(200).json({
    total: events.count,
    pages: Math.ceil(events.count / limit),
    data: events.rows,
  });
});

// POST /events
router.post('/', async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /events/:id
router.get('/:id', async (req, res) => {
  const event = await Event.findByPk(req.params.id);
  if (event) {
    res.status(200).json(event);
  } else {
    res.status(404).send();
  }
});

// PUT /events/:id
router.put('/:id', async (req, res) => {
  const event = await Event.findByPk(req.params.id);
  if (event) {
    await event.update(req.body);
    res.status(200).json(event);
  } else {
    res.status(404).send();
  }
});

// DELETE /events/:id
router.delete('/:id', async (req, res) => {
  const event = await Event.findByPk(req.params.id);
  if (event) {
    await event.destroy();
    res.status(200).send();
  } else {
    res.status(404).send();
  }
});

// POST /events/:id/register
router.post('/:id/register', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }

    const [participant, created] = await Participant.findOrCreate({
      where: { email: req.body.email },
      defaults: { name: req.body.name }
    });

    const registration = await Registration.findOne({
      where: { eventId: event.id, participantId: participant.id }
    });

    if (registration) {
      return res.status(400).json({ error: 'Participante já registrado para este evento' });
    }

    await Registration.create({ eventId: event.id, participantId: participant.id });
    res.status(201).json({ message: 'Participante registrado com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;