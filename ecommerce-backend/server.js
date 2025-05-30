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
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
}

const handler = serverless(async (req, res) => {
  await connectToDatabase();
  return app(req, res);
});

module.exports = handler;
