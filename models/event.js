const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Describe the Schema of an Event
// winner is a `foreign_key`.
const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "closed"],
    default: "active",
  },
  winner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// create a index based upon start_date, as we are quering based upon start_date in several requests
EventSchema.index({ start_date: -1 });

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
