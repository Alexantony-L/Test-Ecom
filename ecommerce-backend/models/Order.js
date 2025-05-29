const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: String,
  product: {
    name: String,
    variant: String,
    quantity: Number,
    price: Number,
  },
  customer: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zip: String
  },
  transactionStatus: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);
