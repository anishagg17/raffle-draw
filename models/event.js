const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  status :{
    type: String,
    enum : ['active','closed'],
    default: 'active'
  },
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
});

EventSchema.index({ start_date: -1 });

const Event = mongoose.model('Event', EventSchema);
module.exports =  Event;