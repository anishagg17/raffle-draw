const express = require('express');
const Event = require('../../models/event');
const router = express.Router();

//Get active Events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({status:'active'}).sort({ start_date: 1 }).limit(10);
    res.json(events);
  } catch (err) {
    res.status(401).json({
      msg: 'Server Error'
    });
  }
});

//Register a Event
router.post('/', async (req, res) => {
  try {
    const {name, start_date} = req.body;
    const event = { name, start_date };
    // Creating the Event object
    const result = await Event.create(event);

    // returning the new Event
    res.json({ result });
  } catch (err) {
    res.status(400).end(err.errmsg);
  }
});

module.exports = router;
