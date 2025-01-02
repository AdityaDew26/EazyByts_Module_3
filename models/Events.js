import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
 title: String,
  description: String,
  date: Date,
  location: String,
  price: Number,
  availableSpots: {
    type: Number,
    required: true,
  },
  image: String,
  reviews: [Object],
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
