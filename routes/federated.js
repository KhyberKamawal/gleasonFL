const express = require('express');
const FL = require('../models/FL');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/status', protect, async (req, res) => {
  try {
    let flData = await FL.findOne().sort({ round: -1 });
    if (!flData) {
      flData = await FL.create({
        round: 1,
        globalAccuracy: 0.78,
        globalLoss: 0.45,
        clients: [
          { name: 'Hospital A', localAccuracy: 0.76, samples: 120 },
          { name: 'Hospital B', localAccuracy: 0.79, samples: 95 },
          { name: 'Hospital C', localAccuracy: 0.81, samples: 110 },
        ],
      });
    }
    const allRounds = await FL.find().sort({ round: 1 });
    res.json({ current: flData, history: allRounds });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/next-round', protect, async (req, res) => {
  try {
    const latest = await FL.findOne().sort({ round: -1 });
    const newRound = await FL.create({
      round: latest ? latest.round + 1 : 1,
      globalAccuracy: Math.min(0.95, (latest ? latest.globalAccuracy : 0.78) + Math.random() * 0.02),
      globalLoss: Math.max(0.1, (latest ? latest.globalLoss : 0.45) - Math.random() * 0.03),
      clients: [
        { name: 'Hospital A', localAccuracy: 0.76 + Math.random() * 0.05, samples: 120 },
        { name: 'Hospital B', localAccuracy: 0.79 + Math.random() * 0.05, samples: 95 },
        { name: 'Hospital C', localAccuracy: 0.81 + Math.random() * 0.05, samples: 110 },
      ],
    });
    res.json(newRound);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
