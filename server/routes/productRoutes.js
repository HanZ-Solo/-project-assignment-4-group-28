const express = require('express');
const router = express.Router();
const { Product } = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a specific product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ productId: req.params.id });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new product (Admin only)
router.post('/', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a product by ID (Admin only)
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { productId: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a product by ID (Admin only)
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({ productId: req.params.id });
        if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
