const express = require('express');
const router = express.Router();

router.post('/predict', (req, res) => {
  res.json({
    gleasonScore: '3+4=7',
    isupGrade: 2,
    confidence: 0.85,
  });
});

router.get('/metrics', (req, res) => {
  res.json({
    accuracy: 0.89,
    precision: 0.87,
    recall: 0.86,
    f1: 0.865,
  });
});

module.exports = router;
