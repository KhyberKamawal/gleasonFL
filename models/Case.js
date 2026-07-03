const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  imageUrl: { type: String, required: true },
  gleasonScore: { type: String },
  isupGrade: { type: Number },
  confidence: { type: Number },
  heatmapUrl: { type: String },
  status: { type: String, enum: ['pending', 'reviewed'], default: 'pending' },
  doctorNotes: { type: String },
  assignedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Case', caseSchema);
