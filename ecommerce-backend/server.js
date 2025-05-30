const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const serverless = require('serverless-http');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/orders', orderRoutes);

let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

module.exports.handler = async (req, res) => {
  await connectToDatabase();
  return app(req, res);
};
