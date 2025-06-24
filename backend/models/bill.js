import mongoose from 'mongoose';

const BillSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  peopleCount: { type: Number, required: true },
  amount: { type: Number, required: true },
  customerName: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: 'Paid' },
  date: { type: Date, default: Date.now },
});

const Bill = mongoose.model('Bill', BillSchema);

export default Bill;
