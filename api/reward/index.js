const express = require('express');
const Reward = require('../../models/reward');
const router = express.Router();

//Get reward for an Event
router.get('/:id', async (req, res) => {
  try {
    const reward = await Reward.findOne({event_id:req.params.id});

    if(!reward) return res.status(401).json({
      msg: 'No such reward found'
    });

    return res.json(reward);
  } catch (err) {
    return res.status(401).json({
      msg: 'Server Error'
    });
  }
});

//Register a reward
router.post('/:id', async (req, res) => {
  try {
    const reward = { name: req.body.name, event_id: req.params.id };
    // Creating the reward object
    const result = await Reward.create(reward);

    // returning the new reward
    res.json({ result });
  } catch (err) {
    res.status(400).end(err.errmsg);
  }
});

module.exports = router;
