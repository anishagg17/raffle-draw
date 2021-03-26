const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Describe the Schema of a Reward
// event_id makes a reference to the `event` object and serve as a `foreign_key`.
const RewardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  event_id: {
    type: Schema.Types.ObjectId,
    ref: "event",
    required: true,
    unique: true,
  },
});

RewardSchema.index({ event_id: 1 });
const Reward = mongoose.model("Reward", RewardSchema);
module.exports = Reward;
