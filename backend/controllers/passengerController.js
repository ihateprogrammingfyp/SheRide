// backend/controllers/passengerController.js
const { db } = require('../config/firebaseConfig');

const requestRide = async (req, res) => {
  try {
    const { passengerId, location, destination } = req.body;
    const newRide = {
      passengerId,
      location,
      destination,
      status: 'requested',
      createdAt: new Date()
    };
    const rideRef = await db.collection('rides').add(newRide);
    res.status(201).json({ id: rideRef.id, ...newRide });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { requestRide };
