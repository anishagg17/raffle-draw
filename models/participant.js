const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParticipantSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  event_id: {
    type: Schema.Types.ObjectId,
    ref: "event",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// create an index on event_id and secondary index on user_id and ensure it is unique so that a user doesn't participate multiple times.
ParticipantSchema.index({ event_id: 1, user_id: 1 }, { unique: true });

const Participant = mongoose.model("Participant", ParticipantSchema);
module.exports = Participant;
