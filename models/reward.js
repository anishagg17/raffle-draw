const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
