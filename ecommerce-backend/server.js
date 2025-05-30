const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();

const orderRoutes = require('./routes/orderRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/orders', orderRoutes);

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) return;
  console.log('Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log('MongoDB connected');
}

const handler = serverless(async (req, res) => {
  try {
    await connectToDatabase();
    return app(req, res);
  } catch (err) {
    console.error('Error in handler:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = handler;
