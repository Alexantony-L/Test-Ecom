const Order = require('../models/Order');
const { v4: uuidv4 } = require('uuid');
const sendEmail = require('../services/emailService');

exports.createOrder = async (req, res) => {
  const {
    product,
    customer,
    transactionInput 
  } = req.body;

  let status = 'approved';
  if (transactionInput === '2') status = 'declined';
  else if (transactionInput === '3') status = 'gateway_error';
const orderId = uuidv4()
  const order = new Order({
    orderId:orderId,
    product,
    customer,
    transactionStatus: status
  });

  await order.save();

 let subject, html;
if (status === 'approved') {
  subject = `✅ Order Confirmation - ${orderId}`;
  html = `
    <h2>Thank you for your purchase!</h2>
    <p><strong>Order ID:</strong> ${orderId}</p>
    <h3>Product Details:</h3>
    <p>${product.name} - ${product.variant}</p>
    <p>Quantity: ${product.quantity}</p>
    <p>Total: $${product.price * product.quantity}</p>
    <h3>Customer Info:</h3>
    <p>${customer.fullName}</p>
    <p>${customer.email}</p>
    <p>${customer.address}, ${customer.city}, ${customer.state}, ${customer.zip}</p>
    <p>We will ship your order soon. 😊</p>
  `;
} else {
  subject = `❌ Transaction Failed - ${orderId}`;
  html = `
    <h2>We're sorry, your order could not be completed.</h2>
    <p><strong>Order ID:</strong> ${orderId}</p>
    <p>Status: ${status}</p>
    <p>If this was a mistake, please try again or contact support at <a href="mailto:support@ekastore.com">support@ekastore.com</a>.</p>
  `;
}

  await sendEmail(customer.email, subject, html);

  res.status(201).json({ orderId: order.orderId, status });
};

exports.getOrder = async (req, res) => {
  const order = await Order.findOne({ orderId: req.params.id });
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
};
