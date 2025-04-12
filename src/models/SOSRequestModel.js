import mongoose from 'mongoose'

const sosSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  location: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
  },
  status: {
    type: String,
    enum: ['active', 'resolved'],
    default: 'active',
  },
  responder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Responder',
  },
  notes: {
    type: String,
  },
})

const SOS = mongoose.model('SOS', sosSchema)
module.exports = SOS
