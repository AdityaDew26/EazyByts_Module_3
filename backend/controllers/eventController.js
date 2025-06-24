import Event from '../models/Events.js';
import Bill from '../models/bill.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

export const addEvent = async (req, res) => {
  try {
    const { title, description, date, location, ticketPrice, availableSpots } = req.body;
    const image = req.file ? req.file.path : null;

    if (!title || !description || !date || !location || !ticketPrice || !availableSpots) {
      return res.status(400).json({ error: 'Please provide all required event details.' });
    }

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      ticketPrice,
      availableSpots,
      image,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addReview = async (req, res) => {
  try {
    const { comment } = req.body;
    if (!comment || comment.trim().length === 0) {
      return res.status(400).json({ error: 'Review comment is required.' });
    }

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    const newReview = {
      comment,
      date: new Date(),
    };

    event.reviews.push(newReview);
    await event.save();

    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const bookEvent = async (req, res) => {
  try {
    const { peopleCount, customerName, paymentMethod } = req.body;
    const { id } = req.params;

    console.log("Booking event:", id);
    console.log("Booking body:", req.body);

    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const count = Number(peopleCount);
    if (isNaN(count)) return res.status(400).json({ message: 'Invalid number of people' });

    if (event.availableSpots < count) {
      return res.status(400).json({ message: 'Not enough available spots' });
    }

    event.availableSpots = Number(event.availableSpots) - count;
    await event.save();

    const bill = new Bill({
      eventId: event._id,
      peopleCount: count,
      amount: Number(event.ticketPrice) * count,
      customerName,
      paymentMethod: paymentMethod || 'Card',
      status: 'Paid',
      date: new Date(),
    });

    const savedBill = await bill.save();

    res.status(200).json({
      message: 'Booking successful',
      bill: savedBill,
      event,
    });
  } catch (error) {
    console.error('🔥 Booking error:', error);
    res.status(500).json({ message: 'Error booking the event', error: error.message });
  }
};


export const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { title, description, date, location, ticketPrice, availableSpots } = req.body;
    const image = req.file ? req.file.path : req.body.image;

    if (!title || !description || !date || !location || !ticketPrice || !availableSpots) {
      return res.status(400).json({ error: 'Please provide all required event details.' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        date,
        location,
        ticketPrice,
        availableSpots,
        image,
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBill = async (req, res) => {
  try {
    const bill = await Bill.findOne({ eventId: req.params.id }).sort({ date: -1 });

    if (!bill) {
      return res.status(404).json({ message: 'No bill found for this event' });
    }

    res.status(200).json(bill);
  } catch (error) {
    console.error('Error fetching bill:', error);
    res.status(500).json({ message: 'Error fetching the bill' });
  }
};
