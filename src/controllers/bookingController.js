const Booking = require('../models/bookingModel');
const notificationapi = require('notificationapi-node-server-sdk').default;

// Initialize notification API
notificationapi.init(
  '13sm5rdfot3p1a5rjoin6k6k18', // clientId
  '17thhodgobn8rd3s1grg90k6pvp7pd9sttncj90pl87d33st4o6b' // clientSecret
);

const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    const sendBookingNotification = (booking) => {
      notificationapi.send({
        notificationId: 'tipsy_alley',
        user: {
          id: 'nanaafuaantwiwaa624@gmail.com',
          email: 'nanaafuaantwiwaa624@gmail.com',
          number: '+233240162088' // Replace with your phone number
        },
        mergeTags: {
          "booking": {
            "customerName": booking.customerName,
            "contact": booking.contact,
            "eventDate": booking.eventDate,
            "eventLocation": booking.eventLocation,
            "customerEmail": booking.customerEmail
          }
        }
      });
    };

    sendBookingNotification(booking);

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
