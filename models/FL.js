const mongoose = require('mongoose');

const flSchema = new mongoose.Schema({
  round: { type: Number, required: true },
  globalAccuracy: { type: Number, required: true },
  globalLoss: { type: Number, required: true },
  clients: [{
    name: { type: String, required: true },
    localAccuracy: { type: Number, required: true },
    samples: { type: Number, required: true },
  }],
}, { timestamps: true });

module.exports = mongoose.model('FL', flSchema);
