import Event from '../models/Events.js';
import multer from 'multer';
import path from 'path';
import Bill from '../models/bill.js';

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Controller function to handle adding an event
export const addEvent = (req, res) => {
  const { title, description, date, location, ticketPrice } = req.body;
  const image = req.file ? req.file.path : null;

  if (!title || !description || !date || !location) {
    return res.status(400).json({ error: 'Please provide all required event details.' });
  }

  const newEvent = new Event({
    title,
    description,
    date,
    location,
    ticketPrice,
    image,
  });

  newEvent
    .save()
    .then((event) => res.json(event))
    .catch((err) => res.status(500).json({ error: err.message }));
};

export { upload };

// Controller function for adding a review
export const addReview = (req, res) => {
  const { comment } = req.body;

  if (!comment || comment.trim().length === 0) {
    return res.status(400).json({ error: 'Review comment is required.' });
  }

  Event.findById(req.params.id)
    .then((event) => {
      if (!event) return res.status(404).json({ error: 'Event not found' });

      const newReview = {
        comment,
        date: new Date(),
      };
      event.reviews.push(newReview);
      event.save()
        .then(() => res.json(newReview))
        .catch((err) => res.status(500).json({ error: err.message }));
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Controller function for booking an event
export const bookEvent = async (req, res) => {
  const { peopleCount } = req.body;
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.availableSpots < peopleCount) {
      return res.status(400).json({ message: 'Not enough available spots' });
    }

    event.availableSpots -= peopleCount;
    await event.save();

    const bill = new Bill({
      eventId: event._id,
      peopleCount,
      amount: event.ticketPrice * peopleCount, // Assuming ticketPrice is per person
      customerName: req.body.customerName,
      status: 'Paid',
      paymentMethod: req.body.paymentMethod || 'Card',
      date: new Date(),
    });

    await bill.save();

    res.status(200).json({
      message: 'Booking successful',
      bill: bill,
      event: event,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error booking the event' });
  }
};

// Controller function for getting an event
export const getEvent = (req, res) => {
  Event.findById(req.params.id)
    .then((event) => {
      if (!event) return res.status(404).json({ error: 'Event not found' });
      res.json(event);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Controller function for getting all events
export const getAllEvents = (req, res) => {
  Event.find()
    .then((events) => res.json(events))
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Controller function for updating an event
export const updateEvent = (req, res) => {
  const { title, description, date, location } = req.body;
  const image = req.file ? req.file.path : undefined;

  if (!title || !description || !date || !location) {
    return res.status(400).json({ error: 'Please provide all required event details.' });
  }

  const updateData = {
    title,
    description,
    date,
    location,
    image: image || req.body.image,
  };

  Event.findByIdAndUpdate(req.params.id, updateData, { new: true })
    .then((updatedEvent) => res.json(updatedEvent))
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Controller function for deleting an event
export const deleteEvent = (req, res) => {
  Event.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Event deleted successfully' }))
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Controller function for getting the most recent bill for an event
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
