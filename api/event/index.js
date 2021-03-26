const express = require('express');
const Event = require('../../models/event');

const router = express.Router();  // setup the router for this controller

//Get active Events
router.get('/', async (req, res) => {
  try {
    // query latest 10 active events from the DB
    const events = await Event.find({status:'active'}).sort({ start_date: 1 }).limit(10);
    return res.json(events);
  } catch (err) {
    return res.status(401).json({
      msg: 'Server Error'
    });
  }
});

//Register a Event
router.post('/', async (req, res) => {
  try {
    // set the time(hour, minute, sec) field of the `start_date` 
    let start_date = new Date(req.body.start_date);
    start_date.setHours(8,0,0,0);

    const event = { name: req.body.name, start_date };
    // Creating the Event object
    const result = await Event.create(event);

    // returning the new Event
    return res.json({ result });
  } catch (err) {
    return res.status(400).end(err.errmsg);
  }
});

//List all the winners of all the events in the last one week.
router.get('/winners', async (req, res) => {
  try {
    // set the offset date, i.e, 7 days before the current date
    const startDate = new Date();
    startDate.setDate(startDate.getDate()-7);

    // query the DB date, i.e, 7 days before the current date
    let events = await Event.find({
      status:'closed', 
      start_date:{ $gte: startDate },
      winner: { $ne: null } 
    }).sort({ start_date: 1 })

    return res.json(events);
  } catch (err) {
    return res.status(401).json({
      msg: 'Server Error'
    });
  }
});

module.exports = router;
