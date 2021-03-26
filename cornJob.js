const cron = require("node-cron");
const Event = require("./models/event");
const Participant = require("./models/participant");

const cornFunction = () => {
  // cron-job running 8AM everyday
  cron.schedule("0 0 8 * * *", async () => {
    const startDate = new Date();
    let lowerLimit = startDate,
      upperLimit = startDate;

    lowerLimit = lowerLimit.setMinutes(lowerLimit.getMinutes() - 1);
    upperLimit = upperLimit.setMinutes(upperLimit.getMinutes() + 1);

    let event = await Event.findOne({
      status: "active",
      start_date: {
        $gte: lowerLimit,
        $lte: upperLimit,
      },
    });

    if (event) {
      const participants = await Participant.find({ event_id: event.id });
      if (participants.length > 0) {
        const random_idx = Math.floor(Math.random() * participants.length);

        event = await Event.findByIdAndUpdate(event.id, {
          status: "closed",
          winner: participants[random_idx].user_id,
        });

        console.log("winner", participants[random_idx]);
      }
    }
  });
};

module.exports = cornFunction;
