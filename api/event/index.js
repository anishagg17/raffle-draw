const express = require('express');
const Event = require('../../models/event');
const router = express.Router();

//Get active Events
router.get('/', async (req, res) => {
  try {
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
    const {name, start_date} = req.body;
    const event = { name, start_date };
    // Creating the Event object
    const result = await Event.create(event);

    // returning the new Event
    return res.json({ result });
  } catch (err) {
    return res.status(400).end(err.errmsg);
  }
});

//Pick a Winner
// router.post('/', async (req, res) => {
//   try {
//     const {name, start_date} = req.body;
//     const event = { name, start_date };
//     // Creating the Event object
//     const result = await Event.create(event);

//     // returning the new Event
//     return res.json({ result });
//   } catch (err) {
//     return res.status(400).end(err.errmsg);
//   }
// });

//List all the winners of all the events in the last one week.
router.get('/winners', async (req, res) => {
  try {
    const startDate = new Date();
    console.log(startDate);
    startDate.setDate(startDate.getDate()-7);

    let events = await Event.find({
      status:'closed', 
      start_date:{
        $gte: startDate
      }
    }).sort({ start_date: 1 })
    .populate('winner');

    events = events.filter(({winner}) => (typeof winner != 'undefined'));
    return res.json(events);
  } catch (err) {
    return res.status(401).json({
      msg: 'Server Error'
    });
  }
});

module.exports = router;
