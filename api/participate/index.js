const express = require("express");

const Participant = require("../../models/participant");
const User = require("../../models/user");
const middleware = require("../user/middleware");

const router = express.Router();

//Get participants for an Event
router.get("/:id", async (req, res) => {
  try {
    // here `id` param is navigates to the event_id
    const participants = await Participant.find({ event_id: req.params.id });

    if (!participants)
      return res.status(401).json({
        msg: "No participants found",
      });

    return res.json(participants);
  } catch (err) {
    return res.status(401).json({
      msg: "Server Error",
    });
  }
});

//Register as an participant
router.post("/:id", middleware, async (req, res) => {
  try {
    // here `id` param is navigates to the event_id
    // `req.user.id` is added by the `middleware` which required the `auth-token`.
    const participant = { user_id: req.user.id, event_id: req.params.id };

    if (!participant.user_id) {
      return res.status(401).json({
        msg: "User not logged In",
      });
    } else {
      const user = await User.findById(req.user.id).select("-password");

      if (user.tickets == 0)
        return res.status(401).json({
          msg: "User does not have enough tickets",
        });

      const tickets = user.tickets - 1;
      await User.findByIdAndUpdate(req.user.id, { tickets });
    }

    if (!participant.event_id)
      return res.status(401).json({
        msg: "Invalid event ID",
      });

    // Creating the participant object
    const result = await Participant.create(participant);

    // returning the new participant
    return res.json({ result });
  } catch (err) {
    return res.status(400).end(err.errmsg);
  }
});

module.exports = router;
