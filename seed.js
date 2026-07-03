const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const FL = require('./models/FL');
const Case = require('./models/Case');
require('dotenv').config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data to avoid conflicts
    await User.deleteMany({});
    await Case.deleteMany({});
    await FL.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user - let model handle hashing!
    await User.create({
      name: 'Admin',
      email: 'admin@gleasonfl.com',
      password: 'admin123',
      role: 'admin',
      status: 'approved',
    });
    console.log('✅ Admin user created: admin@gleasonfl.com / admin123');

    // Create demo doctor user - let model handle hashing!
    const demoDoctor = await User.create({
      name: 'Dr. Demo',
      email: 'doctor@gleasonfl.com',
      password: 'doctor123',
      role: 'doctor',
      status: 'approved',
    });
    console.log('✅ Demo doctor created: doctor@gleasonfl.com / doctor123');

    // Create sample cases for demo
    const sampleCases = [
      { patientId: 'PAT-001', gleasonScore: '3+4=7', isupGrade: 2, confidence: 0.85, status: 'pending', doctorNotes: '' },
      { patientId: 'PAT-002', gleasonScore: '4+5=9', isupGrade: 5, confidence: 0.92, status: 'pending', doctorNotes: '' },
      { patientId: 'PAT-003', gleasonScore: '3+3=6', isupGrade: 1, confidence: 0.78, status: 'reviewed', doctorNotes: 'Low risk, regular follow-up recommended' },
      { patientId: 'PAT-004', gleasonScore: '4+3=7', isupGrade: 3, confidence: 0.88, status: 'pending', doctorNotes: '' },
      { patientId: 'PAT-005', gleasonScore: '5+4=9', isupGrade: 5, confidence: 0.95, status: 'reviewed', doctorNotes: 'High risk, consider treatment options' },
    ];

    for (const c of sampleCases) {
      await Case.create({
        ...c,
        imageUrl: 'https://via.placeholder.com/800x600?text=Histopathology+Image',
        heatmapUrl: 'https://via.placeholder.com/800x600/ffcccc/000000?text=Heatmap+Overlay',
        assignedDoctor: demoDoctor._id,
      });
    }
    console.log('✅ 5 sample cases created');

    // Create initial FL data
    await FL.create({
      round: 1,
      globalAccuracy: 0.78,
      globalLoss: 0.45,
      clients: [
        { name: 'Hospital A', localAccuracy: 0.76, samples: 120 },
        { name: 'Hospital B', localAccuracy: 0.79, samples: 95 },
        { name: 'Hospital C', localAccuracy: 0.81, samples: 110 },
      ],
    });
    console.log('✅ Initial FL data created');

    console.log('\n🎉 Seed complete!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
