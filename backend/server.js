const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

// Routes
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to MongoDB first
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connected successfully');

    // Start server only after MongoDB connects
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
}

startServer();