const express = require('express');
const multer = require('multer');
const path = require('path');
const Case = require('../models/Case');
const { protect } = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get('/', protect, async (req, res) => {
  try {
    const cases = await Case.find().populate('assignedDoctor', 'name email');
    res.json(cases);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const { patientId } = req.body;
    const newCase = await Case.create({
      patientId,
      imageUrl: `/uploads/${req.file.filename}`,
      gleasonScore: '3+4=7',
      isupGrade: 2,
      confidence: 0.85,
      heatmapUrl: '/uploads/heatmap-placeholder.jpg',
      status: 'pending',
    });
    res.status(201).json(newCase);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const caseItem = await Case.findById(req.params.id).populate('assignedDoctor', 'name email');
    if (!caseItem) {
      return res.status(404).json({ message: 'Case not found' });
    }
    res.json(caseItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const { doctorNotes, status } = req.body;
    const caseItem = await Case.findByIdAndUpdate(
      req.params.id,
      { doctorNotes, status },
      { new: true }
    );
    res.json(caseItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
