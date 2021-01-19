const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const Mongoose = require('mongoose');
const Item = require('../models/Item');

//return all item

router.get('/items', async (req, res, next) => {
	try {
		const items = await Item.find();
		res.json({ data: items });
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

//return a specific item

router.get('/item/:id', async (req, res, next) => {
	try {
		let id = req.params.id;
		const item = await Item.findById(id);
		res.json({ message: 'Item found', item: item });
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

//add an item
router.post('/items', async (req, res, next) => {
	const item = new Item({
		_id: new Mongoose.Types.ObjectId(),
		name: req.body['name'],
		image: req.body['image'],
		comments: req.body['comments'],
		likes: req.body['likes'],
	});

	try {
		const savedItem = await item.save();
		res.json({ message: 'Item was saved successfully' });
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

//Update
router.put('/item/:id', async (req, res, next) => {
	try {
		const updatedItem = await Item.updateOne({ _id: req.params.id }, req.body);
		res.json({ message: 'Item was updated successfully', item: item });
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

//delete
router.delete('/item/:id', async (req, res, next) => {
	let id = req.body.id;
	try {
		const removeItem = await Item.remove({ _id: req.params.id });
		res.json({ message: 'Item was deleted successfully' });
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

module.exports = router;
