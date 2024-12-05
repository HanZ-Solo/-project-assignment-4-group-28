const express = require('express');
const router = express.Router();
const { Order } = require('../models/Order');

// Get all orders for a user
router.get('/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new order
router.post('/', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
